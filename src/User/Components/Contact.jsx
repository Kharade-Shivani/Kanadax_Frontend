import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Headphones,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  User,
  Calendar,
  ChevronRight
} from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState({
    header: false,
    leftImage: false,
    rightForm: false,
    leftAddress: false,
    rightOfficeImage: false
  });

  const headerRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightFormRef = useRef(null);
  const leftAddressRef = useRef(null);
  const rightOfficeImageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (headerRef.current) {
      headerRef.current.dataset.section = 'header';
      observer.observe(headerRef.current);
    }
    if (leftImageRef.current) {
      leftImageRef.current.dataset.section = 'leftImage';
      observer.observe(leftImageRef.current);
    }
    if (rightFormRef.current) {
      rightFormRef.current.dataset.section = 'rightForm';
      observer.observe(rightFormRef.current);
    }
    if (leftAddressRef.current) {
      leftAddressRef.current.dataset.section = 'leftAddress';
      observer.observe(leftAddressRef.current);
    }
    if (rightOfficeImageRef.current) {
      rightOfficeImageRef.current.dataset.section = 'rightOfficeImage';
      observer.observe(rightOfficeImageRef.current);
    }

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (leftImageRef.current) observer.unobserve(leftImageRef.current);
      if (rightFormRef.current) observer.unobserve(rightFormRef.current);
      if (leftAddressRef.current) observer.unobserve(leftAddressRef.current);
      if (rightOfficeImageRef.current) observer.unobserve(rightOfficeImageRef.current);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ submitted: false, error: false, message: '' });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (formData.name && formData.email && formData.message) {
        setFormStatus({
          submitted: true,
          error: false,
          message: 'Thank you for your message! We\'ll get back to you within 24 hours.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setFormStatus({
          submitted: false,
          error: true,
          message: 'Please fill in all required fields.'
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-poppins">
      {/* Banner Image */}
      <img
        src="/copy1.jpg"
        alt="contactus"
        className="w-full h-auto object-cover"
      />
      
      {/* Background Image for the Entire Content Section - STRONG BLUR */}
      <div 
        className="relative min-h-screen"
      >
        {/* Strong blur overlay */}
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center backdrop-blur-2xl"
          style={{ backgroundImage: 'url("/contttt.avif")', filter: 'blur(10px) brightness(1.0)' }}
        ></div>
        
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Two Column Layout: Image on Left, Form on Right */}
        <section id="contact-form" className="relative py-12 md:py-16 lg:py-20 z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            {/* Header Text */}
            <div 
              ref={headerRef}
              className={`text-center mb-8 md:mb-10 lg:mb-12 transition-all duration-1000 ${
                isVisible.header 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-[30px] font-bold text-white mb-2">
                Get in <span className="text-red-600">Touch</span>
              </h2>
              <p className="text-[18px] text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Fill out the form below and our team will get back to you within 24 hours. No bots, no runaround.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Column: Image - Slides in from LEFT */}
              <div 
                ref={leftImageRef}
                className={`flex flex-col justify-center transition-all duration-1000 delay-200 ${
                  isVisible.leftImage 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
                  <img 
                    src="/contactt.jpeg"
                    alt="Contact Us" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Column: Contact Form - Slides in from RIGHT */}
              <div 
                ref={rightFormRef}
                className={`flex flex-col justify-center transition-all duration-1000 delay-200 ${
                  isVisible.rightForm 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 lg:p-12 border-2 border-white/40 shadow-2xl">
                  {formStatus.message && (
                    <div className={`p-3 md:p-4 rounded-lg mb-4 md:mb-6 ${formStatus.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                      <div className="flex items-center space-x-2 md:space-x-3">
                        {formStatus.error ? (
                          <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                        )}
                        <p className={`text-sm md:text-base ${formStatus.error ? 'text-red-700' : 'text-green-700'}`}>
                          {formStatus.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">Subject</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors text-sm md:text-base"
                            placeholder="How can we help?"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-800 mb-2 font-medium text-base md:text-lg">Your Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full px-4 py-2 md:py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors resize-none text-sm md:text-base"
                        placeholder="Tell us about your project or inquiry..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 md:py-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 md:space-x-3 group"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm md:text-base">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 md:w-5 md:h-5" />
                          <span className="text-sm md:text-base">Send Message</span>
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* NEW SECTION: Address on Left, Image on Right */}
            <div className="mt-16 md:mt-20 lg:mt-24">
              {/* "Meet us at our office" Header */}
              <div className="text-center mb-12">
                <h2 className="text-[32px] md:text-[36px] font-bold text-white">
                  Meet us at our <span className="text-red-600">office</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left Column: Address Information - Slides in from LEFT */}
                <div 
                  ref={leftAddressRef}
                  className={`space-y-12 transition-all duration-1000 delay-200 ${
                    isVisible.leftAddress 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-20'
                  }`}
                >
                  {/* Head Office Section */}
                  <div>
                    <div className="flex items-center mb-6">
                      <h3 className="text-[26px] font-bold text-white">Canada Office</h3>
                    </div>
                    <div className="pl-7 space-y-6">
                      <div className="flex items-start space-x-4">
                        <p className="text-gray-200 text-lg leading-relaxed">
                          338 Queen St E # 207<br />
                          Brampton, ON L6V IC4<br />
                          Canada
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Regional Office Section */}
                  <div>
                    <div className="flex items-center mb-6">
                      <h3 className="text-[26px] font-bold text-white">India Development Office</h3>
                    </div>
                    <div className="pl-7 space-y-6">
                      <div className="flex items-start space-x-4">
                        <p className="text-gray-200 text-lg leading-relaxed">
                          Office no. 409, 4th Floor, Rajdhani Complex,<br />
                          Pune - Satara Rd, near shankar maharaj math,<br />
                          KK Market, Balaji Nagar, Pune,<br />
                          Maharashtra 411043
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Image - Slides in from RIGHT */}
                <div 
                  ref={rightOfficeImageRef}
                  className={`flex flex-col justify-center transition-all duration-1000 delay-200 ${
                    isVisible.rightOfficeImage 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-20'
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
                    <img 
                      src="/office_meeting.png"
                      alt="Our Office Location" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Add custom CSS for smooth transitions */}
      <style jsx>{`
        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Smooth transitions for all elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}

export default Contact;