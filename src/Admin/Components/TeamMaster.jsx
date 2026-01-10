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
  Briefcase,
  Award,
  FileText,
  Check,
  AlertCircle,
  X as XIcon,
  Loader2,
  Linkedin
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

function TeamMaster() {
  const [teamMembers, setTeamMembers] = useState([]);
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
  
  // Current team member state
  const [currentMember, setCurrentMember] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    teamname: '',
    teamphoto: null,
    teamdesignation: '',
    teamexperience: '',
    teamdescription: '',
    teamLinkedIn: '',
    status: 'Active'
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

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Fetch all team members
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get('/getall__team');
      
      console.log('API Response:', response.data); // Debug log
      
      // Handle different response structures
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        // Response has { data: [...] } structure
        const formattedMembers = response.data.data.map(member => ({
          id: member._id,
          name: member.teamname,
          photo: member.teamphoto,
          designation: member.teamdesignation,
          experience: member.teamexperience,
          description: member.teamdescription,
          linkedin: member.teamLinkedIn || '',
          status: member.status || 'Active'
        }));
        console.log('Formatted members:', formattedMembers); // Debug log
        setTeamMembers(formattedMembers);
      } else if (Array.isArray(response.data)) {
        // Response is already an array
        const formattedMembers = response.data.map(member => ({
          id: member._id,
          name: member.teamname,
          photo: member.teamphoto,
          designation: member.teamdesignation,
          experience: member.teamexperience,
          description: member.teamdescription,
          linkedin: member.teamLinkedIn || '',
          status: member.status || 'Active'
        }));
        console.log('Formatted members:', formattedMembers); // Debug log
        setTeamMembers(formattedMembers);
      } else {
        console.log('Unexpected response structure:', response.data);
        setTeamMembers([]);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      showToast('Failed to fetch team members', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle view team member
  const handleView = (member) => {
    setCurrentMember(member);
    setIsViewModalOpen(true);
  };

  // Handle edit team member
  const handleEdit = (member) => {
    console.log('Editing member:', member); // Debug log
    setCurrentMember(member);
    setFormData({
      teamname: member.name,
      teamphoto: member.photo,
      teamdesignation: member.designation,
      teamexperience: member.experience,
      teamdescription: member.description,
      teamLinkedIn: member.linkedin || '',
      status: member.status
    });
    setEditImagePreview(member.photo);
    setSelectedEditFile(null);
    setIsEditModalOpen(true);
  };

  // Handle delete team member
  const handleDelete = (member) => {
    setCurrentMember(member);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await httpClient.delete(`/delete__team/${currentMember.id}`);
      setTeamMembers(teamMembers.filter(member => member.id !== currentMember.id));
      setIsDeleteModalOpen(false);
      setCurrentMember(null);
      showToast('Team member deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting team member:', error);
      showToast('Failed to delete team member', 'error');
    }
  };

  // Handle status toggle
  const toggleStatus = async (id) => {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;

    const newStatus = member.status === 'Active' ? 'Inactive' : 'Active';
    
    try {
      const updateData = {
        teamname: member.name,
        teamphoto: member.photo,
        teamdesignation: member.designation,
        teamexperience: member.experience,
        teamdescription: member.description,
        teamLinkedIn: member.linkedin || '', // Fixed: Changed from linkedin to teamLinkedIn
        status: newStatus
      };
      
      console.log('Updating status with data:', updateData); // Debug log
      
      const response = await httpClient.put(`/update__team/${id}`, updateData);
      console.log('Status update response:', response.data); // Debug log
      
      setTeamMembers(teamMembers.map(member => 
        member.id === id 
          ? { ...member, status: newStatus }
          : member
      ));
      showToast(`Status updated to ${newStatus}`, 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status', 'error');
    }
  };

  // Handle add new team member
  const handleAddNew = () => {
    setFormData({
      teamname: '',
      teamphoto: null,
      teamdesignation: '',
      teamexperience: '',
      teamdescription: '',
      teamLinkedIn: '',
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
  if (formData.teamname.trim() === '' || formData.teamdesignation.trim() === '') {
    showToast('Please fill in all required fields', 'error');
    return;
  }

  try {
    let imageUrl = formData.teamphoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop";
    
    // Upload image if a new file is selected
    if (selectedFile) {
      setUploadingImage(true);
      try {
        imageUrl = await uploadImageToServer(selectedFile);
        showToast('Image uploaded successfully', 'success');
      } catch (uploadError) {
        showToast('Failed to upload image. Using default image.', 'error');
        // Continue with default image
      } finally {
        setUploadingImage(false);
      }
    }

    console.log('Sending add request with data:', {
      teamname: formData.teamname.trim(),
      teamphoto: imageUrl,
      teamdesignation: formData.teamdesignation.trim(),
      teamexperience: formData.teamexperience.trim(),
      teamdescription: formData.teamdescription.trim(),
      teamLinkedIn: formData.teamLinkedIn.trim(),
      status: formData.status
    });

    const response = await httpClient.post('/create__team', {
      teamname: formData.teamname.trim(),
      teamphoto: imageUrl,
      teamdesignation: formData.teamdesignation.trim(),
      teamexperience: formData.teamexperience.trim(),
      teamdescription: formData.teamdescription.trim(),
      teamLinkedIn: formData.teamLinkedIn.trim(),
      status: formData.status
    });

    console.log('Add Response:', response.data);
    
    if (response.data) {
      // Handle different response structures
      const responseData = response.data.data || response.data;
      console.log('Response data for new member:', responseData);
      
      const newMember = {
        id: responseData._id,
        name: responseData.teamname,
        photo: responseData.teamphoto,
        designation: responseData.teamdesignation,
        experience: responseData.teamexperience,
        description: responseData.teamdescription,
        linkedin: responseData.teamLinkedIn || '',
        status: responseData.status || 'Active'
      };

      console.log('New member object:', newMember);
      
      
      setTeamMembers([...teamMembers, newMember]);
      setIsAddModalOpen(false);
      setFormData({ 
        teamname: '', 
        teamphoto: null, 
        teamdesignation: '', 
        teamexperience: '', 
        teamdescription: '', 
        teamLinkedIn: '',
        status: 'Active' 
      });
      setImagePreview(null);
      setSelectedFile(null);
      showToast('Team member added successfully', 'success');
      
      // Refresh the list
      fetchTeamMembers();
    }
  } catch (error) {
    console.error('Error adding team member:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
    showToast('Failed to add team member', 'error');
  }
};

  // Handle form submit for Edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (formData.teamname.trim() === '' || formData.teamdesignation.trim() === '') {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      let imageUrl = formData.teamphoto || editImagePreview || currentMember.photo;
      
      // Upload new image if a new file is selected
      if (selectedEditFile) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadImageToServer(selectedEditFile);
          showToast('Image uploaded successfully', 'success');
        } catch (uploadError) {
          showToast('Failed to upload image. Keeping existing image.', 'error');
          // Keep existing image URL
          imageUrl = editImagePreview || currentMember.photo;
        } finally {
          setUploadingImage(false);
        }
      }

      console.log('Sending edit request for ID:', currentMember.id);
      console.log('Edit request data:', {
        teamname: formData.teamname.trim(),
        teamphoto: imageUrl,
        teamdesignation: formData.teamdesignation.trim(),
        teamexperience: formData.teamexperience.trim(),
        teamdescription: formData.teamdescription.trim(),
        teamLinkedIn: formData.teamLinkedIn.trim(),
        status: formData.status
      });

      const response = await httpClient.put(`/update__team/${currentMember.id}`, {
        teamname: formData.teamname.trim(),
        teamphoto: imageUrl,
        teamdesignation: formData.teamdesignation.trim(),
        teamexperience: formData.teamexperience.trim(),
        teamdescription: formData.teamdescription.trim(),
        teamLinkedIn: formData.teamLinkedIn.trim(),
        status: formData.status
      });

      console.log('Edit Response:', response.data);
      
      if (response.data) {
        // Handle different response structures
        const responseData = response.data.data || response.data;
        console.log('Response data after edit:', responseData);
        
        const updatedMember = {
          id: currentMember.id,
          name: responseData.teamname,
          photo: responseData.teamphoto,
          designation: responseData.teamdesignation,
          experience: responseData.teamexperience,
          description: responseData.teamdescription,
          linkedin: responseData.teamLinkedIn || '',
          status: responseData.status || 'Active'
        };

        console.log('Updated member object:', updatedMember);

        setTeamMembers(teamMembers.map(member => 
          member.id === currentMember.id ? updatedMember : member
        ));

        setIsEditModalOpen(false);
        setCurrentMember(null);
        setFormData({ 
          teamname: '', 
          teamphoto: null, 
          teamdesignation: '', 
          teamexperience: '', 
          teamdescription: '', 
          teamLinkedIn: '',
          status: 'Active' 
        });
        setEditImagePreview(null);
        setSelectedEditFile(null);
        showToast('Team member updated successfully', 'success');
        
        // Refresh the list
        fetchTeamMembers();
      }
    } catch (error) {
      console.error('Error updating team member:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      showToast('Failed to update team member', 'error');
    }
  };

  // Close all modals
  const closeAllModals = () => {
    setIsViewModalOpen(false);
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setCurrentMember(null);
    setFormData({ 
      teamname: '', 
      teamphoto: null, 
      teamdesignation: '', 
      teamexperience: '', 
      teamdescription: '', 
      teamLinkedIn: '',
      status: 'Active' 
    });
    setImagePreview(null);
    setEditImagePreview(null);
    setSelectedFile(null);
    setSelectedEditFile(null);
    setUploadingImage(false);
  };

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
          Team Master
        </h1>
        <p className="text-slate-700 mt-2">Manage your team members and their details</p>
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
            <span>Add New Team Member</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-700">Loading team members...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-red-100">
            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-red-100">
                <thead className="bg-gradient-to-r from-red-50 to-rose-50">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Photo
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Team Member
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">
                      LinkedIn
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
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-red-50/30 transition-colors">
                      {/* Photo */}
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center">
                          {member.photo ? (
                            <div className="flex-shrink-0 h-12 w-12">
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="h-12 w-12 rounded-full object-cover border-2 border-red-200"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200">
                              <User className="w-6 h-6 text-red-400" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Team Member Details */}
                      <td className="px-4 md:px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-slate-800">{member.name}</div>
                          <div className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {member.description}
                          </div>
                        </div>
                      </td>

                      {/* Designation */}
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center text-sm text-slate-800">
                          <Briefcase className="w-4 h-4 mr-2 text-red-600" />
                          {member.designation}
                        </div>
                      </td>

                      {/* Experience */}
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center text-sm text-slate-800">
                          <Award className="w-4 h-4 mr-2 text-red-600" />
                          {member.experience}
                        </div>
                      </td>

                      {/* LinkedIn */}
                      <td className="px-4 md:px-6 py-4">
                        {member.linkedin ? (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Linkedin className="w-4 h-4 mr-2" />
                            <span className="truncate max-w-[150px]">Profile</span>
                          </a>
                        ) : (
                          <span className="text-sm text-slate-500 flex items-center">
                            <Linkedin className="w-4 h-4 mr-2" />
                            Not provided
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-4 md:px-6 py-4">
                        <button
                          onClick={() => toggleStatus(member.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            member.status === 'Active'
                              ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30 border border-green-500/30'
                              : 'bg-red-500/20 text-red-700 hover:bg-red-500/30 border border-red-500/30'
                          }`}
                        >
                          {member.status === 'Active' ? (
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
                            onClick={() => handleView(member)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Edit Team Member"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(member)}
                            className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-200"
                            title="Delete Team Member"
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
            {teamMembers.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-red-300 mb-4">
                  <User className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 mb-2">No team members found</h3>
                <p className="text-slate-600">
                  Get started by adding your first team member
                </p>
              </div>
            )}
          </div>

          {/* Mobile Cards View (for small screens) */}
          <div className="md:hidden mt-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow p-4 mb-4 border-2 border-red-100">
                <div className="flex items-start gap-4 mb-3">
                  {member.photo ? (
                    <div className="flex-shrink-0 h-16 w-16">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-16 w-16 rounded-full object-cover border-2 border-red-200"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200">
                      <User className="w-8 h-8 text-red-400" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-slate-800">{member.name}</h3>
                        <p className="text-sm text-red-600">{member.designation}</p>
                      </div>
                      <button
                        onClick={() => toggleStatus(member.id)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === 'Active'
                            ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                            : 'bg-red-500/20 text-red-700 border border-red-500/30'
                        }`}
                      >
                        {member.status}
                      </button>
                    </div>
                    
                    <div className="mt-2 flex items-center text-sm text-slate-700">
                      <Award className="w-4 h-4 mr-1 text-red-600" />
                      {member.experience}
                    </div>
                    
                    {member.linkedin && (
                      <div className="mt-2">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin className="w-4 h-4 mr-1" />
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                    
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                      {member.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between border-t border-red-100 pt-3">
                  <button
                    onClick={() => handleView(member)}
                    className="flex items-center gap-1 text-red-600"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">View</span>
                  </button>
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex items-center gap-1 text-red-600"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(member)}
                    className="flex items-center gap-1 text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* View Modal */}
      {isViewModalOpen && currentMember && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200">
            <div className="flex justify-between items-center p-4 border-b border-red-100">
              <h3 className="text-lg font-semibold text-red-700">Team Member Details</h3>
              <button
                onClick={closeAllModals}
                className="text-slate-500 hover:text-red-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                {currentMember.photo ? (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-200 mb-4">
                    <img
                      src={currentMember.photo}
                      alt={currentMember.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-red-50 to-rose-50 border-4 border-red-200 flex items-center justify-center mb-4">
                    <User className="w-16 h-16 text-red-400" />
                  </div>
                )}
                <h4 className="text-xl font-bold text-slate-800">{currentMember.name}</h4>
                <p className="text-red-600">{currentMember.designation}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Designation
                  </h4>
                  <p className="text-slate-800">{currentMember.designation}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Experience
                  </h4>
                  <p className="text-slate-800">{currentMember.experience}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn Profile
                  </h4>
                  {currentMember.linkedin ? (
                    <a
                      href={currentMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 break-all"
                    >
                      {currentMember.linkedin}
                    </a>
                  ) : (
                    <p className="text-slate-500">Not provided</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Description
                  </h4>
                  <p className="text-slate-800 whitespace-pre-wrap">{currentMember.description}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-red-600 mb-2">Status</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    currentMember.status === 'Active'
                      ? 'bg-green-500/20 text-green-700 border border-green-500/30'
                      : 'bg-red-500/20 text-red-700 border border-red-500/30'
                  }`}>
                    {currentMember.status === 'Active' ? (
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

      {/* Add Team Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-red-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-red-700">Add New Team Member</h3>
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
                    Team Member Name *
                  </label>
                  <input
                    type="text"
                    name="teamname"
                    value={formData.teamname}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter team member name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Photo
                  </label>
                  <div className="mt-1">
                    {/* File Upload */}
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-red-600" />
                          <p className="mb-1 text-sm text-red-600">Click to upload photo</p>
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
                        <div className="relative w-32 h-32 mx-auto">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-full border-4 border-red-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setSelectedFile(null);
                              setFormData(prev => ({ ...prev, teamphoto: null }));
                            }}
                            className="absolute top-1 right-1 bg-gradient-to-r from-red-700 to-rose-600 text-white p-1 rounded-full shadow-md hover:from-red-600 hover:to-rose-500"
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
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="teamdesignation"
                    value={formData.teamdesignation}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter designation"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="teamexperience"
                    value={formData.teamexperience}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="e.g., 5 Years"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="teamLinkedIn"
                    value={formData.teamLinkedIn}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="https://www.linkedin.com/in/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Description
                  </label>
                  <textarea
                    name="teamdescription"
                    value={formData.teamdescription}
                    onChange={handleTextareaChange}
                    rows="3"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter team member description"
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
                      Add Team Member
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Team Member Modal */}
      {isEditModalOpen && currentMember && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-red-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b border-red-100 sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-red-700">Edit Team Member</h3>
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
                    Team Member Name *
                  </label>
                  <input
                    type="text"
                    name="teamname"
                    value={formData.teamname}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter team member name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Photo
                  </label>
                  
                  {/* Current Image */}
                  {editImagePreview && !selectedEditFile && (
                    <div className="mb-4">
                      <p className="text-sm text-red-600 mb-2">Current Photo:</p>
                      <div className="relative w-32 h-32 mx-auto">
                        <img
                          src={editImagePreview}
                          alt="Current"
                          className="w-full h-full object-cover rounded-full border-4 border-red-200"
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
                          <p className="mb-1 text-sm text-red-600">Click to upload new photo</p>
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
                        <p className="text-sm text-red-600 mb-2">New Photo Preview:</p>
                        <div className="relative w-32 h-32 mx-auto">
                          <img
                            src={editImagePreview}
                            alt="New Preview"
                            className="w-full h-full object-cover rounded-full border-4 border-red-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setEditImagePreview(currentMember.photo);
                              setSelectedEditFile(null);
                            }}
                            className="absolute top-1 right-1 bg-gradient-to-r from-red-700 to-rose-600 text-white p-1 rounded-full shadow-md hover:from-red-600 hover:to-rose-500"
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
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="teamdesignation"
                    value={formData.teamdesignation}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter designation"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="teamexperience"
                    value={formData.teamexperience}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="e.g., 5 Years"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="teamLinkedIn"
                    value={formData.teamLinkedIn}
                    onChange={handleInputChange}
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="https://www.linkedin.com/in/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-red-600 mb-2">
                    Description
                  </label>
                  <textarea
                    name="teamdescription"
                    value={formData.teamdescription}
                    onChange={handleTextareaChange}
                    rows="3"
                    className="w-full bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none transition-all"
                    placeholder="Enter team member description"
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
                      Update Team Member
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentMember && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border-2 border-rose-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-rose-100">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-800 text-center mb-2">
                Delete Team Member
              </h3>
              
              <p className="text-slate-600 text-center mb-6">
                Are you sure you want to delete <span className="font-medium text-red-700">"{currentMember.name}"</span>? This action cannot be undone.
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
                  Delete Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamMaster;