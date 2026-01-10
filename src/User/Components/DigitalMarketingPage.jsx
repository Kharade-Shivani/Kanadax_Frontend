import React, { useState, useEffect, useRef } from 'react';

const DigitalMarketingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [activeService, setActiveService] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! We'll contact you about ${formData.service || 'digital marketing'} soon.`);
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const services = [
    {
      id: 1,
      icon: "🎯",
      title: "SEO Optimization",
      description: "Improve your website's visibility on search engines with proven SEO strategies",
      features: ["Keyword Research", "On-page SEO", "Technical SEO", "Backlink Building", "Local SEO"]
    },
    {
      id: 2,
      icon: "📱",
      title: "Social Media Marketing",
      description: "Engage your audience and build brand presence across social platforms",
      features: ["Content Strategy", "Community Management", "Paid Social Ads", "Influencer Marketing", "Analytics"]
    },
    {
      id: 3,
      icon: "📧",
      title: "Email Marketing",
      description: "Build relationships and drive conversions with targeted email campaigns",
      features: ["Newsletter Design", "Automation Workflows", "Segmentation", "A/B Testing", "Performance Tracking"]
    },
    {
      id: 4,
      icon: "🔍",
      title: "PPC Advertising",
      description: "Drive targeted traffic and leads with pay-per-click advertising campaigns",
      features: ["Google Ads", "Facebook Ads", "Display Advertising", "Remarketing", "Conversion Optimization"]
    },
    {
      id: 5,
      icon: "📝",
      title: "Content Marketing",
      description: "Create valuable content that attracts, engages, and converts your audience",
      features: ["Blog Writing", "Video Content", "Infographics", "Case Studies", "Content Strategy"]
    },
    {
      id: 6,
      icon: "📊",
      title: "Analytics & Reporting",
      description: "Track performance and make data-driven decisions with comprehensive analytics",
      features: ["Google Analytics", "Conversion Tracking", "ROI Analysis", "Dashboard Creation", "Performance Reports"]
    },
    {
      id: 7,
      icon: "🎨",
      title: "Brand Strategy",
      description: "Develop a strong brand identity and messaging that resonates with your audience",
      features: ["Brand Positioning", "Visual Identity", "Brand Guidelines", "Voice & Tone", "Competitor Analysis"]
    },
    {
      id: 8,
      icon: "📈",
      title: "Growth Marketing",
      description: "Implement data-driven strategies to accelerate business growth and scale revenue",
      features: ["CRO Optimization", "Growth Hacking", "Market Research", "Customer Acquisition", "Retention Strategies"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director, TechCorp",
      comment: "Their digital marketing strategy increased our online leads by 240% in just 6 months!",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "CEO, Innovate Solutions",
      comment: "The team's expertise in PPC and SEO transformed our digital presence. Highly recommended!",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, StartUp Ventures",
      comment: "Outstanding content marketing services that helped us build a loyal customer base.",
      avatar: "ER"
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
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: var(--target-width); }
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
        
        .animate-progress {
          --target-width: 75%;
          animation: progress 1s ease-out forwards;
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
        
        .gradient-border {
          position: relative;
          border: 2px solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(90deg, #dc2626, #4b5563, #dc2626) border-box;
          animation: gradient 3s linear infinite;
        }
      `}</style>

      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20 md:py-32"
        ref={el => sectionsRef.current[0] = el}
        data-section-id="hero"
      >
        <img
          src="/imggg1.jpg" 
          alt="Digital Marketing Background"
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
                  Digital Marketing That
                </span>
                <br />
                <span className="mt-2 inline-block animate-gradient">
                  Drives Real Results
                </span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-900 max-w-3xl leading-relaxed">
                Human-led strategies combined with data-driven execution to increase your visibility, engagement, and conversions.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative group">
                <img
                  src="/digital.png"
                  alt="Digital Marketing"
                  className="w-full max-w-lg rounded-xl shadow-xl transform transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
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
          src="/greyy.avif" 
          alt="Digital Marketing Services Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
      

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.services ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Comprehensive <span className="text-red-600 animate-pulse">Digital Marketing</span> Solutions
            </h2>
            <p className="text-gray-900 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              We offer end-to-end digital marketing services tailored to your business goals and target audience.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 animate-stagger ${isVisible.services ? 'visible' : ''}`}>
              {services.map((service, index) => (
                <div
                  key={service.id}
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
                      <div className={`text-red-600 transition-all duration-300 animate-bounce ${
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
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US SECTION ===== */}
      <section 
        className="relative py-20 bg-white overflow-hidden"
        ref={el => sectionsRef.current[2] = el}
        data-section-id="why-choose"
      >
        <img
          src="/imggg2.jpg"
          alt="Why Choose Our Marketing Agency Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        


        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible['why-choose'] ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our <span className="text-red-600">Marketing Agency</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine data-driven strategies with creative execution to deliver measurable results.
            </p>
          </div>
          
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-stagger ${isVisible['why-choose'] ? 'visible' : ''}`}>
            <div>
              <div className="mb-8">
                <div className="flex items-start mb-8 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">Proven Results</h3>
                    <p className="text-gray-600">We have a track record of increasing client revenue by an average of 200% within the first year.</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-8 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse" style={{animationDelay: '0.5s'}}>
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">Transparent Reporting</h3>
                    <p className="text-gray-600">Get detailed analytics and regular reports so you can see exactly how your campaigns are performing.</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse" style={{animationDelay: '1s'}}>
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">Custom Strategies</h3>
                    <p className="text-gray-600">We don't believe in one-size-fits-all solutions. Every strategy is tailored to your unique business needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-8 shadow-lg hover-lift relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Campaign Performance</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">ROI Improvement</span>
                    <span className="font-bold text-green-600 animate-pulse">+42%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-progress" style={{animationDelay: '0.1s'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Lead Generation</span>
                    <span className="font-bold text-blue-600 animate-pulse" style={{animationDelay: '0.3s'}}>+65%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-progress" style={{width: '80%', animationDelay: '0.3s'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Brand Awareness</span>
                    <span className="font-bold text-purple-600 animate-pulse" style={{animationDelay: '0.5s'}}>+38%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-progress" style={{width: '66%', animationDelay: '0.5s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section 
        className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white"
        ref={el => sectionsRef.current[3] = el}
        data-section-id="cta"
      >
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-red-600/20 via-transparent to-blue-600/20 bg-[size:200%_100%]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
          <h2 className={`text-[30px] font-bold mb-4 md:mb-6 animate-on-scroll ${isVisible.cta ? 'visible' : ''}`}>
            Technology Is Everywhere. <span className="text-red-400 animate-pulse">Ownership Is Rare</span>.
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
};

export default DigitalMarketingPage;