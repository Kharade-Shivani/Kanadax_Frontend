import React, { useState, useEffect } from 'react';
import httpClient from '../../Api/axios';
import {
  FaBriefcase,
  FaSpinner,
  FaExclamationTriangle,
  FaUserFriends,
  FaTimes,
  FaGraduationCap,
  FaStar,
  FaCheck,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaExternalLinkAlt
} from 'react-icons/fa';

function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get('/getall__team');

      let members = [];

      if (Array.isArray(response.data)) {
        members = response.data;
      } else if (response.data && typeof response.data === 'object') {
        if (Array.isArray(response.data.data)) {
          members = response.data.data;
        } else if (Array.isArray(response.data.teams)) {
          members = response.data.teams;
        } else if (Array.isArray(response.data.items)) {
          members = response.data.items;
        } else if (response.data._id) {
          members = [response.data];
        } else {
          members = Object.values(response.data).filter(item =>
            item && typeof item === 'object' && item.teamname
          );
        }
      }

      if (!Array.isArray(members)) {
        members = [];
      }

      setTeamMembers(members);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch team members: ${err.message || 'Please try again later.'}`);
      console.error('Error fetching team:', err);
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  // Loading skeleton component
  const LoadingSkeleton = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="bg-white border border-gray-200 rounded-2xl overflow-hidden animate-pulse">
            <div className="bg-gray-200 h-72 w-full"></div>
            <div className="p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 py-12 px-4 md:px-8 font-poppins">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-3xl font-bold mb-6">
              <span className="text-gray-900">Meet Our</span>{' '}
              <span className="text-red-600">Experts</span>
            </h1>
            <p className="text-xl text-gray-600">Loading our amazing team...</p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-poppins">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-red-600 text-4xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h2>
          <p className="text-xl text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchTeamMembers}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const membersArray = Array.isArray(teamMembers) ? teamMembers : [];

  // Filter out inactive members
  const activeMembersArray = membersArray.filter(member =>
    member?.status === "Active" || member?.status === "active"
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-poppins">
      <img
        src="/copy3.jpg"
        alt="ourteam"
        className="w-full h-auto object-cover"
      />

      {/* Compact Modal Popup */}
      {isModalOpen && selectedMember && (
        <div
          id="modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm transition-all duration-200 animate-fadeIn"
          onClick={handleBackdropClick}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-800 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Modal Content */}
              <div className="p-0">
                {/* Compact Header with Gradient */}
                <div className="relative h-32 sm:h-40 w-full bg-gradient-to-r from-red-600 to-red-800 rounded-t-xl">
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Member Image - Responsive */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-white shadow-lg">
                        <img
                          src={selectedMember?.teamphoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember?.teamname || 'Team Member')}&background=fff&color=ff4444&size=200`}
                          alt={selectedMember?.teamname}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember?.teamname || 'Team Member')}&background=fff&color=ff4444&size=200`;
                          }}
                        />
                      </div>
                      
                      {/* Name and Designation */}
                      <div className="text-white flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold mb-1 truncate">
                          {selectedMember?.teamname || 'Unknown Member'}
                        </h2>
                        <div className="flex items-center gap-1 sm:gap-2 mb-2">
                          <FaBriefcase className="w-3 h-3 sm:w-4 sm:h-4 text-red-200 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-red-100 truncate">
                            {selectedMember?.teamdesignation || 'Not Specified'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Details Section */}
                <div className="p-3 sm:p-5">
                  {/* About Section */}
                  <div className="mb-4 sm:mb-5">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-red-100 flex items-center justify-center flex-shrink-0">
                        <FaStar className="w-3 h-3 text-red-600" />
                      </div>
                      About
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {selectedMember?.teamdescription || 'No description available.'}
                    </p>
                  </div>

                  {/* Compact Information Grid */}
                  <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-5">
                    {/* Education */}
                    {selectedMember?.teameducation && (
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                          <FaGraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                          Education
                        </h4>
                        <p className="text-gray-700 text-xs sm:text-sm">{selectedMember.teameducation}</p>
                      </div>
                    )}

                    {/* Specialization */}
                    {selectedMember?.teamspecialization && (
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                          <FaCheck className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                          Specialization
                        </h4>
                        <p className="text-gray-700 text-xs sm:text-sm">{selectedMember.teamspecialization}</p>
                      </div>
                    )}
                  </div>

                  {/* Compact Contact Info */}
                  {(selectedMember?.teamemail || selectedMember?.teamphone) && (
                    <div className="mb-4 sm:mb-5">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Contact</h4>
                      <div className="space-y-2">
                        {selectedMember?.teamemail && (
                          <div className="flex items-center gap-2 sm:gap-3 p-2 bg-red-50 rounded-lg">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                              <FaEnvelope className="w-2 h-2 sm:w-3 sm:h-3 text-red-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                {selectedMember.teamemail}
                              </p>
                            </div>
                          </div>
                        )}
                        {selectedMember?.teamphone && (
                          <div className="flex items-center gap-2 sm:gap-3 p-2 bg-red-50 rounded-lg">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                              <FaPhone className="w-2 h-2 sm:w-3 sm:h-3 text-red-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                {selectedMember.teamphone}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Skills/Expertise */}
                  {selectedMember?.teamskills && (
                    <div className="mb-4 sm:mb-5">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">Skills & Expertise</h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {Array.isArray(selectedMember.teamskills) ? (
                          selectedMember.teamskills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            {selectedMember.teamskills}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* LinkedIn Link at Bottom (Only Once) */}
                  {selectedMember?.teamLinkedIn && (
                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-center">
                        <a
                          href={selectedMember.teamLinkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 sm:gap-2 text-[#0077B5] hover:text-[#006097] transition-colors duration-200 text-xs sm:text-sm font-medium"
                        >
                          <FaLinkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Connect on LinkedIn</span>
                          <FaExternalLinkAlt className="w-2 h-2 sm:w-3 sm:h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Grid */}
      <section className="py-12 px-4 md:px-8 font-poppins">
        <div className="max-w-7xl mx-auto">
          {activeMembersArray.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 max-w-md mx-auto shadow-lg">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <FaUserFriends className="text-gray-400 text-4xl" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {membersArray.length === 0 ? 'No Team Members Found' : 'No Active Team Members Found'}
                </h3>
                <p className="text-xl text-gray-600 mb-6">
                  {membersArray.length === 0
                    ? 'Add team members to see them displayed here.'
                    : 'All team members are currently inactive or no active members available.'}
                </p>
                <button
                  onClick={fetchTeamMembers}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Refresh
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeMembersArray.map((member) => (
                <div
                  key={member?._id || Math.random()}
                  onClick={() => handleMemberClick(member)}
                  className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  {/* Fixed Photo Container with Overlapped Text */}
                  <div className="relative w-full h-72">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white"></div>
                    <img
                      src={member?.teamphoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(member?.teamname || 'Team Member')}&background=ff4444&color=fff&size=400`}
                      alt={member?.teamname || 'Team Member'}
                      className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member?.teamname || 'Team Member')}&background=ff4444&color=fff&size=400`;
                      }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Name and Designation Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-2">
                        <h3 className="text-2xl font-bold text-white mb-1 leading-tight">
                          {member?.teamname || 'Unknown Member'}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-red-600/30 flex items-center justify-center">
                            <FaBriefcase className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-red-300 font-medium text-lg">
                            {member?.teamdesignation || 'Not Specified'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Click Hint Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View Profile
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 10. FINAL CTA ===== */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[30px] font-bold mb-4 md:mb-6 px-4">
            Technology Is Everywhere. <span className="text-red-400">Ownership Is Rare</span>.
          </h2>
          <p className="text-lg sm:text-xl md:text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Partner with a team that stays accountable from start to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2
                         bg-red-600 text-white
                         px-4 py-2 md:px-6 md:py-3
                         rounded-full
                         font-semibold text-sm md:text-base
                         shadow-sm shadow-red-600/20
                         hover:bg-red-700
                         transition-all duration-300"
            >
              Let's Talk
              {/* Arrow appears on hover */}
              <svg
                className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-1
                           group-hover:opacity-100 group-hover:translate-x-0
                           transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
          <p className="mt-8 md:mt-10 text-gray-400 text-sm sm:text-base px-4 md:px-0">
            No bots. No runaround. Just real conversations with accountable partners.
          </p>
        </div>
      </section>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Team;