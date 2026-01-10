import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";

function Technology() {
  const [activeTab, setActiveTab] = useState('strategy');
  const [activeService, setActiveService] = useState(null);
  const [activeStudy, setActiveStudy] = useState(null);

  const consultingServices = [
    {
      icon: "🎯",
      title: "Digital Transformation",
      description: "Guide your organization through comprehensive digital transformation initiatives",
      features: ["Strategy Development", "Change Management", "Technology Roadmap", "ROI Analysis", "Implementation Planning"]
    },
    {
      icon: "📊",
      title: "IT Strategy & Governance",
      description: "Develop IT strategies aligned with business objectives and governance frameworks",
      features: ["IT Governance", "Strategic Planning", "Budget Optimization", "Vendor Management", "Performance Metrics"]
    },
    {
      icon: "🔍",
      title: "Technology Assessment",
      description: "Comprehensive evaluation of your current technology stack and capabilities",
      features: ["Current State Analysis", "Gap Assessment", "Technology Selection", "Vendor Evaluation", "Best Practices"]
    },
    {
      icon: "🚀",
      title: "Cloud Strategy",
      description: "Strategic planning for cloud adoption, migration, and optimization",
      features: ["Cloud Readiness", "Migration Planning", "Multi-cloud Strategy", "Cost Optimization", "Security Framework"]
    },
    {
      icon: "📈",
      title: "Business Process Optimization",
      description: "Streamline operations and improve efficiency through process redesign",
      features: ["Process Mapping", "Automation Opportunities", "Workflow Analysis", "KPI Definition", "Continuous Improvement"]
    },
    {
      icon: "🛡️",
      title: "Cybersecurity Advisory",
      description: "Strategic guidance to strengthen your security posture and compliance",
      features: ["Risk Assessment", "Security Framework", "Compliance Strategy", "Incident Response", "Security Awareness"]
    },
    {
      icon: "🤖",
      title: "AI & Analytics Strategy",
      description: "Strategic planning for AI implementation and data-driven decision making",
      features: ["AI Roadmap", "Data Strategy", "Use Case Identification", "ROI Analysis", "Implementation Guidance"]
    },
    {
      icon: "👥",
      title: "Organizational Change",
      description: "Manage people and cultural aspects of technology transformations",
      features: ["Change Management", "Training Programs", "Communication Strategy", "Stakeholder Engagement", "Culture Assessment"]
    }
  ];

  const expertiseAreas = {
    strategy: [
      { name: "Digital Strategy", level: "Expert" },
      { name: "Business Analysis", level: "Advanced" },
      { name: "IT Governance", level: "Expert" },
      { name: "Vendor Selection", level: "Advanced" },
      { name: "Cost Optimization", level: "Expert" },
      { name: "Risk Management", level: "Advanced" }
    ],
    architecture: [
      { name: "Enterprise Architecture", level: "Expert" },
      { name: "Microservices", level: "Advanced" },
      { name: "API Strategy", level: "Expert" },
      { name: "System Integration", level: "Advanced" },
      { name: "Scalability Design", level: "Expert" },
      { name: "Legacy Modernization", level: "Advanced" }
    ],
    cloud: [
      { name: "AWS", level: "Expert" },
      { name: "Azure", level: "Advanced" },
      { name: "Google Cloud", level: "Intermediate" },
      { name: "Cloud Migration", level: "Expert" },
      { name: "Container Strategy", level: "Advanced" },
      { name: "Serverless Architecture", level: "Advanced" }
    ]
  };

  const caseStudies = [
    {
      id: 1,
      title: "Global Retail Digital Transformation",
      description: "Led digital transformation initiative for Fortune 500 retail chain across 30 countries",
      category: "Digital Transformation",
      tech: ["Cloud Migration", "Microservices", "AI/ML", "IoT", "Mobile Apps"],
      results: ["$500M annual cost savings", "Customer satisfaction increased by 40%", "Digital revenue grew by 300%"]
    },
    {
      id: 2,
      title: "Healthcare System Modernization",
      description: "Modernized legacy healthcare system for better patient care and operational efficiency",
      category: "Healthcare IT",
      tech: ["Electronic Health Records", "Telemedicine", "Data Analytics", "HIPAA Compliance", "Cloud Infrastructure"],
      results: ["Patient wait times reduced by 60%", "Operational costs decreased by 35%", "Patient outcomes improved by 25%"]
    },
    {
      id: 3,
      title: "Financial Services Innovation",
      description: "Developed innovative fintech solutions for leading banking institution",
      category: "FinTech",
      tech: ["Blockchain", "Open Banking APIs", "AI Fraud Detection", "Mobile Banking", "Cloud Security"],
      results: ["Fraud detection accuracy improved to 99.9%", "Customer acquisition increased by 200%", "Operational efficiency improved by 50%"]
    },
    {
      id: 4,
      title: "Manufacturing 4.0 Implementation",
      description: "Implemented Industry 4.0 solutions for smart manufacturing operations",
      category: "Smart Manufacturing",
      tech: ["IoT Sensors", "Predictive Maintenance", "Robotic Automation", "Data Analytics", "Supply Chain AI"],
      results: ["Production efficiency increased by 45%", "Equipment downtime reduced by 70%", "Quality defects decreased by 80%"]
    },
    {
      id: 5,
      title: "Education Technology Platform",
      description: "Built comprehensive edtech platform for global education provider",
      category: "EdTech",
      tech: ["Learning Management System", "AI Tutoring", "Video Streaming", "Assessment Tools", "Mobile Learning"],
      results: ["Student engagement increased by 300%", "Learning outcomes improved by 40%", "Scaled to 2M+ students globally"]
    },
    {
      id: 6,
      title: "Energy Sector Digitalization",
      description: "Digital transformation for renewable energy company's operations",
      category: "Energy Tech",
      tech: ["Smart Grid", "Predictive Analytics", "IoT Monitoring", "Cloud Computing", "Data Visualization"],
      results: ["Energy production optimized by 30%", "Maintenance costs reduced by 50%", "Carbon footprint reduced by 25%"]
    },
    {
      id: 7,
      title: "Logistics & Supply Chain Optimization",
      description: "Optimized global supply chain operations with AI and data analytics",
      category: "Supply Chain",
      tech: ["Supply Chain AI", "Route Optimization", "Inventory Management", "Blockchain Tracking", "Real-time Analytics"],
      results: ["Delivery times reduced by 40%", "Supply chain costs decreased by 35%", "Inventory accuracy improved to 99.5%"]
    },
    {
      id: 8,
      title: "Media & Entertainment Platform",
      description: "Built next-generation media platform for content streaming and distribution",
      category: "Media Tech",
      tech: ["Content Delivery Network", "Video Streaming", "Personalization AI", "Digital Rights Management", "Analytics"],
      results: ["Viewer engagement increased by 250%", "Content delivery costs reduced by 40%", "Subscriber growth of 300%"]
    }
  ];

  const advisoryProcess = [
    {
      step: "01",
      title: "Discovery & Assessment",
      description: "Comprehensive analysis of current technology landscape and business needs",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "Creating tailored technology roadmap aligned with business objectives",
      icon: "🗺️"
    },
    {
      step: "03",
      title: "Architecture Design",
      description: "Designing scalable, secure, and future-proof technical solutions",
      icon: "🏛️"
    },
    {
      step: "04",
      title: "Implementation Planning",
      description: "Detailed execution plan with timelines, resources, and milestones",
      icon: "📅"
    },
    {
      step: "05",
      title: "Change Management",
      description: "Guiding teams through technology adoption and process changes",
      icon: "👥"
    },
    {
      step: "06",
      title: "Ongoing Advisory",
      description: "Continuous support, optimization, and strategic guidance",
      icon: "🔄"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  const expandCardVariants = {
    initial: { height: "140px" },
    expanded: {
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const fadeInUpVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInVariants = {
    initial: { x: -50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic1.jpg"
            alt="Technology Consulting Background"
            className="w-full h-full object-cover"
          />
        </div>

        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10"
          initial="initial"
          animate="animate"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <motion.div 
              className="text-left"
              variants={slideInVariants}
            >
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <span className="text-gray-900">
                  Technology
                </span>
                <br />
                <span className="mt-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-gray-800 to-red-500">
                  Consulting & Advisory
                </span>
              </motion.h1>

              <motion.p 
                className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                IT strategy, architecture, and digital advisory services that transform businesses through technology innovation with clear ownership and strategic vision.
              </motion.p>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ x: 50, opacity: 0, rotateY: 10 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/it-consulting.jpeg"
                alt="Technology Consulting"
                className="w-full max-w-lg rounded-xl shadow-xl border border-gray-200"
              />
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: "🏢", value: "100+", label: "Enterprise Clients" },
              { icon: "💼", value: "15+", label: "Years Experience" },
              { icon: "📈", value: "40%", label: "Avg. Cost Savings" },
              { icon: "✅", value: "98%", label: "Client Retention" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              >
                <div className="text-red-600 mb-3 text-2xl">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="relative py-12 md:py-16">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/picc.avif" 
            alt="Consulting Expertise Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Our Consulting <span className="text-red-600">Expertise</span>
            </h2>
            <p className="text-gray-900 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Strategic technology advisory services that drive business growth and digital transformation
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {consultingServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  animate={activeService === index ? "expanded" : "initial"}
                  className={`group relative cursor-pointer flex flex-col ${activeService === index
                    ? 'rounded-xl border-red-600 shadow-lg bg-white'
                    : 'rounded-lg border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  style={{
                    borderWidth: '1px',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  <motion.div 
                    className="flex flex-col h-full p-4"
                    animate={{
                      height: activeService === index ? 'auto' : '140px',
                      padding: activeService === index ? '1.5rem' : '1rem',
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    {/* Icon and Title Container */}
                    <motion.div 
                      className={`flex flex-col items-center justify-center flex-1 ${activeService === index ? '' : 'h-full'}`}
                      animate={{
                        scale: activeService === index ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Icon */}
                      <motion.div 
                        className="text-red-600 mb-3"
                        animate={{
                          scale: activeService === index ? 1.2 : 1,
                          marginBottom: activeService === index ? '0.75rem' : '1rem'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-2xl">{service.icon}</div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3 
                        className="text-center font-bold text-gray-900"
                        animate={{
                          fontSize: activeService === index ? '17px' : '14px'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.title}
                      </motion.h3>
                    </motion.div>

                    {/* Details - Animated with AnimatePresence */}
                    <AnimatePresence>
                      {activeService === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4 },
                              opacity: { duration: 0.3, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3 },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4">
                            {/* Description */}
                            <motion.p 
                              className="text-gray-600 mb-4 text-[14px] leading-relaxed text-center"
                              initial={{ y: -10 }}
                              animate={{ y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {service.description}
                            </motion.p>

                            {/* Features */}
                            <motion.ul 
                              className="space-y-2 mb-4"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                              {service.features.map((feature, i) => (
                                <motion.li 
                                  key={i} 
                                  className="flex items-start text-[13px] leading-snug"
                                  variants={itemVariants}
                                >
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                                  <span className="text-gray-700">{feature}</span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== EXPERTISE AREAS SECTION ===== */}
      <section className="relative py-20">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic3.jpg"
            alt="Expertise Areas Background"
            className="w-full h-full object-cover opacity-35"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Specialized <span className="text-red-600">Expertise Areas</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Deep knowledge across technology domains to provide comprehensive advisory
            </p>
          </motion.div>

          <div className="mb-8">
            <motion.div 
              className="flex flex-wrap gap-4 justify-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {['strategy', 'architecture', 'cloud'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === tab
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </motion.div>

            <motion.div 
              key={activeTab}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {expertiseAreas[activeTab].map((expertise, index) => (
                <motion.div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all text-center"
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {expertise.name}
                  </div>
                  <div className={`text-sm font-medium ${expertise.level === 'Expert' ? 'text-green-600' :
                    expertise.level === 'Advanced' ? 'text-red-600' :
                      'text-amber-600'
                    }`}>
                    {expertise.level}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ADVISORY PROCESS SECTION ===== */}
      <section className="relative py-20">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/imggg1.jpg" 
            alt="Advisory Process Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Advisory <span className="text-red-600">Process</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A structured methodology that ensures technology investments deliver maximum business value
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {advisoryProcess.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className="text-3xl font-bold text-gray-300"
                    initial={{ rotate: -10, opacity: 0 }}
                    whileInView={{ rotate: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {step.step}
                  </motion.div>
                  <motion.div 
                    className="text-2xl"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: index * 0.1 }}
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
      </section>

      {/* ===== CASE STUDIES SECTION ===== */}
      <section className="relative py-12 md:py-16" id="case-studies">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/greyy.avif"
            alt="Success Stories Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Success <span className="text-red-600">Stories</span>
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Real-world technology consulting engagements that delivered measurable business impact
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {caseStudies.map((study) => (
                <motion.div
                  key={study.id}
                  variants={cardVariants}
                  initial="initial"
                  whileHover="hover"
                  animate={activeStudy === study.id ? "expanded" : "initial"}
                  className={`group relative cursor-pointer flex flex-col ${activeStudy === study.id
                    ? 'rounded-xl border-red-600 shadow-lg bg-white'
                    : 'rounded-lg border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  style={{
                    borderWidth: '1px',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={() => setActiveStudy(study.id)}
                  onMouseLeave={() => setActiveStudy(null)}
                >
                  <motion.div 
                    className="flex flex-col h-full p-4"
                    animate={{
                      height: activeStudy === study.id ? 'auto' : '140px',
                      padding: activeStudy === study.id ? '1.5rem' : '1rem',
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                  >
                    {/* Main Content Container */}
                    <motion.div 
                      className={`flex flex-col items-center justify-center flex-1 ${activeStudy === study.id ? '' : 'h-full'}`}
                      animate={{
                        scale: activeStudy === study.id ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Category Badge */}
                      <motion.div 
                        className={`inline-flex items-center gap-1.5 ${activeStudy === study.id ? 'mb-4' : 'mb-3'}`}
                        animate={{
                          scale: activeStudy === study.id ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {study.category}
                        </div>
                      </motion.div>

                      {/* Title */}
                      <motion.h3 
                        className="text-center font-bold text-gray-900"
                        animate={{
                          fontSize: activeStudy === study.id ? '17px' : '14px'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {study.title}
                      </motion.h3>
                    </motion.div>

                    {/* Details - Animated with AnimatePresence */}
                    <AnimatePresence>
                      {activeStudy === study.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ 
                            height: "auto", 
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4 },
                              opacity: { duration: 0.3, delay: 0.1 }
                            }
                          }}
                          exit={{ 
                            height: 0, 
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3 },
                              opacity: { duration: 0.2 }
                            }
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4">
                            {/* Description */}
                            <motion.p 
                              className="text-gray-600 mb-4 text-[14px] leading-relaxed"
                              initial={{ y: -10 }}
                              animate={{ y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {study.description}
                            </motion.p>

                            {/* Technologies */}
                            <motion.div 
                              className="mb-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Technologies:</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {study.tech.map((tech, idx) => (
                                  <motion.span
                                    key={idx}
                                    className="bg-gray-50 px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-200"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 + idx * 0.05 }}
                                  >
                                    {tech}
                                  </motion.span>
                                ))}
                              </div>
                            </motion.div>

                            {/* Business Outcomes */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Business Outcomes:</h4>
                              <ul className="space-y-2">
                                {study.results.map((result, idx) => (
                                  <motion.li 
                                    key={idx} 
                                    className="flex items-start text-gray-700 text-[12px] leading-snug"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 + idx * 0.1 }}
                                  >
                                    <motion.svg
                                      className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.7 + idx * 0.1 }}
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
                              </ul>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-[30px] font-bold mb-4 md:mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Technology Is Everywhere. <span className="text-red-400">Ownership Is Rare</span>.
          </motion.h2>
          <motion.p 
            className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Partner with a team that stays accountable from start to scale.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
              <motion.svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: -5, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            No bots. No runaround. Just real conversations with accountable partners.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}

export default Technology;