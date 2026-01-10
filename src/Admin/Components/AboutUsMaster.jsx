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
  Loader2,
  Check,
  AlertCircle,
  X as XIcon
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

function AboutUsMaster() {
  const [aboutUsData, setAboutUsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
  
  // Current section state
  const [currentSection, setCurrentSection] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    About_us_title: '',
    About_us_description: '',
    About_us_image: '',
    status: 'Active'
  });

  // For previewing uploaded image
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Allowed file types
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Close toast
  const closeToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // Fetch all About Us sections
  const fetchAboutUsSections = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get('/getall__aboutus');
      console.log('API Response:', response.data);
      
      // Check different possible response structures
      if (response.data) {
        let sections = [];
        
        if (Array.isArray(response.data)) {
          // Response is already an array
          sections = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Response has { data: [...] } structure
          sections = response.data.data;
        } else if (response.data.length > 0) {
          // Response is an object with length property
          sections = response.data;
        }
        
        console.log('Extracted sections:', sections);
        
        if (sections.length > 0) {
          // Transform API data to match our component structure
          const transformedData = sections.map(item => ({
            id: item._id || item.id,
            title: item.About_us_title || '',
            description: item.About_us_description || '',
            image: item.About_us_image || '',
            status: item.status || 'Active'
          }));
          
          setAboutUsData(transformedData);
        } else {
          console.log('No sections found in response');
        }
      }
    } catch (error) {
      console.error('Error fetching About Us sections:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      showToast('Failed to fetch About Us sections', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutUsSections();
  }, []);

  // Validate image file type only (no size restriction)
  const validateImageFile = (file) => {
    if (!file) {
      showToast('Please select an image file', 'error');
      return false;
    }

    // Check file type only (no size check)
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      showToast('Invalid file type. Please upload JPEG, PNG, GIF, or WebP image.', 'error');
      return false;
    }

    return true;
  };

  // Upload image function
  const uploadImageToServer = async (file) => {
    if (!validateImageFile(file)) {
      throw new Error('Image validation failed');
    }

    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await httpClient.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data && response.data.status && response.data.imageUrl) {
        return response.data.imageUrl;
      }
      throw new Error('Image upload failed: Invalid response format');
    } catch (error) {
      console.error('Error uploading image:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
        throw new Error(`Image upload failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        throw new Error('Image upload failed: No response from server');
      } else {
        throw new Error(`Image upload failed: ${error.message}`);
      }
    } finally {
      setImageUploading(false);
    }
  };

  // Handle view section
  const handleView = (section) => {
    setCurrentSection(section);
    setIsViewModalOpen(true);
  };

  // Handle edit section
  const handleEdit = (section) => {
    setCurrentSection(section);
    setFormData({
      About_us_title: section.title,
      About_us_description: section.description,
      About_us_image: section.image || '',
      status: section.status
    });
    setImagePreview(section.image);
    setSelectedImageFile(null);
    setIsEditModalOpen(true);
  };

  // Handle delete section
  const handleDelete = (section) => {
    setCurrentSection(section);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      setUploading(true);
      await httpClient.delete(`/delete__aboutus/${currentSection.id}`);
      
      setAboutUsData(aboutUsData.filter(section => section.id !== currentSection.id));
      setIsDeleteModalOpen(false);
      setCurrentSection(null);
      showToast('Section deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting section:', error);
      showToast('Failed to delete section', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Handle status toggle
  const toggleStatus = async (id) => {
    try {
      const sectionToUpdate = aboutUsData.find(section => section.id === id);
      if (!sectionToUpdate) return;

      const newStatus = sectionToUpdate.status === 'Active' ? 'Inactive' : 'Active';
      
      await httpClient.put(`/update__aboutus/${id}`, {
        About_us_title: sectionToUpdate.title,
        About_us_description: sectionToUpdate.description,
        About_us_image: sectionToUpdate.image,
        status: newStatus
      });

      setAboutUsData(aboutUsData.map(section => 
        section.id === id 
          ? { ...section, status: newStatus }
          : section
      ));
      showToast(`Status updated to ${newStatus}`, 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status', 'error');
    }
  };

  // Handle add new section
  const handleAddNew = () => {
    setFormData({
      About_us_title: '',
      About_us_description: '',
      About_us_image: '',
      status: 'Active'
    });
    setImagePreview(null);
    setSelectedImageFile(null);
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

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Reset file input to allow selecting same file again
      e.target.value = '';
      
      if (!validateImageFile(file)) {
        return;
      }

      setSelectedImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.onerror = () => {
        showToast('Error reading file', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
  const removeSelectedImage = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, About_us_image: '' }));
  };

  // Handle add new section submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.About_us_title.trim() || !formData.About_us_description.trim()) {
      showToast('Please enter both title and description', 'error');
      return;
    }

    try {
      setUploading(true);
      
      let imageUrl = '';
      
      // Upload image if selected
      if (selectedImageFile) {
        try {
          imageUrl = await uploadImageToServer(selectedImageFile);
          showToast('Image uploaded successfully!', 'success');
        } catch (error) {
          showToast(error.message || 'Failed to upload image', 'error');
          return;
        }
      }
      
      const response = await httpClient.post('/create__aboutus', {
        About_us_title: formData.About_us_title.trim(),
        About_us_description: formData.About_us_description.trim(),
        About_us_image: imageUrl || '',
        status: formData.status
      });

      if (response.data) {
        // Add new section to state
        const newSection = {
          id: response.data._id,
          title: response.data.About_us_title,
          description: response.data.About_us_description,
          image: response.data.About_us_image,
          status: response.data.status
        };

        setAboutUsData([...aboutUsData, newSection]);
        setIsAddModalOpen(false);
        resetForm();
        showToast('Section added successfully!', 'success');
      }
    } catch (error) {
      console.error('Error adding section:', error);
      showToast('Failed to add section', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Handle edit section submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.About_us_title.trim() || !formData.About_us_description.trim()) {
      showToast('Please enter both title and description', 'error');
      return;
    }

    try {
      setUploading(true);
      
      let imageUrl = formData.About_us_image;
      
      // Upload new image if selected
      if (selectedImageFile) {
        try {
          imageUrl = await uploadImageToServer(selectedImageFile);
          showToast('Image uploaded successfully!', 'success');
        } catch (error) {
          showToast(error.message || 'Failed to upload image', 'error');
          return;
        }
      }
      
      const response = await httpClient.put(`/update__aboutus/${currentSection.id}`, {
        About_us_title: formData.About_us_title.trim(),
        About_us_description: formData.About_us_description.trim(),
        About_us_image: imageUrl,
        status: formData.status
      });

      if (response.data) {
        const updatedSection = {
          id: currentSection.id,
          title: response.data.About_us_title,
          description: response.data.About_us_description,
          image: response.data.About_us_image,
          status: response.data.status
        };

        setAboutUsData(aboutUsData.map(section => 
          section.id === currentSection.id ? updatedSection : section
        ));

        setIsEditModalOpen(false);
        resetForm();
        showToast('Section updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error updating section:', error);
      showToast('Failed to update section', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Reset form state
  const resetForm = () => {
    setCurrentSection(null);
    setFormData({ 
      About_us_title: '', 
      About_us_description: '', 
      About_us_image: '', 
      status: 'Active' 
    });
    setImagePreview(null);
    setSelectedImageFile(null);
  };

  // Close all modals
  const closeAllModals = () => {
    setIsViewModalOpen(false);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    resetForm();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-700">Loading About Us sections...</p>
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
          About Us Content Management
        </h1>
        <p className="text-slate-700 mt-2">Manage your About Us page sections and content</p>
        <p className="text-sm text-slate-500 mt-1">Supported formats: JPEG, PNG, GIF, WebP</p>
      </div>

      {/* Controls Section */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-100 rounded-xl shadow-lg p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
          {/* Add New Button */}
          <button
            onClick={handleAddNew}
            disabled={uploading || imageUploading}
            className="bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold px-4 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {uploading || imageUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            <span>{uploading || imageUploading ? 'Processing...' : 'Add New Section'}</span>
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
                  Section Title
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  Description Preview
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
              {aboutUsData.map((section) => (
                <tr key={section.id} className="hover:bg-red-50/30 transition-colors">
                  {/* Section Title */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="text-sm font-medium text-slate-800">{section.title}</div>
                  </td>

                  {/* Image */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      {section.image ? (
                        <div className="flex items-center gap-3">
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-20 h-12 object-cover rounded-md border border-red-100"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiByeD0iNCIgZmlsbD0iI2YlZTZkNCIvPgo8cGF0aCBkPSJNNDAgMzJDMzcuNzkgMzIgMzYgMzAuMjEgMzYgMjhDMzYgMjUuNzkgMzcuNzkgMjQgNDAgMjRDNDIuMjEgMjQgNDQgMjUuNzkgNDQgMjhDNDQgMzAuMjEgNDIuMjEgMzIgNDAgMzJaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik00OCAxOEM0OCAxOS4xMDQ2IDQ3LjEwNDYgMjAgNDYgMjBDNDQuODk1NCAyMCA0NCAxOS4xMDQ2IDQ0IDE4QzQ0IDE2Ljg5NTQgNDQuODk1NCAxNiA0NiAxNkM0Ny4xMDQ2IDE2IDQ4IDE2Ljg5NTQgNDggMThaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik0xNiAyN0MyMC45NzA2IDI3IDI1IDIyLjk3MDYgMjUgMThDMjUgMTMuMDI5NCAyMC45NzA2IDkgMTYgOUMxMS4wMjk0IDkgNyAxMy4wMjk0IDcgMThDNyAyMi45NzA2IDExLjAyOTQgMjcgMTYgMjdaIiBzdHJva2U9IiNmMTQ2NmQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                            }}
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

                  {/* Description Preview */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="text-sm text-slate-600 max-w-xs truncate">
                      {section.description}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 md:px-6 py-4">
                    <button
                      onClick={() => toggleStatus(section.id)}
                      disabled={uploading || imageUploading}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                        section.status === 'Active'
                          ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30 border border-green-500/30'
                          : 'bg-red-500/20 text-red-700 hover:bg-red-500/30 border border-red-500/30'
                      }`}
                    >
                      {section.status === 'Active' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          Inactive
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* View Button */}
                      <button
                        onClick={() => handleView(section)}
                        disabled={uploading || imageUploading}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(section)}
                        disabled={uploading || imageUploading}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit Section"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(section)}
                        disabled={uploading || imageUploading}
                        className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Section"
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
        {aboutUsData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-red-300 mb-4">
              <ImageIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No sections found</h3>
            <p className="text-slate-600">
              Get started by creating your first About Us section
            </p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {isViewModalOpen && currentSection && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-700">Section Details</h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-sm font-medium text-red-600 mb-2">Section Title</h4>
                <p className="text-slate-800 text-lg font-semibold">{currentSection.title}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-red-600 mb-2">Image</h4>
                {currentSection.image ? (
                  <div className="relative h-64 rounded-lg overflow-hidden border border-red-100">
                    <img
                      src={currentSection.image}
                      alt={currentSection.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiByeD0iNCIgZmlsbD0iI2YlZTZkNCIvPgo8cGF0aCBkPSJNNDAgMzJDMzcuNzkgMzIgMzYgMzAuMjEgMzYgMjhDMzYgMjUuNzkgMzcuNzkgMjQgNDAgMjRDNDIuMjEgMjQgNDQgMjUuNzkgNDQgMjhDNDQgMzAuMjEgNDIuMjEgMzIgNDAgMzJaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik00OCAxOEM0OCAxOS4xMDQ2IDQ3LjEwNDYgMjAgNDYgMjBDNDQuODk1NCAyMCA0NCAxOS4xMDQ2IDQ0IDE4QzQ0IDE2Ljg5NTQgNDQuODk1NCAxNiA0NiAxNkM0Ny4xMDQ2IDE2IDQ4IDE2Ljg5NTQgNDggMThaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik0xNiAyN0MyMC45NzA2IDI3IDI1IDIyLjk3MDYgMjUgMThDMjUgMTMuMDI5NCAyMC45NzA2IDkgMTYgOUMxMS4wMjk0IDkgNyAxMy4wMjk0IDcgMThDNyAyMi45NzA2IDExLjAyOTQgMjcgMTYgMjdaIiBzdHJva2U9IiNmMTQ2NmQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-64 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg flex items-center justify-center border-2 border-dashed border-red-100">
                    <ImageIcon className="w-16 h-16 text-red-300" />
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-red-600 mb-2">Description</h4>
                <p className="text-slate-700 whitespace-pre-line bg-red-50 p-4 rounded-lg border border-red-100">
                  {currentSection.description}
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-red-600 mb-2">Status</h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  currentSection.status === 'Active'
                    ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                    : 'bg-red-500/20 text-red-700 border border-red-500/30'
                }`}>
                  {currentSection.status === 'Active' ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-1" />
                      Inactive
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

      {/* Add Section Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-700">Add New Section</h3>
              <button
                onClick={closeAllModals}
                disabled={uploading || imageUploading}
                className="text-slate-500 hover:text-red-600 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6">
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    name="About_us_title"
                    value={formData.About_us_title}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter section title"
                    required
                    disabled={uploading || imageUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="About_us_description"
                    value={formData.About_us_description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none focus:outline-none transition-all"
                    placeholder="Enter detailed description..."
                    required
                    disabled={uploading || imageUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Image Upload
                  </label>
                  <div className="mt-1">
                    {/* File Upload */}
                    <div className="flex items-center justify-center w-full">
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${uploading || imageUploading ? 'bg-red-50 cursor-not-allowed border-red-300' : 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300 cursor-pointer'} rounded-lg transition-all`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {imageUploading ? (
                            <Loader2 className="w-8 h-8 mb-2 text-red-600 animate-spin" />
                          ) : (
                            <Upload className="w-8 h-8 mb-2 text-red-600" />
                          )}
                          <p className="mb-1 text-sm text-red-600">
                            {imageUploading ? 'Uploading image...' : 'Click to upload image'}
                          </p>
                          <p className="text-xs text-slate-500">JPEG, PNG, GIF, WebP</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".jpg,.jpeg,.png,.gif,.webp,image/jpeg,image/png,image/gif,image/webp"
                          onChange={handleImageUpload}
                          disabled={uploading || imageUploading}
                        />
                      </label>
                    </div>
                    
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-4">
                        <p className="text-sm text-red-600 mb-2">Preview:</p>
                        <div className="relative h-48 w-full">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-full w-full object-cover rounded-lg border border-red-200"
                          />
                          <button
                            type="button"
                            onClick={removeSelectedImage}
                            disabled={uploading || imageUploading}
                            className="absolute top-1 right-1 bg-gradient-to-r from-red-700 to-rose-600 text-white p-2 rounded-full disabled:opacity-50 hover:from-red-600 hover:to-rose-500 shadow-md"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {selectedImageFile && (
                            <div className="absolute bottom-1 left-1 bg-gradient-to-r from-red-700 to-rose-600 text-white text-xs px-2 py-1 rounded">
                              {selectedImageFile.name} ({(selectedImageFile.size / 1024).toFixed(1)} KB)
                            </div>
                          )}
                        </div>
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
                    disabled={uploading || imageUploading}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-red-100">
                <button
                  type="button"
                  onClick={closeAllModals}
                  disabled={uploading || imageUploading}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || imageUploading}
                  className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(uploading || imageUploading) ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {imageUploading ? 'Uploading...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Add Section
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Section Modal */}
      {isEditModalOpen && currentSection && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-700">Edit Section</h3>
              <button
                onClick={closeAllModals}
                disabled={uploading || imageUploading}
                className="text-slate-500 hover:text-red-600 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Section Title *
                  </label>
                  <input
                    type="text"
                    name="About_us_title"
                    value={formData.About_us_title}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter section title"
                    required
                    disabled={uploading || imageUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="About_us_description"
                    value={formData.About_us_description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none focus:outline-none transition-all"
                    placeholder="Enter detailed description..."
                    required
                    disabled={uploading || imageUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Image
                  </label>
                  
                  {/* Current Image */}
                  {currentSection.image && !selectedImageFile && (
                    <div className="mb-4">
                      <p className="text-sm text-red-600 mb-2">Current Image:</p>
                      <div className="relative h-48 w-full">
                        <img
                          src={currentSection.image}
                          alt="Current"
                          className="h-full w-full object-cover rounded-lg border border-red-200"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiByeD0iNCIgZmlsbD0iI2YlZTZkNCIvPgo8cGF0aCBkPSJNNDAgMzJDMzcuNzkgMzIgMzYgMzAuMjEgMzYgMjhDMzYgMjUuNzkgMzcuNzkgMjQgNDAgMjRDNDIuMjEgMjQgNDQgMjUuNzkgNDQgMjhDNDQgMzAuMjEgNDIuMjEgMzIgNDAgMzJaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik00OCAxOEM0OCAxOS4xMDQ2IDQ3LjEwNDYgMjAgNDYgMjBDNDQuODk1NCAyMCA0NCAxOS4xMDQ2IDQ0IDE4QzQ0IDE2Ljg5NTQgNDQuODk1NCAxNiA0NiAxNkM0Ny4xMDQ2IDE2IDQ4IDE2Ljg5NTQgNDggMThaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik0xNiAyN0MyMC45NzA2IDI3IDI1IDIyLjk3MDYgMjUgMThDMjUgMTMuMDI5NCAyMC45NzA2IDkgMTYgOUMxMS4wMjk0IDkgNyAxMy4wMjk0IDcgMThDNyAyMi45NzA2IDExLjAyOTQgMjcgMTYgMjdaIiBzdHJva2U9IiNmMTQ2NmQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* File Upload */}
                  <div className="mt-1">
                    <div className="flex items-center justify-center w-full">
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed ${uploading || imageUploading ? 'bg-red-50 cursor-not-allowed border-red-300' : 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300 cursor-pointer'} rounded-lg transition-all`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {imageUploading ? (
                            <Loader2 className="w-8 h-8 mb-2 text-red-600 animate-spin" />
                          ) : (
                            <Upload className="w-8 h-8 mb-2 text-red-600" />
                          )}
                          <p className="mb-1 text-sm text-red-600">
                            {imageUploading ? 'Uploading image...' : 'Click to upload new image'}
                          </p>
                          <p className="text-xs text-slate-500">JPEG, PNG, GIF, WebP</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".jpg,.jpeg,.png,.gif,.webp,image/jpeg,image/png,image/gif,image/webp"
                          onChange={handleImageUpload}
                          disabled={uploading || imageUploading}
                        />
                      </label>
                    </div>
                    
                    {/* New Image Preview */}
                    {imagePreview && selectedImageFile && (
                      <div className="mt-4">
                        <p className="text-sm text-red-600 mb-2">New Image Preview:</p>
                        <div className="relative h-48 w-full">
                          <img
                            src={imagePreview}
                            alt="New Preview"
                            className="h-full w-full object-cover rounded-lg border border-red-200"
                          />
                          <button
                            type="button"
                            onClick={removeSelectedImage}
                            disabled={uploading || imageUploading}
                            className="absolute top-1 right-1 bg-gradient-to-r from-red-700 to-rose-600 text-white p-2 rounded-full disabled:opacity-50 hover:from-red-600 hover:to-rose-500 shadow-md"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {selectedImageFile && (
                            <div className="absolute bottom-1 left-1 bg-gradient-to-r from-red-700 to-rose-600 text-white text-xs px-2 py-1 rounded">
                              {selectedImageFile.name} ({(selectedImageFile.size / 1024).toFixed(1)} KB)
                            </div>
                          )}
                        </div>
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
                    disabled={uploading || imageUploading}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-red-100">
                <button
                  type="button"
                  onClick={closeAllModals}
                  disabled={uploading || imageUploading}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || imageUploading}
                  className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {(uploading || imageUploading) ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {imageUploading ? 'Uploading...' : 'Updating...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Section
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentSection && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-rose-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-rose-100">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                Delete Section
              </h3>
              
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-red-700">"{currentSection.title}"</span>? This action cannot be undone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={uploading || imageUploading}
                  className="flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={uploading || imageUploading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading || imageUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete Section'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Cards View (for small screens) */}
      <div className="md:hidden mt-4">
        {aboutUsData.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow p-4 mb-4 border-2 border-red-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-slate-800">{section.title}</h3>
              </div>
              <button
                onClick={() => toggleStatus(section.id)}
                disabled={uploading || imageUploading}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium disabled:opacity-50 ${
                  section.status === 'Active'
                    ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                    : 'bg-red-500/20 text-red-700 border border-red-500/30'
                }`}
              >
                {section.status}
              </button>
            </div>

            <div className="mb-3">
              {section.image ? (
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-40 object-cover rounded-lg border border-red-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiByeD0iNCIgZmlsbD0iI2YlZTZkNCIvPgo8cGF0aCBkPSJNNDAgMzJDMzcuNzkgMzIgMzYgMzAuMjEgMzYgMjhDMzYgMjUuNzkgMzcuNzkgMjQgNDAgMjRDNDIuMjEgMjQgNDQgMjUuNzkgNDQgMjhDNDQgMzAuMjEgNDIuMjEgMzIgNDAgMzJaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik00OCAxOEM0OCAxOS4xMDQ2IDQ3LjEwNDYgMjAgNDYgMjBDNDQuODk1NCAyMCA0NCAxOS4xMDQ2IDQ0IDE4QzQ0IDE2Ljg5NTQgNDQuODk1NCAxNiA0NiAxNkM0Ny4xMDQ2IDE2IDQ4IDE2Ljg5NTQgNDggMThaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik0xNiAyN0MyMC45NzA2IDI3IDI1IDIyLjk3MDYgMjUgMThDMjUgMTMuMDI5NCAyMC45NzA2IDkgMTYgOUMxMS4wMjk0IDkgNyAxMy4wMjk0IDcgMThDNyAyMi45NzA2IDExLjAyOTQgMjcgMTYgMjdaIiBzdHJva2U9IiNmMTQ2NmQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                  }}
                />
              ) : (
                <div className="w-full h-40 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg flex items-center justify-center border-2 border-dashed border-red-100">
                  <ImageIcon className="w-8 h-8 text-red-300" />
                </div>
              )}
            </div>

            <div className="mb-3">
              <p className="text-slate-600 text-sm line-clamp-3">
                {section.description}
              </p>
            </div>

            <div className="flex justify-between border-t border-red-100 pt-3">
              <button
                onClick={() => handleView(section)}
                disabled={uploading || imageUploading}
                className="flex items-center gap-1 text-red-600 disabled:opacity-50"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">View</span>
              </button>
              <button
                onClick={() => handleEdit(section)}
                disabled={uploading || imageUploading}
                className="flex items-center gap-1 text-red-600 disabled:opacity-50"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(section)}
                disabled={uploading || imageUploading}
                className="flex items-center gap-1 text-rose-600 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUsMaster;