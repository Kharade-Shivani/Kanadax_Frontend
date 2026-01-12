import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalEnquiryIcon = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showAutoPopup, setShowAutoPopup] = useState(false);
  const [isAutoPopupClosed, setIsAutoPopupClosed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  // Service options
  const serviceOptions = [
    'Generative AI Solutions',
    'Web Development',
    'Cloud Solutions',
    'Mobile App Development',
    'Database Management',
    'Digital Marketing',
    'Cybersecurity',
    'DevOps Services',
    'Other'
  ];

  // REMOVED: Auto popup on page load
  // Commented out or removed the useEffect that shows auto popup
  /*
  useEffect(() => {
    const wasClosed = localStorage.getItem('autoPopupClosed');
    if (wasClosed !== 'true') {
      const timer = setTimeout(() => {
        setShowAutoPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);
  */

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleCloseForm();
      }
    };

    if (showEnquiryForm || showAutoPopup) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [showEnquiryForm, showAutoPopup]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      console.log('📧 Global Enquiry Form Submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We\'ll contact you within 24 hours.'
      });
      
      setFormData({
        name: '', email: '', company: '', phone: '', service: '', message: ''
      });
      
      setTimeout(() => {
        handleCloseForm();
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle enquiry click
  const handleEnquiryClick = () => {
    setShowEnquiryForm(true);
    setShowAutoPopup(false);
  };

  // Handle close form
  const handleCloseForm = () => {
    if (!isSubmitting) {
      setShowEnquiryForm(false);
      setShowAutoPopup(false);
    }
  };

  // Handle close auto popup (kept for consistency but won't be used)
  const handleCloseAutoPopup = () => {
    setShowAutoPopup(false);
    setIsAutoPopupClosed(true);
    localStorage.setItem('autoPopupClosed', 'true');
  };

  // Render enquiry form
  const renderEnquiryForm = (isAutoPopup = false) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-3 bg-black/60 backdrop-blur-sm"
      onClick={isAutoPopup ? handleCloseAutoPopup : handleCloseForm}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
        ref={formRef}
      >
        <div className="bg-gradient-to-br from-white via-white to-red-50 rounded-xl shadow-xl overflow-hidden border border-gray-200 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {isAutoPopup ? 'Welcome to KANDAX!' : 'Get Your Free Consultation'}
                </h3>
                <p className="text-red-100 text-sm mt-0.5">
                  {isAutoPopup 
                    ? 'Let\'s discuss your technology needs' 
                    : 'Let\'s discuss how we can help your business grow'}
                </p>
              </div>
              <button
                onClick={isAutoPopup ? handleCloseAutoPopup : handleCloseForm}
                className="text-white hover:text-gray-200 transition-colors p-1"
                disabled={isSubmitting}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmitEnquiry} className="p-4 md:p-5">
            <div className="grid grid-cols-1 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Company */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Phone */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                />
              </div>
              
              {/* Service */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Service Interest *</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((service, idx) => (
                    <option key={idx} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              
              {/* Message */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            {/* Status */}
            {submitStatus && (
              <div className={`mt-3 p-3 text-sm rounded-lg ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {submitStatus.message}
              </div>
            )}
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 text-sm rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      {/* Floating Enquiry Icon - POSITIONED ABOVE WhatsApp */}
      <motion.button
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={handleEnquiryClick}
        className="fixed bottom-20 right-24 z-[9998] w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-xl hover:shadow-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 group"
        style={{
          boxShadow: '0 8px 25px rgba(220, 38, 38, 0.4)'
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {/* Smaller notification badge */}
          <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            !
          </span>
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          Quick Enquiry
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-2 border-b-2 border-l-2 border-transparent border-l-gray-900"></div>
        </div>
      </motion.button>

      {/* Auto Popup - This will never show since we removed the useEffect that triggers it */}
      <AnimatePresence>
        {showAutoPopup && renderEnquiryForm(true)}
      </AnimatePresence> 

      {/* Manual Enquiry Form - Only shows when user clicks the icon */}
      <AnimatePresence>
        {showEnquiryForm && renderEnquiryForm(false)}
      </AnimatePresence>
    </>
  );
};

export default GlobalEnquiryIcon;