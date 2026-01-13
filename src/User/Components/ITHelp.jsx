import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function ITHelpDesk() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('onsite');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [stats, setStats] = useState({
    responseTime: 0,
    resolutionRate: 0,
    supportCoverage: 0,
    supportedCompanies: 0
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
      responseTime: 15,
      resolutionRate: 99,
      supportCoverage: 24,
      supportedCompanies: 50
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

  const itHelpServices = [
    {
      icon: "🖥️",
      title: t('itHelpDeskPage.services.items.0.title'),
      description: t('itHelpDeskPage.services.items.0.description'),
      features: [
        t('itHelpDeskPage.services.items.0.features.0'),
        t('itHelpDeskPage.services.items.0.features.1'),
        t('itHelpDeskPage.services.items.0.features.2'),
        t('itHelpDeskPage.services.items.0.features.3'),
        t('itHelpDeskPage.services.items.0.features.4')
      ]
    },
    {
      icon: "🔧",
      title: t('itHelpDeskPage.services.items.1.title'),
      description: t('itHelpDeskPage.services.items.1.description'),
      features: [
        t('itHelpDeskPage.services.items.1.features.0'),
        t('itHelpDeskPage.services.items.1.features.1'),
        t('itHelpDeskPage.services.items.1.features.2'),
        t('itHelpDeskPage.services.items.1.features.3'),
        t('itHelpDeskPage.services.items.1.features.4')
      ]
    },
    {
      icon: "👥",
      title: t('itHelpDeskPage.services.items.2.title'),
      description: t('itHelpDeskPage.services.items.2.description'),
      features: [
        t('itHelpDeskPage.services.items.2.features.0'),
        t('itHelpDeskPage.services.items.2.features.1'),
        t('itHelpDeskPage.services.items.2.features.2'),
        t('itHelpDeskPage.services.items.2.features.3'),
        t('itHelpDeskPage.services.items.2.features.4')
      ]
    },
    {
      icon: "📞",
      title: t('itHelpDeskPage.services.items.3.title'),
      description: t('itHelpDeskPage.services.items.3.description'),
      features: [
        t('itHelpDeskPage.services.items.3.features.0'),
        t('itHelpDeskPage.services.items.3.features.1'),
        t('itHelpDeskPage.services.items.3.features.2'),
        t('itHelpDeskPage.services.items.3.features.3'),
        t('itHelpDeskPage.services.items.3.features.4')
      ]
    },
    {
      icon: "🛡️",
      title: t('itHelpDeskPage.services.items.4.title'),
      description: t('itHelpDeskPage.services.items.4.description'),
      features: [
        t('itHelpDeskPage.services.items.4.features.0'),
        t('itHelpDeskPage.services.items.4.features.1'),
        t('itHelpDeskPage.services.items.4.features.2'),
        t('itHelpDeskPage.services.items.4.features.3'),
        t('itHelpDeskPage.services.items.4.features.4')
      ]
    },
    {
      icon: "☁️",
      title: t('itHelpDeskPage.services.items.5.title'),
      description: t('itHelpDeskPage.services.items.5.description'),
      features: [
        t('itHelpDeskPage.services.items.5.features.0'),
        t('itHelpDeskPage.services.items.5.features.1'),
        t('itHelpDeskPage.services.items.5.features.2'),
        t('itHelpDeskPage.services.items.5.features.3'),
        t('itHelpDeskPage.services.items.5.features.4')
      ]
    },
    {
      icon: "📱",
      title: t('itHelpDeskPage.services.items.6.title'),
      description: t('itHelpDeskPage.services.items.6.description'),
      features: [
        t('itHelpDeskPage.services.items.6.features.0'),
        t('itHelpDeskPage.services.items.6.features.1'),
        t('itHelpDeskPage.services.items.6.features.2'),
        t('itHelpDeskPage.services.items.6.features.3'),
        t('itHelpDeskPage.services.items.6.features.4')
      ]
    },
    {
      icon: "📊",
      title: t('itHelpDeskPage.services.items.7.title'),
      description: t('itHelpDeskPage.services.items.7.description'),
      features: [
        t('itHelpDeskPage.services.items.7.features.0'),
        t('itHelpDeskPage.services.items.7.features.1'),
        t('itHelpDeskPage.services.items.7.features.2'),
        t('itHelpDeskPage.services.items.7.features.3'),
        t('itHelpDeskPage.services.items.7.features.4')
      ]
    }
  ];

  const supportLevels = {
    onsite: [
      { name: "Hardware Troubleshooting", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "Software Installation", level: t('itHelpDeskPage.expertise.levels.advanced') },
      { name: "Network Setup", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "Printer/Device Support", level: t('itHelpDeskPage.expertise.levels.advanced') },
      { name: "Data Recovery", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "System Diagnostics", level: t('itHelpDeskPage.expertise.levels.advanced') }
    ],
    remote: [
      { name: "Remote Desktop Support", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "VPN Configuration", level: t('itHelpDeskPage.expertise.levels.advanced') },
      { name: "Email Setup", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "Software Troubleshooting", level: t('itHelpDeskPage.expertise.levels.advanced') },
      { name: "Security Updates", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "Cloud Support", level: t('itHelpDeskPage.expertise.levels.advanced') }
    ],
    network: [
      { name: "Network Security", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "Firewall Management", level: t('itHelpDeskPage.expertise.levels.advanced') },
      { name: "Wi-Fi Optimization", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "Server Maintenance", level: t('itHelpDeskPage.expertise.levels.advanced') },
      { name: "Backup Solutions", level: t('itHelpDeskPage.expertise.levels.expert') },
      { name: "Disaster Recovery", level: t('itHelpDeskPage.expertise.levels.advanced') }
    ]
  };

  const supportProjects = [
    {
      id: 1,
      title: t('itHelpDeskPage.projects.items.0.title'),
      description: t('itHelpDeskPage.projects.items.0.description'),
      category: t('itHelpDeskPage.projects.items.0.category'),
      results: [
        t('itHelpDeskPage.projects.items.0.results.0'),
        t('itHelpDeskPage.projects.items.0.results.1'),
        t('itHelpDeskPage.projects.items.0.results.2')
      ]
    },
    {
      id: 2,
      title: t('itHelpDeskPage.projects.items.1.title'),
      description: t('itHelpDeskPage.projects.items.1.description'),
      category: t('itHelpDeskPage.projects.items.1.category'),
      results: [
        t('itHelpDeskPage.projects.items.1.results.0'),
        t('itHelpDeskPage.projects.items.1.results.1'),
        t('itHelpDeskPage.projects.items.1.results.2')
      ]
    },
    {
      id: 3,
      title: t('itHelpDeskPage.projects.items.2.title'),
      description: t('itHelpDeskPage.projects.items.2.description'),
      category: t('itHelpDeskPage.projects.items.2.category'),
      results: [
        t('itHelpDeskPage.projects.items.2.results.0'),
        t('itHelpDeskPage.projects.items.2.results.1'),
        t('itHelpDeskPage.projects.items.2.results.2')
      ]
    },
    {
      id: 4,
      title: t('itHelpDeskPage.projects.items.3.title'),
      description: t('itHelpDeskPage.projects.items.3.description'),
      category: t('itHelpDeskPage.projects.items.3.category'),
      results: [
        t('itHelpDeskPage.projects.items.3.results.0'),
        t('itHelpDeskPage.projects.items.3.results.1'),
        t('itHelpDeskPage.projects.items.3.results.2')
      ]
    },
    {
      id: 5,
      title: t('itHelpDeskPage.projects.items.4.title'),
      description: t('itHelpDeskPage.projects.items.4.description'),
      category: t('itHelpDeskPage.projects.items.4.category'),
      results: [
        t('itHelpDeskPage.projects.items.4.results.0'),
        t('itHelpDeskPage.projects.items.4.results.1'),
        t('itHelpDeskPage.projects.items.4.results.2')
      ]
    },
    {
      id: 6,
      title: t('itHelpDeskPage.projects.items.5.title'),
      description: t('itHelpDeskPage.projects.items.5.description'),
      category: t('itHelpDeskPage.projects.items.5.category'),
      results: [
        t('itHelpDeskPage.projects.items.5.results.0'),
        t('itHelpDeskPage.projects.items.5.results.1'),
        t('itHelpDeskPage.projects.items.5.results.2')
      ]
    },
    {
      id: 7,
      title: t('itHelpDeskPage.projects.items.6.title'),
      description: t('itHelpDeskPage.projects.items.6.description'),
      category: t('itHelpDeskPage.projects.items.6.category'),
      results: [
        t('itHelpDeskPage.projects.items.6.results.0'),
        t('itHelpDeskPage.projects.items.6.results.1'),
        t('itHelpDeskPage.projects.items.6.results.2')
      ]
    },
    {
      id: 8,
      title: t('itHelpDeskPage.projects.items.7.title'),
      description: t('itHelpDeskPage.projects.items.7.description'),
      category: t('itHelpDeskPage.projects.items.7.category'),
      results: [
        t('itHelpDeskPage.projects.items.7.results.0'),
        t('itHelpDeskPage.projects.items.7.results.1'),
        t('itHelpDeskPage.projects.items.7.results.2')
      ]
    }
  ];

  const supportProcess = [
    {
      step: "01",
      title: t('itHelpDeskPage.process.steps.0.title'),
      description: t('itHelpDeskPage.process.steps.0.description'),
      icon: "📱"
    },
    {
      step: "02",
      title: t('itHelpDeskPage.process.steps.1.title'),
      description: t('itHelpDeskPage.process.steps.1.description'),
      icon: "🎫"
    },
    {
      step: "03",
      title: t('itHelpDeskPage.process.steps.2.title'),
      description: t('itHelpDeskPage.process.steps.2.description'),
      icon: "⚡"
    },
    {
      step: "04",
      title: t('itHelpDeskPage.process.steps.3.title'),
      description: t('itHelpDeskPage.process.steps.3.description'),
      icon: "🔧"
    },
    {
      step: "05",
      title: t('itHelpDeskPage.process.steps.4.title'),
      description: t('itHelpDeskPage.process.steps.4.description'),
      icon: "✅"
    },
    {
      step: "06",
      title: t('itHelpDeskPage.process.steps.5.title'),
      description: t('itHelpDeskPage.process.steps.5.description'),
      icon: "🛡️"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
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
            alt="IT Help Desk Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-on-scroll ${isVisible.hero ? 'visible' : ''}`}>
            {/* LEFT CONTENT */}
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900">
                  {t('itHelpDeskPage.hero.title1')}
                </span>
                <br />
                <span className="mt-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-gray-800 to-red-800">
                  {t('itHelpDeskPage.hero.title2')}
                </span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed">
                {t('itHelpDeskPage.hero.description')}
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/ITHelp.webp"
                alt="IT Help Desk"
                className="w-full max-w-lg rounded-xl shadow-xl border border-gray-200"
              />
            </div>
          </div>

          {/* STATS GRID */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-stagger ${isVisible.hero ? 'visible' : ''}`}>
            {[
              { 
                icon: "⚡", 
                value: stats.responseTime.toFixed(0), 
                label: t('itHelpDeskPage.stats.responseTime'), 
                suffix: " Min" 
              },
              { 
                icon: "✅", 
                value: stats.resolutionRate.toFixed(0), 
                label: t('itHelpDeskPage.stats.resolutionRate'), 
                suffix: "%" 
              },
              { 
                icon: "🔄", 
                value: stats.supportCoverage.toFixed(0), 
                label: t('itHelpDeskPage.stats.supportCoverage'), 
                suffix: "/7" 
              },
              { 
                icon: "👥", 
                value: stats.supportedCompanies.toFixed(0), 
                label: t('itHelpDeskPage.stats.supportedCompanies'), 
                suffix: "+" 
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all"
              >
                <div className="text-red-600 mb-3 text-2xl">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
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
            src="/image.avif"
            alt="IT Support Services Background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.services ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              {t('itHelpDeskPage.services.title')}
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              {t('itHelpDeskPage.services.subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 animate-stagger ${isVisible.services ? 'visible' : ''}`}>
              {itHelpServices.map((service, index) => (
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
                    {/* Icon and Title Container */}
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

                    {/* Details */}
                    {activeService === index && (
                      <div className="mt-4">
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed text-center">
                          {service.description}
                        </p>

                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-[13px] leading-snug">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
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

      {/* ===== EXPERTISE SECTION ===== */}
      <section 
        className="relative py-20"
        ref={el => sectionsRef.current[2] = el}
        data-section-id="expertise"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/gree.jpg"
            alt="Technical Support Expertise Background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible.expertise ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('itHelpDeskPage.expertise.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('itHelpDeskPage.expertise.subtitle')}
            </p>
          </div>

          <div className="mb-8">
            <div className={`flex flex-wrap gap-4 justify-center mb-8 animate-stagger ${isVisible.expertise ? 'visible' : ''}`}>
              {['onsite', 'remote', 'network'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  {tab === 'onsite' ? t('itHelpDeskPage.expertise.tabs.onsite') : 
                   tab === 'remote' ? t('itHelpDeskPage.expertise.tabs.remote') : 
                   t('itHelpDeskPage.expertise.tabs.network')}
                </button>
              ))}
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-stagger ${isVisible.expertise ? 'visible' : ''}`}>
              {supportLevels[activeTab].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all text-center"
                >
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {tech.name}
                  </div>
                  <div className={`text-sm font-medium ${tech.level === t('itHelpDeskPage.expertise.levels.expert') ? 'text-green-600' :
                    tech.level === t('itHelpDeskPage.expertise.levels.advanced') ? 'text-blue-600' :
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
            alt="Support Process Background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible.process ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('itHelpDeskPage.process.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('itHelpDeskPage.process.subtitle')}
            </p>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-stagger ${isVisible.process ? 'visible' : ''}`}>
            {supportProcess.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl font-bold text-gray-300">
                    {step.step}
                  </div>
                  <div className="text-2xl">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
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
            src="/green.avif"
            alt="Support Success Stories Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.projects ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              {t('itHelpDeskPage.projects.title')}
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              {t('itHelpDeskPage.projects.subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {supportProjects.map((project) => (
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
                    {/* Main Content Container */}
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

                    {/* Details */}
                    {activeProject === project.id && (
                      <div className="mt-4">
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed">
                          {project.description}
                        </p>

                        {/* Achievements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">{t('itHelpDeskPage.projects.results')}</h4>
                          <ul className="space-y-2">
                            {project.results.map((result, idx) => (
                              <li key={idx} className="flex items-start text-gray-700 text-[12px] leading-snug">
                                <svg
                                  className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
            {t('itHelpDeskPage.cta.title1')}{" "}
            <span className="text-red-400">{t('itHelpDeskPage.cta.title2')}</span>
          </h2>
          <p className={`text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            {t('itHelpDeskPage.cta.description')}
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
               transition-all duration-300"
            >
              {t('itHelpDeskPage.cta.button')}
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
            {t('itHelpDeskPage.cta.subtext')}
          </p>
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ITHelpDesk;