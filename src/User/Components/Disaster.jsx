import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function DisasterRecovery() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('backup');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [stats, setStats] = useState({
    recoveryTime: 0,
    dataProtection: 0,
    dataLoss: 0,
    compliance: 0
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
      recoveryTime: 1,
      dataProtection: 99.99,
      dataLoss: 0,
      compliance: 100
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

  const disasterServices = [
    {
      icon: "💾",
      title: t('disasterRecoveryPage.services.items.0.title'),
      description: t('disasterRecoveryPage.services.items.0.description'),
      features: [
        t('disasterRecoveryPage.services.items.0.features.0'),
        t('disasterRecoveryPage.services.items.0.features.1'),
        t('disasterRecoveryPage.services.items.0.features.2'),
        t('disasterRecoveryPage.services.items.0.features.3'),
        t('disasterRecoveryPage.services.items.0.features.4')
      ]
    },
    {
      icon: "🔄",
      title: t('disasterRecoveryPage.services.items.1.title'),
      description: t('disasterRecoveryPage.services.items.1.description'),
      features: [
        t('disasterRecoveryPage.services.items.1.features.0'),
        t('disasterRecoveryPage.services.items.1.features.1'),
        t('disasterRecoveryPage.services.items.1.features.2'),
        t('disasterRecoveryPage.services.items.1.features.3'),
        t('disasterRecoveryPage.services.items.1.features.4')
      ]
    },
    {
      icon: "☁️",
      title: t('disasterRecoveryPage.services.items.2.title'),
      description: t('disasterRecoveryPage.services.items.2.description'),
      features: [
        t('disasterRecoveryPage.services.items.2.features.0'),
        t('disasterRecoveryPage.services.items.2.features.1'),
        t('disasterRecoveryPage.services.items.2.features.2'),
        t('disasterRecoveryPage.services.items.2.features.3'),
        t('disasterRecoveryPage.services.items.2.features.4')
      ]
    },
    {
      icon: "🏢",
      title: t('disasterRecoveryPage.services.items.3.title'),
      description: t('disasterRecoveryPage.services.items.3.description'),
      features: [
        t('disasterRecoveryPage.services.items.3.features.0'),
        t('disasterRecoveryPage.services.items.3.features.1'),
        t('disasterRecoveryPage.services.items.3.features.2'),
        t('disasterRecoveryPage.services.items.3.features.3'),
        t('disasterRecoveryPage.services.items.3.features.4')
      ]
    },
    {
      icon: "⚡",
      title: t('disasterRecoveryPage.services.items.4.title'),
      description: t('disasterRecoveryPage.services.items.4.description'),
      features: [
        t('disasterRecoveryPage.services.items.4.features.0'),
        t('disasterRecoveryPage.services.items.4.features.1'),
        t('disasterRecoveryPage.services.items.4.features.2'),
        t('disasterRecoveryPage.services.items.4.features.3'),
        t('disasterRecoveryPage.services.items.4.features.4')
      ]
    },
    {
      icon: "📊",
      title: t('disasterRecoveryPage.services.items.5.title'),
      description: t('disasterRecoveryPage.services.items.5.description'),
      features: [
        t('disasterRecoveryPage.services.items.5.features.0'),
        t('disasterRecoveryPage.services.items.5.features.1'),
        t('disasterRecoveryPage.services.items.5.features.2'),
        t('disasterRecoveryPage.services.items.5.features.3'),
        t('disasterRecoveryPage.services.items.5.features.4')
      ]
    },
    {
      icon: "🛡️",
      title: t('disasterRecoveryPage.services.items.6.title'),
      description: t('disasterRecoveryPage.services.items.6.description'),
      features: [
        t('disasterRecoveryPage.services.items.6.features.0'),
        t('disasterRecoveryPage.services.items.6.features.1'),
        t('disasterRecoveryPage.services.items.6.features.2'),
        t('disasterRecoveryPage.services.items.6.features.3'),
        t('disasterRecoveryPage.services.items.6.features.4')
      ]
    },
    {
      icon: "📋",
      title: t('disasterRecoveryPage.services.items.7.title'),
      description: t('disasterRecoveryPage.services.items.7.description'),
      features: [
        t('disasterRecoveryPage.services.items.7.features.0'),
        t('disasterRecoveryPage.services.items.7.features.1'),
        t('disasterRecoveryPage.services.items.7.features.2'),
        t('disasterRecoveryPage.services.items.7.features.3'),
        t('disasterRecoveryPage.services.items.7.features.4')
      ]
    }
  ];

  const techCapabilities = {
    backup: [
      { name: "Cloud Backup", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "Incremental Backups", level: t('disasterRecoveryPage.techStack.levels.advanced') },
      { name: "Data Encryption", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "Backup Automation", level: t('disasterRecoveryPage.techStack.levels.advanced') },
      { name: "Version Management", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "Cross-Platform", level: t('disasterRecoveryPage.techStack.levels.advanced') }
    ],
    recovery: [
      { name: "Disaster Recovery", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "RTO Optimization", level: t('disasterRecoveryPage.techStack.levels.advanced') },
      { name: "Failover Systems", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "Data Replication", level: t('disasterRecoveryPage.techStack.levels.advanced') },
      { name: "Recovery Testing", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "DR Automation", level: t('disasterRecoveryPage.techStack.levels.advanced') }
    ],
    protection: [
      { name: "Data Encryption", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "Access Control", level: t('disasterRecoveryPage.techStack.levels.advanced') },
      { name: "Compliance", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "Audit Trails", level: t('disasterRecoveryPage.techStack.levels.advanced') },
      { name: "Threat Detection", level: t('disasterRecoveryPage.techStack.levels.expert') },
      { name: "Security Policies", level: t('disasterRecoveryPage.techStack.levels.advanced') }
    ]
  };

  const disasterProjects = [
    {
      id: 1,
      title: t('disasterRecoveryPage.projects.items.0.title'),
      description: t('disasterRecoveryPage.projects.items.0.description'),
      category: t('disasterRecoveryPage.projects.items.0.category'),
      results: [
        t('disasterRecoveryPage.projects.items.0.results.0'),
        t('disasterRecoveryPage.projects.items.0.results.1'),
        t('disasterRecoveryPage.projects.items.0.results.2')
      ]
    },
    {
      id: 2,
      title: t('disasterRecoveryPage.projects.items.1.title'),
      description: t('disasterRecoveryPage.projects.items.1.description'),
      category: t('disasterRecoveryPage.projects.items.1.category'),
      results: [
        t('disasterRecoveryPage.projects.items.1.results.0'),
        t('disasterRecoveryPage.projects.items.1.results.1'),
        t('disasterRecoveryPage.projects.items.1.results.2')
      ]
    },
    {
      id: 3,
      title: t('disasterRecoveryPage.projects.items.2.title'),
      description: t('disasterRecoveryPage.projects.items.2.description'),
      category: t('disasterRecoveryPage.projects.items.2.category'),
      results: [
        t('disasterRecoveryPage.projects.items.2.results.0'),
        t('disasterRecoveryPage.projects.items.2.results.1'),
        t('disasterRecoveryPage.projects.items.2.results.2')
      ]
    },
    {
      id: 4,
      title: t('disasterRecoveryPage.projects.items.3.title'),
      description: t('disasterRecoveryPage.projects.items.3.description'),
      category: t('disasterRecoveryPage.projects.items.3.category'),
      results: [
        t('disasterRecoveryPage.projects.items.3.results.0'),
        t('disasterRecoveryPage.projects.items.3.results.1'),
        t('disasterRecoveryPage.projects.items.3.results.2')
      ]
    },
    {
      id: 5,
      title: t('disasterRecoveryPage.projects.items.4.title'),
      description: t('disasterRecoveryPage.projects.items.4.description'),
      category: t('disasterRecoveryPage.projects.items.4.category'),
      results: [
        t('disasterRecoveryPage.projects.items.4.results.0'),
        t('disasterRecoveryPage.projects.items.4.results.1'),
        t('disasterRecoveryPage.projects.items.4.results.2')
      ]
    },
    {
      id: 6,
      title: t('disasterRecoveryPage.projects.items.5.title'),
      description: t('disasterRecoveryPage.projects.items.5.description'),
      category: t('disasterRecoveryPage.projects.items.5.category'),
      results: [
        t('disasterRecoveryPage.projects.items.5.results.0'),
        t('disasterRecoveryPage.projects.items.5.results.1'),
        t('disasterRecoveryPage.projects.items.5.results.2')
      ]
    },
    {
      id: 7,
      title: t('disasterRecoveryPage.projects.items.6.title'),
      description: t('disasterRecoveryPage.projects.items.6.description'),
      category: t('disasterRecoveryPage.projects.items.6.category'),
      results: [
        t('disasterRecoveryPage.projects.items.6.results.0'),
        t('disasterRecoveryPage.projects.items.6.results.1'),
        t('disasterRecoveryPage.projects.items.6.results.2')
      ]
    },
    {
      id: 8,
      title: t('disasterRecoveryPage.projects.items.7.title'),
      description: t('disasterRecoveryPage.projects.items.7.description'),
      category: t('disasterRecoveryPage.projects.items.7.category'),
      results: [
        t('disasterRecoveryPage.projects.items.7.results.0'),
        t('disasterRecoveryPage.projects.items.7.results.1'),
        t('disasterRecoveryPage.projects.items.7.results.2')
      ]
    }
  ];

  const recoveryProcess = [
    {
      step: "01",
      title: t('disasterRecoveryPage.process.steps.0.title'),
      description: t('disasterRecoveryPage.process.steps.0.description'),
      icon: "🔍"
    },
    {
      step: "02",
      title: t('disasterRecoveryPage.process.steps.1.title'),
      description: t('disasterRecoveryPage.process.steps.1.description'),
      icon: "📋"
    },
    {
      step: "03",
      title: t('disasterRecoveryPage.process.steps.2.title'),
      description: t('disasterRecoveryPage.process.steps.2.description'),
      icon: "🚀"
    },
    {
      step: "04",
      title: t('disasterRecoveryPage.process.steps.3.title'),
      description: t('disasterRecoveryPage.process.steps.3.description'),
      icon: "🧪"
    },
    {
      step: "05",
      title: t('disasterRecoveryPage.process.steps.4.title'),
      description: t('disasterRecoveryPage.process.steps.4.description'),
      icon: "👁️"
    },
    {
      step: "06",
      title: t('disasterRecoveryPage.process.steps.5.title'),
      description: t('disasterRecoveryPage.process.steps.5.description'),
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideUpFast {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes slowZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
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
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-slowZoom {
          animation: slowZoom 20s ease-in-out infinite alternate;
        }
        
        .animate-spin {
          animation: spin 3s linear infinite;
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
        <div className="absolute inset-0 z-0">
          <img
            src="/pic1.jpg" 
            alt="Backup & Disaster Recovery Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-on-scroll ${isVisible.hero ? 'visible' : ''}`}>
            {/* LEFT CONTENT */}
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900">
                  {t('disasterRecoveryPage.hero.title1')}
                </span>
                <br />
                <span className="mt-2 inline-block text-red-800 animate-pulse">
                  {t('disasterRecoveryPage.hero.title2')}
                </span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed">
                {t('disasterRecoveryPage.hero.description')}
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/disaster.jpg"
                alt="Backup & Disaster Recovery"
                className="w-full max-w-lg rounded-xl shadow-xl border border-gray-200 transform hover:scale-105 transition-transform duration-500 animate-float"
              />
            </div>
          </div>

          {/* STATS GRID */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-stagger ${isVisible.hero ? 'visible' : ''}`}>
            {[
              { 
                icon: "⚡", 
                value: stats.recoveryTime.toFixed(1), 
                label: t('disasterRecoveryPage.stats.recoveryTime'), 
                suffix: " Hour" 
              },
              { 
                icon: "🔒", 
                value: stats.dataProtection.toFixed(2), 
                label: t('disasterRecoveryPage.stats.dataProtection'), 
                suffix: "%" 
              },
              { 
                icon: "💾", 
                value: stats.dataLoss.toFixed(0), 
                label: t('disasterRecoveryPage.stats.dataLoss'), 
                suffix: "" 
              },
              { 
                icon: "✅", 
                value: stats.compliance.toFixed(0), 
                label: t('disasterRecoveryPage.stats.compliance'), 
                suffix: "%" 
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 hover-lift group"
              >
                <div className="text-red-600 mb-3 text-2xl animate-bounce">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
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
            src="/picc.avif" 
            alt="Recovery Services Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.services ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              {t('disasterRecoveryPage.services.title')}
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              {t('disasterRecoveryPage.services.subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 animate-stagger ${isVisible.services ? 'visible' : ''}`}>
              {disasterServices.map((service, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeService === index
                      ? 'rounded-xl border-red-600 shadow-lg bg-white transform scale-105'
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
                    {/* Icon and Title Container */}
                    <div className={`flex flex-col items-center justify-center flex-1 ${activeService === index ? '' : 'h-full'
                      }`}>
                      {/* Icon */}
                      <div className={`text-red-600 transition-all duration-300 ${activeService === index ? 'scale-110 mb-3' : 'scale-100 mb-4'
                        }`}>
                        <div className="transform hover:rotate-12 transition-transform duration-300">
                          {service.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-center font-bold text-gray-900 transition-all duration-300 ${activeService === index
                        ? 'text-[17px] transform scale-105'
                        : 'text-[14px]'
                        }`}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Details */}
                    {activeService === index && (
                      <div className="mt-4">
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed text-center">
                          {service.description}
                        </p>

                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <li 
                              key={i} 
                              className="flex items-start text-[13px] leading-snug transform hover:translate-x-2 transition-transform duration-300 opacity-0"
                              style={{animation: `slideUpFast 0.5s ease-out forwards`, animationDelay: `${i * 0.1}s`}}
                            >
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0 animate-pulse"></div>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES SECTION ===== */}
      <section 
        className="relative py-20"
        ref={el => sectionsRef.current[2] = el}
        data-section-id="capabilities"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/green.avif" 
            alt="Advanced Capabilities Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible.capabilities ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('disasterRecoveryPage.techStack.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('disasterRecoveryPage.techStack.subtitle')}
            </p>
          </div>

          <div className="mb-8">
            <div className={`flex flex-wrap gap-4 justify-center mb-8 animate-stagger ${isVisible.capabilities ? 'visible' : ''}`}>
              {['backup', 'recovery', 'protection'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-pulse'
                      : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-300 hover:border-red-300'
                    }`}
                >
                  {tab === 'backup' ? t('disasterRecoveryPage.techStack.tabs.backup') : 
                   tab === 'recovery' ? t('disasterRecoveryPage.techStack.tabs.recovery') : 
                   t('disasterRecoveryPage.techStack.tabs.protection')}
                </button>
              ))}
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-stagger ${isVisible.capabilities ? 'visible' : ''}`}>
              {techCapabilities[activeTab].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 hover-lift text-center group"
                >
                  <div className="text-lg font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tech.name}
                  </div>
                  <div className={`text-sm font-medium transform hover:scale-125 transition-transform duration-300 ${tech.level === t('disasterRecoveryPage.techStack.levels.expert') ? 'text-green-600 animate-bounce' :
                    tech.level === t('disasterRecoveryPage.techStack.levels.advanced') ? 'text-blue-600 animate-bounce' :
                      'text-amber-600 animate-bounce'
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
            src="/imggg1.jpg" 
            alt="Recovery Process Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible.process ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('disasterRecoveryPage.process.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('disasterRecoveryPage.process.subtitle')}
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger ${isVisible.process ? 'visible' : ''}`}>
            {recoveryProcess.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl font-bold text-gray-300 transform group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 transform group-hover:translate-x-2 transition-transform duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 transform group-hover:translate-x-1 transition-transform duration-300">
                  {step.description}
                </p>
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
            src="/imagee.jpg"
            alt="Recovery Success Stories Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.projects ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              {t('disasterRecoveryPage.projects.title')}
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              {t('disasterRecoveryPage.projects.subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {disasterProjects.map((project) => (
                <div
                  key={project.id}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${activeProject === project.id
                    ? 'rounded-xl border-red-600 shadow-lg bg-white transform scale-105'
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
                    {/* Main Content Container */}
                    <div className={`flex flex-col items-center justify-center flex-1 ${activeProject === project.id ? '' : 'h-full'
                      }`}>
                      {/* Category Badge */}
                      <div className={`inline-flex items-center gap-1.5 transition-all duration-300 ${activeProject === project.id ? 'scale-105 mb-4' : 'scale-100 mb-3'
                        }`}>
                        <div className="bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium transform hover:scale-110 transition-transform duration-300">
                          {project.category}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-center font-bold text-gray-900 transition-all duration-300 ${activeProject === project.id
                        ? 'text-[17px] transform scale-105'
                        : 'text-[14px]'
                        }`}>
                        {project.title}
                      </h3>
                    </div>

                    {/* Details */}
                    {activeProject === project.id && (
                      <div className="mt-4">
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed transform hover:translate-x-1 transition-transform duration-300">
                          {project.description}
                        </p>

                        {/* Key Results */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px] transform hover:translate-x-1 transition-transform duration-300">
                            {t('disasterRecoveryPage.projects.results')}
                          </h4>
                          <ul className="space-y-2">
                            {project.results.map((result, idx) => (
                              <li 
                                key={idx} 
                                className="flex items-start text-gray-700 text-[12px] leading-snug transform hover:translate-x-2 transition-transform duration-300 opacity-0"
                                style={{animation: `slideUpFast 0.5s ease-out forwards`, animationDelay: `${idx * 0.2}s`}}
                              >
                                <svg
                                  className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0 animate-spin"
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
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className={`text-[30px] font-bold mb-4 md:mb-6 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            {t('disasterRecoveryPage.cta.title1')}{" "}
            <span className="text-red-400 animate-pulse">{t('disasterRecoveryPage.cta.title2')}</span>
          </h2>
          <p className={`text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            {t('disasterRecoveryPage.cta.description')}
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
              {t('disasterRecoveryPage.cta.button')}
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
            {t('disasterRecoveryPage.cta.subtext')}
          </p>
        </div>
      </section>
    </div>
  );
}

export default DisasterRecovery;