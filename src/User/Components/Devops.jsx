import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

function DevOps() {
  const [activeTab, setActiveTab] = useState('automation');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  
  const sectionRefs = {
    hero: useRef(null),
    services: useRef(null),
    techStack: useRef(null),
    process: useRef(null),
    projects: useRef(null),
    benefits: useRef(null)
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    Object.keys(sectionRefs).forEach(key => {
      if (sectionRefs[key].current) {
        observer.observe(sectionRefs[key].current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Animate numbers counter
  useEffect(() => {
    const counters = document.querySelectorAll('.count-animate');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const increment = target / 100;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + (counter.classList.contains('percent') ? '%' : 'x');
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target + (counter.classList.contains('percent') ? '%' : 'x');
        }
      };
      
      setTimeout(updateCounter, 500);
    });
  }, []);

  const devopsServices = [
    {
      icon: "🔄",
      title: "CI/CD Pipeline",
      description: "Automated continuous integration and deployment pipelines for faster releases",
      features: ["Automated Testing", "Build Automation", "Deployment Automation", "Rollback Strategies", "Pipeline Monitoring"]
    },
    {
      icon: "🐳",
      title: "Containerization",
      description: "Container-based development and deployment using Docker and Kubernetes",
      features: ["Docker Implementation", "Kubernetes Orchestration", "Container Registry", "Microservices", "Service Mesh"]
    },
    {
      icon: "🏗️",
      title: "Infrastructure as Code",
      description: "Manage and provision infrastructure through code for consistency and efficiency",
      features: ["Terraform", "CloudFormation", "Ansible", "Configuration Management", "Version Control"]
    },
    {
      icon: "📊",
      title: "Monitoring & Observability",
      description: "Comprehensive monitoring solutions for performance and reliability insights",
      features: ["Log Management", "Metrics Collection", "APM Tools", "Alerting Systems", "Dashboard Creation"]
    },
    {
      icon: "🔒",
      title: "DevSecOps",
      description: "Integrate security practices throughout the DevOps lifecycle",
      features: ["Security Scanning", "Vulnerability Management", "Compliance Automation", "Secret Management", "Security Testing"]
    },
    {
      icon: "☁️",
      title: "Cloud DevOps",
      description: "Cloud-native DevOps practices for scalable and resilient applications",
      features: ["Cloud Migration", "Serverless Architecture", "Cloud Optimization", "Multi-cloud Strategy", "Cost Management"]
    },
    {
      icon: "⚡",
      title: "Performance Optimization",
      description: "Optimize application performance and infrastructure efficiency",
      features: ["Load Testing", "Performance Tuning", "Capacity Planning", "Resource Optimization", "Caching Strategies"]
    },
    {
      icon: "🛠️",
      title: "DevOps Consulting",
      description: "Strategic consulting to implement DevOps best practices and culture",
      features: ["Process Assessment", "Toolchain Selection", "Team Training", "Culture Transformation", "ROI Analysis"]
    }
  ];

  const techStack = {
    automation: [
      { name: "Jenkins", level: "Expert" },
      { name: "GitLab CI/CD", level: "Advanced" },
      { name: "GitHub Actions", level: "Advanced" },
      { name: "Ansible", level: "Expert" },
      { name: "Terraform", level: "Advanced" },
      { name: "Helm", level: "Intermediate" }
    ],
    containerization: [
      { name: "Docker", level: "Expert" },
      { name: "Kubernetes", level: "Advanced" },
      { name: "Docker Swarm", level: "Intermediate" },
      { name: "OpenShift", level: "Intermediate" },
      { name: "Rancher", level: "Advanced" },
      { name: "Podman", level: "Intermediate" }
    ],
    cloud: [
      { name: "AWS", level: "Advanced" },
      { name: "Azure", level: "Advanced" },
      { name: "Google Cloud", level: "Intermediate" },
      { name: "Digital Ocean", level: "Advanced" },
      { name: "Cloudflare", level: "Advanced" },
      { name: "Heroku", level: "Expert" }
    ]
  };

  const devopsProjects = [
    {
      id: 1,
      title: "Enterprise CI/CD Transformation",
      description: "Implemented automated CI/CD pipelines for 50+ development teams across the organization",
      category: "CI/CD Implementation",
      tech: ["Jenkins", "GitLab CI", "Docker", "Kubernetes", "Helm"],
      results: ["Deployment time reduced by 80%", "Release frequency increased from monthly to daily", "99.9% deployment success rate"]
    },
    {
      id: 2,
      title: "Container Platform Migration",
      description: "Migrated legacy applications to Kubernetes platform with zero downtime",
      category: "Containerization",
      tech: ["Kubernetes", "Docker", "Istio", "Prometheus", "Grafana"],
      results: ["Infrastructure costs reduced by 40%", "Application scalability improved 5x", "Zero downtime during migration"]
    },
    {
      id: 3,
      title: "Multi-cloud DevOps Strategy",
      description: "Implemented DevOps practices across AWS, Azure, and Google Cloud platforms",
      category: "Multi-cloud",
      tech: ["Terraform", "Ansible", "AWS", "Azure", "Google Cloud"],
      results: ["Cloud costs optimized by 35%", "Disaster recovery time reduced to minutes", "Vendor lock-in eliminated"]
    },
    {
      id: 4,
      title: "FinTech DevOps Modernization",
      description: "Transformed development processes for financial services company with strict compliance",
      category: "FinTech DevOps",
      tech: ["GitHub Actions", "Artifactory", "SonarQube", "Splunk", "Jira"],
      results: ["Compliance audit time reduced by 70%", "Security vulnerabilities detected early", "Developer productivity increased 60%"]
    },
    {
      id: 5,
      title: "E-commerce Performance Scaling",
      description: "Scaled DevOps infrastructure to handle 10x traffic during peak holiday seasons",
      category: "Performance Scaling",
      tech: ["AWS Auto Scaling", "Load Balancers", "CDN", "Redis", "PostgreSQL"],
      results: ["Handled 1M+ concurrent users", "Page load time under 2 seconds", "Zero downtime during peak traffic"]
    },
    {
      id: 6,
      title: "Healthcare DevOps Compliance",
      description: "Implemented HIPAA-compliant DevOps practices for healthcare application",
      category: "Healthcare DevOps",
      tech: ["AWS GovCloud", "Terraform", "Docker", "HIPAA Compliance", "Security Scanning"],
      results: ["HIPAA compliance achieved", "Security incidents reduced by 90%", "Audit preparation time cut by 75%"]
    },
    {
      id: 7,
      title: "Microservices Transformation",
      description: "Migrated monolithic application to microservices architecture with DevOps practices",
      category: "Microservices",
      tech: ["Docker", "Kubernetes", "Spring Boot", "API Gateway", "Service Mesh"],
      results: ["Deployment independence for teams", "Fault isolation improved", "New feature delivery 3x faster"]
    },
    {
      id: 8,
      title: "Observability Platform Implementation",
      description: "Built comprehensive observability platform for real-time application monitoring",
      category: "Observability",
      tech: ["Prometheus", "Grafana", "ELK Stack", "Jaeger", "OpenTelemetry"],
      results: ["Mean time to resolution reduced by 65%", "Proactive issue detection", "System performance improved 40%"]
    }
  ];
  
  const processSteps = [
    {
      step: "01",
      title: "Assessment & Planning",
      description: "Analyze current infrastructure and define DevOps transformation roadmap",
      icon: "📋"
    },
    {
      step: "02",
      title: "Infrastructure Setup",
      description: "Configure cloud infrastructure and container orchestration platforms",
      icon: "🛠️"
    },
    {
      step: "03",
      title: "Pipeline Implementation",
      description: "Build CI/CD pipelines for automated testing and deployment",
      icon: "🔧"
    },
    {
      step: "04",
      title: "Monitoring Integration",
      description: "Implement comprehensive monitoring, logging, and alerting systems",
      icon: "👁️"
    },
    {
      step: "05",
      title: "Security Hardening",
      description: "Integrate security practices and compliance automation",
      icon: "🔒"
    },
    {
      step: "06",
      title: "Optimization & Scaling",
      description: "Continuous optimization, scaling, and performance tuning",
      icon: "⚡"
    }
  ];

  // Add CSS animation styles
  const animationStyles = `
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
    
    @keyframes fadeInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
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
        opacity: 0.7;
      }
    }
    
    @keyframes slideInFromBottom {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fadeInUp {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .animate-fadeInLeft {
      animation: fadeInLeft 0.8s ease-out forwards;
    }
    
    .animate-fadeInRight {
      animation: fadeInRight 0.8s ease-out forwards;
    }
    
    .animate-scaleIn {
      animation: scaleIn 0.6s ease-out forwards;
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-pulse {
      animation: pulse 2s ease-in-out infinite;
    }
    
    .animate-slideIn {
      animation: slideInFromBottom 0.5s ease-out forwards;
    }
    
    .animate-delay-100 {
      animation-delay: 100ms;
    }
    
    .animate-delay-200 {
      animation-delay: 200ms;
    }
    
    .animate-delay-300 {
      animation-delay: 300ms;
    }
    
    .animate-delay-400 {
      animation-delay: 400ms;
    }
    
    .animate-delay-500 {
      animation-delay: 500ms;
    }
    
    .stagger-animate > * {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .stagger-animate.visible > * {
      opacity: 1;
      transform: translateY(0);
    }
    
    .stagger-animate.visible > *:nth-child(1) { transition-delay: 100ms; }
    .stagger-animate.visible > *:nth-child(2) { transition-delay: 200ms; }
    .stagger-animate.visible > *:nth-child(3) { transition-delay: 300ms; }
    .stagger-animate.visible > *:nth-child(4) { transition-delay: 400ms; }
    .stagger-animate.visible > *:nth-child(5) { transition-delay: 500ms; }
    .stagger-animate.visible > *:nth-child(6) { transition-delay: 600ms; }
    .stagger-animate.visible > *:nth-child(7) { transition-delay: 700ms; }
    .stagger-animate.visible > *:nth-child(8) { transition-delay: 800ms; }
    
    .card-expand {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }
    
    .card-expand.expanded {
      height: auto !important;
    }
    
    .tab-transition {
      transition: all 0.3s ease;
    }
    
    .hover-lift {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .icon-spin {
      transition: transform 0.6s ease;
    }
    
    .icon-spin:hover {
      transform: rotate(360deg);
    }
    
    .border-glow {
      position: relative;
    }
    
    .border-glow::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(45deg, #ef4444, #f87171, #ef4444);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .border-glow:hover::before {
      opacity: 1;
    }
    
    .count-animate {
      transition: all 0.3s ease;
    }
    
    .text-gradient {
      background: linear-gradient(45deg, #ef4444, #dc2626);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-white overflow-x-hidden">
        {/* ===== HERO SECTION ===== */}
        <section 
          ref={sectionRefs.hero}
          id="hero"
          className="relative overflow-hidden py-20 md:py-32"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url('/greyy.avif')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/40"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* LEFT CONTENT */}
              <div className={`text-left ${isVisible.hero ? 'animate-fadeInLeft' : 'opacity-0'}`}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-black">
                    DevOps & Cloud
                  </span>
                  <br />
                  <span className="mt-2 inline-block text-red-600 animate-pulse">
                    Infrastructure Solutions
                  </span>
                </h1>

                <p className="mt-6 text-xl md:text-2xl text-gray-900 max-w-3xl leading-relaxed animate-delay-200">
                  We engineer scalable, automated, and secure infrastructure that accelerates development 
                  cycles and ensures 24/7 reliability with full transparency and ownership.
                </p>
              </div>

              {/* RIGHT IMAGE */}
              <div className={`flex justify-center lg:justify-end ${isVisible.hero ? 'animate-fadeInRight' : 'opacity-0'}`}>
                <div className="relative group">
                  <img
                    src="/Devops.jpg"
                    alt="DevOps & Cloud Infrastructure"
                    className="w-full max-w-lg rounded-xl shadow-2xl border-4 border-white/20 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:via-red-600/5 group-hover:to-red-600/10 transition-all duration-500"></div>
                </div>
              </div>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 ${isVisible.hero ? 'animate-fadeInUp' : 'opacity-0'}`}>
              {[
                { icon: "⚡", value: "10x", label: "Faster Deployments" },
                { icon: "📈", value: "99.99%", label: "Uptime SLA" },
                { icon: "💰", value: "40%", label: "Cost Reduction" },
                { icon: "🔒", value: "24/7", label: "Security Monitoring" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm border border-gray-200 p-6 rounded-xl hover-lift hover:border-red-400 transition-all hover:bg-white"
                >
                  <div className="text-red-600 mb-3 text-2xl animate-float">{stat.icon}</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2 count-animate" 
                       data-target={stat.value.replace('%', '').replace('x', '')}
                       data-is-percent={stat.value.includes('%')}>
                    {stat.value}
                  </div>
                  <div className="text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SERVICES SECTION ===== */}
        <section 
          ref={sectionRefs.services}
          id="services"
          className="relative py-12 md:py-16 bg-gray-50"
          style={{
            backgroundImage: "url('/pic2.avif')", 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative z-10">
            <div className={`text-center mb-8 md:mb-12 ${isVisible.services ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-white leading-tight">
                Our DevOps <span className="text-red-400 animate-pulse">Services</span>
              </h2>
              <p className="text-gray-200 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
                End-to-end DevOps solutions that streamline development, enhance reliability, and boost productivity
              </p>
            </div>

            <div className="max-w-7xl mx-auto px-4">
              <div className={`stagger-animate grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 ${isVisible.services ? 'visible' : ''}`}>
                {devopsServices.map((service, index) => (
                  <div
                    key={index}
                    className={`group relative card-expand cursor-pointer flex flex-col ${
                      activeService === index
                        ? 'expanded rounded-xl border-red-500 shadow-lg shadow-red-500/20 bg-white/95 backdrop-blur-sm'
                        : 'rounded-lg border-gray-300/50 bg-white/90 backdrop-blur-sm hover:border-gray-400/70'
                    }`}
                    style={{
                      borderWidth: '1px',
                      height: activeService === index ? 'auto' : '140px',
                      padding: activeService === index ? '1.5rem' : '1rem',
                    }}
                    onMouseEnter={() => setActiveService(index)}
                    onMouseLeave={() => setActiveService(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-100/0 via-red-100/0 to-red-100/0 group-hover:from-red-100/20 group-hover:via-red-100/10 group-hover:to-red-100/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <div className="relative flex flex-col h-full">
                      <div className={`flex flex-col items-center justify-center flex-1 ${
                        activeService === index ? '' : 'h-full'
                      }`}>
                        <div className={`text-red-600 transition-all duration-300 icon-spin ${
                          activeService === index ? 'scale-110 mb-3' : 'scale-100 mb-4'
                        }`}>
                          {service.icon}
                        </div>

                        <h3 className={`text-center font-bold text-gray-900 transition-all duration-300 ${
                          activeService === index 
                            ? 'text-[17px]' 
                            : 'text-[14px]'
                        }`}>
                          {service.title}
                        </h3>
                      </div>

                      {activeService === index && (
                        <div className="animate-slideIn mt-4">
                          <p className="text-gray-700 mb-4 text-[14px] leading-relaxed text-center">
                            {service.description}
                          </p>

                          <ul className="space-y-2 mb-4">
                            {service.features.map((feature, i) => (
                              <li 
                                key={i} 
                                className="flex items-start text-[13px] leading-snug"
                                style={{ animationDelay: `${i * 50}ms` }}
                              >
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0 animate-pulse"></div>
                                <span className="text-gray-800">{feature}</span>
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
          ref={sectionRefs.techStack}
          id="techStack"
          className="relative py-20 bg-white"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ 
              backgroundImage: 'url(/pic1.jpg)',
            }}
          ></div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className={`text-center mb-16 ${isVisible.techStack ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Enterprise <span className="text-red-600">DevOps Stack</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We leverage industry-leading tools and platforms for robust infrastructure
              </p>
            </div>
            
            <div className={`mb-8 ${isVisible.techStack ? 'animate-scaleIn' : 'opacity-0'}`}>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {['automation', 'containerization', 'cloud'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-medium tab-transition ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105' 
                        : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Tools
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {techStack[activeTab].map((tech, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border border-gray-200/80 p-6 rounded-xl hover-lift hover:border-red-300 transition-all text-center hover:bg-white"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-lg font-bold text-gray-900 mb-2">
                      {tech.name}
                    </div>
                    <div className={`text-sm font-medium ${
                      tech.level === 'Expert' ? 'text-green-600 animate-pulse' :
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

        {/* ===== DEVOPS PROCESS SECTION ===== */}
        <section 
          ref={sectionRefs.process}
          id="process"
          className="relative py-20"
        >
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url("/green.avif")',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backgroundBlendMode: 'overlay'
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 z-0" />
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className={`text-center mb-16 ${isVisible.process ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                DevOps Implementation <span className="text-red-700">Process</span>
              </h2>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                A systematic approach to transforming your development and operations workflow
              </p>
            </div>
            
            <div className={`stagger-animate grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 ${isVisible.process ? 'visible' : ''}`}>
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl hover-lift hover:bg-white transition-all duration-300 border-glow"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-3xl font-bold text-gray-400">
                      {step.step}
                    </div>
                    <div className="text-2xl animate-float">
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
          ref={sectionRefs.projects}
          id="projects"
          className="relative py-12 md:py-16"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src="/pic.png" 
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10">
            <div className={`text-center mb-8 md:mb-12 ${isVisible.projects ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-white leading-tight">
                DevOps Success <span className="text-red-400 animate-pulse">Stories</span>
              </h2>
              <p className="text-gray-200 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
                Real-world transformations that delivered measurable business impact
              </p>
            </div>

            <div className="max-w-7xl mx-auto px-4">
              <div className={`stagger-animate grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 ${isVisible.projects ? 'visible' : ''}`}>
                {devopsProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`group relative card-expand cursor-pointer flex flex-col ${
                      activeProject === project.id
                        ? 'expanded rounded-xl border-red-400 shadow-lg shadow-red-400/20 bg-white/95 backdrop-blur-sm'
                        : 'rounded-lg border-white/20 bg-white/90 backdrop-blur-sm hover:border-white/40'
                    }`}
                    style={{
                      borderWidth: '1px',
                      height: activeProject === project.id ? 'auto' : '140px',
                      padding: activeProject === project.id ? '1.5rem' : '1rem',
                    }}
                    onMouseEnter={() => setActiveProject(project.id)}
                    onMouseLeave={() => setActiveProject(null)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400/0 via-red-400/0 to-red-400/0 group-hover:from-red-400/10 group-hover:via-red-400/5 group-hover:to-red-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <div className="relative flex flex-col h-full">
                      <div className={`flex flex-col items-center justify-center flex-1 ${
                        activeProject === project.id ? '' : 'h-full'
                      }`}>
                        <div className={`inline-flex items-center gap-1.5 transition-all duration-300 ${
                          activeProject === project.id ? 'scale-105 mb-4' : 'scale-100 mb-3'
                        }`}>
                          <div className="bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {project.category}
                          </div>
                        </div>

                        <h3 className={`text-center font-bold text-gray-900 transition-all duration-300 ${
                          activeProject === project.id 
                            ? 'text-[17px]' 
                            : 'text-[14px]'
                        }`}>
                          {project.title}
                        </h3>
                      </div>

                      {activeProject === project.id && (
                        <div className="animate-slideIn mt-4">
                          <p className="text-gray-700 mb-4 text-[14px] leading-relaxed">
                            {project.description}
                          </p>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Technologies:</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tech.map((tech, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-white px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-300 animate-fadeInUp"
                                  style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Business Impact:</h4>
                            <ul className="space-y-2">
                              {project.results.map((result, idx) => (
                                <li 
                                  key={idx} 
                                  className="flex items-start text-gray-700 text-[12px] leading-snug animate-fadeInLeft"
                                  style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                  <svg 
                                    className="w-3 h-3 text-red-500 mr-2 mt-0.5 flex-shrink-0 animate-pulse" 
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

        {/* ===== BENEFITS SECTION ===== */}
        <section 
          ref={sectionRefs.benefits}
          id="benefits"
          className="relative py-20"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="/gree.jpg" 
              alt="DevOps Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className={`text-center mb-16 ${isVisible.benefits ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                Why Choose Our <span className="text-red-700 animate-pulse">DevOps Solutions</span>
              </h2>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                Transform your development lifecycle with proven DevOps practices
              </p>
            </div>
            
            <div className={`stagger-animate grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isVisible.benefits ? 'visible' : ''}`}>
              {[
                { icon: "🚀", title: "Accelerated Delivery", desc: "Reduce deployment time from weeks to hours with automated pipelines" },
                { icon: "🔒", title: "Enhanced Security", desc: "Built-in security controls and compliance automation throughout the pipeline" },
                { icon: "💎", title: "Improved Reliability", desc: "99.99% uptime with comprehensive monitoring and auto-recovery" },
                { icon: "📊", title: "Cost Optimization", desc: "Reduce infrastructure costs by up to 40% with smart resource management" }
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-xl hover-lift hover:bg-white transition-all duration-300 border-glow"
                >
                  <div className="text-red-600 mb-4 text-3xl animate-float">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white animate-fadeInUp">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-[30px] font-bold mb-4 md:mb-6">
              Technology Is Everywhere. <span className="text-red-400 animate-pulse">Ownership Is Rare</span>.
            </h2>
            
            <p className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4 animate-delay-200">
              Partner with a team that stays accountable from start to scale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8 animate-delay-400">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2
                           bg-red-600 text-white
                           px-4 py-2 md:px-6 md:py-3
                           rounded-full
                           font-semibold text-sm md:text-base
                           shadow-sm shadow-red-600/20
                           hover:bg-red-700 hover-lift
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
            
            <p className="mt-8 md:mt-10 text-gray-400 text-base px-4 md:px-0 animate-delay-600">
              No bots. No runaround. Just real conversations with accountable partners.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default DevOps;