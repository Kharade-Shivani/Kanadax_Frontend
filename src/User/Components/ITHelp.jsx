import React, { useState } from 'react';
import { Link } from "react-router-dom";

function ITHelp() {
  const [activeTab, setActiveTab] = useState('onsite');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const itHelpServices = [
    {
      icon: "🖥️",
      title: "Help Desk Support",
      description: "24/7 technical support for end-users and immediate issue resolution",
      features: ["Phone Support", "Email Support", "Chat Support", "Remote Assistance", "Ticket Management"]
    },
    {
      icon: "🔧",
      title: "IT Infrastructure Management",
      description: "Proactive management and maintenance of your IT infrastructure",
      features: ["Server Management", "Network Monitoring", "Patch Management", "Performance Optimization", "Capacity Planning"]
    },
    {
      icon: "👥",
      title: "User Account Management",
      description: "Comprehensive user lifecycle management and access control",
      features: ["Account Provisioning", "Access Management", "Password Resets", "Group Policy Management", "Directory Services"]
    },
    {
      icon: "📞",
      title: "On-site Support",
      description: "Professional on-site technical support for hardware and network issues",
      features: ["Hardware Installation", "Network Troubleshooting", "Equipment Setup", "Cable Management", "Inventory Management"]
    },
    {
      icon: "🛡️",
      title: "Security Support",
      description: "Ongoing security monitoring, updates, and threat response",
      features: ["Security Updates", "Antivirus Management", "Firewall Configuration", "Security Audits", "Incident Response"]
    },
    {
      icon: "☁️",
      title: "Cloud Support",
      description: "Expert support for cloud platforms and cloud-based applications",
      features: ["Cloud Migration", "Cloud Optimization", "SaaS Management", "Cloud Security", "Cost Management"]
    },
    {
      icon: "📱",
      title: "Mobile Device Management",
      description: "Comprehensive support for mobile devices and BYOD policies",
      features: ["Device Enrollment", "App Management", "Security Policies", "Remote Wipe", "Troubleshooting"]
    },
    {
      icon: "📊",
      title: "IT Reporting & Analytics",
      description: "Detailed reporting and analytics for IT performance and trends",
      features: ["Service Level Reporting", "Performance Metrics", "Trend Analysis", "Budget Planning", "ROI Analysis"]
    }
  ];

  const supportLevels = {
    onsite: [
      { name: "Hardware Troubleshooting", level: "Expert" },
      { name: "Software Installation", level: "Advanced" },
      { name: "Network Setup", level: "Expert" },
      { name: "Printer/Device Support", level: "Advanced" },
      { name: "Data Recovery", level: "Expert" },
      { name: "System Diagnostics", level: "Advanced" }
    ],
    remote: [
      { name: "Remote Desktop Support", level: "Expert" },
      { name: "VPN Configuration", level: "Advanced" },
      { name: "Email Setup", level: "Expert" },
      { name: "Software Troubleshooting", level: "Advanced" },
      { name: "Security Updates", level: "Expert" },
      { name: "Cloud Support", level: "Advanced" }
    ],
    network: [
      { name: "Network Security", level: "Expert" },
      { name: "Firewall Management", level: "Advanced" },
      { name: "Wi-Fi Optimization", level: "Expert" },
      { name: "Server Maintenance", level: "Advanced" },
      { name: "Backup Solutions", level: "Expert" },
      { name: "Disaster Recovery", level: "Advanced" }
    ]
  };

  const supportProjects = [
    {
      id: 1,
      title: "Global Retail IT Support",
      description: "Provided 24/7 IT support for 500+ retail stores across 3 continents",
      category: "Retail Support",
      tech: ["Point of Sale Systems", "Network Infrastructure", "Inventory Management", "Security Systems", "Mobile Devices"],
      results: ["99.9% system uptime achieved", "Issue resolution time reduced by 70%", "Store productivity increased by 25%"]
    },
    {
      id: 2,
      title: "Healthcare System Help Desk",
      description: "Managed IT support for large hospital network with 10,000+ users",
      category: "Healthcare Support",
      tech: ["Electronic Health Records", "Medical Devices", "Telemedicine", "HIPAA Compliance", "Critical Systems"],
      results: ["Clinical workflow uninterrupted", "IT ticket response time under 5 minutes", "Physician satisfaction 98%"]
    },
    {
      id: 3,
      title: "Financial Trading Floor Support",
      description: "Mission-critical IT support for high-frequency trading environment",
      category: "Financial Support",
      tech: ["Trading Platforms", "Market Data Feeds", "Low-latency Networks", "Security Systems", "Backup Power"],
      results: ["Zero trading interruptions", "Millisecond response times", "Regulatory compliance maintained"]
    },
    {
      id: 4,
      title: "Manufacturing Plant IT Support",
      description: "Industrial IT support for automated manufacturing facilities",
      category: "Manufacturing Support",
      tech: ["SCADA Systems", "IoT Devices", "Robotics", "Production Lines", "Quality Control"],
      results: ["Production efficiency increased by 30%", "Equipment downtime reduced by 80%", "Quality defects decreased by 45%"]
    },
    {
      id: 5,
      title: "Education Technology Support",
      description: "Comprehensive IT support for university with 50,000+ students and staff",
      category: "Education Support",
      tech: ["Learning Management Systems", "Campus Networks", "Research Computing", "Student Portals", "Administrative Systems"],
      results: ["Student satisfaction 95%", "System availability 99.99%", "IT support costs reduced by 40%"]
    },
    {
      id: 6,
      title: "Legal Firm IT Management",
      description: "Managed IT services for international law firm with strict security requirements",
      category: "Legal Support",
      tech: ["Document Management", "Client Portals", "Secure Communications", "Case Management", "Compliance Systems"],
      results: ["Client data security 100%", "Attorney productivity increased 35%", "Audit compliance simplified"]
    },
    {
      id: 7,
      title: "Media Company Cloud Migration Support",
      description: "Supported large media company's transition to cloud-based workflows",
      category: "Media Support",
      tech: ["Content Management", "Video Editing", "Digital Asset Management", "Broadcast Systems", "Streaming Platforms"],
      results: ["Production time reduced by 50%", "Collaboration improved globally", "Content delivery accelerated"]
    },
    {
      id: 8,
      title: "Non-profit Organization IT Modernization",
      description: "Transformed IT support for humanitarian organization operating in challenging environments",
      category: "Non-profit Support",
      tech: ["Field Communications", "Data Collection", "Resource Planning", "Donor Management", "Mobile Solutions"],
      results: ["Field operations efficiency doubled", "Aid delivery accelerated by 60%", "Administrative overhead reduced 70%"]
    }
  ];
  const supportProcess = [
    {
      step: "01",
      title: "Issue Reporting",
      description: "Multiple channels for users to report IT issues instantly",
      icon: "📱"
    },
    {
      step: "02",
      title: "Ticket Creation",
      description: "Automated ticket generation with priority assignment",
      icon: "🎫"
    },
    {
      step: "03",
      title: "Immediate Response",
      description: "First response within 15 minutes for critical issues",
      icon: "⚡"
    },
    {
      step: "04",
      title: "Diagnosis & Resolution",
      description: "Expert analysis and solution implementation",
      icon: "🔧"
    },
    {
      step: "05",
      title: "Quality Check",
      description: "Verification of solution and user satisfaction",
      icon: "✅"
    },
    {
      step: "06",
      title: "Preventive Measures",
      description: "Implement safeguards to prevent recurrence",
      icon: "🛡️"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic1.jpg" // Your background image path
            alt="IT Help Desk Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900">
                  24/7 IT Help Desk &
                </span>
                <br />
                <span className="mt-2 inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-gray-800 to-red-800">
                  Technical Support
                </span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed">
                Immediate technical support and issue resolution ensuring your business operations
                run smoothly 24/7 with guaranteed response times and expert solutions.
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all">
              <div className="text-red-600 mb-3 text-2xl">⚡</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15 Min</div>
              <div className="text-gray-600">Response Time</div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all">
              <div className="text-red-600 mb-3 text-2xl">✅</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99%</div>
              <div className="text-gray-600">Resolution Rate</div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all">
              <div className="text-red-600 mb-3 text-2xl">🔄</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support Coverage</div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all">
              <div className="text-red-600 mb-3 text-2xl">👥</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Supported Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="relative py-12 md:py-16">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/image.avif" // Your background image path
            alt="IT Support Services Background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Our IT Support <span className="text-red-600">Services</span>
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Comprehensive technical support solutions to keep your business running smoothly
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {itHelpServices.map((service, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${activeService === index
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

      {/* ===== EXPERTISE SECTION ===== */}
      <section className="relative py-20">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/gree.jpg" // Your background image path
            alt="Technical Support Expertise Background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Technical Support <span className="text-red-600">Expertise</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Specialized skills across all IT support domains
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => setActiveTab('onsite')}
                className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'onsite'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                On-site Support
              </button>
              <button
                onClick={() => setActiveTab('remote')}
                className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'remote'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                Remote Support
              </button>
              <button
                onClick={() => setActiveTab('network')}
                className={`px-6 py-3 rounded-lg font-medium transition ${activeTab === 'network'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                Network & Security
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {supportLevels[activeTab].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all text-center"
                >
                  <div className="text-lg font-bold text-gray-900 mb-2">
                    {tech.name}
                  </div>
                  <div className={`text-sm font-medium ${tech.level === 'Expert' ? 'text-green-600' :
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

      {/* ===== SUPPORT PROCESS SECTION ===== */}
      <section className="relative py-20">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/image.avif" // Your background image path
            alt="Support Process Background"
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Support <span className="text-red-600">Process</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Efficient workflow ensuring rapid issue resolution and maximum uptime
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* ===== CASE STUDIES SECTION ===== */}
      <section className="relative py-12 md:py-16" id="projects">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/green.avif" // Your background image path
            alt="Support Success Stories Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Support <span className="text-red-600">Success Stories</span>
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Real-world examples of our IT support making a difference
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
                    {activeProject === project.id && (
                      <div className="animate-fadeIn mt-4">
                        {/* Description */}
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed">
                          {project.description}
                        </p>

                        {/* Support Areas */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Support Areas:</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-50 px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px]">Achievements:</h4>
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
      {/* ===== 10. FINAL CTA ===== */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-[30px] font-bold mb-4 md:mb-6">
            Technology Is Everywhere. <span className="text-red-400">Ownership Is Rare</span>.
          </h2>
          <p className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Partner with a team that stays accountable from start to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8">
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
              Let’s Talk

              {/* Arrow appears on hover */}
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





          <p className="mt-8 md:mt-10 text-gray-400 text-base px-4 md:px-0">
            No bots. No runaround. Just real conversations with accountable partners.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ITHelp;