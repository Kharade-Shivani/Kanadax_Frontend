import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import { motion } from 'framer-motion';
import httpClient from '../../Api/axios';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const [contactInfo, setContactInfo] = useState({
    phone: '+1 (416) 700-7091',
    email: 'info@kandax.com',
    address: 'Toronto, Ontario, Canada',
    working_hours: 'Mon-Fri: 9AM-6PM EST'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const socialIcons = [
    { icon: Twitter, label: t('footer.social.twitter'), url: 'https://x.com/kandax2026' },
    { icon: Linkedin, label: t('footer.social.linkedin'), url: 'https://www.linkedin.com/in/kandax-x-7a755b3a3/' },
    { icon: Facebook, label: t('footer.social.facebook'), url: 'https://www.facebook.com/profile.php?id=61586028728650' },
    { icon: Instagram, label: t('footer.social.instagram'), url: 'https://www.instagram.com/kandax2026/?hl=en' },
  ];

  const services = [
    { label: t('footer.services.generativeAI'), path: '/generative-ai' },
    { label: t('footer.services.webDev'), path: '/web-development' },
    { label: t('footer.services.cloud'), path: '/cloud-solutions' },
    { label: t('footer.services.mobile'), path: '/mobile-development' },
    { label: t('footer.services.database'), path: '/database-management' },
    { label: t('footer.services.digitalMarketing'), path: '/digital-marketing' },
    { label: t('footer.services.cybersecurity'), path: '/cybersecurity' },
    { label: t('footer.services.devops'), path: '/devops-services' },
    { label: t('footer.services.consulting'), path: '/technology-consulting' },
    { label: t('footer.services.remoteWorkplace'), path: '/remote-workplace' },
    { label: t('footer.services.disasterRecovery'), path: '/backup-disaster-recovery' },
    { label: t('footer.services.helpDesk'), path: '/help-desk' },
  ];

  const quickLinks = [
    { label: t('footer.quickLinks.home'), path: '/' },
    { label: t('footer.quickLinks.about'), path: '/about' },
    { label: t('footer.quickLinks.partners'), path: '/partners' },
    { label: t('footer.quickLinks.portfolio'), path: '/portfolio' },
    { label: t('footer.quickLinks.team'), path: '/team' },
    { label: t('footer.quickLinks.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await httpClient.get('/getall__footer');
        
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
        
        if (footerData) {
          setContactInfo({
            phone: footerData.phone || contactInfo.phone,
            email: footerData.email || contactInfo.email,
            address: footerData.address || contactInfo.address,
            working_hours: footerData.working_hours || contactInfo.working_hours
          });
        }
      } catch (err) {
        console.error('Error fetching contact info:', err);
        setError(t('footer.errors.fetchError'));
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const footer = document.querySelector('footer');
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-stagger > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-stagger.visible > *:nth-child(1) { transition-delay: 0.1s; }
        .animate-stagger.visible > *:nth-child(2) { transition-delay: 0.2s; }
        .animate-stagger.visible > *:nth-child(3) { transition-delay: 0.3s; }
        .animate-stagger.visible > *:nth-child(4) { transition-delay: 0.4s; }
        
        .animate-stagger.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-3px);
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Logo Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center space-x-4 hover-lift group">
              <motion.img
                src="/logo.png"
                alt="KANDAX Logo"
                className="h-16 w-auto object-contain"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <div>
                <motion.h3 
                  className="text-xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {t('header.company')}
                </motion.h3>
                <p className="text-sm text-gray-300 mt-1">
                  {t('footer.company.tagline')}
                </p>
              </div>
            </Link>
            
            <motion.p 
              className="text-gray-300 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t('footer.company.description')}
            </motion.p>
            
            {/* Company Information Section */}
            <motion.div 
              className="pt-4 border-t border-gray-800 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Indian Delivery Partner */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <p className="text-gray-400 text-xs font-medium mb-1">
                  {t('footer.company.indianPartner')}
                </p>
                <p className="text-white font-semibold text-sm group-hover:text-red-300 transition-colors">
                  {t('footer.company.partnerName')}
                </p>
              </motion.div>
              
              {/* Division Information */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <p className="text-gray-400 text-xs font-medium mb-1">
                  {t('footer.company.division')}
                </p>
                <p className="text-white font-semibold text-sm group-hover:text-red-300 transition-colors">
                  {t('footer.company.parentCompany')}
                </p>
              </motion.div>
            </motion.div>
            
            {/* Social Media Icons */}
            <div className="pt-4">
              <motion.h4 
                className="text-gray-300 text-sm font-medium mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {t('footer.social.connect')}
              </motion.h4>
              <div className="flex space-x-3">
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-900/30 flex items-center justify-center transition-all duration-300 hover-lift group relative overflow-hidden"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <motion.div 
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-base font-bold text-white mb-6 pb-3 border-b border-gray-800">
              {t('footer.quickLinks.title')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-300 hover:text-red-400 transition-colors group text-sm py-1"
                  >
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <h3 className="text-base font-bold text-white mb-6 pb-3 border-b border-gray-800">
              {t('footer.services.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {services.map((service, index) => (
                <motion.div
                  key={service.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  viewport={{ once: true }}
                >
                  <Link
  to={service.path}
  className="flex items-center text-gray-300 hover:text-red-400 transition-colors group text-sm py-1 service-item"
>
  <motion.div
    whileHover={{ x: 3 }}
    transition={{ duration: 0.2 }}
    className="flex items-center w-full"
  >
    <ChevronRight className="w-3 h-3 mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    <span className="truncate-service flex-1">{service.label}</span>
  </motion.div>
</Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6"
          >
            <div>
              <h3 className="text-base font-bold text-white mb-6 pb-3 border-b border-gray-800">
                {t('footer.contact.title')}
              </h3>
              
              <div className="space-y-4">
                {/* Canada Phone - Primary */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-900/50 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-gray-300 text-xs">
                      {t('footer.contact.canadaPhonePrimary')}
                    </p>
                    {loading ? (
                      <div className="h-4 w-32 bg-gray-800 animate-pulse rounded mt-1"></div>
                    ) : error ? (
                      <p className="text-red-400 text-xs mt-1">{error}</p>
                    ) : (
                      <p className="text-white font-medium text-sm mt-1">
                        {contactInfo.phone}
                      </p>
                    )}
                  </div>
                </motion.div>
                
                {/* Canada Phone - Secondary */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-900/50 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-gray-300 text-xs">
                      {t('footer.contact.canadaPhoneSecondary')}
                    </p>
                    <p className="text-white font-medium text-sm mt-1">
                      {t('footer.contact.canadaPhoneSecondaryNumber')}
                    </p>
                  </div>
                </motion.div>
                
                {/* India Phone */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-900/50 transition-colors"
                  >
                    <Phone className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-gray-300 text-xs">
                      {t('footer.contact.indiaPhone')}
                    </p>
                    <p className="text-white font-medium text-sm mt-1">
                      {t('footer.contact.indiaPhoneNumber')}
                    </p>
                  </div>
                </motion.div>
                
                {/* Email */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-900/50 transition-colors"
                  >
                    <Mail className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-gray-300 text-xs">
                      {t('footer.contact.email')}
                    </p>
                    {loading ? (
                      <div className="h-4 w-40 bg-gray-800 animate-pulse rounded mt-1"></div>
                    ) : error ? (
                      <p className="text-red-400 text-xs mt-1">{error}</p>
                    ) : (
                      <p className="text-white font-medium text-sm mt-1">
                        {contactInfo.email}
                      </p>
                    )}
                  </div>
                </motion.div>
                
                {/* Address - Canada Office */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start space-x-3 group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-900/50 transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
                  </motion.div>
                  <div>
                    <p className="text-gray-300 text-xs">
                      {t('footer.contact.canadaOffice')}
                    </p>
                    {loading ? (
                      <div className="h-8 w-48 bg-gray-800 animate-pulse rounded mt-1"></div>
                    ) : error ? (
                      <p className="text-red-400 text-xs mt-1">{error}</p>
                    ) : (
                      <p className="text-white font-medium text-xs mt-1">
                        {contactInfo.address}
                      </p>
                    )}
                    
                    {/* India Office Address */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-4 pt-4 border-t border-gray-800"
                    >
                      <p className="text-gray-300 text-xs mb-2">
                        {t('footer.contact.indiaOffice')}
                      </p>
                      <p className="text-white font-medium text-xs leading-relaxed">
                        {t('footer.contact.indiaAddress')}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex justify-center items-center">
            <div className="text-gray-300 text-sm text-center">
              © {currentYear} {t('header.company')}. {t('footer.bottom.rights')}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;