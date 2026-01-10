import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Edit2, 
  Eye, 
  Plus,
  CheckCircle,
  XCircle,
  X,
  Save,
  Phone,
  Mail,
  MapPin,
  Loader2,
  Check,
  AlertCircle,
  X as XIcon,
  Info
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

function FooterMaster() {
  const [footers, setFooters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Modal states
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  
  // Current footer state
  const [currentFooter, setCurrentFooter] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    status: 'Active'
  });

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Close toast
  const closeToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // Fetch all footers
  const fetchFooters = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get('/getall__footer');
      console.log('API Response:', response.data);
      
      // Handle different response structures
      if (response.data) {
        let footerData = [];
        
        if (Array.isArray(response.data)) {
          footerData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          footerData = response.data.data;
        } else if (response.data.length > 0) {
          footerData = response.data;
        } else if (response.data._id) {
          // Single footer object
          footerData = [response.data];
        }
        
        console.log('Extracted footers:', footerData);
        
        if (footerData.length > 0) {
          // Transform API data to match our component structure
          const transformedData = footerData.map(item => ({
            id: item._id || item.id,
            phone: item.phone || '',
            email: item.email || '',
            address: item.address || '',
            status: item.status || 'Active',
            createdAt: item.createdAt || '',
            updatedAt: item.updatedAt || ''
          }));
          
          setFooters(transformedData);
        } else {
          console.log('No footers found in response');
          setFooters([]);
        }
      }
    } catch (error) {
      console.error('Error fetching footers:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      showToast('Failed to fetch footer information', 'error');
      setFooters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooters();
  }, []);

  // Handle view footer
  const handleView = (footer) => {
    setCurrentFooter(footer);
    setIsViewModalOpen(true);
  };

  // Handle edit footer
  const handleEdit = (footer) => {
    setCurrentFooter(footer);
    setFormData({
      phone: footer.phone,
      email: footer.email,
      address: footer.address,
      status: footer.status
    });
    setIsEditModalOpen(true);
  };

  // Handle delete footer
  const handleDelete = (footer) => {
    setCurrentFooter(footer);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      setUploading(true);
      await httpClient.delete(`/delete__footer/${currentFooter.id}`);
      
      setFooters(footers.filter(footer => footer.id !== currentFooter.id));
      setIsDeleteModalOpen(false);
      setCurrentFooter(null);
      showToast('Footer deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting footer:', error);
      showToast('Failed to delete footer', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Handle status toggle
  const toggleStatus = async (id) => {
    try {
      const footerToUpdate = footers.find(footer => footer.id === id);
      if (!footerToUpdate) return;

      const newStatus = footerToUpdate.status === 'Active' ? 'Inactive' : 'Active';
      
      await httpClient.put(`/update__footer/${id}`, {
        phone: footerToUpdate.phone,
        email: footerToUpdate.email,
        address: footerToUpdate.address,
        status: newStatus
      });

      setFooters(footers.map(footer => 
        footer.id === id 
          ? { ...footer, status: newStatus }
          : footer
      ));
      showToast(`Status updated to ${newStatus}`, 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status', 'error');
    }
  };

  // Handle add new footer
  const handleAddNew = () => {
    setFormData({
      phone: '',
      email: '',
      address: '',
      status: 'Active'
    });
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

  // Handle textarea change
  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.phone.trim()) {
      showToast('Phone number is required', 'error');
      return false;
    }
    
    if (!formData.email.trim()) {
      showToast('Email is required', 'error');
      return false;
    }
    
    if (!formData.address.trim()) {
      showToast('Address is required', 'error');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }
    
    return true;
  };

  // Handle add new footer submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setUploading(true);
      
      const response = await httpClient.post('/create__footer', {
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        status: formData.status
      });

      if (response.data) {
        // Add new footer to state
        const newFooter = {
          id: response.data._id,
          phone: response.data.phone,
          email: response.data.email,
          address: response.data.address,
          status: response.data.status
        };

        setFooters([...footers, newFooter]);
        setIsAddModalOpen(false);
        resetForm();
        showToast('Footer added successfully!', 'success');
      }
    } catch (error) {
      console.error('Error adding footer:', error);
      showToast('Failed to add footer', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Handle edit footer submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setUploading(true);
      
      const response = await httpClient.put(`/update__footer/${currentFooter.id}`, {
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        status: formData.status
      });

      if (response.data) {
        const updatedFooter = {
          id: currentFooter.id,
          phone: response.data.phone,
          email: response.data.email,
          address: response.data.address,
          status: response.data.status
        };

        setFooters(footers.map(footer => 
          footer.id === currentFooter.id ? updatedFooter : footer
        ));

        setIsEditModalOpen(false);
        resetForm();
        showToast('Footer updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error updating footer:', error);
      showToast('Failed to update footer', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Reset form state
  const resetForm = () => {
    setCurrentFooter(null);
    setFormData({ 
      phone: '', 
      email: '', 
      address: '', 
      status: 'Active' 
    });
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
          <p className="text-slate-700">Loading footer information...</p>
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
          Footer Information Management
        </h1>
        <div className="flex items-center gap-2 text-slate-700 mt-2">
          <Info className="w-4 h-4" />
          <p>Manage contact information displayed in website footer</p>
        </div>
      </div>

      {/* Controls Section */}
     <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-100 rounded-xl shadow-lg p-4 md:p-6 mb-6">
  <div className="flex justify-end">
    
    {/* Add New Button */}
    <button
      onClick={handleAddNew}
      disabled={uploading}
      className="bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
    >
      {uploading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Plus className="w-5 h-5" />
      )}
      <span>{uploading ? 'Processing...' : 'Add New Footer'}</span>
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
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </div>
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
              {footers.map((footer) => (
                <tr key={footer.id} className="hover:bg-red-50/30 transition-colors">
                  {/* Phone Number */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg mr-3">
                        <Phone className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{footer.phone}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email Address */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-rose-100 rounded-lg mr-3">
                        <Mail className="w-4 h-4 text-rose-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 truncate max-w-[200px]">{footer.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-start">
                      <div className="p-2 bg-pink-100 rounded-lg mr-3 mt-1">
                        <MapPin className="w-4 h-4 text-pink-600" />
                      </div>
                      <p className="text-sm text-slate-600 max-w-xs line-clamp-2">{footer.address}</p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 md:px-6 py-4">
                    <button
                      onClick={() => toggleStatus(footer.id)}
                      disabled={uploading}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                        footer.status === 'Active'
                          ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30 border border-green-500/30'
                          : 'bg-red-500/20 text-red-700 hover:bg-red-500/30 border border-red-500/30'
                      }`}
                    >
                      {footer.status === 'Active' ? (
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
                        onClick={() => handleView(footer)}
                        disabled={uploading}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(footer)}
                        disabled={uploading}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit Footer"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(footer)}
                        disabled={uploading}
                        className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Footer"
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
        {footers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-red-300 mb-4">
              <div className="flex justify-center gap-3">
                <Phone className="w-12 h-12" />
                <Mail className="w-12 h-12" />
                <MapPin className="w-12 h-12" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No footer information found</h3>
            <p className="text-slate-600">
              Get started by adding your first footer information
            </p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {isViewModalOpen && currentFooter && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-700">Footer Details</h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-2">
                    <Phone className="w-5 h-5 text-red-600 mr-2" />
                    <h4 className="text-sm font-medium text-red-600">Phone Number</h4>
                  </div>
                  <p className="text-slate-800 text-lg font-medium pl-7">{currentFooter.phone}</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Mail className="w-5 h-5 text-red-600 mr-2" />
                    <h4 className="text-sm font-medium text-red-600">Email Address</h4>
                  </div>
                  <p className="text-slate-800 text-lg font-medium pl-7">{currentFooter.email}</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-red-600 mr-2" />
                    <h4 className="text-sm font-medium text-red-600">Address</h4>
                  </div>
                  <p className="text-slate-700 whitespace-pre-wrap bg-red-50 p-4 rounded-lg border border-red-100">
                    {currentFooter.address}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">Status</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    currentFooter.status === 'Active'
                      ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                      : 'bg-red-500/20 text-red-700 border border-red-500/30'
                  }`}>
                    {currentFooter.status === 'Active' ? (
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
              </div>
              
              <div className="flex justify-end pt-6 border-t border-red-100 mt-6">
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

      {/* Add Footer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-red-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-red-700">Add New Footer</h3>
              <button
                onClick={closeAllModals}
                disabled={uploading}
                className="text-slate-500 hover:text-red-600 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter phone number (e.g., +91 9876543210)"
                    required
                    disabled={uploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter email address"
                    required
                    disabled={uploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleTextareaChange}
                    rows="4"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all resize-none"
                    placeholder="Enter complete address"
                    required
                    disabled={uploading}
                  />
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
                    disabled={uploading}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-red-100 mt-6">
                <button
                  type="button"
                  onClick={closeAllModals}
                  disabled={uploading}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Add Footer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Footer Modal */}
      {isEditModalOpen && currentFooter && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-red-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-red-700">Edit Footer</h3>
              <button
                onClick={closeAllModals}
                disabled={uploading}
                className="text-slate-500 hover:text-red-600 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter phone number (e.g., +91 9876543210)"
                    required
                    disabled={uploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter email address"
                    required
                    disabled={uploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleTextareaChange}
                    rows="4"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all resize-none"
                    placeholder="Enter complete address"
                    required
                    disabled={uploading}
                  />
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
                    disabled={uploading}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-red-100 mt-6">
                <button
                  type="button"
                  onClick={closeAllModals}
                  disabled={uploading}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Footer
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentFooter && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-rose-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-rose-100">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                Delete Footer
              </h3>
              
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete the footer information for <span className="font-medium text-red-700">{currentFooter.email}</span>? This action cannot be undone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  disabled={uploading}
                  className="flex-1 px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={uploading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete Footer'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Cards View (for small screens) */}
      <div className="md:hidden mt-4">
        {footers.map((footer) => (
          <div key={footer.id} className="bg-white rounded-xl shadow p-4 mb-4 border-2 border-red-100">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-red-100 rounded-lg mr-2">
                      <Phone className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{footer.phone}</p>
                      <p className="text-xs text-slate-600">Phone</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-rose-100 rounded-lg mr-2">
                      <Mail className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 truncate">{footer.email}</p>
                      <p className="text-xs text-slate-600">Email</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2 bg-pink-100 rounded-lg mr-2 mt-1">
                      <MapPin className="w-4 h-4 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 line-clamp-2">{footer.address}</p>
                      <p className="text-xs text-slate-600">Address</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleStatus(footer.id)}
                  disabled={uploading}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium disabled:opacity-50 ${
                    footer.status === 'Active'
                      ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                      : 'bg-red-500/20 text-red-700 border border-red-500/30'
                  }`}
                >
                  {footer.status}
                </button>
              </div>

              <div className="flex justify-between border-t border-red-100 pt-3">
                <button
                  onClick={() => handleView(footer)}
                  disabled={uploading}
                  className="flex items-center gap-1 text-red-600 disabled:opacity-50"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View</span>
                </button>
                <button
                  onClick={() => handleEdit(footer)}
                  disabled={uploading}
                  className="flex items-center gap-1 text-red-600 disabled:opacity-50"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(footer)}
                  disabled={uploading}
                  className="flex items-center gap-1 text-rose-600 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FooterMaster;