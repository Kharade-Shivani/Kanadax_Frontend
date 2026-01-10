import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";

function RemoteWorkplace() {
  const [activeTab, setActiveTab] = useState('collaboration');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
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

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.4, ease: "backOut" }
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

  const rotateIn = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { 
      rotateY: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const remoteServices = [
    {
      icon: "💻",
      title: "Remote Infrastructure Setup",
      description: "Comprehensive remote work infrastructure including hardware, software, and networking",
      features: ["Device Provisioning", "VPN Setup", "Network Security", "Cloud Storage", "IT Support"]
    },
    {
      icon: "🔒",
      title: "Cybersecurity for Remote Work",
      description: "End-to-end security solutions to protect remote workers and company data",
      features: ["Endpoint Security", "Zero Trust Architecture", "Data Encryption", "Threat Detection", "Compliance"]
    },
    {
      icon: "🤝",
      title: "Collaboration Tools",
      description: "Implement and optimize collaboration platforms for distributed teams",
      features: ["Video Conferencing", "Team Chat", "Project Management", "Document Collaboration", "Virtual Whiteboards"]
    },
    {
      icon: "🔄",
      title: "Remote Work Management",
      description: "Tools and processes for managing remote teams effectively",
      features: ["Performance Tracking", "Time Management", "Goal Setting", "Communication Protocols", "Remote Onboarding"]
    },
    {
      icon: "🏠",
      title: "Home Office Setup",
      description: "Complete home office solutions for productivity and ergonomics",
      features: ["Ergonomic Equipment", "Hardware Setup", "Internet Optimization", "Workspace Design", "Technical Support"]
    },
    {
      icon: "📚",
      title: "Remote Training & Development",
      description: "Training programs and resources for remote work best practices",
      features: ["Digital Skills Training", "Remote Leadership", "Cybersecurity Awareness", "Tool Training", "Continuous Learning"]
    },
    {
      icon: "⚖️",
      title: "Compliance & Legal Support",
      description: "Ensure compliance with regulations and legal requirements for remote work",
      features: ["Labor Law Compliance", "Data Privacy", "Tax Implications", "Insurance Coverage", "Policy Development"]
    },
    {
      icon: "📊",
      title: "Productivity Analytics",
      description: "Monitor and optimize remote team productivity with data-driven insights",
      features: ["Performance Metrics", "Productivity Analysis", "Well-being Monitoring", "ROI Tracking", "Improvement Recommendations"]
    }
  ];

  const techStack = {
    collaboration: [
      { name: "Microsoft 365", level: "Expert" },
      { name: "Google Workspace", level: "Advanced" },
      { name: "Slack", level: "Advanced" },
      { name: "Zoom", level: "Expert" },
      { name: "Teams", level: "Expert" },
      { name: "Notion", level: "Advanced" }
    ],
    security: [
      { name: "Zero Trust", level: "Advanced" },
      { name: "VPN Solutions", level: "Expert" },
      { name: "MFA/2FA", level: "Expert" },
      { name: "Endpoint Security", level: "Advanced" },
      { name: "SIEM", level: "Intermediate" },
      { name: "DLP", level: "Advanced" }
    ],
    infrastructure: [
      { name: "VDI", level: "Advanced" },
      { name: "Citrix", level: "Intermediate" },
      { name: "VMware", level: "Intermediate" },
      { name: "AWS Workspaces", level: "Advanced" },
      { name: "Azure Virtual Desktop", level: "Advanced" },
      { name: "RMM Tools", level: "Expert" }
    ]
  };

  const remoteProjects = [
    {
      id: 1,
      title: "Global Enterprise Remote Transition",
      description: "Transitioned 10,000+ employees to remote work across 50 countries within 30 days",
      category: "Enterprise Remote Work",
      tech: ["Microsoft 365", "Zoom", "Slack", "Okta", "VPN Infrastructure"],
      results: ["99% business continuity", "Productivity increased by 25%", "Real estate costs reduced by 40%"]
    },
    {
      id: 2,
      title: "Financial Services Remote Compliance",
      description: "Implemented secure remote work solutions for regulated financial institution",
      category: "Finance Remote Work",
      tech: ["Virtual Desktop Infrastructure", "Multi-factor Authentication", "Endpoint Security", "Compliance Monitoring", "Encrypted Communications"],
      results: ["Zero security incidents", "Regulatory compliance maintained", "Employee satisfaction increased by 35%"]
    },
    {
      id: 3,
      title: "Healthcare Remote Workforce",
      description: "Enabled remote work for healthcare administrative staff while maintaining HIPAA compliance",
      category: "Healthcare Remote",
      tech: ["HIPAA-compliant VPN", "Secure Video Conferencing", "Electronic Health Records", "Encrypted Messaging", "Access Control"],
      results: ["100% HIPAA compliance", "Administrative costs reduced by 30%", "Staff retention improved by 20%"]
    },
    {
      id: 4,
      title: "Tech Startup Remote Scaling",
      description: "Scaled remote-first startup from 10 to 500 employees across 20 countries",
      category: "Startup Remote Culture",
      tech: ["Notion", "Figma", "GitHub", "Slack", "Google Workspace"],
      results: ["Recruiting pool expanded globally", "Time to hire reduced by 60%", "Diversity increased by 40%"]
    },
    {
      id: 5,
      title: "Manufacturing Hybrid Workforce",
      description: "Implemented hybrid work model for manufacturing company's office staff",
      category: "Hybrid Work Model",
      tech: ["IoT Monitoring", "Cloud ERP", "Collaboration Tools", "Productivity Analytics", "Remote Training"],
      results: ["Office space reduced by 50%", "Carbon footprint decreased by 25%", "Employee flexibility improved satisfaction"]
    },
    {
      id: 6,
      title: "Education Sector Remote Transition",
      description: "Transitioned entire educational institution to remote teaching and administration",
      category: "Education Remote",
      tech: ["Learning Management System", "Video Lectures", "Online Assessments", "Virtual Labs", "Parent Portal"],
      results: ["Learning continuity maintained", "Geographic reach expanded", "Digital literacy improved across institution"]
    },
    {
      id: 7,
      title: "Consulting Firm Digital Nomad Setup",
      description: "Enabled digital nomad lifestyle for consulting firm with global clients",
      category: "Digital Nomad",
      tech: ["Global Internet Solutions", "Portable Offices", "Cross-border Compliance", "Time Zone Management", "Client Portal"],
      results: ["Client satisfaction increased by 30%", "Consultant retention improved by 40%", "Global expertise expanded"]
    },
    {
      id: 8,
      title: "Government Agency Remote Operations",
      description: "Secured remote work implementation for government agency with strict security requirements",
      category: "Government Remote",
      tech: ["Secure Access Service Edge", "Zero Trust Architecture", "Data Loss Prevention", "Audit Logging", "Disaster Recovery"],
      results: ["Zero data breaches", "Public service continuity", "Operational resilience established"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Needs Assessment",
      description: "Analyze remote work requirements and security considerations",
      icon: "📋"
    },
    {
      step: "02",
      title: "Security Planning",
      description: "Design secure access and data protection strategies",
      icon: "🛡️"
    },
    {
      step: "03",
      title: "Tool Selection & Setup",
      description: "Implement collaboration tools and remote access solutions",
      icon: "🛠️"
    },
    {
      step: "04",
      title: "Infrastructure Deployment",
      description: "Deploy VDI, VPN, and unified communications systems",
      icon: "🚀"
    },
    {
      step: "05",
      title: "Training & Onboarding",
      description: "Train employees on remote tools and security protocols",
      icon: "👨‍🏫"
    },
    {
      step: "06",
      title: "Ongoing Support",
      description: "24/7 monitoring, maintenance, and optimization",
      icon: "🔧"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Image with Overlay - ONLY for the section */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.img
            src="/imagee.jpg"
            alt="Remote Workplace Solutions Background"
            className="w-full h-full object-cover"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <motion.div 
              className="text-left"
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.span 
                  className="text-gray-900"
                  variants={fadeInUp}
                >
                  Secure Remote
                </motion.span>
                <br />
                <motion.span 
                  className="mt-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-gray-800 to-red-800"
                  variants={fadeInUp}
                >
                  Workplace Solutions
                </motion.span>
              </motion.h1>

              <motion.p 
                className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                We implement secure, efficient remote work infrastructures with enterprise-grade
                collaboration tools that ensure productivity and data security from anywhere.
              </motion.p>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <motion.img
                src="/remote.jpg"
                alt="Remote Workplace Solutions"
                className="w-full max-w-lg rounded-xl shadow-xl border border-gray-200"
                variants={rotateIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div 
                className="text-red-600 mb-3 text-2xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >⌛</motion.div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Remote Support</div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div 
                className="text-red-600 mb-3 text-2xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 0.5
                }}
              >🛡️</motion.div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Security Guarantee</div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div 
                className="text-red-600 mb-3 text-2xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 1
                }}
              >👥</motion.div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Remote Setups</div>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <motion.div 
                className="text-red-600 mb-3 text-2xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 1.5
                }}
              >✅</motion.div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime SLA</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <motion.section 
        id="services" 
        className="relative py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/pic.avif" 
            alt="Remote Workplace Services Background"
            className="w-full h-full object-cover opacity-25"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>

        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Our Remote Workplace <span className="text-red-600">Services</span>
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Comprehensive solutions for secure, productive, and collaborative remote work environments
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {remoteServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${activeService === index
                    ? 'rounded-xl border-red-600 shadow-lg bg-white'
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
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  whileHover={{ scale: 1.02 }}
                  layout
                >
                  <div className="flex flex-col h-full">
                    {/* Icon and Title Container - Always visible */}
                    <div className={`flex flex-col items-center justify-center flex-1 ${activeService === index ? '' : 'h-full'
                      }`}>
                      {/* Icon */}
                      <motion.div 
                        className={`text-red-600 transition-all duration-300 ${activeService === index ? 'scale-110 mb-3' : 'scale-100 mb-4'
                          }`}
                        animate={{ 
                          rotate: activeService === index ? [0, 360] : 0 
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {service.icon}
                      </motion.div>

                      {/* Title */}
                      <h3 className={`text-center font-bold text-gray-900 transition-all duration-300 ${activeService === index
                        ? 'text-[17px]'
                        : 'text-[14px]'
                        }`}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Details - Only show when this card is active */}
                    <AnimatePresence>
                      {activeService === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          {/* Description */}
                          <p className="text-gray-600 mb-4 text-[14px] leading-relaxed text-center">
                            {service.description}
                          </p>

                          {/* Features */}
                          <motion.ul 
                            className="space-y-2 mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {service.features.map((feature, i) => (
                              <motion.li 
                                key={i} 
                                className="flex items-start text-[13px] leading-snug"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <motion.div 
                                  className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"
                                  animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360]
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.1
                                  }}
                                ></motion.div>
                                <span className="text-gray-700">{feature}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* ===== TECH STACK SECTION ===== */}
      <motion.section 
        className="relative py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/pic5.png" 
            alt="Technology Stack Background"
            className="w-full h-full object-cover opacity-5"
            animate={{ 
              x: [0, 5, 0],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Enterprise-Grade <span className="text-red-600">Technology Stack</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Trusted tools and platforms for secure and efficient remote operations
            </p>
          </motion.div>

          <div className="mb-8">
            <motion.div 
              className="flex flex-wrap gap-4 justify-center mb-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.button
                variants={fadeInUp}
                onClick={() => setActiveTab('collaboration')}
                className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'collaboration'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Collaboration Tools
              </motion.button>
              <motion.button
                variants={fadeInUp}
                onClick={() => setActiveTab('security')}
                className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'security'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Security Solutions
              </motion.button>
              <motion.button
                variants={fadeInUp}
                onClick={() => setActiveTab('infrastructure')}
                className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'infrastructure'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Infrastructure
              </motion.button>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {techStack[activeTab].map((tech, index) => (
                  <motion.div
                    key={index}
                    className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      y: -5,
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className="text-lg font-bold text-gray-900 mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech.name}
                    </motion.div>
                    <div className={`text-sm font-medium ${tech.level === 'Expert' ? 'text-green-600' :
                      tech.level === 'Advanced' ? 'text-blue-600' :
                        'text-amber-600'
                      }`}>
                      {tech.level}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* ===== IMPLEMENTATION PROCESS SECTION ===== */}
      <motion.section 
        className="relative py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/image.avif" 
            alt="Implementation Process Background"
            className="w-full h-full object-cover opacity-20"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Implementation <span className="text-red-600">Process</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A systematic approach to deploying secure and efficient remote workplace solutions
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-red-300"
                whileHover={{ 
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className="text-3xl font-bold text-gray-300"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.3 
                    }}
                  >
                    {step.step}
                  </motion.div>
                  <motion.div 
                    className="text-2xl"
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.5
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== PROJECTS SHOWCASE SECTION ===== */}
      <motion.section 
        className="relative py-12 md:py-16" 
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/picc.avif"
            alt="Success Stories Background"
            className="w-full h-full object-cover"
            animate={{ 
              scale: [1, 1.01, 1],
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-white/80"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0.9 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
        </div>

        <div className="relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Success <span className="text-red-600">Stories</span>
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Real-world implementations that transformed businesses into remote-first organizations
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {remoteProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${activeProject === project.id
                    ? 'rounded-xl border-red-600 shadow-lg bg-white'
                    : 'rounded-lg border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  style={{
                    borderWidth: '1px',
                    height: activeProject === project.id ? 'auto' : '140px',
                    margin: activeProject === project.id ? '0' : '0 auto',
                    padding: activeProject === project.id ? '1.5rem' : '1rem',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '100%',
                    maxWidth: activeProject === project.id ? 'none' : '100%',
                  }}
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                  whileHover={{ scale: 1.02 }}
                  layout
                >
                  <div className="flex flex-col h-full">
                    {/* Main Content Container - Always visible */}
                    <div className={`flex flex-col items-center justify-center flex-1 ${activeProject === project.id ? '' : 'h-full'
                      }`}>
                      {/* Category Badge */}
                      <motion.div 
                        className={`inline-flex items-center gap-1.5 transition-all duration-300 ${activeProject === project.id ? 'scale-105 mb-4' : 'scale-100 mb-3'
                          }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {project.category}
                        </div>
                      </motion.div>

                      {/* Title */}
                      <h3 className={`text-center font-bold text-gray-900 transition-all duration-300 ${activeProject === project.id
                        ? 'text-[17px]'
                        : 'text-[14px]'
                        }`}>
                        {project.title}
                      </h3>
                    </div>

                    {/* Details - Only show when this card is active */}
                    <AnimatePresence>
                      {activeProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4"
                        >
                          {/* Description */}
                          <p className="text-gray-600 mb-4 text-[14px] leading-relaxed">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Technologies:</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.map((tech, idx) => (
                                <motion.span
                                  key={idx}
                                  className="bg-gray-50 px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-200"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.05 }}
                                  whileHover={{ 
                                    scale: 1.1,
                                    backgroundColor: "#fee2e2"
                                  }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Results */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Results:</h4>
                            <motion.ul 
                              className="space-y-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              {project.results.map((result, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="flex items-start text-gray-700 text-[12px] leading-snug"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                >
                                  <motion.svg
                                    className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    animate={{ 
                                      scale: [1, 1.3, 1],
                                    }}
                                    transition={{ 
                                      duration: 0.8,
                                      repeat: Infinity,
                                      delay: idx * 0.2
                                    }}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="3"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </motion.svg>
                                  {result}
                                </motion.li>
                              ))}
                            </motion.ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== FINAL CTA ===== */}
      <motion.section 
        className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.h2 
            className="text-[30px] font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Technology Is Everywhere. <motion.span 
              className="text-red-400"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(248, 113, 113, 0)",
                  "0 0 10px rgba(248, 113, 113, 0.5)",
                  "0 0 0px rgba(248, 113, 113, 0)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity 
              }}
            >
              Ownership Is Rare
            </motion.span>.
          </motion.h2>
          
          <motion.p 
            className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Partner with a team that stays accountable from start to scale.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2
               bg-red-600 text-white
               px-4 py-2 md:px-6 md:py-3
               rounded-full
               font-semibold text-sm md:text-base
               shadow-sm shadow-red-600/20
               hover:bg-red-700
               transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
              <motion.svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ 
                  x: [0, 5, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
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
            className="mt-8 md:mt-10 text-gray-400 text-base px-4 md:px-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            No bots. No runaround. Just real conversations with accountable partners.
          </motion.p>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default RemoteWorkplace;