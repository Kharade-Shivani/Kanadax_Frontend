import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

function Ai_ml() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('frameworks');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  // AI Services data from translations
  const aiServices = [
    {
      icon: "🧠",
      title: t('aiMlPage.services.items.0.title'),
      description: t('aiMlPage.services.items.0.description'),
      features: [
        t('aiMlPage.services.items.0.features.0'),
        t('aiMlPage.services.items.0.features.1'),
        t('aiMlPage.services.items.0.features.2'),
        t('aiMlPage.services.items.0.features.3')
      ]
    },
    {
      icon: "🔍",
      title: t('aiMlPage.services.items.1.title'),
      description: t('aiMlPage.services.items.1.description'),
      features: [
        t('aiMlPage.services.items.1.features.0'),
        t('aiMlPage.services.items.1.features.1'),
        t('aiMlPage.services.items.1.features.2'),
        t('aiMlPage.services.items.1.features.3')
      ]
    },
    {
      icon: "🗣️",
      title: t('aiMlPage.services.items.2.title'),
      description: t('aiMlPage.services.items.2.description'),
      features: [
        t('aiMlPage.services.items.2.features.0'),
        t('aiMlPage.services.items.2.features.1'),
        t('aiMlPage.services.items.2.features.2'),
        t('aiMlPage.services.items.2.features.3')
      ]
    },
    {
      icon: "📈",
      title: t('aiMlPage.services.items.3.title'),
      description: t('aiMlPage.services.items.3.description'),
      features: [
        t('aiMlPage.services.items.3.features.0'),
        t('aiMlPage.services.items.3.features.1'),
        t('aiMlPage.services.items.3.features.2'),
        t('aiMlPage.services.items.3.features.3')
      ]
    },
    {
      icon: "⚙️",
      title: t('aiMlPage.services.items.4.title'),
      description: t('aiMlPage.services.items.4.description'),
      features: [
        t('aiMlPage.services.items.4.features.0'),
        t('aiMlPage.services.items.4.features.1'),
        t('aiMlPage.services.items.4.features.2'),
        t('aiMlPage.services.items.4.features.3')
      ]
    },
    {
      icon: "🤖",
      title: t('aiMlPage.services.items.5.title'),
      description: t('aiMlPage.services.items.5.description'),
      features: [
        t('aiMlPage.services.items.5.features.0'),
        t('aiMlPage.services.items.5.features.1'),
        t('aiMlPage.services.items.5.features.2'),
        t('aiMlPage.services.items.5.features.3')
      ]
    },
    {
      icon: "🛡️",
      title: t('aiMlPage.services.items.6.title'),
      description: t('aiMlPage.services.items.6.description'),
      features: [
        t('aiMlPage.services.items.6.features.0'),
        t('aiMlPage.services.items.6.features.1'),
        t('aiMlPage.services.items.6.features.2'),
        t('aiMlPage.services.items.6.features.3')
      ]
    },
    {
      icon: "📊",
      title: t('aiMlPage.services.items.7.title'),
      description: t('aiMlPage.services.items.7.description'),
      features: [
        t('aiMlPage.services.items.7.features.0'),
        t('aiMlPage.services.items.7.features.1'),
        t('aiMlPage.services.items.7.features.2'),
        t('aiMlPage.services.items.7.features.3')
      ]
    }
  ];

  // Tech Stack
  const techStack = {
    frameworks: [
      { name: "TensorFlow", level: t('aiMlPage.techStack.levels.advanced') },
      { name: "PyTorch", level: t('aiMlPage.techStack.levels.advanced') },
      { name: "Scikit-learn", level: t('aiMlPage.techStack.levels.expert') },
      { name: "Keras", level: t('aiMlPage.techStack.levels.advanced') },
      { name: "OpenCV", level: t('aiMlPage.techStack.levels.advanced') },
      { name: "Hugging Face", level: t('aiMlPage.techStack.levels.intermediate') }
    ],
    languages: [
      { name: "Python", level: t('aiMlPage.techStack.levels.expert') },
      { name: "R", level: t('aiMlPage.techStack.levels.advanced') },
      { name: "Julia", level: t('aiMlPage.techStack.levels.intermediate') },
      { name: "SQL", level: t('aiMlPage.techStack.levels.advanced') },
      { name: "Java", level: t('aiMlPage.techStack.levels.intermediate') },
      { name: "C++", level: t('aiMlPage.techStack.levels.intermediate') }
    ],
    platforms: [
      { name: "AWS SageMaker", level: t('aiMlPage.techStack.levels.advanced') },
      { name: "Google AI Platform", level: t('aiMlPage.techStack.levels.advanced') },
      { name: "Azure ML", level: t('aiMlPage.techStack.levels.intermediate') },
      { name: "Databricks", level: t('aiMlPage.techStack.levels.intermediate') },
      { name: "Jupyter", level: t('aiMlPage.techStack.levels.expert') },
      { name: "Docker", level: t('aiMlPage.techStack.levels.advanced') }
    ]
  };

  // AI Projects from translations
  const aiProjects = [
    {
      id: 1,
      title: t('aiMlPage.projects.items.0.title'),
      description: t('aiMlPage.projects.items.0.description'),
      category: t('aiMlPage.projects.items.0.category'),
      tech: ["TensorFlow", "Python", "IoT Sensors", "Cloud ML"],
      results: [
        t('aiMlPage.projects.items.0.results.0'),
        t('aiMlPage.projects.items.0.results.1'),
        t('aiMlPage.projects.items.0.results.2')
      ]
    },
    {
      id: 2,
      title: t('aiMlPage.projects.items.1.title'),
      description: t('aiMlPage.projects.items.1.description'),
      category: t('aiMlPage.projects.items.1.category'),
      tech: ["PyTorch", "Computer Vision", "DICOM", "HIPAA Compliant"],
      results: [
        t('aiMlPage.projects.items.1.results.0'),
        t('aiMlPage.projects.items.1.results.1'),
        t('aiMlPage.projects.items.1.results.2')
      ]
    },
    {
      id: 3,
      title: t('aiMlPage.projects.items.2.title'),
      description: t('aiMlPage.projects.items.2.description'),
      category: t('aiMlPage.projects.items.2.category'),
      tech: ["BERT", "Python", "AWS", "Real-time API"],
      results: [
        t('aiMlPage.projects.items.2.results.0'),
        t('aiMlPage.projects.items.2.results.1'),
        t('aiMlPage.projects.items.2.results.2')
      ]
    },
    {
      id: 4,
      title: t('aiMlPage.projects.items.3.title'),
      description: t('aiMlPage.projects.items.3.description'),
      category: t('aiMlPage.projects.items.3.category'),
      tech: ["YOLOv8", "OpenCV", "RTSP", "Edge Computing"],
      results: [
        t('aiMlPage.projects.items.3.results.0'),
        t('aiMlPage.projects.items.3.results.1'),
        t('aiMlPage.projects.items.3.results.2')
      ]
    },
    {
      id: 5,
      title: t('aiMlPage.projects.items.4.title'),
      description: t('aiMlPage.projects.items.4.description'),
      category: t('aiMlPage.projects.items.4.category'),
      tech: ["Transformer Models", "React", "MongoDB", "Azure ML"],
      results: [
        t('aiMlPage.projects.items.4.results.0'),
        t('aiMlPage.projects.items.4.results.1'),
        t('aiMlPage.projects.items.4.results.2')
      ]
    },
    {
      id: 6,
      title: t('aiMlPage.projects.items.5.title'),
      description: t('aiMlPage.projects.items.5.description'),
      category: t('aiMlPage.projects.items.5.category'),
      tech: ["LSTM Networks", "Python", "Satellite Data", "AWS S3"],
      results: [
        t('aiMlPage.projects.items.5.results.0'),
        t('aiMlPage.projects.items.5.results.1'),
        t('aiMlPage.projects.items.5.results.2')
      ]
    },
    {
      id: 7,
      title: t('aiMlPage.projects.items.6.title'),
      description: t('aiMlPage.projects.items.6.description'),
      category: t('aiMlPage.projects.items.6.category'),
      tech: ["CodeBERT", "GitHub API", "Docker", "FastAPI"],
      results: [
        t('aiMlPage.projects.items.6.results.0'),
        t('aiMlPage.projects.items.6.results.1'),
        t('aiMlPage.projects.items.6.results.2')
      ]
    },
    {
      id: 8,
      title: t('aiMlPage.projects.items.7.title'),
      description: t('aiMlPage.projects.items.7.description'),
      category: t('aiMlPage.projects.items.7.category'),
      tech: ["Natural Language Processing", "Python", "PostgreSQL", "REST API"],
      results: [
        t('aiMlPage.projects.items.7.results.0'),
        t('aiMlPage.projects.items.7.results.1'),
        t('aiMlPage.projects.items.7.results.2')
      ]
    }
  ];

  // Process Steps from translations
  const processSteps = [
    {
      step: "01",
      title: t('aiMlPage.process.steps.0.title'),
      description: t('aiMlPage.process.steps.0.description'),
      icon: "🎯"
    },
    {
      step: "02",
      title: t('aiMlPage.process.steps.1.title'),
      description: t('aiMlPage.process.steps.1.description'),
      icon: "📊"
    },
    {
      step: "03",
      title: t('aiMlPage.process.steps.2.title'),
      description: t('aiMlPage.process.steps.2.description'),
      icon: "🧪"
    },
    {
      step: "04",
      title: t('aiMlPage.process.steps.3.title'),
      description: t('aiMlPage.process.steps.3.description'),
      icon: "🔬"
    },
    {
      step: "05",
      title: t('aiMlPage.process.steps.4.title'),
      description: t('aiMlPage.process.steps.4.description'),
      icon: "🚀"
    },
    {
      step: "06",
      title: t('aiMlPage.process.steps.5.title'),
      description: t('aiMlPage.process.steps.5.description'),
      icon: "📈"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" dir="ltr">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src="/imggg2.jpg" 
            alt="AI Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-left"
              initial="hidden"
              animate="visible"
              variants={slideInFromLeft}
            >
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                variants={fadeInUp}
              >
                <span className="text-white">
                  {t('aiMlPage.hero.title1')}
                </span>
                <br />
                <motion.span 
                  className="mt-2 text-red-600"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {t('aiMlPage.hero.title2')}
                </motion.span>
              </motion.h1>

              <motion.p 
                className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                {t('aiMlPage.hero.description')}
              </motion.p>
            </motion.div>

            <motion.div 
              className="flex justify-center lg:justify-end"
              initial="hidden"
              animate="visible"
              variants={slideInFromRight}
            >
              <motion.div 
                className="relative w-full max-w-lg"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-red-600 to-gray-800 rounded-xl opacity-60 blur"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <motion.img
                  src="/ai.jpg"
                  alt="AI & Machine Learning"
                  className="relative w-full rounded-xl shadow-2xl border-4 border-white/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {[
              t('aiMlPage.stats.mlModels'),
              t('aiMlPage.stats.accuracy'),
              t('aiMlPage.stats.efficiency'),
              t('aiMlPage.stats.support')
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:border-red-400 hover:shadow-2xl transition-all hover:scale-105"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="text-red-300 mb-3 text-2xl"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  {index === 0 ? "⚡" : index === 1 ? "🎯" : index === 2 ? "🚀" : "💡"}
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {index === 0 ? "100+" : index === 1 ? "95%" : index === 2 ? "40%" : "24/7"}
                </motion.div>
                <motion.div 
                  className="text-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.7 }}
                >
                  {item}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <motion.section 
        id="services" 
        className="relative py-12 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="/imggg2.jpg" 
            alt="AI Services Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-white leading-tight">
              {t('aiMlPage.services.title')}
            </h2>
            <motion.p 
              className="text-white/90 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('aiMlPage.services.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="max-w-7xl mx-auto px-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {aiServices.map((service, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeService === index
                      ? 'rounded-xl border-red-500 shadow-lg shadow-red-500/20 bg-white/95 backdrop-blur-sm'
                      : 'rounded-lg border-white/20 bg-white/90 backdrop-blur-sm hover:border-white/40 hover:bg-white/95'
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
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {activeService === index && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  )}

                  <div className="relative flex flex-col h-full">
                    <div className={`flex flex-col items-center justify-center flex-1 ${
                      activeService === index ? '' : 'h-full'
                    }`}>
                      <motion.div 
                        className={`text-red-600 transition-all duration-300 ${
                          activeService === index ? 'scale-110 mb-3' : 'scale-100 mb-4'
                        }`}
                        animate={activeService === index ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {service.icon}
                      </motion.div>

                      <motion.h3 
                        className={`text-center font-bold text-gray-900 transition-all duration-300 ${
                          activeService === index 
                            ? 'text-[17px]' 
                            : 'text-[14px]'
                        }`}
                        layout
                      >
                        {service.title}
                      </motion.h3>
                    </div>

                    {activeService === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <motion.p 
                          className="text-gray-700 mb-4 text-[14px] leading-relaxed text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {service.description}
                        </motion.p>

                        <motion.ul 
                          className="space-y-2 mb-4"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {service.features.map((feature, i) => (
                            <motion.li 
                              key={i} 
                              variants={fadeInUp}
                              className="flex items-start text-[13px] leading-snug"
                            >
                              <motion.div 
                                className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                              ></motion.div>
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
      <motion.section 
        className="relative py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="/imggg4.jpg" 
            alt="Technology background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('aiMlPage.techStack.title')}
            </h2>
            <motion.p 
              className="text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('aiMlPage.techStack.subtitle')}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="mb-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {['frameworks', 'languages', 'platforms'].map((tab) => (
                <motion.button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  variants={fadeInUp}
                  className={`px-6 py-3 rounded-lg font-medium transition backdrop-blur-sm ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab === 'frameworks' ? t('aiMlPage.techStack.tabs.frameworks') : 
                   tab === 'languages' ? t('aiMlPage.techStack.tabs.languages') : 
                   t('aiMlPage.techStack.tabs.platforms')}
                </motion.button>
              ))}
            </div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {techStack[activeTab].map((tech, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:border-red-400 hover:shadow-lg transition-all text-center hover:bg-white/20"
                  variants={scaleIn}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <motion.div 
                    className="text-lg font-bold text-white mb-2"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      delay: index * 0.1 + 0.3,
                      duration: 0.5 
                    }}
                  >
                    {tech.name}
                  </motion.div>
                  <motion.div 
                    className={`text-sm font-medium ${
                      tech.level === t('aiMlPage.techStack.levels.expert') ? 'text-green-400' :
                      tech.level === t('aiMlPage.techStack.levels.advanced') ? 'text-red-400' :
                      'text-amber-400'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {tech.level}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== DEVELOPMENT PROCESS SECTION ===== */} 
      <motion.section 
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/imggg3.jpg"
            alt="Abstract AI technology and development process background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div 
              className="text-center mb-16"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {t('aiMlPage.process.title')}
              </h2>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t('aiMlPage.process.subtitle')}
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {processSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-8 border border-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                  whileHover={{ 
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className="text-3xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >
                      {step.step}
                    </motion.div>
                    <motion.div 
                      className="text-2xl text-red-500 group-hover:scale-110 transition-transform"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                  <motion.h3 
                    className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 group-hover:text-gray-700 transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== PROJECTS SHOWCASE SECTION ===== */}
      <motion.section 
        className="relative py-12 md:py-16 bg-white overflow-hidden" 
        id="projects"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/pic3.jpg"
            alt="AI Success Stories Background"
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
        </div>

        <div className="relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              {t('aiMlPage.projects.title')}
            </h2>
            <motion.p 
              className="text-white max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {t('aiMlPage.projects.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div 
            className="max-w-7xl mx-auto px-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {aiProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={scaleIn}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeProject === project.id
                      ? 'rounded-xl border-red-600 shadow-lg shadow-red-500/10 bg-white/95 backdrop-blur-sm'
                      : 'rounded-lg border-gray-200 bg-white/90 backdrop-blur-sm hover:border-gray-300'
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
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                >
                  {activeProject === project.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  )}

                  <div className="relative flex flex-col h-full">
                    <div className={`flex flex-col items-center justify-center flex-1 ${
                      activeProject === project.id ? '' : 'h-full'
                    }`}>
                      <motion.div 
                        className={`inline-flex items-center gap-1.5 transition-all duration-300 ${
                          activeProject === project.id ? 'scale-105 mb-4' : 'scale-100 mb-3'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {project.category}
                        </div>
                      </motion.div>

                      <motion.h3 
                        className={`text-center font-bold text-gray-900 transition-all duration-300 ${
                          activeProject === project.id 
                            ? 'text-[17px]' 
                            : 'text-[14px]'
                        }`}
                        layout
                      >
                        {project.title}
                      </motion.h3>
                    </div>

                    {activeProject === project.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <motion.p 
                          className="text-gray-600 mb-4 text-[14px] leading-relaxed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {project.description}
                        </motion.p>
                        
                        <motion.div 
                          className="mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">
                            {t('aiMlPage.projects.technologies')}
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech, idx) => (
                              <motion.span 
                                key={idx} 
                                className="bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-200"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 + 0.3 }}
                                whileHover={{ scale: 1.1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">
                            {t('aiMlPage.projects.results')}
                          </h4>
                          <ul className="space-y-2">
                            {project.results.map((result, idx) => (
                              <motion.li 
                                key={idx} 
                                className="flex items-start text-gray-700 text-[12px] leading-snug"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 + 0.5 }}
                              >
                                <motion.svg 
                                  className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                  animate={{ 
                                    rotate: [0, 10, 0],
                                    scale: [1, 1.2, 1]
                                  }}
                                  transition={{ 
                                    duration: 0.3,
                                    delay: idx * 0.1
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
                          </ul>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== FINAL CTA ===== */}
      <motion.section 
        className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.h2 
            className="text-[30px] font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('aiMlPage.cta.title1')}{" "}
            <span className="text-red-400">{t('aiMlPage.cta.title2')}</span>
          </motion.h2>
          <motion.p 
            className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t('aiMlPage.cta.description')}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
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
                boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {t('aiMlPage.cta.button')}
              <motion.svg
                className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-1
                           group-hover:opacity-100 group-hover:translate-x-0
                           transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ 
                  x: [0, 5, 0],
                }}
                transition={{ 
                  duration: 1,
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
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {t('aiMlPage.cta.subtext')}
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}

export default Ai_ml;