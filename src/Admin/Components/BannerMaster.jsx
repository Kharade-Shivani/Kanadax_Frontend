import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Edit2, 
  Eye, 
  Plus,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  X,
  Save,
  Upload,
  Check,
  AlertCircle,
  X as XIcon,
  Loader2
} from 'lucide-react';
import httpClient from '../../Api/axios';

// Toast Notification Component
const ToastNotification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30';
  const textColor = type === 'success' ? 'text-green-400' : 'text-red-400';
  const icon = type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />;

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} border rounded-lg p-4 shadow-lg animate-slideIn`}>
      <div className="flex items-center gap-3">
        <div className={`${textColor}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white ml-2"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

function BannerMaster() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' // 'success' or 'error'
  });
  
  // Current banner state
  const [currentBanner, setCurrentBanner] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    image: null,
    status: 'active'
  });

  // For previewing uploaded image
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEditFile, setSelectedEditFile] = useState(null);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Close toast
  const closeToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // Fetch banners on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get('/getall__banner');
      
      console.log('API Response:', response.data); // Debug log
      
      // Handle different response structures
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Response has { data: [...] } structure
        const formattedBanners = response.data.data.map(banner => ({
          id: banner._id,
          image: banner.image,
          status: banner.status || 'active'
        }));
        setBanners(formattedBanners);
      } else if (Array.isArray(response.data)) {
        // Response is already an array
        const formattedBanners = response.data.map(banner => ({
          id: banner._id,
          image: banner.image,
          status: banner.status || 'active'
        }));
        setBanners(formattedBanners);
      } else {
        console.log('Unexpected response structure:', response.data);
        setBanners([]);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      showToast('Failed to fetch banners', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle view banner
  const handleView = (banner) => {
    setCurrentBanner(banner);
    setIsViewModalOpen(true);
  };

  // Handle edit banner
  const handleEdit = (banner) => {
    setCurrentBanner(banner);
    setFormData({
      image: banner.image,
      status: banner.status || 'active'
    });
    setEditImagePreview(banner.image);
    setSelectedEditFile(null);
    setIsEditModalOpen(true);
  };

  // Handle delete banner
  const handleDelete = (banner) => {
    setCurrentBanner(banner);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await httpClient.delete(`/delete__banner/${currentBanner.id}`);
      setBanners(banners.filter(banner => banner.id !== currentBanner.id));
      setIsDeleteModalOpen(false);
      setCurrentBanner(null);
      showToast('Banner deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting banner:', error);
      showToast('Failed to delete banner', 'error');
    }
  };

  // Handle status toggle
  const toggleStatus = async (id) => {
    const banner = banners.find(b => b.id === id);
    if (!banner) return;

    const newStatus = banner.status === 'active' ? 'inactive' : 'active';
    
    try {
      const updateData = {
        image: banner.image,
        status: newStatus
      };
      
      await httpClient.put(`/update__banner/${id}`, updateData);
      
      setBanners(banners.map(banner => 
        banner.id === id 
          ? { ...banner, status: newStatus }
          : banner
      ));
      showToast(`Status updated to ${newStatus}`, 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status', 'error');
    }
  };

  // Handle add new banner
  const handleAddNew = () => {
    setFormData({
      image: null,
      status: 'active'
    });
    setImagePreview(null);
    setSelectedFile(null);
    setIsAddModalOpen(true);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Upload image to server
  const uploadImageToServer = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file); // Key name is 'image' as per API requirement
      
      const response = await httpClient.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Image upload response:', response.data);
      
      if (response.data.status && response.data.imageUrl) {
        return response.data.imageUrl;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  // Handle image file upload for Add
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    setSelectedFile(file);
  };

  // Handle image file upload for Edit
  const handleEditImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    setSelectedEditFile(file);
  };

  // Handle form submit for Add
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = null;
      
      // Upload image if a new file is selected
      if (selectedFile) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadImageToServer(selectedFile);
          showToast('Image uploaded successfully', 'success');
        } catch (uploadError) {
          showToast('Failed to upload image', 'error');
          return;
        } finally {
          setUploadingImage(false);
        }
      } else {
        showToast('Please select an image', 'error');
        return;
      }

      const response = await httpClient.post('/create__banner', {
        image: imageUrl,
        status: formData.status
      });

      console.log('Add Response:', response.data); // Debug log
      
      if (response.data) {
        // Handle different response structures
        const responseData = response.data.data || response.data;
        const newBanner = {
          id: responseData._id,
          image: responseData.image,
          status: responseData.status || 'active'
        };

        setBanners([...banners, newBanner]);
        setIsAddModalOpen(false);
        setFormData({ 
          image: null, 
          status: 'active' 
        });
        setImagePreview(null);
        setSelectedFile(null);
        showToast('Banner added successfully', 'success');
        
        // Refresh the list
        fetchBanners();
      }
    } catch (error) {
      console.error('Error adding banner:', error);
      showToast('Failed to add banner', 'error');
    }
  };

  // Handle form submit for Edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image || editImagePreview || currentBanner.image;
      
      // Upload new image if a new file is selected
      if (selectedEditFile) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadImageToServer(selectedEditFile);
          showToast('Image uploaded successfully', 'success');
        } catch (uploadError) {
          showToast('Failed to upload image. Keeping existing image.', 'error');
          // Keep existing image URL
          imageUrl = editImagePreview || currentBanner.image;
        } finally {
          setUploadingImage(false);
        }
      }

      const response = await httpClient.put(`/update__banner/${currentBanner.id}`, {
        image: imageUrl,
        status: formData.status
      });

      console.log('Edit Response:', response.data); // Debug log
      
      if (response.data) {
        // Handle different response structures
        const responseData = response.data.data || response.data;
        const updatedBanner = {
          id: currentBanner.id,
          image: responseData.image,
          status: responseData.status || 'active'
        };

        setBanners(banners.map(banner => 
          banner.id === currentBanner.id ? updatedBanner : banner
        ));

        setIsEditModalOpen(false);
        setCurrentBanner(null);
        setFormData({ 
          image: null, 
          status: 'active' 
        });
        setEditImagePreview(null);
        setSelectedEditFile(null);
        showToast('Banner updated successfully', 'success');
        
        // Refresh the list
        fetchBanners();
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      showToast('Failed to update banner', 'error');
    }
  };

  // Close all modals
  const closeAllModals = () => {
    setIsViewModalOpen(false);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentBanner(null);
    setFormData({ 
      image: null, 
      status: 'active' 
    });
    setImagePreview(null);
    setEditImagePreview(null);
    setSelectedFile(null);
    setSelectedEditFile(null);
    setUploadingImage(false);
  };

  // Get display status text
  const getStatusDisplayText = (status) => {
    return status === 'active' ? 'Active' : 'Inactive';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-700">Loading banners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <ToastNotification 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-700 to-rose-600 bg-clip-text text-transparent">
          Banner Master
        </h1>
        <p className="text-slate-700 mt-2">Manage your website banners and promotions</p>
      </div>

      {/* Controls Section */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-100 rounded-xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
          {/* Add New Button */}
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 w-full md:w-auto justify-center shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Banner</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-100">
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-red-100">
            <thead className="bg-gradient-to-r from-red-50 to-rose-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  Banner Image
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-red-50">
              {banners.map((banner) => (
                <tr key={banner.id} className="hover:bg-red-50/30 transition-colors">
                  {/* Banner Image - REMOVED URL TEXT */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      {banner.image ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={banner.image}
                            alt="Banner"
                            className="w-24 h-16 object-cover rounded-md border border-red-100"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-500">
                          <ImageIcon className="w-5 h-5" />
                          <span className="text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 md:px-6 py-4">
                    <button
                      onClick={() => toggleStatus(banner.id)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        banner.status === 'active'
                          ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30 border border-green-500/30'
                          : 'bg-red-500/20 text-red-700 hover:bg-red-500/30 border border-red-500/30'
                      }`}
                    >
                      {banner.status === 'active' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {getStatusDisplayText(banner.status)}
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          {getStatusDisplayText(banner.status)}
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => handleView(banner)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(banner)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Edit Banner"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(banner)}
                        className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-200"
                        title="Delete Banner"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {banners.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-red-300 mb-4">
              <ImageIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No banners found</h3>
            <p className="text-slate-600">
              Get started by creating your first banner
            </p>
          </div>
        )}
      </div>

      {/* Mobile Cards View (for small screens) */}
      <div className="md:hidden mt-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl shadow p-4 mb-4 border-2 border-red-100">
            <div className="mb-3">
              {banner.image ? (
                <img
                  src={banner.image}
                  alt="Banner"
                  className="w-full h-32 object-cover rounded-lg border border-red-100"
                />
              ) : (
                <div className="w-full h-32 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg flex items-center justify-center border-2 border-dashed border-red-100">
                  <ImageIcon className="w-8 h-8 text-red-300" />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-3">
              {/* Status */}
              <button
                onClick={() => toggleStatus(banner.id)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  banner.status === 'active'
                    ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                    : 'bg-red-500/20 text-red-700 border border-red-500/30'
                }`}
              >
                {getStatusDisplayText(banner.status)}
              </button>
            </div>

            <div className="flex justify-between border-t border-red-100 pt-3">
              <button
                onClick={() => handleView(banner)}
                className="flex items-center gap-1 text-red-600"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">View</span>
              </button>
              <button
                onClick={() => handleEdit(banner)}
                className="flex items-center gap-1 text-red-600"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(banner)}
                className="flex items-center gap-1 text-rose-600"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Modal */}
      {isViewModalOpen && currentBanner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-700">Banner Details</h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-red-600 mb-2">Banner Image</h4>
                {currentBanner.image ? (
                  <div className="relative h-48 rounded-lg overflow-hidden border border-red-100">
                    <img
                      src={currentBanner.image}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg flex items-center justify-center border-2 border-dashed border-red-100">
                    <ImageIcon className="w-12 h-12 text-red-300" />
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-red-600 mb-2">Image URL</h4>
                <p className="text-slate-700 text-sm break-all">{currentBanner.image || 'No image URL'}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-red-600 mb-2">Status</h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  currentBanner.status === 'active'
                    ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                    : 'bg-red-500/20 text-red-700 border border-red-500/30'
                }`}>
                  {currentBanner.status === 'active' ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {getStatusDisplayText(currentBanner.status)}
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-1" />
                      {getStatusDisplayText(currentBanner.status)}
                    </>
                  )}
                </span>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-red-100">
                <button
                  onClick={closeAllModals}
                  className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Banner Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-red-700">Add New Banner</h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Banner Image *
                  </label>
                  <div className="mt-1">
                    {/* File Upload */}
                    <div className="flex items-center justify-center w-full">
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${uploadingImage ? 'opacity-50 cursor-not-allowed bg-red-50 border-red-300' : 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300'} transition-all`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-red-600" />
                          <p className="mb-1 text-sm text-red-600">Click to upload image</p>
                          <p className="text-xs text-slate-500">PNG, JPG or GIF (MAX. 2MB)</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>
                    
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm text-red-600 mb-2">Preview:</p>
                        <div className="relative h-32 w-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-full w-full object-cover rounded-lg border border-red-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setSelectedFile(null);
                              setFormData(prev => ({ ...prev, image: null }));
                            }}
                            className="absolute top-1 right-1 bg-gradient-to-r from-red-700 to-rose-600 text-white p-2 rounded-full shadow-md hover:from-red-600 hover:to-rose-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Uploading indicator */}
                    {uploadingImage && (
                      <div className="mt-4 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-red-600 animate-spin mr-2" />
                        <span className="text-red-600 text-sm">Uploading image...</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-red-100">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                  disabled={uploadingImage}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploadingImage || !selectedFile}
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Add Banner
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {isEditModalOpen && currentBanner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-red-700">Edit Banner</h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Banner Image
                  </label>
                  
                  {/* Current Image */}
                  {editImagePreview && !selectedEditFile && (
                    <div className="mb-4">
                      <p className="text-sm text-red-600 mb-2">Current Image:</p>
                      <div className="relative h-32 w-full">
                        <img
                          src={editImagePreview}
                          alt="Current"
                          className="h-full w-full object-cover rounded-lg border border-red-200"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* File Upload */}
                  <div className="mt-1">
                    <div className="flex items-center justify-center w-full">
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${uploadingImage ? 'opacity-50 cursor-not-allowed bg-red-50 border-red-300' : 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300'} transition-all`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-red-600" />
                          <p className="mb-1 text-sm text-red-600">Click to upload new image</p>
                          <p className="text-xs text-slate-500">PNG, JPG or GIF (MAX. 2MB)</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleEditImageUpload}
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>
                    
                    {/* New Image Preview */}
                    {selectedEditFile && editImagePreview && (
                      <div className="mt-4">
                        <p className="text-sm text-red-600 mb-2">New Image Preview:</p>
                        <div className="relative h-32 w-full">
                          <img
                            src={editImagePreview}
                            alt="New Preview"
                            className="h-full w-full object-cover rounded-lg border border-red-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setEditImagePreview(currentBanner.image);
                              setSelectedEditFile(null);
                            }}
                            className="absolute top-1 right-1 bg-gradient-to-r from-red-700 to-rose-600 text-white p-2 rounded-full shadow-md hover:from-red-600 hover:to-rose-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Uploading indicator */}
                    {uploadingImage && (
                      <div className="mt-4 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-red-600 animate-spin mr-2" />
                        <span className="text-red-600 text-sm">Uploading image...</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-red-100">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                  disabled={uploadingImage}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Banner
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentBanner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-rose-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-rose-100">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                Delete Banner
              </h3>
              
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete this banner? This action cannot be undone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Delete Banner
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerMaster;