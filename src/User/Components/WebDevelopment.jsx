import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function WebDevelopment() {
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

  const webDevServices = [
    {
      icon: "🌐",
      title: "Frontend Development",
      description: "Modern, responsive websites and applications with the latest frameworks",
      features: ["React.js", "Next.js", "Vue.js", "Tailwind CSS", "TypeScript"]
    },
    {
      icon: "⚙️",
      title: "Backend Development",
      description: "Robust server-side solutions with scalable architecture",
      features: ["Node.js", "Python/Django", "Java/Spring", "REST APIs", "GraphQL"]
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "PWA", "iOS/Android Native", "App Store Deployment"]
    },
    {
      icon: "🛒",
      title: "E-commerce Solutions",
      description: "Complete online stores with secure payment processing",
      features: ["Shopify", "WooCommerce", "Magento", "Payment Gateways", "Inventory Management"]
    },
    {
      icon: "🚀",
      title: "Performance Optimization",
      description: "Speed up your website for better user experience and SEO",
      features: ["Page Speed Optimization", "Code Minification", "CDN Integration", "Caching Strategies"]
    },
    {
      icon: "🔒",
      title: "Security & Maintenance",
      description: "Keep your website secure and up-to-date with regular maintenance",
      features: ["SSL Certificates", "Security Audits", "Regular Updates", "Backup Solutions"]
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that enhance user engagement",
      features: ["Wireframing", "Prototyping", "User Testing", "Design Systems", "Accessibility"]
    },
    {
      icon: "📊",
      title: "Analytics & SEO",
      description: "Drive traffic and measure performance with advanced analytics",
      features: ["Google Analytics", "SEO Optimization", "Conversion Tracking", "A/B Testing"]
    }
  ];

  const techStack = {
    frontend: [
      { name: "React", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Vue.js", level: "Intermediate" },
      { name: "Redux", level: "Advanced" }
    ],
    backend: [
      { name: "Node.js", level: "Advanced" },
      { name: "Python", level: "Intermediate" },
      { name: "MongoDB", level: "Advanced" },
      { name: "PostgreSQL", level: "Intermediate" },
      { name: "GraphQL", level: "Advanced" },
      { name: "Redis", level: "Intermediate" }
    ],
    devops: [
      { name: "Docker", level: "Advanced" },
      { name: "Kubernetes", level: "Intermediate" },
      { name: "AWS", level: "Intermediate" },
      { name: "CI/CD", level: "Advanced" },
      { name: "Nginx", level: "Intermediate" },
      { name: "Linux", level: "Advanced" }
    ]
  };

  const webProjects = [
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      description: "Complete overhaul of an online store with improved UX and performance",
      category: "E-commerce",
      tech: ["React", "Next.js", "Tailwind CSS", "Stripe", "MongoDB"],
      results: ["300% increase in conversions", "40% faster page load", "25% higher average order value"]
    },
    {
      id: 2,
      title: "Healthcare Portal Development",
      description: "Secure patient portal with appointment scheduling and telemedicine features",
      category: "Healthcare",
      tech: ["Vue.js", "Node.js", "PostgreSQL", "AWS", "HIPAA Compliant"],
      results: ["50K+ active users", "99.9% uptime", "Reduced admin work by 60%"]
    },
    {
      id: 3,
      title: "Real Estate Management System",
      description: "Comprehensive platform for property management and virtual tours",
      category: "Real Estate",
      tech: ["React Native", "Firebase", "Google Maps API", "Cloudinary", "Redux"],
      results: ["200% faster property listings", "Virtual tour engagement up 150%", "Mobile app 4.8 stars"]
    },
    {
      id: 4,
      title: "SaaS Productivity Tool",
      description: "All-in-one project management and team collaboration platform",
      category: "SaaS",
      tech: ["Angular", "Python/Django", "Redis", "Docker", "WebSockets"],
      results: ["10K+ monthly active users", "75% team productivity increase", "$500K+ ARR"]
    },
    {
      id: 5,
      title: "Educational Learning Platform",
      description: "Interactive online learning platform with video courses and assessments",
      category: "EdTech",
      tech: ["Next.js", "TypeScript", "Prisma", "Vercel", "Stripe"],
      results: ["50K+ course enrollments", "95% student satisfaction", "Mobile app downloads 100K+"]
    },
    {
      id: 6,
      title: "Travel Booking Portal",
      description: "Multi-vendor travel booking platform with real-time availability",
      category: "Travel",
      tech: ["React", "Express.js", "MongoDB", "REST APIs", "Payment Gateway"],
      results: ["500+ travel partners onboarded", "Booking conversion rate 35%", "24/7 customer support"]
    },
    {
      id: 7,
      title: "Food Delivery App",
      description: "Complete food ordering and delivery solution for restaurants",
      category: "Food Tech",
      tech: ["Flutter", "Node.js", "Firebase", "Google Maps", "Push Notifications"],
      results: ["200+ restaurant partners", "Average delivery time 25 mins", "App rating 4.7 stars"]
    },
    {
      id: 8,
      title: "Financial Dashboard",
      description: "Real-time financial analytics and reporting dashboard for enterprises",
      category: "FinTech",
      tech: ["Vue.js", "Python/Flask", "Chart.js", "WebSockets", "Data Visualization"],
      results: ["Real-time data updates", "Reduced reporting time by 80%", "Used by 500+ financial analysts"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze requirements and create detailed project specifications",
      icon: "📋"
    },
    {
      step: "02",
      title: "UI/UX Design",
      description: "Creating intuitive user interfaces and seamless user experiences",
      icon: "🎨"
    },
    {
      step: "03",
      title: "Development",
      description: "Agile development with regular demos and iterations",
      icon: "💻"
    },
    {
      step: "04",
      title: "Testing & QA",
      description: "Comprehensive testing including unit, integration, and user testing",
      icon: "🔍"
    },
    {
      step: "05",
      title: "Deployment",
      description: "Seamless deployment with CI/CD pipelines and monitoring",
      icon: "🚀"
    },
    {
      step: "06",
      title: "Maintenance",
      description: "Ongoing support, updates, and performance optimization",
      icon: "🔄"
    }
  ];

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
                  Modern Web
                </motion.span>
                <br />
                <motion.span 
                  variants={fadeInUp}
                  className="mt-2 inline-block bg-clip-text text-red-500"
                >
                  Development Solutions
                </motion.span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed drop-shadow"
              >
                We build high-performance, scalable web applications that drive business growth
                and deliver exceptional user experiences with clear ownership and accountability.
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
              { icon: "⌛", value: "24/7", label: "Support", color: "from-red-500 to-red-600" },
              { icon: "📈", value: "99.9%", label: "Uptime", color: "from-green-500 to-emerald-600" },
              { icon: "👥", value: "50+", label: "Web Projects", color: "from-blue-500 to-cyan-600" },
              { icon: "✅", value: "100%", label: "Satisfaction", color: "from-purple-500 to-pink-600" }
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
              Our Web Development <span className="text-red-600">Expertise</span>
            </h2>
            <p className="text-gray-800 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed drop-shadow">
              From simple websites to complex web applications, we deliver solutions that exceed expectations
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
              Cutting-Edge <span className="text-red-600">Technology Stack</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use modern technologies to build robust and scalable web solutions
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
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                    tech.level === 'Expert' ? 'text-green-600' :
                    tech.level === 'Advanced' ? 'text-blue-600' :
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
              Our Development <span className="text-red-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach that ensures quality, transparency, and timely delivery
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
            Featured <span className="text-red-600">Projects</span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-white max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed"
          >
            See how we've helped businesses transform their digital presence
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
                        <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Technologies:</h4>
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
                        <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Results:</h4>
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
}

export default WebDevelopment;