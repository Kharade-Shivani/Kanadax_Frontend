import React, { useState, useEffect } from 'react';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import httpClient from '../../Api/axios';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState({
    phone: '+1 (555) 123-4567',
    email: 'info@kandax.com',
    address: '123 Tech Street, Suite 100, Toronto, ON M5H 2N2',
    working_hours: 'Mon-Fri: 9AM-6PM EST'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const socialIcons = [
    { icon: Twitter, label: 'Twitter', url: 'https://x.com/kandax2026' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/kandax-x-7a755b3a3/' },
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61586028728650' },
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/kandax2026/?hl=en' },
  ];

  const services = [
    { label: 'Generative AI Solutions', path: '/generative-ai' },
    { label: 'Web Development', path: '/web-development' },
    { label: 'Cloud Solutions', path: '/cloud-solutions' },
    { label: 'Mobile App Development', path: '/mobile-development' },
    { label: 'Database Management', path: '/database-management' },
    { label: 'Digital Marketing', path: '/digital-marketing' },
    { label: 'Cybersecurity', path: '/cybersecurity' },
    { label: 'DevOps Services', path: '/devops-services' },
    { label: 'Technology Consulting', path: '/technology-consulting' },
    { label: 'Remote Workplace Solutions', path: '/remote-workplace' },
    { label: 'Backup & Disaster Recovery', path: '/backup-disaster-recovery' },
    { label: 'IT Help Desk Services', path: '/help-desk' },
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Partners', path: '/partners' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Team', path: '/team' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching footer data...');
        
        const response = await httpClient.get('/getall__footer');
        
        console.log('API Response:', response);
        console.log('Response data:', response.data);
        
        let footerData = response.data;
        
        if (Array.isArray(footerData) && footerData.length > 0) {
          footerData = footerData[0];
        }
        
        if (footerData && footerData.data) {
          footerData = footerData.data;
        }
        
        if (Array.isArray(footerData) && footerData.length > 0) {
          footerData = footerData[0];
        }
        
        console.log('Processed footer data:', footerData);
        
        if (footerData) {
          setContactInfo({
            phone: footerData.phone || contactInfo.phone,
            email: footerData.email || contactInfo.email,
            address: footerData.address || contactInfo.address,
            working_hours: footerData.working_hours || contactInfo.working_hours
          });
        } else {
          console.warn('No footer data found in response');
          setError('No contact information available');
        }
      } catch (err) {
        console.error('Error fetching contact info:', err);
        console.error('Error details:', err.response?.data || err.message);
        setError(`Failed to load contact information: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-8 gap-x-6 lg:gap-x-8">
          {/* Company Logo - 4 columns */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="KANDAX Logo"
                className="h-16 w-16 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-white">KANDAX</h3>
                <p className="text-sm text-gray-300">
                  Human-Led Technology.<br />
                  Real Accountability.
                </p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bridging North American accountability with Indian execution excellence to deliver end-to-end technology solutions.
            </p>
            
            {/* Indian Delivery Partner Section */}
            <div className="pt-2 border-t border-gray-800 mt-4">
              <p className="text-gray-400 text-xs font-medium mb-1">Indian Delivery Partner</p>
              <p className="text-white font-semibold text-sm">Zplus Cyber Secure Technology Pvt Ltd , Pune</p>
            </div>
            
            {/* Social Media Icons - Reordered to match requested sequence */}
            <div className="pt-4">
              <h4 className="text-gray-300 text-sm font-medium mb-3">Connect With Us</h4>
              <div className="flex space-x-3">
                {socialIcons.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-900/30 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/20"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-300 hover:text-red-400 transition-colors group text-sm"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - 3 columns */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-800">Our Services</h3>
            <ul className="space-y-2">
              {services.slice(0, 9).map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.path}
                    className="flex items-center text-gray-300 hover:text-red-400 transition-colors group text-sm"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-800">Contact Info</h3>
              
              <div className="space-y-4">
                {/* Canada Phone - Primary */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">Canada Phone (Primary)</p>
                    {loading ? (
                      <div className="h-4 w-24 bg-gray-800 animate-pulse rounded mt-1"></div>
                    ) : error ? (
                      <p className="text-red-400 text-xs mt-1">{error}</p>
                    ) : (
                      <p className="text-white font-medium text-sm">{contactInfo.phone}</p>
                    )}
                  </div>
                </div>
                
                {/* Canada Phone - Secondary (Static) */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">Canada Phone (Secondary)</p>
                    <p className="text-white font-medium text-sm">+1 (437) 370-1413</p>
                  </div>
                </div>
                
                {/* India Phone - Static */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">India Phone</p>
                    <p className="text-white font-medium text-sm">+91 98500 83751</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">Email</p>
                    {loading ? (
                      <div className="h-4 w-32 bg-gray-800 animate-pulse rounded mt-1"></div>
                    ) : error ? (
                      <p className="text-red-400 text-xs mt-1">{error}</p>
                    ) : (
                      <p className="text-white font-medium text-sm">{contactInfo.email}</p>
                    )}
                  </div>
                </div>
                
                {/* Address - Canada Office */}
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 text-xs">Canada Office</p>
                    {loading ? (
                      <div className="h-8 w-40 bg-gray-800 animate-pulse rounded mt-1"></div>
                    ) : error ? (
                      <p className="text-red-400 text-xs mt-1">{error}</p>
                    ) : (
                      <p className="text-white font-medium text-xs">{contactInfo.address}</p>
                    )}
                    
                    {/* Static India Office Address */}
                    <div className="mt-2 pt-2 border-t border-gray-800">
                      <p className="text-gray-300 text-xs mb-1">India Office</p>
                      <p className="text-white font-medium text-xs">
                        Office no. 409, 4th Floor, Rajdhani Complex,<br />
                        Pune - Satara Rd, near Shankar Maharaj Math,<br />
                        KK Market, Balaji Nagar, Pune,<br />
                        Maharashtra 411043
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex justify-center items-center">
            <div className="text-gray-300 text-sm text-center">
              © {currentYear} KANDAX. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;