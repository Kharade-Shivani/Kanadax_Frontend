import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

function WebDevelopment() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('frontend');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  
  // Refs for intersection observer
  const techStackRef = useRef(null);
  const [techStackInView, setTechStackInView] = useState(false);
  
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

  // Intersection Observer for tech stack section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTechStackInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (techStackRef.current) {
      observer.observe(techStackRef.current);
    }

    return () => {
      if (techStackRef.current) {
        observer.unobserve(techStackRef.current);
      }
    };
  }, []);

  // Web Development Services from translations
  const webDevServices = [
    {
      icon: "🌐",
      title: t('webDevPage.services.items.0.title'),
      description: t('webDevPage.services.items.0.description'),
      features: [
        t('webDevPage.services.items.0.features.0'),
        t('webDevPage.services.items.0.features.1'),
        t('webDevPage.services.items.0.features.2'),
        t('webDevPage.services.items.0.features.3'),
        t('webDevPage.services.items.0.features.4')
      ]
    },
    {
      icon: "⚙️",
      title: t('webDevPage.services.items.1.title'),
      description: t('webDevPage.services.items.1.description'),
      features: [
        t('webDevPage.services.items.1.features.0'),
        t('webDevPage.services.items.1.features.1'),
        t('webDevPage.services.items.1.features.2'),
        t('webDevPage.services.items.1.features.3'),
        t('webDevPage.services.items.1.features.4')
      ]
    },
    {
      icon: "📱",
      title: t('webDevPage.services.items.2.title'),
      description: t('webDevPage.services.items.2.description'),
      features: [
        t('webDevPage.services.items.2.features.0'),
        t('webDevPage.services.items.2.features.1'),
        t('webDevPage.services.items.2.features.2'),
        t('webDevPage.services.items.2.features.3'),
        t('webDevPage.services.items.2.features.4')
      ]
    },
    {
      icon: "🛒",
      title: t('webDevPage.services.items.3.title'),
      description: t('webDevPage.services.items.3.description'),
      features: [
        t('webDevPage.services.items.3.features.0'),
        t('webDevPage.services.items.3.features.1'),
        t('webDevPage.services.items.3.features.2'),
        t('webDevPage.services.items.3.features.3'),
        t('webDevPage.services.items.3.features.4')
      ]
    },
    {
      icon: "🚀",
      title: t('webDevPage.services.items.4.title'),
      description: t('webDevPage.services.items.4.description'),
      features: [
        t('webDevPage.services.items.4.features.0'),
        t('webDevPage.services.items.4.features.1'),
        t('webDevPage.services.items.4.features.2'),
        t('webDevPage.services.items.4.features.3')
      ]
    },
    {
      icon: "🔒",
      title: t('webDevPage.services.items.5.title'),
      description: t('webDevPage.services.items.5.description'),
      features: [
        t('webDevPage.services.items.5.features.0'),
        t('webDevPage.services.items.5.features.1'),
        t('webDevPage.services.items.5.features.2'),
        t('webDevPage.services.items.5.features.3')
      ]
    },
    {
      icon: "🎨",
      title: t('webDevPage.services.items.6.title'),
      description: t('webDevPage.services.items.6.description'),
      features: [
        t('webDevPage.services.items.6.features.0'),
        t('webDevPage.services.items.6.features.1'),
        t('webDevPage.services.items.6.features.2'),
        t('webDevPage.services.items.6.features.3'),
        t('webDevPage.services.items.6.features.4')
      ]
    },
    {
      icon: "📊",
      title: t('webDevPage.services.items.7.title'),
      description: t('webDevPage.services.items.7.description'),
      features: [
        t('webDevPage.services.items.7.features.0'),
        t('webDevPage.services.items.7.features.1'),
        t('webDevPage.services.items.7.features.2'),
        t('webDevPage.services.items.7.features.3')
      ]
    }
  ];

  // Tech Stack
  const techStack = {
    frontend: [
      { name: "React", level: t('webDevPage.techStack.levels.advanced') },
      { name: "Next.js", level: t('webDevPage.techStack.levels.advanced') },
      { name: "TypeScript", level: t('webDevPage.techStack.levels.advanced') },
      { name: "Tailwind CSS", level: t('webDevPage.techStack.levels.expert') },
      { name: "Vue.js", level: t('webDevPage.techStack.levels.intermediate') },
      { name: "Redux", level: t('webDevPage.techStack.levels.advanced') }
    ],
    backend: [
      { name: "Node.js", level: t('webDevPage.techStack.levels.advanced') },
      { name: "Python", level: t('webDevPage.techStack.levels.intermediate') },
      { name: "MongoDB", level: t('webDevPage.techStack.levels.advanced') },
      { name: "PostgreSQL", level: t('webDevPage.techStack.levels.intermediate') },
      { name: "GraphQL", level: t('webDevPage.techStack.levels.advanced') },
      { name: "Redis", level: t('webDevPage.techStack.levels.intermediate') }
    ],
    devops: [
      { name: "Docker", level: t('webDevPage.techStack.levels.advanced') },
      { name: "Kubernetes", level: t('webDevPage.techStack.levels.intermediate') },
      { name: "AWS", level: t('webDevPage.techStack.levels.intermediate') },
      { name: "CI/CD", level: t('webDevPage.techStack.levels.advanced') },
      { name: "Nginx", level: t('webDevPage.techStack.levels.intermediate') },
      { name: "Linux", level: t('webDevPage.techStack.levels.advanced') }
    ]
  };

  // Web Projects from translations
  const webProjects = [
    {
      id: 1,
      title: t('webDevPage.projects.items.0.title'),
      description: t('webDevPage.projects.items.0.description'),
      category: t('webDevPage.projects.items.0.category'),
      tech: ["React", "Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
      results: [
        t('webDevPage.projects.items.0.results.0'),
        t('webDevPage.projects.items.0.results.1'),
        t('webDevPage.projects.items.0.results.2')
      ]
    },
    {
      id: 2,
      title: t('webDevPage.projects.items.1.title'),
      description: t('webDevPage.projects.items.1.description'),
      category: t('webDevPage.projects.items.1.category'),
      tech: ["Vue.js", "Node.js", "PostgreSQL", "AWS", "HIPAA Compliant"],
      results: [
        t('webDevPage.projects.items.1.results.0'),
        t('webDevPage.projects.items.1.results.1'),
        t('webDevPage.projects.items.1.results.2')
      ]
    },
    {
      id: 3,
      title: t('webDevPage.projects.items.2.title'),
      description: t('webDevPage.projects.items.2.description'),
      category: t('webDevPage.projects.items.2.category'),
      tech: ["React Native", "Firebase", "Google Maps API", "Cloudinary", "Redux"],
      results: [
        t('webDevPage.projects.items.2.results.0'),
        t('webDevPage.projects.items.2.results.1'),
        t('webDevPage.projects.items.2.results.2')
      ]
    },
    {
      id: 4,
      title: t('webDevPage.projects.items.3.title'),
      description: t('webDevPage.projects.items.3.description'),
      category: t('webDevPage.projects.items.3.category'),
      tech: ["Angular", "Python/Django", "Redis", "Docker", "WebSockets"],
      results: [
        t('webDevPage.projects.items.3.results.0'),
        t('webDevPage.projects.items.3.results.1'),
        t('webDevPage.projects.items.3.results.2')
      ]
    },
    {
      id: 5,
      title: t('webDevPage.projects.items.4.title'),
      description: t('webDevPage.projects.items.4.description'),
      category: t('webDevPage.projects.items.4.category'),
      tech: ["Next.js", "TypeScript", "Prisma", "Vercel", "Stripe"],
      results: [
        t('webDevPage.projects.items.4.results.0'),
        t('webDevPage.projects.items.4.results.1'),
        t('webDevPage.projects.items.4.results.2')
      ]
    },
    {
      id: 6,
      title: t('webDevPage.projects.items.5.title'),
      description: t('webDevPage.projects.items.5.description'),
      category: t('webDevPage.projects.items.5.category'),
      tech: ["React", "Express.js", "MongoDB", "REST APIs", "Payment Gateway"],
      results: [
        t('webDevPage.projects.items.5.results.0'),
        t('webDevPage.projects.items.5.results.1'),
        t('webDevPage.projects.items.5.results.2')
      ]
    },
    {
      id: 7,
      title: t('webDevPage.projects.items.6.title'),
      description: t('webDevPage.projects.items.6.description'),
      category: t('webDevPage.projects.items.6.category'),
      tech: ["Flutter", "Node.js", "Firebase", "Google Maps", "Push Notifications"],
      results: [
        t('webDevPage.projects.items.6.results.0'),
        t('webDevPage.projects.items.6.results.1'),
        t('webDevPage.projects.items.6.results.2')
      ]
    },
    {
      id: 8,
      title: t('webDevPage.projects.items.7.title'),
      description: t('webDevPage.projects.items.7.description'),
      category: t('webDevPage.projects.items.7.category'),
      tech: ["Vue.js", "Python/Flask", "Chart.js", "WebSockets", "Data Visualization"],
      results: [
        t('webDevPage.projects.items.7.results.0'),
        t('webDevPage.projects.items.7.results.1'),
        t('webDevPage.projects.items.7.results.2')
      ]
    }
  ];

  // Process Steps from translations
  const processSteps = [
    {
      step: "01",
      title: t('webDevPage.process.steps.0.title'),
      description: t('webDevPage.process.steps.0.description'),
      icon: "📋"
    },
    {
      step: "02",
      title: t('webDevPage.process.steps.1.title'),
      description: t('webDevPage.process.steps.1.description'),
      icon: "🎨"
    },
    {
      step: "03",
      title: t('webDevPage.process.steps.2.title'),
      description: t('webDevPage.process.steps.2.description'),
      icon: "💻"
    },
    {
      step: "04",
      title: t('webDevPage.process.steps.3.title'),
      description: t('webDevPage.process.steps.3.description'),
      icon: "🔍"
    },
    {
      step: "05",
      title: t('webDevPage.process.steps.4.title'),
      description: t('webDevPage.process.steps.4.description'),
      icon: "🚀"
    },
    {
      step: "06",
      title: t('webDevPage.process.steps.5.title'),
      description: t('webDevPage.process.steps.5.description'),
      icon: "🔄"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white overflow-x-hidden"
      dir="ltr"
    >
      {/* ===== HERO SECTION ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="relative overflow-hidden py-20 md:py-32"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/green.avif"  
            alt="Web Development Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              variants={fadeInLeft}
              className="text-left"
            >
              <motion.h1 
                variants={staggerContainer}
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg"
              >
                <motion.span variants={fadeInUp} className="text-black">
                  {t('webDevPage.hero.title1')}
                </motion.span>
                <br />
                <motion.span 
                  variants={fadeInUp}
                  className="mt-2 inline-block bg-clip-text text-red-500"
                >
                  {t('webDevPage.hero.title2')}
                </motion.span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed drop-shadow"
              >
                {t('webDevPage.hero.description')}
              </motion.p>
            </motion.div>

            <motion.div 
              variants={fadeInRight}
              className="flex justify-center lg:justify-end"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src="/web.png"
                  alt="Web Development"
                  className="w-full max-w-lg rounded-xl shadow-2xl border-4 border-white/20"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 blur-xl -z-10 rounded-xl"></div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {[
              { 
                icon: "⌛", 
                value: "24/7", 
                label: t('webDevPage.stats.support'), 
                color: "from-red-500 to-red-600" 
              },
              { 
                icon: "📈", 
                value: "99.9%", 
                label: t('webDevPage.stats.uptime'), 
                color: "from-green-500 to-emerald-600" 
              },
              { 
                icon: "👥", 
                value: "50+", 
                label: t('webDevPage.stats.projects'), 
                color: "from-blue-500 to-cyan-600" 
              },
              { 
                icon: "✅", 
                value: "100%", 
                label: t('webDevPage.stats.satisfaction'), 
                color: "from-purple-500 to-pink-600" 
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                className="bg-white/95 backdrop-blur-sm border border-white/30 p-6 rounded-xl hover:border-red-300 hover:shadow-2xl transition-all duration-300 group"
              >
                <motion.div 
                  variants={iconRotate}
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} mb-3 text-2xl text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
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
        id="services" 
        className="relative py-12 md:py-16"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/picc.avif"  
            alt="Web Development Services Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-black leading-tight drop-shadow-md">
              {t('webDevPage.services.title')}
            </h2>
            <p className="text-gray-800 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed drop-shadow">
              {t('webDevPage.services.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="max-w-7xl mx-auto px-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {webDevServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover="hover"
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeService === index
                      ? 'rounded-xl border-red-500 shadow-lg shadow-red-500/20 bg-white/95 backdrop-blur-sm'
                      : 'rounded-lg border-white/30 bg-white/90 backdrop-blur-sm hover:border-white/50'
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
                  {activeService === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10 rounded-xl"
                    ></motion.div>
                  )}

                  <div className="relative flex flex-col h-full">
                    <div className={`flex flex-col items-center justify-center flex-1 ${
                      activeService === index ? '' : 'h-full'
                    }`}>
                      <motion.div 
                        variants={iconRotate}
                        className={`text-red-600 transition-all duration-300 ${
                          activeService === index ? 'scale-110 mb-3' : 'scale-100 mb-4'
                        }`}
                      >
                        {service.icon}
                      </motion.div>

                      <motion.h3 
                        layout
                        className={`text-center font-bold transition-all duration-300 ${
                          activeService === index 
                            ? 'text-[17px] text-gray-900' 
                            : 'text-[14px] text-gray-800'
                        }`}
                      >
                        {service.title}
                      </motion.h3>
                    </div>

                    {activeService === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                      >
                        <p className="text-gray-700 mb-4 text-[14px] leading-relaxed text-center">
                          {service.description}
                        </p>

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
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                              <span className="text-gray-700">{feature}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== TECH STACK SECTION ===== */}
      <section ref={techStackRef} className="relative py-20 bg-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/pic1.jpg" 
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={techStackInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('webDevPage.techStack.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('webDevPage.techStack.subtitle')}
            </p>
          </motion.div>
          
          <div className="mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={techStackInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              {['frontend', 'backend', 'devops'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'frontend' ? t('webDevPage.techStack.tabs.frontend') : 
                   tab === 'backend' ? t('webDevPage.techStack.tabs.backend') : 
                   t('webDevPage.techStack.tabs.devops')}
                </motion.button>
              ))}
            </motion.div>
            
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={techStackInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {techStack[activeTab].map((tech, index) => (
                <motion.div 
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={techStackInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all text-center"
                >
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {tech.name}
                  </div>
                  <div className={`text-sm font-medium ${
                    tech.level === t('webDevPage.techStack.levels.expert') ? 'text-green-600' :
                    tech.level === t('webDevPage.techStack.levels.advanced') ? 'text-blue-600' :
                    'text-amber-600'
                  }`}>
                    {tech.level}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== DEVELOPMENT PROCESS SECTION ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        className="relative py-20 bg-gray-50"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/greyy.avif" 
            alt="Process Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('webDevPage.process.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('webDevPage.process.subtitle')}
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          >
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <motion.div 
                  variants={cardHover}
                  className="flex items-start justify-between mb-6"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="text-3xl font-bold text-gray-300"
                  >
                    {step.step}
                  </motion.div>
                  <motion.div 
                    variants={iconRotate}
                    className="text-2xl"
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== PROJECTS SHOWCASE SECTION ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
        className="relative py-12 md:py-16 bg-white" 
        id="projects"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/pic3.png"  
            alt="Projects Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center mb-8 md:mb-12 relative z-10">
          <motion.h2 
            variants={fadeInUp}
            className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-white leading-tight"
          >
            {t('webDevPage.projects.title')}
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-white max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed"
          >
            {t('webDevPage.projects.subtitle')}
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {webProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover="hover"
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                  activeProject === project.id
                    ? 'rounded-xl border-red-600 shadow-lg shadow-red-500/10 bg-white'
                    : 'rounded-lg border-gray-200 bg-gray-50 hover:border-gray-300'
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
              >
                {activeProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent rounded-xl"
                  ></motion.div>
                )}

                <div className="relative flex flex-col h-full">
                  <div className={`flex flex-col items-center justify-center flex-1 ${
                    activeProject === project.id ? '' : 'h-full'
                  }`}>
                    <div className={`inline-flex items-center gap-1.5 transition-all duration-300 ${
                      activeProject === project.id ? 'scale-105 mb-4' : 'scale-100 mb-3'
                    }`}>
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium"
                      >
                        {project.category}
                      </motion.div>
                    </div>

                    <motion.h3 
                      layout
                      className={`text-center font-bold text-gray-900 transition-all duration-300 ${
                        activeProject === project.id 
                          ? 'text-[17px]' 
                          : 'text-[14px]'
                      }`}
                    >
                      {project.title}
                    </motion.h3>
                  </div>

                  {activeProject === project.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <p className="text-gray-600 mb-4 text-[14px] leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">
                          {t('webDevPage.projects.technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((tech, idx) => (
                            <motion.span 
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="bg-white px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-200"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">
                          {t('webDevPage.projects.results')}
                        </h4>
                        <ul className="space-y-2">
                          {project.results.map((result, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start text-gray-700 text-[12px] leading-snug"
                            >
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
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
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
            {t('webDevPage.cta.title1')}{" "}
            <span className="text-red-400">{t('webDevPage.cta.title2')}</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
          >
            {t('webDevPage.cta.description')}
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
              {t('webDevPage.cta.button')}
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
            {t('webDevPage.cta.subtext')}
          </motion.p>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default WebDevelopment;