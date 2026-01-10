import React, { useState, useEffect, useRef } from 'react';

function Cloud() {
  const [activeTab, setActiveTab] = useState('cloud-platforms');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [mounted, setMounted] = useState(false);
  
  const sectionsRef = useRef([]);

  useEffect(() => {
    setMounted(true);
    
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

  // Stats counter animation
  const [stats, setStats] = useState({
    uptime: 0,
    savings: 0,
    deployments: 0,
    monitoring: 0
  });

  useEffect(() => {
    if (!isVisible.hero) return;

    const finalStats = {
      uptime: 99.99,
      savings: 40,
      deployments: 200,
      monitoring: 24
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

  const cloudServices = [
    {
      icon: "☁️",
      title: "Cloud Migration",
      description: "Seamless migration of your infrastructure and applications to the cloud",
      features: ["AWS Migration", "Azure Migration", "Google Cloud Migration", "Hybrid Cloud Setup"]
    },
    {
      icon: "🏗️",
      title: "Cloud Architecture",
      description: "Design and implement scalable, secure cloud infrastructure solutions",
      features: ["Microservices Architecture", "Serverless Design", "High Availability", "Disaster Recovery"]
    },
    {
      icon: "🔒",
      title: "Cloud Security",
      description: "Comprehensive security solutions to protect your cloud environment",
      features: ["IAM & Access Control", "Network Security", "Data Encryption", "Compliance Management"]
    },
    {
      icon: "💰",
      title: "Cost Optimization",
      description: "Optimize your cloud spending without compromising performance",
      features: ["Cost Analysis", "Resource Right-sizing", "Reserved Instances", "Budget Management"]
    },
    {
      icon: "⚡",
      title: "DevOps & CI/CD",
      description: "Automate development and deployment processes in the cloud",
      features: ["CI/CD Pipeline", "Infrastructure as Code", "Container Orchestration", "Monitoring & Logging"]
    },
    {
      icon: "📊",
      title: "Data Management",
      description: "Store, process, and analyze data efficiently in the cloud",
      features: ["Data Lakes", "Big Data Processing", "Data Warehousing", "Real-time Analytics"]
    },
    {
      icon: "🌐",
      title: "Multi-Cloud Strategy",
      description: "Leverage multiple cloud providers for maximum flexibility and resilience",
      features: ["Multi-cloud Architecture", "Vendor Management", "Inter-cloud Networking", "Unified Management"]
    },
    {
      icon: "🛡️",
      title: "Backup & Recovery",
      description: "Ensure business continuity with robust backup and disaster recovery solutions",
      features: ["Automated Backups", "Disaster Recovery Plans", "Data Retention", "Recovery Testing"]
    }
  ];

  const techStack = {
    'cloud-platforms': [
      { name: "AWS", level: "Expert" },
      { name: "Azure", level: "Advanced" },
      { name: "Google Cloud", level: "Advanced" },
      { name: "DigitalOcean", level: "Intermediate" },
      { name: "IBM Cloud", level: "Intermediate" },
      { name: "Oracle Cloud", level: "Intermediate" }
    ],
    'infrastructure': [
      { name: "Kubernetes", level: "Advanced" },
      { name: "Docker", level: "Expert" },
      { name: "Terraform", level: "Advanced" },
      { name: "Ansible", level: "Intermediate" },
      { name: "Helm", level: "Advanced" },
      { name: "Prometheus", level: "Intermediate" }
    ],
    'serverless': [
      { name: "AWS Lambda", level: "Expert" },
      { name: "Azure Functions", level: "Advanced" },
      { name: "Google Cloud Functions", level: "Advanced" },
      { name: "Serverless Framework", level: "Expert" },
      { name: "API Gateway", level: "Advanced" },
      { name: "Step Functions", level: "Intermediate" }
    ]
  };

  const cloudProjects = [
    {
      id: 1,
      title: "Enterprise Cloud Migration",
      description: "Migrated 500+ servers and applications to AWS with zero downtime",
      category: "Cloud Migration",
      tech: ["AWS EC2", "RDS", "S3", "CloudFormation", "Route 53"],
      results: ["60% reduction in infrastructure costs", "Zero downtime migration", "99.99% uptime achieved"]
    },
    {
      id: 2,
      title: "Healthcare Data Platform",
      description: "Built a HIPAA-compliant data analytics platform on Azure",
      category: "Healthcare Cloud",
      tech: ["Azure SQL", "Azure Data Lake", "Power BI", "Azure Security Center", "Azure Functions"],
      results: ["50% faster data processing", "HIPAA compliance achieved", "Real-time analytics enabled"]
    },
    {
      id: 3,
      title: "E-commerce Scalability Solution",
      description: "Scaled e-commerce platform to handle 10x traffic during peak seasons",
      category: "Scalability",
      tech: ["AWS Auto Scaling", "Elastic Load Balancing", "CloudFront", "Lambda", "DynamoDB"],
      results: ["Handled 1M+ concurrent users", "Page load time reduced by 70%", "Zero outages during peak"]
    },
    {
      id: 4,
      title: "Multi-Cloud Disaster Recovery",
      description: "Implemented disaster recovery across AWS and Azure for financial institution",
      category: "Disaster Recovery",
      tech: ["AWS", "Azure", "Terraform", "Kubernetes", "Velero"],
      results: ["RTO reduced to 15 minutes", "RPO of 5 minutes", "99.999% availability"]
    },
    {
      id: 5,
      title: "IoT Cloud Platform",
      description: "Built cloud platform for processing 1M+ IoT device data points per second",
      category: "IoT Cloud",
      tech: ["Google Cloud IoT Core", "BigQuery", "Pub/Sub", "Dataflow", "Cloud Functions"],
      results: ["Real-time device monitoring", "95% cost optimization", "Scaled to 5M devices"]
    },
    {
      id: 6,
      title: "Serverless Application",
      description: "Developed completely serverless SaaS application with auto-scaling",
      category: "Serverless",
      tech: ["AWS Lambda", "API Gateway", "DynamoDB", "S3", "Cognito"],
      results: ["Zero server management", "90% cost reduction", "Automatic global scaling"]
    },
    {
      id: 7,
      title: "AI/ML Cloud Infrastructure",
      description: "Built scalable ML platform for training and deploying AI models",
      category: "AI Cloud",
      tech: ["AWS SageMaker", "S3", "EC2 GPU", "CloudWatch", "Step Functions"],
      results: ["10x faster model training", "Automated model deployment", "50% cost savings"]
    },
    {
      id: 8,
      title: "Hybrid Cloud Setup",
      description: "Implemented hybrid cloud connecting on-premise data center with public cloud",
      category: "Hybrid Cloud",
      tech: ["Azure Stack", "ExpressRoute", "VPN Gateway", "Azure Arc", "Monitoring"],
      results: ["Seamless data synchronization", "Enhanced security posture", "40% performance improvement"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Assessment & Strategy",
      description: "Analyze current infrastructure and develop cloud migration strategy",
      icon: "📋"
    },
    {
      step: "02",
      title: "Architecture Design",
      description: "Design scalable and secure cloud architecture tailored to your needs",
      icon: "🏗️"
    },
    {
      step: "03",
      title: "Migration Planning",
      description: "Detailed migration plan with risk assessment and rollback strategy",
      icon: "📅"
    },
    {
      step: "04",
      title: "Implementation",
      description: "Execute migration with minimal disruption using proven methodologies",
      icon: "⚙️"
    },
    {
      step: "05",
      title: "Optimization",
      description: "Continuous optimization for performance, security, and cost efficiency",
      icon: "📊"
    },
    {
      step: "06",
      title: "Managed Services",
      description: "24/7 monitoring, support, and maintenance of cloud infrastructure",
      icon: "🛡️"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .animate-on-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-stagger > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease-out;
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
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
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        
        <div className="absolute inset-0 bg-black/5 z-1"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full animate-float blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full animate-float blur-3xl" style={{animationDelay: '1.5s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-on-scroll ${isVisible.hero ? 'visible' : ''}`}>
            {/* LEFT CONTENT */}
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900 block">
                  Enterprise Cloud
                </span>
                <span className="mt-2 inline-block text-red-600">
                  Solutions & Services
                </span>
              </h1>

              <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
                We deliver scalable, secure, and cost-effective cloud solutions that transform your business 
                and drive digital innovation with complete transparency and accountability.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative group">
                <img
                  src="/Cloud.webp"
                  alt="Cloud Services"
                  className="w-full max-w-lg rounded-xl shadow-xl transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-stagger ${isVisible.hero ? 'visible' : ''}`}>
            {[
              { icon: "☁️", value: stats.uptime.toFixed(2), label: "Uptime SLA", suffix: "%" },
              { icon: "💰", value: Math.round(stats.savings), label: "Cost Savings", suffix: "%" },
              { icon: "🚀", value: Math.round(stats.deployments), label: "Cloud Deployments", suffix: "+" },
              { icon: "🛡️", value: Math.round(stats.monitoring), label: "Security Monitoring", suffix: "/7" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-50/90 border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-500 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-red-600 mb-3 text-2xl">{stat.icon}</div>
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
        className="relative py-12 md:py-16 bg-gray-50"
        ref={el => sectionsRef.current[1] = el}
        data-section-id="services"
      >
        <img
          src="/pic2.avif" 
          alt="Services Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white/90 to-gray-50/80 z-1"></div>

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.services ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Our Cloud <span className="text-red-600">Services</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Comprehensive cloud solutions designed to optimize performance, security, and costs
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 animate-stagger ${isVisible.services ? 'visible' : ''}`}>
              {cloudServices.map((service, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeService === index
                      ? 'rounded-xl border-red-600 shadow-lg shadow-red-500/10 bg-white/95 backdrop-blur-sm'
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
                        {/* Description */}
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed text-center">
                          {service.description}
                        </p>

                        {/* Features */}
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

      {/* ===== TECH STACK SECTION ===== */}
      <section 
        className="relative py-20 bg-white overflow-hidden"
        ref={el => sectionsRef.current[2] = el}
        data-section-id="tech-stack"
      >
        <img
          src="/pic2.avif" 
          alt="Technology Stack Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
      

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible['tech-stack'] ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cloud Technology <span className="text-red-600">Stack</span>
            </h2>
            <p className="text-xl text-grey-900 max-w-3xl mx-auto">
              We leverage industry-leading cloud technologies and tools
            </p>
          </div>
          
          <div className="mb-8">
            <div className={`flex flex-wrap gap-4 justify-center mb-8 animate-stagger ${isVisible['tech-stack'] ? 'visible' : ''}`}>
              {['cloud-platforms', 'infrastructure', 'serverless'].map((tab, idx) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg backdrop-blur-sm' 
                      : 'bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 backdrop-blur-sm'
                  }`}
                >
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
            
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-stagger ${isVisible['tech-stack'] ? 'visible' : ''}`}>
              {techStack[activeTab].map((tech, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200/80 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 text-center hover:scale-[1.02] group"
                >
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {tech.name}
                  </div>
                  <div className={`text-sm font-medium ${
                    tech.level === 'Expert' ? 'text-green-600' :
                    tech.level === 'Advanced' ? 'text-red-600' :
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

      {/* ===== CLOUD PROCESS SECTION ===== */}
      <section 
        className="relative py-20 bg-gray-50 overflow-hidden"
        ref={el => sectionsRef.current[3] = el}
        data-section-id="process"
      >
        <img
          src="/pic1.jpg" 
          alt="Cloud Migration Process Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        {/* <div className="absolute inset-0 bg-gradient-to-b from-gray-50/90 via-white/95 to-gray-50/90 z-1"></div> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible.process ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cloud Migration <span className="text-red-600">Process</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A structured approach to ensure successful cloud adoption and transformation
            </p>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 animate-stagger ${isVisible.process ? 'visible' : ''}`}>
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl font-bold text-gray-300">
                    {step.step}
                  </div>
                  <div className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
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
          src="/gree.jpg" 
          alt="Success Stories Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        />
        
        {/* <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/90 to-white/85 z-1"></div> */}

        <div className="relative z-10">
          <div className={`text-center mb-8 md:mb-12 animate-on-scroll ${isVisible.projects ? 'visible' : ''}`}>
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Cloud Success <span className="text-red-600">Stories</span>
            </h2>
            <p className="text-gray-900 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Transforming businesses with innovative cloud solutions
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 animate-stagger ${isVisible.projects ? 'visible' : ''}`}>
              {cloudProjects.map((project) => (
                <div
                  key={project.id}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${
                    activeProject === project.id
                      ? 'rounded-xl border-red-600 shadow-lg shadow-red-500/10 bg-white/95 backdrop-blur-sm'
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
                        <div className="bg-red-100/80 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm">
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
                        {/* Description */}
                        <p className="text-gray-700 mb-4 text-[14px] leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Technologies:</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech, idx) => (
                              <span 
                                key={idx} 
                                className="bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-200/60 transform transition-transform duration-300 hover:scale-105"
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

      {/* ===== CLOUD BENEFITS SECTION ===== */}
      <section 
        className="relative py-20 overflow-hidden"
        ref={el => sectionsRef.current[5] = el}
        data-section-id="benefits"
      >
        <img
          src="/imggg1.jpg" 
          alt="Why Choose Our Cloud Services Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] bg-[size:20px_20px] opacity-5 z-2"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className={`text-center mb-16 animate-on-scroll ${isVisible.benefits ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our <span className="text-red-600">Cloud Services</span>?
            </h2>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-stagger ${isVisible.benefits ? 'visible' : ''}`}>
            {[
              { icon: "⚡", title: "Scalability", description: "Elastic resources that grow with your business" },
              { icon: "💰", title: "Cost Efficiency", description: "Pay only for what you use with optimized spending" },
              { icon: "🛡️", title: "Security", description: "Enterprise-grade security and compliance" },
              { icon: "🌍", title: "Global Reach", description: "Deploy applications globally with low latency" }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section 
        className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white"
        ref={el => sectionsRef.current[6] = el}
        data-section-id="cta"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
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
                         transition-all duration-300"
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

export default Cloud;