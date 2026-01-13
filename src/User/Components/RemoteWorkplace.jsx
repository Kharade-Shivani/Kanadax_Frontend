import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

function RemoteWorkplace() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('collaboration');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [stats, setStats] = useState({
    support: 0,
    security: 0,
    setups: 0,
    uptime: 0
  });

  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            setIsVisible(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Animate stats counter
  useEffect(() => {
    if (!isVisible.hero) return;

    const finalStats = {
      support: 24,
      security: 100,
      setups: 100,
      uptime: 99.9
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const counters = {};
    Object.keys(finalStats).forEach(key => {
      counters[key] = setInterval(() => {
        setStats(prev => {
          const current = prev[key];
          const target = finalStats[key];
          const increment = (target - current) / 10;
          return {
            ...prev,
            [key]: current + increment > target ? target : current + increment
          };
        });
      }, interval);
    });

    setTimeout(() => {
      Object.values(counters).forEach(clearInterval);
      setStats(finalStats);
    }, duration);

    return () => {
      Object.values(counters).forEach(clearInterval);
    };
  }, [isVisible.hero]);

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
      title: t('remoteWorkplacePage.services.items.0.title'),
      description: t('remoteWorkplacePage.services.items.0.description'),
      features: [
        t('remoteWorkplacePage.services.items.0.features.0'),
        t('remoteWorkplacePage.services.items.0.features.1'),
        t('remoteWorkplacePage.services.items.0.features.2'),
        t('remoteWorkplacePage.services.items.0.features.3'),
        t('remoteWorkplacePage.services.items.0.features.4')
      ]
    },
    {
      icon: "🔒",
      title: t('remoteWorkplacePage.services.items.1.title'),
      description: t('remoteWorkplacePage.services.items.1.description'),
      features: [
        t('remoteWorkplacePage.services.items.1.features.0'),
        t('remoteWorkplacePage.services.items.1.features.1'),
        t('remoteWorkplacePage.services.items.1.features.2'),
        t('remoteWorkplacePage.services.items.1.features.3'),
        t('remoteWorkplacePage.services.items.1.features.4')
      ]
    },
    {
      icon: "🤝",
      title: t('remoteWorkplacePage.services.items.2.title'),
      description: t('remoteWorkplacePage.services.items.2.description'),
      features: [
        t('remoteWorkplacePage.services.items.2.features.0'),
        t('remoteWorkplacePage.services.items.2.features.1'),
        t('remoteWorkplacePage.services.items.2.features.2'),
        t('remoteWorkplacePage.services.items.2.features.3'),
        t('remoteWorkplacePage.services.items.2.features.4')
      ]
    },
    {
      icon: "🔄",
      title: t('remoteWorkplacePage.services.items.3.title'),
      description: t('remoteWorkplacePage.services.items.3.description'),
      features: [
        t('remoteWorkplacePage.services.items.3.features.0'),
        t('remoteWorkplacePage.services.items.3.features.1'),
        t('remoteWorkplacePage.services.items.3.features.2'),
        t('remoteWorkplacePage.services.items.3.features.3'),
        t('remoteWorkplacePage.services.items.3.features.4')
      ]
    },
    {
      icon: "🏠",
      title: t('remoteWorkplacePage.services.items.4.title'),
      description: t('remoteWorkplacePage.services.items.4.description'),
      features: [
        t('remoteWorkplacePage.services.items.4.features.0'),
        t('remoteWorkplacePage.services.items.4.features.1'),
        t('remoteWorkplacePage.services.items.4.features.2'),
        t('remoteWorkplacePage.services.items.4.features.3'),
        t('remoteWorkplacePage.services.items.4.features.4')
      ]
    },
    {
      icon: "📚",
      title: t('remoteWorkplacePage.services.items.5.title'),
      description: t('remoteWorkplacePage.services.items.5.description'),
      features: [
        t('remoteWorkplacePage.services.items.5.features.0'),
        t('remoteWorkplacePage.services.items.5.features.1'),
        t('remoteWorkplacePage.services.items.5.features.2'),
        t('remoteWorkplacePage.services.items.5.features.3'),
        t('remoteWorkplacePage.services.items.5.features.4')
      ]
    },
    {
      icon: "⚖️",
      title: t('remoteWorkplacePage.services.items.6.title'),
      description: t('remoteWorkplacePage.services.items.6.description'),
      features: [
        t('remoteWorkplacePage.services.items.6.features.0'),
        t('remoteWorkplacePage.services.items.6.features.1'),
        t('remoteWorkplacePage.services.items.6.features.2'),
        t('remoteWorkplacePage.services.items.6.features.3'),
        t('remoteWorkplacePage.services.items.6.features.4')
      ]
    },
    {
      icon: "📊",
      title: t('remoteWorkplacePage.services.items.7.title'),
      description: t('remoteWorkplacePage.services.items.7.description'),
      features: [
        t('remoteWorkplacePage.services.items.7.features.0'),
        t('remoteWorkplacePage.services.items.7.features.1'),
        t('remoteWorkplacePage.services.items.7.features.2'),
        t('remoteWorkplacePage.services.items.7.features.3'),
        t('remoteWorkplacePage.services.items.7.features.4')
      ]
    }
  ];

  const techStack = {
    collaboration: [
      { name: "Microsoft 365", level: t('remoteWorkplacePage.techStack.levels.expert') },
      { name: "Google Workspace", level: t('remoteWorkplacePage.techStack.levels.advanced') },
      { name: "Slack", level: t('remoteWorkplacePage.techStack.levels.advanced') },
      { name: "Zoom", level: t('remoteWorkplacePage.techStack.levels.expert') },
      { name: "Teams", level: t('remoteWorkplacePage.techStack.levels.expert') },
      { name: "Notion", level: t('remoteWorkplacePage.techStack.levels.advanced') }
    ],
    security: [
      { name: "Zero Trust", level: t('remoteWorkplacePage.techStack.levels.advanced') },
      { name: "VPN Solutions", level: t('remoteWorkplacePage.techStack.levels.expert') },
      { name: "MFA/2FA", level: t('remoteWorkplacePage.techStack.levels.expert') },
      { name: "Endpoint Security", level: t('remoteWorkplacePage.techStack.levels.advanced') },
      { name: "SIEM", level: t('remoteWorkplacePage.techStack.levels.intermediate') },
      { name: "DLP", level: t('remoteWorkplacePage.techStack.levels.advanced') }
    ],
    infrastructure: [
      { name: "VDI", level: t('remoteWorkplacePage.techStack.levels.advanced') },
      { name: "Citrix", level: t('remoteWorkplacePage.techStack.levels.intermediate') },
      { name: "VMware", level: t('remoteWorkplacePage.techStack.levels.intermediate') },
      { name: "AWS Workspaces", level: t('remoteWorkplacePage.techStack.levels.advanced') },
      { name: "Azure Virtual Desktop", level: t('remoteWorkplacePage.techStack.levels.advanced') },
      { name: "RMM Tools", level: t('remoteWorkplacePage.techStack.levels.expert') }
    ]
  };

  const remoteProjects = [
    {
      id: 1,
      title: t('remoteWorkplacePage.projects.items.0.title'),
      description: t('remoteWorkplacePage.projects.items.0.description'),
      category: t('remoteWorkplacePage.projects.items.0.category'),
      tech: ["Microsoft 365", "Zoom", "Slack", "Okta", "VPN Infrastructure"],
      results: [
        t('remoteWorkplacePage.projects.items.0.results.0'),
        t('remoteWorkplacePage.projects.items.0.results.1'),
        t('remoteWorkplacePage.projects.items.0.results.2')
      ]
    },
    {
      id: 2,
      title: t('remoteWorkplacePage.projects.items.1.title'),
      description: t('remoteWorkplacePage.projects.items.1.description'),
      category: t('remoteWorkplacePage.projects.items.1.category'),
      tech: ["Virtual Desktop Infrastructure", "Multi-factor Authentication", "Endpoint Security", "Compliance Monitoring", "Encrypted Communications"],
      results: [
        t('remoteWorkplacePage.projects.items.1.results.0'),
        t('remoteWorkplacePage.projects.items.1.results.1'),
        t('remoteWorkplacePage.projects.items.1.results.2')
      ]
    },
    {
      id: 3,
      title: t('remoteWorkplacePage.projects.items.2.title'),
      description: t('remoteWorkplacePage.projects.items.2.description'),
      category: t('remoteWorkplacePage.projects.items.2.category'),
      tech: ["HIPAA-compliant VPN", "Secure Video Conferencing", "Electronic Health Records", "Encrypted Messaging", "Access Control"],
      results: [
        t('remoteWorkplacePage.projects.items.2.results.0'),
        t('remoteWorkplacePage.projects.items.2.results.1'),
        t('remoteWorkplacePage.projects.items.2.results.2')
      ]
    },
    {
      id: 4,
      title: t('remoteWorkplacePage.projects.items.3.title'),
      description: t('remoteWorkplacePage.projects.items.3.description'),
      category: t('remoteWorkplacePage.projects.items.3.category'),
      tech: ["Notion", "Figma", "GitHub", "Slack", "Google Workspace"],
      results: [
        t('remoteWorkplacePage.projects.items.3.results.0'),
        t('remoteWorkplacePage.projects.items.3.results.1'),
        t('remoteWorkplacePage.projects.items.3.results.2')
      ]
    },
    {
      id: 5,
      title: t('remoteWorkplacePage.projects.items.4.title'),
      description: t('remoteWorkplacePage.projects.items.4.description'),
      category: t('remoteWorkplacePage.projects.items.4.category'),
      tech: ["IoT Monitoring", "Cloud ERP", "Collaboration Tools", "Productivity Analytics", "Remote Training"],
      results: [
        t('remoteWorkplacePage.projects.items.4.results.0'),
        t('remoteWorkplacePage.projects.items.4.results.1'),
        t('remoteWorkplacePage.projects.items.4.results.2')
      ]
    },
    {
      id: 6,
      title: t('remoteWorkplacePage.projects.items.5.title'),
      description: t('remoteWorkplacePage.projects.items.5.description'),
      category: t('remoteWorkplacePage.projects.items.5.category'),
      tech: ["Learning Management System", "Video Lectures", "Online Assessments", "Virtual Labs", "Parent Portal"],
      results: [
        t('remoteWorkplacePage.projects.items.5.results.0'),
        t('remoteWorkplacePage.projects.items.5.results.1'),
        t('remoteWorkplacePage.projects.items.5.results.2')
      ]
    },
    {
      id: 7,
      title: t('remoteWorkplacePage.projects.items.6.title'),
      description: t('remoteWorkplacePage.projects.items.6.description'),
      category: t('remoteWorkplacePage.projects.items.6.category'),
      tech: ["Global Internet Solutions", "Portable Offices", "Cross-border Compliance", "Time Zone Management", "Client Portal"],
      results: [
        t('remoteWorkplacePage.projects.items.6.results.0'),
        t('remoteWorkplacePage.projects.items.6.results.1'),
        t('remoteWorkplacePage.projects.items.6.results.2')
      ]
    },
    {
      id: 8,
      title: t('remoteWorkplacePage.projects.items.7.title'),
      description: t('remoteWorkplacePage.projects.items.7.description'),
      category: t('remoteWorkplacePage.projects.items.7.category'),
      tech: ["Secure Access Service Edge", "Zero Trust Architecture", "Data Loss Prevention", "Audit Logging", "Disaster Recovery"],
      results: [
        t('remoteWorkplacePage.projects.items.7.results.0'),
        t('remoteWorkplacePage.projects.items.7.results.1'),
        t('remoteWorkplacePage.projects.items.7.results.2')
      ]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: t('remoteWorkplacePage.process.steps.0.title'),
      description: t('remoteWorkplacePage.process.steps.0.description'),
      icon: "📋"
    },
    {
      step: "02",
      title: t('remoteWorkplacePage.process.steps.1.title'),
      description: t('remoteWorkplacePage.process.steps.1.description'),
      icon: "🛡️"
    },
    {
      step: "03",
      title: t('remoteWorkplacePage.process.steps.2.title'),
      description: t('remoteWorkplacePage.process.steps.2.description'),
      icon: "🛠️"
    },
    {
      step: "04",
      title: t('remoteWorkplacePage.process.steps.3.title'),
      description: t('remoteWorkplacePage.process.steps.3.description'),
      icon: "🚀"
    },
    {
      step: "05",
      title: t('remoteWorkplacePage.process.steps.4.title'),
      description: t('remoteWorkplacePage.process.steps.4.description'),
      icon: "👨‍🏫"
    },
    {
      step: "06",
      title: t('remoteWorkplacePage.process.steps.5.title'),
      description: t('remoteWorkplacePage.process.steps.5.description'),
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
      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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
        
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
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
        .animate-stagger.visible > *:nth-child(5) { transition-delay: 0.5s; }
        .animate-stagger.visible > *:nth-child(6) { transition-delay: 0.6s; }
        .animate-stagger.visible > *:nth-child(7) { transition-delay: 0.7s; }
        .animate-stagger.visible > *:nth-child(8) { transition-delay: 0.8s; }
        
        .animate-stagger.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background: linear-gradient(90deg, #dc2626, #4b5563, #dc2626);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 3s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 1000px 100%;
        }
        
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative overflow-hidden py-20 md:py-32"
        ref={el => sectionsRef.current[0] = el}
        data-section-id="hero"
      >
        {/* Background Image with Overlay */}
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
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900">
                  {t('remoteWorkplacePage.hero.title1')}
                </span>
                <br />
                <span className="mt-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-gray-800 to-red-800">
                  {t('remoteWorkplacePage.hero.title2')}
                </span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed">
                {t('remoteWorkplacePage.hero.description')}
              </p>
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

          {/* STATS GRID */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            {[
              { 
                icon: "⌛", 
                value: stats.support.toFixed(1), 
                label: t('remoteWorkplacePage.stats.support'), 
                suffix: "/7" 
              },
              { 
                icon: "🛡️", 
                value: stats.security.toFixed(0), 
                label: t('remoteWorkplacePage.stats.security'), 
                suffix: "%" 
              },
              { 
                icon: "👥", 
                value: stats.setups.toFixed(0), 
                label: t('remoteWorkplacePage.stats.setups'), 
                suffix: "+" 
              },
              { 
                icon: "✅", 
                value: stats.uptime.toFixed(1), 
                label: t('remoteWorkplacePage.stats.uptime'), 
                suffix: "%" 
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
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
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section 
        id="services" 
        className="relative py-12 md:py-16"
        ref={el => sectionsRef.current[1] = el}
        data-section-id="services"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/pic.avif" 
            alt="Remote Workplace Services Background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.services ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              {t('remoteWorkplacePage.services.title')}
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              {t('remoteWorkplacePage.services.subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 animate-stagger ${isVisible.services ? 'visible' : ''}`}>
              {remoteServices.map((service, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeService === index
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
                >
                  <div className="flex flex-col h-full">
                    {/* Icon and Title Container - Always visible */}
                    <div className={`flex flex-col items-center justify-center flex-1 ${activeService === index ? '' : 'h-full'
                      }`}>
                      {/* Icon */}
                      <div className={`text-red-600 transition-all duration-300 ${activeService === index ? 'scale-110 mb-3' : 'scale-100 mb-4'
                        }`}>
                        {service.icon}
                      </div>

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
                          <ul className="space-y-2 mb-4">
                            {service.features.map((feature, i) => (
                              <li 
                                key={i} 
                                className="flex items-start text-[13px] leading-snug opacity-0"
                                style={{animation: `slideInLeft 0.5s ease-out forwards`, animationDelay: `${i * 0.1}s`}}
                              >
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0 animate-pulse"></div>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section 
        className="relative py-20"
        ref={el => sectionsRef.current[2] = el}
        data-section-id="tech-stack"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/pic5.png" 
            alt="Technology Stack Background"
            className="w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible['tech-stack'] ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('remoteWorkplacePage.techStack.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('remoteWorkplacePage.techStack.subtitle')}
            </p>
          </div>

          <div className="mb-8">
            <div className={`flex flex-wrap gap-4 justify-center mb-8 animate-stagger ${isVisible['tech-stack'] ? 'visible' : ''}`}>
              {['collaboration', 'security', 'infrastructure'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/30 animate-pulse'
                      : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-300 hover:border-red-300'
                    }`}
                >
                  {tab === 'collaboration' ? t('remoteWorkplacePage.techStack.tabs.collaboration') : 
                   tab === 'security' ? t('remoteWorkplacePage.techStack.tabs.security') : 
                   t('remoteWorkplacePage.techStack.tabs.infrastructure')}
                </button>
              ))}
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-stagger ${isVisible['tech-stack'] ? 'visible' : ''}`}>
              {techStack[activeTab].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-500 text-center group hover-lift"
                >
                  <div className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors transform group-hover:scale-110 duration-300">
                    {tech.name}
                  </div>
                  <div className={`text-sm font-medium animate-pulse ${tech.level === t('remoteWorkplacePage.techStack.levels.expert') ? 'text-green-600' :
                    tech.level === t('remoteWorkplacePage.techStack.levels.advanced') ? 'text-red-600' :
                      'text-amber-600'
                    }`}>
                    {tech.level}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section 
        className="relative py-20"
        ref={el => sectionsRef.current[3] = el}
        data-section-id="process"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/image.avif" 
            alt="Implementation Process Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible.process ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('remoteWorkplacePage.process.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('remoteWorkplacePage.process.subtitle')}
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger ${isVisible.process ? 'visible' : ''}`}>
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl hover:border-red-300 transition-all duration-500 hover-lift group relative overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-3xl font-bold text-gray-300 group-hover:text-red-500 transition-colors animate-pulse">
                      {step.step}
                    </div>
                    <div className="text-2xl text-red-600 group-hover:scale-110 group-hover:text-red-500 group-hover:rotate-12 transition-all duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section 
        className="relative py-12 md:py-16" 
        id="projects"
        ref={el => sectionsRef.current[4] = el}
        data-section-id="projects"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/picc.avif"
            alt="Success Stories Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.projects ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              {t('remoteWorkplacePage.projects.title')}
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              {t('remoteWorkplacePage.projects.subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {remoteProjects.map((project) => (
                <div
                  key={project.id}
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
                >
                  <div className="flex flex-col h-full">
                    {/* Main Content Container - Always visible */}
                    <div className={`flex flex-col items-center justify-center flex-1 ${activeProject === project.id ? '' : 'h-full'
                      }`}>
                      {/* Category Badge */}
                      <div className={`inline-flex items-center gap-1.5 transition-all duration-300 ${activeProject === project.id ? 'scale-105 mb-4' : 'scale-100 mb-3'
                        }`}>
                        <div className="bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {project.category}
                        </div>
                      </div>

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

                          {/* Results */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">{t('consultingPage.caseStudies.results')}</h4>
                            <div className="space-y-2">
                              {project.results.map((result, idx) => (
                                <div 
                                  key={idx} 
                                  className="flex items-center text-sm text-gray-700 opacity-0"
                                  style={{animation: `slideInLeft 0.5s ease-out forwards`, animationDelay: `${idx * 0.2}s`}}
                                >
                                  <svg 
                                    className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 animate-pulse" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      strokeWidth="3" 
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  {result}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section 
        className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white"
        ref={el => sectionsRef.current[5] = el}
        data-section-id="cta"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 animate-gradient bg-[size:200%_100%]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
          <h2 className={`text-[30px] font-bold mb-4 md:mb-6 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            {t('remoteWorkplacePage.cta.title1')}{" "}
            <span className="text-red-400 animate-pulse">{t('remoteWorkplacePage.cta.title2')}</span>
          </h2>
          <p className={`text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            {t('remoteWorkplacePage.cta.description')}
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-2
               bg-red-600 text-white
               px-4 py-2 md:px-6 md:py-3
               rounded-full
               font-semibold text-sm md:text-base
               shadow-sm shadow-red-600/20
               hover:bg-red-700
               transition-all duration-300
               transform hover:scale-105
               animate-pulse"
            >
              {t('remoteWorkplacePage.cta.button')}
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

          <p className={`mt-8 md:mt-10 text-gray-400 text-base px-4 md:px-0 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            {t('remoteWorkplacePage.cta.subtext')}
          </p>
        </div>
      </section>
    </motion.div>
  );
}

export default RemoteWorkplace;