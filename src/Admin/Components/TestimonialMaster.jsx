import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Edit2, 
  Eye, 
  Plus,
  CheckCircle,
  XCircle,
  User,
  X,
  Save,
  Upload,
  Star,
  MessageSquare,
  Briefcase,
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

// Star rating display component
const StarRating = ({ rating, size = "w-4 h-4" }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`${size} ${
            index < rating 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-gray-400"
          }`}
        />
      ))}
    </div>
  );
};

// Star rating input component for forms
const StarRatingInput = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            className={`w-6 h-6 ${
              star <= value 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-400"
            } hover:text-yellow-300`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-yellow-400">{value} / 5</span>
    </div>
  );
};

function TestimonialMaster() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  
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
  
  // Current testimonial state
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    client_name: '',
    client_designation: '',
    rating: 5,
    client_image: null,
    testimonial_text: '',
    status: 'Active'
  });

  // For previewing uploaded image
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEditFile, setSelectedEditFile] = useState(null);

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

  // Fetch all testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get('/getall__testimonial');
      console.log('API Response:', response.data);
      
      // Handle different response structures
      if (response.data) {
        let testimonialData = [];
        
        if (Array.isArray(response.data)) {
          testimonialData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          testimonialData = response.data.data;
        } else if (response.data.length > 0) {
          testimonialData = response.data;
        }
        
        console.log('Extracted testimonials:', testimonialData);
        
        if (testimonialData.length > 0) {
          // Transform API data to match our component structure
          const transformedData = testimonialData.map(item => ({
            id: item._id || item.id,
            client_name: item.client_name || '',
            client_designation: item.client_designation || '',
            rating: item.rating || 5,
            client_image: item.client_image || '',
            testimonial_text: item.testimonial_text || '',
            status: item.status || 'Active',
            createdAt: item.createdAt || '',
            updatedAt: item.updatedAt || ''
          }));
          
          setTestimonials(transformedData);
        } else {
          console.log('No testimonials found in response');
          setTestimonials([]);
        }
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      showToast('Failed to fetch testimonials', 'error');
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Validate image file type
  const validateImageFile = (file) => {
    if (!file) {
      showToast('Please select an image file', 'error');
      return false;
    }

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

  // Handle view testimonial
  const handleView = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsViewModalOpen(true);
  };

  // Handle edit testimonial
  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      client_designation: testimonial.client_designation,
      rating: testimonial.rating,
      client_image: testimonial.client_image || null,
      testimonial_text: testimonial.testimonial_text,
      status: testimonial.status
    });
    setEditImagePreview(testimonial.client_image);
    setSelectedEditFile(null);
    setIsEditModalOpen(true);
  };

  // Handle delete testimonial
  const handleDelete = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      setUploading(true);
      await httpClient.delete(`/delete__testimonial/${currentTestimonial.id}`);
      
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== currentTestimonial.id));
      setIsDeleteModalOpen(false);
      setCurrentTestimonial(null);
      showToast('Testimonial deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      showToast('Failed to delete testimonial', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Handle status toggle
  const toggleStatus = async (id) => {
    try {
      const testimonialToUpdate = testimonials.find(testimonial => testimonial.id === id);
      if (!testimonialToUpdate) return;

      const newStatus = testimonialToUpdate.status === 'Active' ? 'Inactive' : 'Active';
      
      await httpClient.put(`/update__testimonial/${id}`, {
        client_name: testimonialToUpdate.client_name,
        client_designation: testimonialToUpdate.client_designation,
        rating: testimonialToUpdate.rating,
        client_image: testimonialToUpdate.client_image,
        testimonial_text: testimonialToUpdate.testimonial_text,
        status: newStatus
      });

      setTestimonials(testimonials.map(testimonial => 
        testimonial.id === id 
          ? { ...testimonial, status: newStatus }
          : testimonial
      ));
      showToast(`Status updated to ${newStatus}`, 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status', 'error');
    }
  };

  // Handle add new testimonial
  const handleAddNew = () => {
    setFormData({
      client_name: '',
      client_designation: '',
      rating: 5,
      client_image: null,
      testimonial_text: '',
      status: 'Active'
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

  // Handle textarea change
  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
  };

  // Handle image file upload for Add
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Reset file input to allow selecting same file again
      e.target.value = '';
      
      if (!validateImageFile(file)) {
        return;
      }

      setSelectedFile(file);
      
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

  // Handle image file upload for Edit
  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Reset file input to allow selecting same file again
      e.target.value = '';
      
      if (!validateImageFile(file)) {
        return;
      }

      setSelectedEditFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.onerror = () => {
        showToast('Error reading file', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image for Add
  const removeSelectedImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, client_image: null }));
  };

  // Remove selected image for Edit
  const removeEditImage = () => {
    setSelectedEditFile(null);
    setEditImagePreview(null);
    setFormData(prev => ({ ...prev, client_image: null }));
  };

  // Handle add new testimonial submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.client_name.trim() || !formData.testimonial_text.trim()) {
      showToast('Please enter client name and testimonial text', 'error');
      return;
    }

    try {
      setUploading(true);
      
      let imageUrl = '';
      
      // Upload image if selected
      if (selectedFile) {
        try {
          imageUrl = await uploadImageToServer(selectedFile);
          showToast('Image uploaded successfully!', 'success');
        } catch (error) {
          showToast(error.message || 'Failed to upload image', 'error');
          return;
        }
      }
      
      const response = await httpClient.post('/create__testimonial', {
        client_name: formData.client_name.trim(),
        client_designation: formData.client_designation.trim(),
        rating: parseFloat(formData.rating),
        client_image: imageUrl || '',
        testimonial_text: formData.testimonial_text.trim(),
        status: formData.status
      });

      if (response.data) {
        // Add new testimonial to state
        const newTestimonial = {
          id: response.data._id,
          client_name: response.data.client_name,
          client_designation: response.data.client_designation,
          rating: response.data.rating,
          client_image: response.data.client_image,
          testimonial_text: response.data.testimonial_text,
          status: response.data.status
        };

        setTestimonials([...testimonials, newTestimonial]);
        setIsAddModalOpen(false);
        resetForm();
        showToast('Testimonial added successfully!', 'success');
      }
    } catch (error) {
      console.error('Error adding testimonial:', error);
      showToast('Failed to add testimonial', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Handle edit testimonial submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.client_name.trim() || !formData.testimonial_text.trim()) {
      showToast('Please enter client name and testimonial text', 'error');
      return;
    }

    try {
      setUploading(true);
      
      let imageUrl = editImagePreview || currentTestimonial.client_image;
      
      // Upload new image if selected
      if (selectedEditFile) {
        try {
          imageUrl = await uploadImageToServer(selectedEditFile);
          showToast('Image uploaded successfully!', 'success');
        } catch (error) {
          showToast(error.message || 'Failed to upload image', 'error');
          return;
        }
      }
      
      const response = await httpClient.put(`/update__testimonial/${currentTestimonial.id}`, {
        client_name: formData.client_name.trim(),
        client_designation: formData.client_designation.trim(),
        rating: parseFloat(formData.rating),
        client_image: imageUrl || '',
        testimonial_text: formData.testimonial_text.trim(),
        status: formData.status
      });

      if (response.data) {
        const updatedTestimonial = {
          id: currentTestimonial.id,
          client_name: response.data.client_name,
          client_designation: response.data.client_designation,
          rating: response.data.rating,
          client_image: response.data.client_image,
          testimonial_text: response.data.testimonial_text,
          status: response.data.status
        };

        setTestimonials(testimonials.map(testimonial => 
          testimonial.id === currentTestimonial.id ? updatedTestimonial : testimonial
        ));

        setIsEditModalOpen(false);
        resetForm();
        showToast('Testimonial updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      showToast('Failed to update testimonial', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Reset form state
  const resetForm = () => {
    setCurrentTestimonial(null);
    setFormData({ 
      client_name: '', 
      client_designation: '', 
      rating: 5, 
      client_image: null, 
      testimonial_text: '', 
      status: 'Active' 
    });
    setImagePreview(null);
    setEditImagePreview(null);
    setSelectedFile(null);
    setSelectedEditFile(null);
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
          <p className="text-slate-700">Loading testimonials...</p>
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
          Testimonial Management
        </h1>
        <p className="text-slate-700 mt-2">Manage client testimonials and reviews</p>
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
            <span>{uploading || imageUploading ? 'Processing...' : 'Add New Testimonial'}</span>
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
                  Client
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                  Testimonial
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
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-red-50/30 transition-colors">
                  {/* Client Info with Photo */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      {testimonial.client_image ? (
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            src={testimonial.client_image}
                            alt={testimonial.client_name}
                            className="h-12 w-12 rounded-full object-cover border-2 border-red-300"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiByeD0iNCIgZmlsbD0iI2YlZTZkNCIvPgo8cGF0aCBkPSJNNDAgMzJDMzcuNzkgMzIgMzYgMzAuMjEgMzYgMjhDMzYgMjUuNzkgMzcuNzkgMjQgNDAgMjRDNDIuMjEgMjQgNDQgMjUuNzkgNDQgMjhDNDQgMzAuMjEgNDIuMjEgMzIgNDAgMzJaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik00OCAxOEM0OCAxOS4xMDQ2IDQ3LjEwNDYgMjAgNDYgMjBDNDQuODk1NCAyMCA0NCAxOS4xMDQ2IDQ0IDE4QzQ0IDE2Ljg5NTQgNDQuODk1NCAxNiA0NiAxNkM0Ny4xMDQ2IDE2IDQ4IDE2Ljg5NTQgNDggMThaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik0xNiAyN0MyMC45NzA2IDI3IDI1IDIyLjk3A2IDI1IDE4QzI1IDEzLjAyOTQgMjAuOTcwNiA5IDE2IDlDMTEuMDI5NCA5IDcgMTMuMDI5NCA3IDE4QzcgMjIuOTcwNiAxMS4wMjk0IDI3IDE2IDI3WiIgc3Ryb2tlPSIjZjE0NjZkIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-50 border-2 border-red-300">
                          <User className="w-6 h-6 text-red-400" />
                        </div>
                      )}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-slate-800">{testimonial.client_name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Designation */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center text-sm text-slate-700">
                      <Briefcase className="w-4 h-4 mr-2 text-red-600" />
                      <span className="truncate max-w-[150px]">{testimonial.client_designation}</span>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center">
                      <StarRating rating={testimonial.rating} />
                      <span className="ml-2 text-sm text-red-600">{testimonial.rating.toFixed(1)}</span>
                    </div>
                  </td>

                  {/* Testimonial Text Preview */}
                  <td className="px-4 md:px-6 py-4">
                    <div className="text-sm text-slate-600 max-w-xs line-clamp-2">
                      "{testimonial.testimonial_text}"
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 md:px-6 py-4">
                    <button
                      onClick={() => toggleStatus(testimonial.id)}
                      disabled={uploading || imageUploading}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                        testimonial.status === 'Active'
                          ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30 border border-green-500/30'
                          : 'bg-red-500/20 text-red-700 hover:bg-red-500/30 border border-red-500/30'
                      }`}
                    >
                      {testimonial.status === 'Active' ? (
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
                        onClick={() => handleView(testimonial)}
                        disabled={uploading || imageUploading}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => handleEdit(testimonial)}
                        disabled={uploading || imageUploading}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit Testimonial"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(testimonial)}
                        disabled={uploading || imageUploading}
                        className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Testimonial"
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
        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-red-300 mb-4">
              <MessageSquare className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No testimonials found</h3>
            <p className="text-slate-600">
              Get started by adding your first client testimonial
            </p>
          </div>
        )}
      </div>

      {/* View Modal */}
      {isViewModalOpen && currentTestimonial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-700">Testimonial Details</h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                {currentTestimonial.client_image ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-300 mb-4">
                    <img
                      src={currentTestimonial.client_image}
                      alt={currentTestimonial.client_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiByeD0iNCIgZmlsbD0iI2YlZTZkNCIvPgo8cGF0aCBkPSJNNDAgMzJDMzcuNzkgMzIgMzYgMzAuMjEgMzYgMjhDMzYgMjUuNzkgMzcuNzkgMjQgNDAgMjRDNDIuMjEgMjQgNDQgMjUuNzkgNDQgMjhDNDQgMzAuMjEgNDIuMjEgMzIgNDAgMzJaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik00OCAxOEM0OCAxOS4xMDQ2IDQ3LjEwNDYgMjAgNDYgMjBDNDQuODk1NCAyMCA0NCAxOS4xMDQ2IDQ0IDE4QzQ0IDE2Ljg5NTQgNDQuODk1NCAxNiA0NiAxNkM0Ny4xMDQ2IDE2IDQ4IDE2Ljg5NTQgNDggMThaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik0xNiAyN0MyMC45NzA2IDI3IDI1IDIyLjk3A2IDI1IDE4QzI1IDEzLjAyOTQgMjAuOTcwNiA5IDE2IDlDMTEuMDI5NCA5IDcgMTMuMDI5NCA3IDE4QzcgMjIuOTcwNiAxMS4wMjk0IDI3IDE2IDI3WiIgc3Ryb2tlPSIjZjE0NjZkIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-red-50 border-4 border-red-300 flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-red-400" />
                  </div>
                )}
                <h4 className="text-xl font-bold text-slate-800 text-center">{currentTestimonial.client_name}</h4>
                <p className="text-red-600 text-center">{currentTestimonial.client_designation}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Designation
                  </h4>
                  <p className="text-slate-700">{currentTestimonial.client_designation}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    Rating
                  </h4>
                  <div className="flex items-center">
                    <StarRating rating={currentTestimonial.rating} size="w-5 h-5" />
                    <span className="ml-2 text-lg text-red-600">{currentTestimonial.rating.toFixed(1)}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Testimonial
                  </h4>
                  <p className="text-slate-700 whitespace-pre-wrap bg-red-50 p-3 rounded-lg border border-red-100">
                    "{currentTestimonial.testimonial_text}"
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">Status</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    currentTestimonial.status === 'Active'
                      ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                      : 'bg-red-500/20 text-red-700 border border-red-500/30'
                  }`}>
                    {currentTestimonial.status === 'Active' ? (
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

      {/* Add Testimonial Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-red-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-red-700">Add New Testimonial</h3>
              <button
                onClick={closeAllModals}
                disabled={uploading || imageUploading}
                className="text-slate-500 hover:text-red-600 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter client name"
                    required
                    disabled={uploading || imageUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Client Designation
                  </label>
                  <input
                    type="text"
                    name="client_designation"
                    value={formData.client_designation}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter client designation"
                    disabled={uploading || imageUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Rating
                  </label>
                  <StarRatingInput 
                    value={formData.rating} 
                    onChange={handleRatingChange} 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Client Photo
                  </label>
                  <div className="mt-1">
                    {/* File Upload */}
                    <div className="flex items-center justify-center w-full">
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${uploading || imageUploading ? 'bg-red-50 cursor-not-allowed border-red-300' : 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300'} transition-all`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {imageUploading ? (
                            <Loader2 className="w-8 h-8 mb-2 text-red-600 animate-spin" />
                          ) : (
                            <Upload className="w-8 h-8 mb-2 text-red-600" />
                          )}
                          <p className="mb-1 text-sm text-red-600">
                            {imageUploading ? 'Uploading image...' : 'Click to upload photo'}
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
                        <div className="relative w-32 h-32 mx-auto">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-full border-4 border-red-300"
                          />
                          <button
                            type="button"
                            onClick={removeSelectedImage}
                            disabled={uploading || imageUploading}
                            className="absolute top-1 right-1 bg-gradient-to-r from-red-700 to-rose-600 text-white p-2 rounded-full shadow-md hover:from-red-600 hover:to-rose-500 disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {selectedFile && (
                            <div className="absolute bottom-1 left-1 bg-gradient-to-r from-red-700 to-rose-600 text-white text-xs px-2 py-1 rounded">
                              {selectedFile.name}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Testimonial Text *
                  </label>
                  <textarea
                    name="testimonial_text"
                    value={formData.testimonial_text}
                    onChange={handleTextareaChange}
                    rows="4"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter client testimonial..."
                    required
                    disabled={uploading || imageUploading}
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
                    disabled={uploading || imageUploading}
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
                      Add Testimonial
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Testimonial Modal */}
      {isEditModalOpen && currentTestimonial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-red-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-red-700">Edit Testimonial</h3>
              <button
                onClick={closeAllModals}
                disabled={uploading || imageUploading}
                className="text-slate-500 hover:text-red-600 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter client name"
                    required
                    disabled={uploading || imageUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Client Designation
                  </label>
                  <input
                    type="text"
                    name="client_designation"
                    value={formData.client_designation}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter client designation"
                    disabled={uploading || imageUploading}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Rating
                  </label>
                  <StarRatingInput 
                    value={formData.rating} 
                    onChange={handleRatingChange} 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Client Photo
                  </label>
                  
                  {/* Current Image */}
                  {editImagePreview && !selectedEditFile && (
                    <div className="mb-4">
                      <p className="text-sm text-red-600 mb-2">Current Photo:</p>
                      <div className="relative w-32 h-32 mx-auto">
                        <img
                          src={editImagePreview}
                          alt="Current"
                          className="w-full h-full object-cover rounded-full border-4 border-red-300"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* File Upload */}
                  <div className="mt-1">
                    <div className="flex items-center justify-center w-full">
                      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${uploading || imageUploading ? 'bg-red-50 cursor-not-allowed border-red-300' : 'bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300'} transition-all`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {imageUploading ? (
                            <Loader2 className="w-8 h-8 mb-2 text-red-600 animate-spin" />
                          ) : (
                            <Upload className="w-8 h-8 mb-2 text-red-600" />
                          )}
                          <p className="mb-1 text-sm text-red-600">
                            {imageUploading ? 'Uploading image...' : 'Click to upload new photo'}
                          </p>
                          <p className="text-xs text-slate-500">JPEG, PNG, GIF, WebP</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept=".jpg,.jpeg,.png,.gif,.webp,image/jpeg,image/png,image/gif,image/webp"
                          onChange={handleEditImageUpload}
                          disabled={uploading || imageUploading}
                        />
                      </label>
                    </div>
                    
                    {/* New Image Preview */}
                    {selectedEditFile && editImagePreview && (
                      <div className="mt-4">
                        <p className="text-sm text-red-600 mb-2">New Photo Preview:</p>
                        <div className="relative w-32 h-32 mx-auto">
                          <img
                            src={editImagePreview}
                            alt="New Preview"
                            className="w-full h-full object-cover rounded-full border-4 border-red-300"
                          />
                          <button
                            type="button"
                            onClick={removeEditImage}
                            disabled={uploading || imageUploading}
                            className="absolute top-1 right-1 bg-gradient-to-r from-red-700 to-rose-600 text-white p-2 rounded-full shadow-md hover:from-red-600 hover:to-rose-500 disabled:opacity-50"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Testimonial Text *
                  </label>
                  <textarea
                    name="testimonial_text"
                    value={formData.testimonial_text}
                    onChange={handleTextareaChange}
                    rows="4"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter client testimonial..."
                    required
                    disabled={uploading || imageUploading}
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
                    disabled={uploading || imageUploading}
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
                      Update Testimonial
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentTestimonial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-rose-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-rose-100">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                Delete Testimonial
              </h3>
              
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-red-700">"{currentTestimonial.client_name}"</span> testimonial? This action cannot be undone.
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
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-700 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading || imageUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete Testimonial'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Cards View (for small screens) */}
      <div className="md:hidden mt-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl shadow p-4 mb-4 border-2 border-red-100">
            <div className="flex items-start gap-4 mb-3">
              {testimonial.client_image ? (
                <div className="flex-shrink-0 h-16 w-16">
                  <img
                    src={testimonial.client_image}
                    alt={testimonial.client_name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-red-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA4MCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ4IiByeD0iNCIgZmlsbD0iI2YlZTZkNCIvPgo8cGF0aCBkPSJNNDAgMzJDMzcuNzkgMzIgMzYgMzAuMjEgMzYgMjhDMzYgMjUuNzkgMzcuNzkgMjQgNDAgMjRDNDIuMjEgMjQgNDQgMjUuNzkgNDQgMjhDNDQgMzAuMjEgNDIuMjEgMzIgNDAgMzJaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik00OCAxOEM0OCAxOS4xMDQ2IDQ3LjEwNDYgMjAgNDYgMjBDNDQuODk1NCAyMCA0NCAxOS4xMDQ2IDQ0IDE4QzQ0IDE2Ljg5NTQgNDQuODk1NCAxNiA0NiAxNkM0Ny4xMDQ2IDE2IDQ4IDE2Ljg5NTQgNDggMThaIiBmaWxsPSIjZjE0NjZkIi8+CjxwYXRoIGQ9Ik0xNiAyN0MyMC45NzA2IDI3IDI1IDIyLjk3A2IDI1IDE4QzI1IDEzLjAyOTQgMjAuOTcwNiA5IDE2IDlDMTEuMDI5NCA5IDcgMTMuMDI5NCA3IDE4QzcgMjIuOTcwNiAxMS4wMjk0IDI3IDE2IDI3WiIgc3Ryb2tlPSIjZjE0NjZkIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==';
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-50 border-2 border-red-300">
                  <User className="w-8 h-8 text-red-400" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-slate-800">{testimonial.client_name}</h3>
                    <p className="text-sm text-red-600">{testimonial.client_designation}</p>
                  </div>
                  <button
                    onClick={() => toggleStatus(testimonial.id)}
                    disabled={uploading || imageUploading}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium disabled:opacity-50 ${
                      testimonial.status === 'Active'
                        ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                        : 'bg-red-500/20 text-red-700 border border-red-500/30'
                    }`}
                  >
                    {testimonial.status}
                  </button>
                </div>
                
                <div className="mt-2 flex items-center">
                  <StarRating rating={testimonial.rating} />
                  <span className="ml-2 text-sm text-red-600">{testimonial.rating.toFixed(1)}</span>
                </div>
                
                <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                  "{testimonial.testimonial_text}"
                </p>
              </div>
            </div>

            <div className="flex justify-between border-t border-red-100 pt-3">
              <button
                onClick={() => handleView(testimonial)}
                disabled={uploading || imageUploading}
                className="flex items-center gap-1 text-red-600 disabled:opacity-50"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">View</span>
              </button>
              <button
                onClick={() => handleEdit(testimonial)}
                disabled={uploading || imageUploading}
                className="flex items-center gap-1 text-red-600 disabled:opacity-50"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(testimonial)}
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

export default TestimonialMaster;