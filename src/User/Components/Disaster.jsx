import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Disaster() {
  const [activeTab, setActiveTab] = useState('backup');
  const [activeService, setActiveService] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const disasterServices = [
    {
      icon: "💾",
      title: "Backup Solutions",
      description: "Comprehensive backup strategies to protect your critical data and applications",
      features: ["Automated Backups", "Incremental Backups", "Cloud Backup", "Local Backup", "Backup Verification"]
    },
    {
      icon: "🔄",
      title: "Disaster Recovery Planning",
      description: "Develop and implement comprehensive disaster recovery plans for business continuity",
      features: ["Business Impact Analysis", "Recovery Strategy", "RTO/RPO Definition", "Plan Documentation", "Testing Procedures"]
    },
    {
      icon: "☁️",
      title: "Cloud Recovery",
      description: "Cloud-based disaster recovery solutions for rapid restoration and scalability",
      features: ["DRaaS Solutions", "Cloud Replication", "Failover Automation", "Multi-region Recovery", "Cost Optimization"]
    },
    {
      icon: "🏢",
      title: "Data Center Recovery",
      description: "Complete data center recovery solutions for on-premise infrastructure",
      features: ["Secondary Data Centers", "Hardware Replication", "Network Recovery", "Storage Replication", "Site Recovery"]
    },
    {
      icon: "⚡",
      title: "High Availability",
      description: "Implement high availability solutions to minimize downtime and ensure continuous operations",
      features: ["Load Balancing", "Clustering", "Redundant Systems", "Failover Clusters", "Monitoring & Alerting"]
    },
    {
      icon: "📊",
      title: "Recovery Testing",
      description: "Regular testing and validation of disaster recovery plans and procedures",
      features: ["Tabletop Exercises", "Simulated Failovers", "Recovery Drills", "Performance Testing", "Gap Analysis"]
    },
    {
      icon: "🛡️",
      title: "Cyber Recovery",
      description: "Specialized recovery solutions for ransomware and cyber attack scenarios",
      features: ["Air-gapped Backups", "Immutable Storage", "Ransomware Detection", "Forensic Analysis", "Clean Recovery"]
    },
    {
      icon: "📋",
      title: "Compliance & Documentation",
      description: "Ensure compliance with regulatory requirements and maintain proper documentation",
      features: ["Compliance Auditing", "Policy Development", "Documentation Management", "Regulatory Reporting", "Audit Support"]
    }
  ];
  const techCapabilities = {
    backup: [
      { name: "Cloud Backup", level: "Expert" },
      { name: "Incremental Backups", level: "Advanced" },
      { name: "Data Encryption", level: "Expert" },
      { name: "Backup Automation", level: "Advanced" },
      { name: "Version Management", level: "Expert" },
      { name: "Cross-Platform", level: "Advanced" }
    ],
    recovery: [
      { name: "Disaster Recovery", level: "Expert" },
      { name: "RTO Optimization", level: "Advanced" },
      { name: "Failover Systems", level: "Expert" },
      { name: "Data Replication", level: "Advanced" },
      { name: "Recovery Testing", level: "Expert" },
      { name: "DR Automation", level: "Advanced" }
    ],
    protection: [
      { name: "Data Encryption", level: "Expert" },
      { name: "Access Control", level: "Advanced" },
      { name: "Compliance", level: "Expert" },
      { name: "Audit Trails", level: "Advanced" },
      { name: "Threat Detection", level: "Expert" },
      { name: "Security Policies", level: "Advanced" }
    ]
  };

  const disasterProjects = [
    {
      id: 1,
      title: "Financial Institution Ransomware Recovery",
      description: "Recovered banking systems after sophisticated ransomware attack with zero data loss",
      category: "Cyber Recovery",
      tech: ["Air-gapped Backups", "Immutable Storage", "Forensic Analysis", "Clean Room Recovery", "Security Hardening"],
      results: ["Zero data loss recovery", "Business resumed within 4 hours", "Enhanced security posture post-recovery"]
    },
    {
      id: 2,
      title: "Hospital System Disaster Recovery",
      description: "Maintained critical healthcare operations during regional power outage",
      category: "Healthcare DR",
      tech: ["Generator Backup", "Cloud Failover", "Critical System Prioritization", "Mobile Command Center", "Patient Data Sync"],
      results: ["100% patient care continuity", "Electronic health records remained accessible", "Zero patient data compromise"]
    },
    {
      id: 3,
      title: "E-commerce Platform Data Center Failure",
      description: "Recovered online retail platform after complete data center failure during peak season",
      category: "Data Center DR",
      tech: ["Multi-region Replication", "Automated Failover", "Load Balancer Redirection", "Database Clustering", "CDN Integration"],
      results: ["99.9% uptime maintained", "Zero lost transactions", "Customer experience unaffected"]
    },
    {
      id: 4,
      title: "Manufacturing Plant Natural Disaster",
      description: "Restored manufacturing operations after flood damaged primary facility",
      category: "Physical Disaster",
      tech: ["Off-site Replication", "Mobile Data Centers", "Remote Workforce Enablement", "Supply Chain Rerouting", "IoT Monitoring"],
      results: ["Production resumed in 48 hours", "Supply chain continuity maintained", "Insurance claim supported with documentation"]
    },
    {
      id: 5,
      title: "Government Agency Cyber Attack",
      description: "Secured and restored government services after nation-state cyber attack",
      category: "Government DR",
      tech: ["Zero Trust Architecture", "Secure Backup Vaults", "Incident Response", "Communication Systems", "Public Service Continuity"],
      results: ["Critical services restored within 6 hours", "No citizen data breached", "Enhanced national security protocols established"]
    },
    {
      id: 6,
      title: "Cloud Provider Regional Outage",
      description: "Maintained business operations during major cloud provider regional outage",
      category: "Cloud DR",
      tech: ["Multi-cloud Strategy", "Cross-region Replication", "Application Containerization", "Traffic Management", "Monitoring Systems"],
      results: ["Zero downtime experienced", "Automatic failover to backup region", "Customer trust maintained"]
    },
    {
      id: 7,
      title: "Global Enterprise Human Error Recovery",
      description: "Recovered from critical database deletion by employee with malicious intent",
      category: "Human Error Recovery",
      tech: ["Role-based Access Control", "Change Management", "Point-in-time Recovery", "Audit Logging", "Employee Monitoring"],
      results: ["Full data recovery within 2 hours", "Enhanced access controls implemented", "Prevented future similar incidents"]
    },
    {
      id: 8,
      title: "Critical Infrastructure Cyber Resilience",
      description: "Built cyber-resilient infrastructure for energy grid operator",
      category: "Infrastructure DR",
      tech: ["SCADA Security", "Network Segmentation", "Real-time Monitoring", "Incident Response Automation", "Fail-safe Systems"],
      results: ["Prevented potential blackout", "Regulatory compliance achieved", "Public safety ensured"]
    }
  ];

  const recoveryProcess = [
    {
      step: "01",
      title: "Risk Assessment",
      description: "Identify potential threats and vulnerabilities to your business",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "Create customized backup and recovery strategies",
      icon: "📋"
    },
    {
      step: "03",
      title: "Implementation",
      description: "Deploy backup solutions and configure recovery systems",
      icon: "🚀"
    },
    {
      step: "04",
      title: "Testing & Validation",
      description: "Regular testing of recovery procedures and systems",
      icon: "🧪"
    },
    {
      step: "05",
      title: "Monitoring & Management",
      description: "24/7 monitoring of backup systems and data integrity",
      icon: "👁️"
    },
    {
      step: "06",
      title: "Continuous Improvement",
      description: "Regular updates and optimization of recovery plans",
      icon: "🔄"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/pic1.jpg" 
            alt="Backup & Disaster Recovery Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="text-left animate-slideUp">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900">
                  Backup & Disaster
                </span>
                <br />
                <span className="mt-2 inline-block text-red-800 animate-pulse animate-duration-2000">
                  Recovery Solutions
                </span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed animate-slideUp animate-delay-200">
                Business continuity & data protection solutions ensuring your operations
                continue uninterrupted with secure backups and rapid recovery capabilities.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end animate-slideRight">
              <img
                src="/disaster.jpg"
                alt="Backup & Disaster Recovery"
                className="w-full max-w-lg rounded-xl shadow-xl border border-gray-200 transform hover:scale-105 transition-transform duration-500 animate-float"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slideUp animate-delay-300 group">
              <div className="text-red-600 mb-3 text-2xl animate-bounce animate-duration-1500">⚡</div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">&lt;1 Hour</div>
              <div className="text-gray-600">Recovery Time</div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slideUp animate-delay-400 group">
              <div className="text-red-600 mb-3 text-2xl animate-bounce animate-duration-1500 animate-delay-100">🔒</div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">99.99%</div>
              <div className="text-gray-600">Data Protection</div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slideUp animate-delay-500 group">
              <div className="text-red-600 mb-3 text-2xl animate-bounce animate-duration-1500 animate-delay-200">💾</div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">Zero</div>
              <div className="text-gray-600">Data Loss</div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-slideUp animate-delay-600 group">
              <div className="text-red-600 mb-3 text-2xl animate-bounce animate-duration-1500 animate-delay-300">✅</div>
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-gray-600">Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="relative py-12 md:py-16">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/picc.avif" 
            alt="Recovery Services Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8 md:mb-12 animate-slideDown">
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Comprehensive <span className="text-red-600 animate-pulse">Recovery Services</span>
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              End-to-end backup and disaster recovery solutions for business continuity
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {disasterServices.map((service, index) => (
                <div
                  key={index}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer flex flex-col ${activeService === index
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
                    {/* Icon and Title Container - Always visible */}
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

                    {/* Details - Only show when this card is active */}
                    {activeService === index && (
                      <div className="mt-4 animate-slideUpFast">
                        {/* Description */}
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed text-center">
                          {service.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 mb-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start text-[13px] leading-snug transform hover:translate-x-2 transition-transform duration-300">
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
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/green.avif" 
            alt="Advanced Capabilities Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16 animate-slideDown">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Advanced <span className="text-red-600 animate-pulse">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Expert solutions for backup, recovery, and data protection
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => setActiveTab('backup')}
                className={`px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105 ${activeTab === 'backup'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-pulse'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                Backup Solutions
              </button>
              <button
                onClick={() => setActiveTab('recovery')}
                className={`px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105 ${activeTab === 'recovery'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-pulse'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                Disaster Recovery
              </button>
              <button
                onClick={() => setActiveTab('protection')}
                className={`px-6 py-3 rounded-lg font-medium transition duration-300 transform hover:scale-105 ${activeTab === 'protection'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg animate-pulse'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                Data Protection
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {techCapabilities[activeTab].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 text-center group animate-slideUp"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="text-lg font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tech.name}
                  </div>
                  <div className={`text-sm font-medium transform hover:scale-125 transition-transform duration-300 ${tech.level === 'Expert' ? 'text-green-600 animate-bounce' :
                    tech.level === 'Advanced' ? 'text-blue-600 animate-bounce' :
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
      {/* ===== RECOVERY PROCESS SECTION ===== */}
      <section className="relative py-20">
        {/* Background Image with Overlay - ONLY for the section */}
        <div className="absolute inset-0 z-0">
          <img
            src="/imggg1.jpg" 
            alt="Recovery Process Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16 animate-slideDown">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Recovery <span className="text-red-600 animate-pulse">Process</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Structured approach to ensure rapid recovery and business continuity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recoveryProcess.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group animate-slideUp"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl font-bold text-gray-300 transform group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="text-2xl transform group-hover:rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 transform group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                <p className="text-gray-600 transform group-hover:translate-x-1 transition-transform duration-300">{step.description}</p>
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
            src="/imagee.jpg"
            alt="Recovery Success Stories Background"
            className="w-full h-full object-cover transform scale-110 animate-slowZoom"
          />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-8 md:mb-12 animate-slideDown">
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-gray-900 leading-tight">
              Recovery <span className="text-red-600 animate-pulse">Success Stories</span>
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              Real-world examples of our disaster recovery solutions in action
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
                    {/* Main Content Container - Always visible */}
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

                    {/* Details - Only show when this card is active */}
                    {activeProject === project.id && (
                      <div className="mt-4 animate-slideUpFast">
                        {/* Description */}
                        <p className="text-gray-600 mb-4 text-[14px] leading-relaxed transform hover:translate-x-1 transition-transform duration-300">
                          {project.description}
                        </p>

                        {/* Solutions */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px] transform hover:translate-x-1 transition-transform duration-300">Solutions:</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((tech, idx) => (
                              <span
                                key={idx}
                                className="bg-gray-50 px-2 py-0.5 rounded text-xs text-gray-700 border border-gray-200 transform hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Key Results */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-[13px] transform hover:translate-x-1 transition-transform duration-300">Key Results:</h4>
                          <ul className="space-y-2">
                            {project.results.map((result, idx) => (
                              <li key={idx} className="flex items-start text-gray-700 text-[12px] leading-snug transform hover:translate-x-2 transition-transform duration-300">
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
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white animate-slideUp">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-[30px] font-bold mb-4 md:mb-6 animate-pulse animate-duration-2000">
            Technology Is Everywhere. <span className="text-red-400">Ownership Is Rare</span>.
          </h2>
          <p className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4 animate-slideUp animate-delay-300">
            Partner with a team that stays accountable from start to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8 animate-bounce animate-duration-2000">
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

          <p className="mt-8 md:mt-10 text-gray-400 text-base px-4 md:px-0 animate-slideUp animate-delay-500">
            No bots. No runaround. Just real conversations with accountable partners.
          </p>
        </div>
      </section>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(30px);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-30px);
          }
          to {
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from {
            transform: translateX(-30px);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideLeft {
          from {
            transform: translateX(30px);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes slideUpFast {
          from {
            transform: translateY(20px);
          }
          to {
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
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }
        
        .animate-slideRight {
          animation: slideRight 0.8s ease-out;
        }
        
        .animate-slideLeft {
          animation: slideLeft 0.8s ease-out;
        }
        
        .animate-slideUpFast {
          animation: slideUpFast 0.4s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-slowZoom {
          animation: slowZoom 20s ease-in-out infinite alternate;
        }
        
        .animate-spin {
          animation: spin 3s linear infinite;
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
        
        .animate-delay-600 {
          animation-delay: 600ms;
        }
        
        .animate-duration-1500 {
          animation-duration: 1500ms;
        }
        
        .animate-duration-2000 {
          animation-duration: 2000ms;
        }
      `}</style>
    </div>
  );
}

export default Disaster;