// Cybersecurity.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Globe, 
  Cpu, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Network,
  Database,
  Server,
  Clock,
  Zap,
  Code,
  Terminal,
  Fingerprint,
  Eye,
  FileCheck,
  HardDrive,
  Key,
  Shield
} from 'lucide-react';

const Cybersecurity = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [activeService, setActiveService] = useState(null);
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardHover = {
    hover: { 
      y: -10,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const iconRotate = {
    hover: { 
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  const pulseAnimation = {
    hover: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity
      }
    }
  };

  // Updated services array with Antivirus service
  const services = [
    {
      icon: "🛡️",
      title: "Network Security",
      description: "Protect your network infrastructure from unauthorized access and attacks",
      features: ["Firewall Configuration", "Intrusion Detection", "VPN Setup", "Network Monitoring", "Access Control"]
    },
    {
      icon: "🔒",
      title: "Data Protection",
      description: "Safeguard sensitive data with encryption and access control measures",
      features: ["Data Encryption", "DLP Solutions", "Backup & Recovery", "Data Classification", "Privacy Compliance"]
    },
    {
      icon: "🕵️",
      title: "Threat Detection",
      description: "Advanced threat detection and response to identify security incidents",
      features: ["SIEM Solutions", "Threat Intelligence", "Incident Response", "Forensic Analysis", "24/7 Monitoring"]
    },
    {
      icon: "👨‍💻",
      title: "Endpoint Security",
      description: "Secure all endpoints including devices, servers, and workstations",
      features: ["Antivirus/Antimalware", "Patch Management", "Device Control", "Application Whitelisting", "Mobile Security"]
    },
    {
      icon: "🦠", // Added antivirus icon
      title: "Antivirus Solution",
      description: "Comprehensive antivirus and antimalware solutions for all devices",
      features: ["Real-time Scanning", "Malware Removal", "Ransomware Protection", "Email Security", "Automatic Updates", "Behavior Analysis"]
    },
    {
      icon: "🌐",
      title: "Cloud Security",
      description: "Protect cloud infrastructure and ensure compliance with security standards",
      features: ["Cloud Access Security", "Configuration Auditing", "Identity Management", "Data Loss Prevention", "Compliance"]
    },
    {
      icon: "📋",
      title: "Compliance & Governance",
      description: "Ensure compliance with industry regulations and security frameworks",
      features: ["Risk Assessment", "Policy Development", "Audit Preparation", "GDPR/CCPA Compliance", "Security Frameworks"]
    },
    {
      icon: "🎓",
      title: "Security Awareness",
      description: "Train employees to recognize and respond to security threats",
      features: ["Phishing Simulations", "Security Training", "Awareness Campaigns", "Policy Education", "Best Practices"]
    }
  ];

  const securityFeatures = [
    {
      icon: <Fingerprint className="w-8 h-8" />,
      title: "Multi-Factor Authentication",
      description: "Add multiple layers of security to verify user identities"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "24/7 Monitoring",
      description: "Round-the-clock surveillance of your digital assets"
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Compliance Management",
      description: "Meet GDPR, HIPAA, PCI-DSS, and other regulatory requirements"
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: "Incident Response",
      description: "Immediate action and recovery from security breaches"
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Encryption Services",
      description: "End-to-end encryption for data at rest and in transit"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Zero Trust Architecture",
      description: "Never trust, always verify security model implementation"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime Guarantee", icon: <Server className="w-6 h-6 md:w-8 md:h-8" /> },
    { value: "24/7", label: "Security Monitoring", icon: <Clock className="w-6 h-6 md:w-8 md:h-8" /> },
    { value: "<30min", label: "Response Time", icon: <Zap className="w-6 h-6 md:w-8 md:h-8" /> },
    { value: "1000+", label: "Protected Clients", icon: <Users className="w-6 h-6 md:w-8 md:h-8" /> },
    { value: "50k+", label: "Threats Blocked", icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" /> },
    { value: "0%", label: "Major Breaches", icon: <AlertTriangle className="w-6 h-6 md:w-8 md:h-8" /> }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! Our security team will contact you shortly.');
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white overflow-x-hidden"
    >
      {/* ===== HERO SECTION ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic.avif"  
            alt="Cybersecurity Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div 
              variants={fadeInLeft}
              className="text-left"
            >
              <motion.h1 
                variants={staggerContainer}
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <motion.span 
                  variants={fadeInUp}
                  className="text-grey-900"
                >
                  Fortify Your Digital
                </motion.span>
                <br />
                <motion.span 
                  variants={fadeInUp}
                  className="mt-2 inline-block bg-clip-text text-red-600"
                >
                  Security Frontier
                </motion.span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-grey-900 mb-8 leading-relaxed"
              >
                Comprehensive cybersecurity solutions with North American accountability 
                and global execution excellence. Protect your business from evolving 
                digital threats with 24/7 monitoring and human-led security operations.
              </motion.p>
            </motion.div>
            
            <motion.div 
              variants={fadeInRight}
              className="relative"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 border border-red-200 shadow-2xl shadow-red-500/10"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Network className="w-10 h-10 md:w-12 md:h-12 text-red-600" />, title: "Network Protection" },
                    { icon: <Database className="w-10 h-10 md:w-12 md:h-12 text-red-600" />, title: "Data Security" },
                    { icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-red-600" />, title: "Threat Defense" },
                    { icon: <Cpu className="w-10 h-10 md:w-12 md:h-12 text-red-600" />, title: "Endpoint Security" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover="hover"
                      className="bg-white p-4 md:p-6 rounded-xl border border-red-100"
                    >
                      <motion.div 
                        variants={iconRotate}
                        className="mb-4"
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="font-bold text-base md:text-lg">{item.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== STATS SECTION ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="py-12 px-4 sm:px-6 lg:px-8 bg-zinc-200/60"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trusted Security <span className="text-red-600">Metrics</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Proven results in protecting businesses from cyber threats
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 text-center hover:border-red-300 hover:shadow-lg transition-all"
              >
                <motion.div 
                  variants={cardHover}
                  className="flex justify-center mb-3"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="p-2 md:p-3 bg-red-50 rounded-lg"
                  >
                    {stat.icon}
                  </motion.div>
                </motion.div>
                <div className="text-xl md:text-2xl font-bold text-red-600 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== SERVICES SECTION ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        className="relative py-12 md:py-16 bg-gray-50"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic2.avif"  
            alt="Cybersecurity Services Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center mb-8 md:mb-12 relative z-10">
          <motion.h2 
            variants={fadeInUp}
            className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-white leading-tight"
          >
            Comprehensive Cybersecurity <span className="text-red-600">Solutions</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-white max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed"
          >
            End-to-end security services tailored to protect your business at every layer
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                  activeService === index
                    ? 'rounded-xl border-red-600 shadow-lg shadow-red-500/10 bg-white'
                    : 'rounded-lg border-gray-200 bg-white hover:border-gray-300'
                }`}
                style={{
                  borderWidth: '1px',
                  height: activeService === index ? 'auto' : '140px',
                  margin: activeService === index ? '0' : '0 auto',
                  padding: activeService === index ? '1.5rem' : '1rem',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  width: '100%',
                  maxWidth: activeService === index ? 'none' : '100%',
                }}
              >
                {/* Hover Gradient - Only show for active card */}
                {activeService === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent rounded-xl"
                  ></motion.div>
                )}

                <div className="relative flex flex-col h-full">
                  {/* Icon and Title Container - Always visible */}
                  <div className={`flex flex-col items-center justify-center flex-1 ${
                    activeService === index ? '' : 'h-full'
                  }`}>
                    {/* Icon Container */}
                    <motion.div 
                      variants={iconRotate}
                      className={`inline-flex p-2.5 rounded-lg bg-red-50 text-red-600 transition-all duration-300 ${
                        activeService === index ? 'scale-110 mb-3' : 'scale-100 mb-3'
                      }`}
                    >
                      {service.icon}
                    </motion.div>

                    {/* Title */}
                    <motion.h3 
                      layout
                      className={`text-center font-bold text-gray-900 transition-all duration-300 ${
                        activeService === index 
                          ? 'text-[17px]' 
                          : 'text-[14px]'
                      }`}
                    >
                      {service.title}
                    </motion.h3>
                  </div>

                  {/* Details - Only show when this card is active */}
                  {activeService === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      {/* Description */}
                      <p className="text-gray-600 mb-4 text-[14px] leading-relaxed text-center">
                        {service.description}
                      </p>

                      {/* Features */}
                      <motion.ul 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-2 mb-4"
                      >
                        {service.features.map((feature, i) => (
                          <motion.li 
                            key={i} 
                            variants={fadeInLeft}
                            className="flex items-start text-[13px] leading-snug"
                          >
                            <svg 
                              className="w-3.5 h-3.5 text-red-500 mr-2 mt-0.5 flex-shrink-0" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="3" 
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== SECURITY FEATURES ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/green.avif" 
            alt="Security Features Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Advanced Security <span className="text-red-600">Features</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cutting-edge security technologies and methodologies for comprehensive protection
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {securityFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-red-300 transition-all hover:shadow-lg"
              >
                <motion.div 
                  variants={iconRotate}
                  className="inline-flex p-3 rounded-lg bg-red-50 text-red-600 mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== FINAL CTA ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.h2 
            variants={fadeInUp}
            className="text-[30px] font-bold mb-4 md:mb-6"
          >
            Technology Is Everywhere. <span className="text-red-400">Ownership Is Rare</span>.
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
          >
            Partner with a team that stays accountable from start to scale.
          </motion.p>
          
          <motion.div 
            variants={scaleIn}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
              <motion.svg
                initial={{ opacity: 0, x: -5 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="w-4 h-4 md:w-5 md:h-5"
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
              </motion.svg>
            </motion.a>
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="mt-8 md:mt-10 text-gray-400 text-base px-4 md:px-0"
          >
            No bots. No runaround. Just real conversations with accountable partners.
          </motion.p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Cybersecurity;