import React, { useState, useEffect, useRef } from 'react';

function Mobile() {
  const [activeTab, setActiveTab] = useState('native');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [stats, setStats] = useState({
    platforms: 0,
    loadTime: 0,
    apps: 0,
    rating: 0
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
      platforms: 2,
      loadTime: 1,
      apps: 30,
      rating: 4.8
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

  const mobileServices = [
    {
      icon: "📱",
      title: "iOS App Development",
      description: "Native iOS applications built with Swift and SwiftUI for optimal performance",
      features: ["Swift/SwiftUI", "UIKit", "Core Data", "App Store Deployment", "Apple Pay Integration"]
    },
    {
      icon: "🤖",
      title: "Android App Development",
      description: "Native Android apps using Kotlin and Jetpack Compose for superior user experience",
      features: ["Kotlin/Java", "Jetpack Compose", "Room Database", "Play Store Deployment", "Material Design"]
    },
    {
      icon: "⚛️",
      title: "Cross-Platform Development",
      description: "Build once, deploy everywhere with React Native and Flutter",
      features: ["React Native", "Flutter", "Single Codebase", "iOS & Android", "Hot Reload"]
    },
    {
      icon: "🌐",
      title: "Progressive Web Apps",
      description: "Web applications that work offline and feel like native apps",
      features: ["PWA", "Service Workers", "Offline Capability", "Push Notifications", "App-like UI"]
    },
    {
      icon: "🎮",
      title: "Mobile Games Development",
      description: "Engaging mobile games with stunning graphics and smooth gameplay",
      features: ["Unity", "Unreal Engine", "2D/3D Graphics", "In-App Purchases", "Multiplayer Support"]
    },
    {
      icon: "🔌",
      title: "API Integration",
      description: "Seamlessly connect your mobile app with backend services and third-party APIs",
      features: ["REST APIs", "GraphQL", "WebSockets", "Authentication", "Real-time Updates"]
    },
    {
      icon: "🔒",
      title: "App Security",
      description: "Protect user data and ensure compliance with security best practices",
      features: ["Data Encryption", "Secure Authentication", "Code Obfuscation", "Penetration Testing", "GDPR Compliance"]
    },
    {
      icon: "📊",
      title: "App Maintenance & Support",
      description: "Ongoing support, updates, and optimization for your mobile applications",
      features: ["Bug Fixes", "Performance Optimization", "OS Updates", "Feature Enhancements", "24/7 Support"]
    }
  ];

  const techStack = {
    native: [
      { name: "Swift", level: "Advanced" },
      { name: "SwiftUI", level: "Expert" },
      { name: "Kotlin", level: "Advanced" },
      { name: "Jetpack Compose", level: "Advanced" },
      { name: "Objective-C", level: "Intermediate" },
      { name: "Java", level: "Intermediate" }
    ],
    cross: [
      { name: "React Native", level: "Expert" },
      { name: "Flutter", level: "Advanced" },
      { name: "Expo", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Dart", level: "Intermediate" },
      { name: "Redux", level: "Advanced" }
    ],
    backend: [
      { name: "Firebase", level: "Expert" },
      { name: "Node.js", level: "Advanced" },
      { name: "GraphQL", level: "Advanced" },
      { name: "WebSockets", level: "Advanced" },
      { name: "AWS Amplify", level: "Intermediate" },
      { name: "MongoDB", level: "Intermediate" }
    ]
  };

  const mobileProjects = [
    {
      id: 1,
      title: "Fitness Tracking App",
      description: "Comprehensive fitness app with workout plans, nutrition tracking, and progress analytics",
      category: "Health & Fitness",
      tech: ["React Native", "Firebase", "Redux", "Google Fit API", "Apple HealthKit"],
      results: ["500K+ downloads", "4.8-star rating", "30% monthly active users"]
    },
    {
      id: 2,
      title: "Food Delivery Platform",
      description: "Multi-restaurant food ordering and delivery app with real-time tracking",
      category: "Food & Delivery",
      tech: ["Flutter", "Node.js", "MongoDB", "Google Maps API", "Stripe"],
      results: ["200+ restaurant partners", "Average order time 25 mins", "$2M+ monthly GMV"]
    },
    {
      id: 3,
      title: "Language Learning App",
      description: "Interactive language learning platform with speech recognition and AI tutors",
      category: "Education",
      tech: ["Swift", "Kotlin", "AWS", "Machine Learning", "Speech Recognition"],
      results: ["1M+ active learners", "85% course completion rate", "Featured by Apple & Google"]
    },
    {
      id: 4,
      title: "E-commerce Mobile App",
      description: "Feature-rich shopping app with AR product visualization and secure payments",
      category: "E-commerce",
      tech: ["React Native", "Redux", "Stripe", "AR Core", "AR Kit"],
      results: ["300% increase in mobile sales", "2x faster checkout", "4.9-star rating"]
    },
    {
      id: 5,
      title: "Meditation & Wellness App",
      description: "Mindfulness and meditation app with personalized recommendations",
      category: "Mental Health",
      tech: ["Flutter", "Firebase", "Audio Streaming", "Push Notifications", "Subscription"],
      results: ["750K+ users", "95% retention rate", "$500K+ monthly revenue"]
    },
    {
      id: 6,
      title: "Social Networking App",
      description: "Niche social platform for hobby enthusiasts with video sharing features",
      category: "Social Media",
      tech: ["SwiftUI", "Kotlin", "WebRTC", "AWS S3", "WebSocket"],
      results: ["250K+ registered users", "1M+ daily interactions", "Viral growth 200% month-over-month"]
    },
    {
      id: 7,
      title: "Finance & Budgeting App",
      description: "Personal finance management app with expense tracking and investment insights",
      category: "FinTech",
      tech: ["React Native", "Plaid API", "Bank Integration", "Data Encryption", "Biometric Auth"],
      results: ["100K+ active users", "Average savings increase 25%", "Bank-level security"]
    },
    {
      id: 8,
      title: "Event Management App",
      description: "All-in-one event planning and ticketing platform with QR scanning",
      category: "Events",
      tech: ["Flutter", "Node.js", "QR Code", "Push Notifications", "Payment Gateway"],
      results: ["500+ events managed", "95% attendee satisfaction", "Sold 1M+ tickets"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "Analyze requirements and define app architecture and features",
      icon: "📋"
    },
    {
      step: "02",
      title: "UI/UX Design",
      description: "Create intuitive mobile interfaces and seamless user journeys",
      icon: "🎨"
    },
    {
      step: "03",
      title: "Development",
      description: "Agile development with weekly demos and continuous integration",
      icon: "💻"
    },
    {
      step: "04",
      title: "Testing",
      description: "Comprehensive testing on real devices and emulators",
      icon: "🔍"
    },
    {
      step: "05",
      title: "Deployment",
      description: "App Store/Play Store submission and launch management",
      icon: "🚀"
    },
    {
      step: "06",
      title: "Support & Updates",
      description: "Ongoing maintenance, feature updates, and performance monitoring",
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
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
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
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
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
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
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 1000px 100%;
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #dc2626, #4b5563, #dc2626);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 3s linear infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
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
        className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 md:py-32"
        ref={el => sectionsRef.current[0] = el}
        data-section-id="hero"
      >
        <img
          src="/pic1.jpg"
          alt="Mobile App Development Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        <div className="absolute inset-0 bg-black/10 z-1"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full animate-float blur-3xl" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-on-scroll ${isVisible.hero ? 'visible' : ''}`}>
            {/* LEFT CONTENT */}
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900">
                  Next-Generation
                </span>
                <br />
                <span className="mt-2 inline-block gradient-text">
                  Mobile Applications
                </span>
              </h1>

              <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                We create powerful, user-centric mobile apps that drive engagement
                and deliver exceptional experiences across all platforms and devices.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative group">
                <img
                  src="/mobile.png"
                  alt="Mobile App Development"
                  className="w-full max-w-lg rounded-xl shadow-xl transform transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-stagger ${isVisible.hero ? 'visible' : ''}`}>
            {[
              { icon: "📱", value: stats.platforms, label: "Dual Platform", suffix: "" },
              { icon: "⚡", value: stats.loadTime.toFixed(0), label: "Load Time", suffix: "s" },
              { icon: "👥", value: stats.apps.toFixed(0), label: "Mobile Apps", suffix: "+" },
              { icon: "✅", value: stats.rating.toFixed(1), label: "Average Rating", suffix: "★" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-50/90 border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-500 backdrop-blur-sm hover-lift relative overflow-hidden group"
              >
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-red-600 mb-3 text-2xl animate-pulse">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value < 1 ? `<${stat.value}${stat.suffix}` : `${stat.value}${stat.suffix}`}
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
        className="relative py-12 md:py-16 bg-gray-50"
        ref={el => sectionsRef.current[1] = el}
        data-section-id="services"
      >
        <img
          src="/pic7.webp" 
          alt="Mobile Development Services Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-25"
        />
        

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.services ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Our Mobile Development <span className="text-red-600">Services</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              From concept to deployment, we build mobile solutions that users love
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 animate-stagger ${isVisible.services ? 'visible' : ''}`}>
              {mobileServices.map((service, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeService === index
                      ? 'rounded-xl border-red-600 shadow-lg shadow-red-500/10 bg-white/95 backdrop-blur-sm scale-105'
                      : 'rounded-lg border-gray-200 bg-white/95 backdrop-blur-sm hover:border-gray-300'
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
                  {/* Hover Gradient - Only show for active card */}
                  {activeService === index && (
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                  )}

                  <div className="relative flex flex-col h-full">
                    {/* Icon and Title Container - Always visible */}
                    <div className={`flex flex-col items-center justify-center flex-1 ${
                      activeService === index ? '' : 'h-full'
                    }`}>
                      {/* Icon */}
                      <div className={`text-red-600 transition-all duration-300 ${
                        activeService === index ? 'scale-110 mb-3' : 'scale-100 mb-4'
                      }`}>
                        {service.icon}
                      </div>

                      {/* Title */}
                      <h3 className={`text-center font-bold text-gray-900 transition-all duration-300 ${
                        activeService === index 
                          ? 'text-[17px]' 
                          : 'text-[14px]'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Details - Only show when this card is active */}
                    {activeService === index && (
                      <div className="animate-fadeIn mt-4">
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed text-center">
                          {service.description}
                        </p>

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
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section 
        className="relative py-20 bg-white overflow-hidden"
        ref={el => sectionsRef.current[2] = el}
        data-section-id="tech-stack"
      >
        <img
          src="/imggg3.jpg" 
          alt="Mobile Technology Stack Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible['tech-stack'] ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Advanced <span className="text-red-600">Technology Stack</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technologies for building high-performance mobile apps
            </p>
          </div>
          
          <div className="mb-8">
            <div className={`flex flex-wrap gap-4 justify-center mb-8 animate-stagger ${isVisible['tech-stack'] ? 'visible' : ''}`}>
              {['native', 'cross', 'backend'].map((tab, idx) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg backdrop-blur-sm animate-pulse' 
                      : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 backdrop-blur-sm'
                  }`}
                >
                  {tab === 'native' ? 'Native Development' : 
                   tab === 'cross' ? 'Cross-Platform' : 'Backend & APIs'}
                </button>
              ))}
            </div>
            
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-stagger ${isVisible['tech-stack'] ? 'visible' : ''}`}>
              {techStack[activeTab].map((tech, index) => (
                <div 
                  key={index}
                  className="bg-white/90 backdrop-blur-sm border border-gray-200/80 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 text-center hover:scale-[1.02] hover-lift group"
                >
                  <div className="text-lg font-bold text-gray-900 mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {tech.name}
                  </div>
                  <div className={`text-sm font-medium animate-pulse ${
                    tech.level === 'Expert' ? 'text-green-600' :
                    tech.level === 'Advanced' ? 'text-blue-600' :
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

      {/* ===== DEVELOPMENT PROCESS SECTION ===== */}
      <section 
        className="relative py-20 bg-gray-50 overflow-hidden"
        ref={el => sectionsRef.current[3] = el}
        data-section-id="process"
      >
        <img
          src="/green.avif" 
          alt="App Development Process Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
       

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible.process ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our App Development <span className="text-red-600">Process</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A proven methodology for delivering successful mobile applications
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 animate-stagger ${isVisible.process ? 'visible' : ''}`}>
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift group relative overflow-hidden"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-3xl font-bold text-gray-300 group-hover:text-red-600 transition-colors duration-300">
                      {step.step}
                    </div>
                    <div className="text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-700 transition-colors duration-300">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS SHOWCASE SECTION ===== */}
      <section 
        className="relative py-12 md:py-16 bg-white overflow-hidden" 
        id="projects"
        ref={el => sectionsRef.current[4] = el}
        data-section-id="projects"
      >
        <img
          src="/pic.avif"  
          alt="Featured Mobile Apps Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.projects ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Featured <span className="text-red-600">Mobile Apps</span>
            </h2>
            <p className="text-gray-900 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              See how we've transformed ideas into successful mobile applications
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 animate-stagger ${isVisible.projects ? 'visible' : ''}`}>
              {mobileProjects.map((project) => (
                <div
                  key={project.id}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeProject === project.id
                      ? 'rounded-xl border-red-600 shadow-lg shadow-red-500/10 bg-white/95 backdrop-blur-sm scale-105'
                      : 'rounded-lg border-gray-200 bg-gray-50/90 backdrop-blur-sm hover:border-gray-300'
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
                  {/* Hover Gradient - Only show for active card */}
                  {activeProject === project.id && (
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-red-50/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    ></div>
                  )}

                  <div className="relative flex flex-col h-full">
                    {/* Main Content Container - Always visible */}
                    <div className={`flex flex-col items-center justify-center flex-1 ${
                      activeProject === project.id ? '' : 'h-full'
                    }`}>
                      {/* Category Badge */}
                      <div className={`inline-flex items-center gap-1.5 transition-all duration-300 ${
                        activeProject === project.id ? 'scale-105 mb-4' : 'scale-100 mb-3'
                      }`}>
                        <div className="bg-red-100/80 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm animate-pulse">
                          {project.category}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className={`text-center font-bold text-gray-900 transition-all duration-300 ${
                        activeProject === project.id 
                          ? 'text-[17px]' 
                          : 'text-[14px]'
                      }`}>
                        {project.title}
                      </h3>
                    </div>

                    {/* Details - Only show when this card is active */}
                    {activeProject === project.id && (
                      <div className="animate-fadeIn mt-4">
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Technologies:</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech, idx) => (
                              <span 
                                key={idx} 
                                className="bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-200/60 transform hover:scale-110 transition-all duration-300"
                                style={{animationDelay: `${idx * 0.05}s`}}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Results */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Results:</h4>
                          <ul className="space-y-2">
                            {project.results.map((result, idx) => (
                              <li 
                                key={idx} 
                                className="flex items-start text-gray-700 text-[12px] leading-snug opacity-0"
                                style={{animation: `slideInLeft 0.5s ease-out forwards`, animationDelay: `${idx * 0.1}s`}}
                              >
                                <svg 
                                  className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0 animate-pulse" 
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
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 animate-gradient-shift"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
          <h2 className={`text-[30px] font-bold mb-4 md:mb-6 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            Technology Is Everywhere. <span className="text-red-400">Ownership Is Rare</span>.
          </h2>
          <p className={`text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            Partner with a team that stays accountable from start to scale.
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
              Let's Talk
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
            No bots. No runaround. Just real conversations with accountable partners.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Mobile;