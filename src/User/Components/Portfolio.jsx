import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Code, Cloud, Database, Shield, Smartphone, Globe,
  Mail, Phone, MapPin, ArrowRight, CheckCircle, Users,
  TrendingUp, Server, Lock, Zap, Menu, X, ChevronRight,
  Award, Clock, ShieldCheck, MessageSquare, FileText,
  Calendar, Download, Linkedin, Twitter, Github, Star, Sparkles , Megaphone , Briefcase ,  Monitor , HardDrive ,Headphones
} from 'lucide-react';

function Portfolio() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialIntervalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Testimonial slider auto-play
  useEffect(() => {
    const testimonials = [
      {
        name: "Alex Johnson",
        company: "CEO, TechCorp",
        text: "KANDAX transformed our entire infrastructure. Their solutions saved us 40% in operational costs.",
        rating: 5
      },
      {
        name: "Maria Garcia",
        company: "CTO, GlobalBank",
        text: "Outstanding cybersecurity implementation. Our systems have never been more secure.",
        rating: 5
      },
      {
        name: "Robert Chen",
        company: "Director, RetailCo",
        text: "The e-commerce platform they built handles millions of transactions flawlessly. Highly recommended!",
        rating: 5
      }
    ];

    if (testimonials.length > 1) {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }

      testimonialIntervalRef.current = setInterval(() => {
        setCurrentTestimonialIndex(prevIndex =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => {
        if (testimonialIntervalRef.current) {
          clearInterval(testimonialIntervalRef.current);
        }
      };
    }
  }, []);

  const services = [
  {
    icon: <Sparkles size={40} />,
    title: t('portfolio.services.generativeAI.title'),
    description: t('portfolio.services.generativeAI.description'),
     features: [],
    color: "from-purple-500/10 to-pink-500/5",
    path: '/generative-ai'
  },
  {
    icon: <Code size={40} />,
    title: t('portfolio.services.webDev.title'),
    description: t('portfolio.services.webDev.description'),
    features: [],
    color: "from-red-500/10 to-blue-500/5",
    path:  '/web-development'
  },
  {
    icon: <Server size={40} />,
    title: t('portfolio.services.cloud.title'),
    description: t('portfolio.services.cloud.description'),
    features: [],
    color: "from-blue-500/10 to-red-500/5",
    path:'/cloud-solutions'
  },
  {
    icon: <Smartphone size={40} />,
    title: t('portfolio.services.mobile.title'),
    description: t('portfolio.services.mobile.description'),
    features: [],
    color: "from-purple-500/10 to-red-500/5",
    path: '/mobile-development'
  },
  {
    icon: <Database size={40} />,
    title: t('portfolio.services.database.title'),
    description: t('portfolio.services.database.description'),
    features: [],
    color: "from-green-500/10 to-red-500/5",
    path: '/database-management'
  },
  {
    icon: <Megaphone size={40} />,
    title: t('portfolio.services.digitalMarketing.title'),
    description: t('portfolio.services.digitalMarketing.description'),
    features: [],
    color: "from-green-500/10 to-blue-500/5",
    path: '/digital-marketing'
  },
  {
    icon: <Shield size={40} />,
    title: t('portfolio.services.cybersecurity.title'),
    description: t('portfolio.services.cybersecurity.description'),
    features: [],
    color: "from-red-500/10 to-purple-500/5",
    path: '/cybersecurity'
  },
  {
    icon: <Zap size={40} />,
    title: t('portfolio.services.devops.title'),
    description: t('portfolio.services.devops.description'),
  
    features: [],
    color: "from-yellow-500/10 to-red-500/5",
    path: '/devops-services'
  },
  {
    icon: <Briefcase size={40} />,
    title: t('portfolio.services.consulting.title'),
    description: t('portfolio.services.consulting.description'),
    features: [],
    color: "from-gray-500/10 to-blue-500/5",
    path: '/technology-consulting'
  },
  {
    icon: <Monitor size={40} />,
    title: t('portfolio.services.remote.title'),
    description: t('portfolio.services.remote.description'),
    features: [],
    color: "from-blue-500/10 to-green-500/5",
    path: '/remote-workplace'
  },
  {
    icon: <HardDrive size={40} />,
    title: t('portfolio.services.backup.title'),
    description: t('portfolio.services.backup.description'),
    features: [],
    color: "from-orange-500/10 to-red-500/5",
    path: '/backup-disaster-recovery'
  },
  {
    icon: <Headphones size={40} />,
    title: t('portfolio.services.helpDesk.title'),
    description: t('portfolio.services.helpDesk.description'),
    features: [],
    color: "from-red-500/10 to-yellow-500/5",
    path: '/help-desk'
  }
];

 const projects = [
    {
      id: 1,
      title: t('portfolio.projects.projectList.0.title'),
      client: "Global Bank Inc.",
      description: t('portfolio.projects.projectList.0.description'),
      tech: ["React", "Node.js", "Microservices", "AWS"],
      results: ["40% Reduction in Costs", "99.9% Uptime", "3x Performance"],
    },
    {
      id: 2,
      title: t('portfolio.projects.projectList.1.title'),
      client: "MediCare Solutions",
      description: t('portfolio.projects.projectList.1.description'),
      tech: ["React Native", "Python", "PostgreSQL", "Docker"],
      results: ["50% Efficiency Gain", "24/7 Availability", "Full Compliance"],
    },
    {
      id: 3,
      title: t('portfolio.projects.projectList.2.title'),
      client: "Retail Giant Corp",
      description: t('portfolio.projects.projectList.2.description'),
      tech: ["Next.js", "TypeScript", "MongoDB", "Kubernetes"],
      results: ["200% Revenue Growth", "2s Load Time", "Zero Downtime"],
    },
    {
      id: 4,
      title: t('portfolio.projects.projectList.3.title'),
      client: "City Municipal Corp",
      description: t('portfolio.projects.projectList.3.description'),
      tech: ["Python", "TensorFlow", "AWS IoT", "React"],
      results: ["30% Energy Saved", "Real-time Analytics", "100K+ Devices"],
    },
    {
      id: 5,
      title: t('portfolio.projects.projectList.4.title'),
      client: "Creative Media Group",
      description: t('portfolio.projects.projectList.4.description'),
      tech: ["Python", "TensorFlow", "OpenAI API", "React", "FastAPI"],
      results: ["80% Content Creation Time Saved", "10x Output Volume", "Multi-language Support"],
    },
    {
      id: 6,
      title: t('portfolio.projects.projectList.5.title'),
      client: "Manufacturing Enterprise Ltd.",
      description: t('portfolio.projects.projectList.5.description'),
      tech: ["AWS", "Terraform", "Docker", "Kubernetes", "Python"],
      results: ["60% Cost Reduction", "99.95% SLA", "Auto-scaling Implementation"],
    },
    {
      id: 7,
      title: t('portfolio.projects.projectList.6.title'),
      client: "FinTech Startup",
      description: t('portfolio.projects.projectList.6.description'),
      tech: ["React Native", "Node.js", "MongoDB", "AWS Amplify"],
      results: ["500K+ Downloads", "4.8 App Store Rating", "Millisecond Transaction Time"],
    },
    {
      id: 8,
      title: t('portfolio.projects.projectList.7.title'),
      client: "E-commerce Analytics Corp",
      description: t('portfolio.projects.projectList.7.description'),
      tech: ["Apache Spark", "Snowflake", "Python", "React", "AWS Redshift"],
      results: ["Real-time Data Processing", "Petabyte-scale Storage", "50+ Data Sources Integrated"],
    },
    {
      id: 9,
      title: t('portfolio.projects.projectList.8.title'),
      client: "Marketing Agency International",
      description: t('portfolio.projects.projectList.8.description'),
      tech: ["Python", "React", "PostgreSQL", "Machine Learning", "REST APIs"],
      results: ["300% ROI Increase", "Automated 85% of Tasks", "Unified Dashboard"],
    },
    {
      id: 10,
      title: t('portfolio.projects.projectList.9.title'),
      client: "Financial Services Corporation",
      description: t('portfolio.projects.projectList.9.description'),
      tech: ["SIEM", "Zero Trust Architecture", "Python", "Cloud Security", "Encryption"],
      results: ["Zero Security Breaches", "99.99% Threat Detection", "Full Regulatory Compliance"],
    },
    {
      id: 11,
      title: t('portfolio.projects.projectList.10.title'),
      client: "Technology Conglomerate",
      description: t('portfolio.projects.projectList.10.description'),
      tech: ["Jenkins", "Docker", "Kubernetes", "Terraform", "Prometheus"],
      results: ["90% Faster Deployment", "Auto-recovery Systems", "Infrastructure Automation"],
    },
    {
      id: 12,
      title: t('portfolio.projects.projectList.11.title'),
      client: "Traditional Retail Chain",
      description: t('portfolio.projects.projectList.11.description'),
      tech: ["Enterprise Architecture", "Cloud Strategy", "Digital Roadmap", "Change Management"],
      results: ["Complete Digital Overhaul", "40% Operational Efficiency", "Future-ready Infrastructure"],
    },
    {
      id: 13,
      title: t('portfolio.projects.projectList.12.title'),
      client: "Global Consulting Firm",
      description: t('portfolio.projects.projectList.12.description'),
      tech: ["Zero Trust Network", "VPN", "Collaboration Tools", "Cloud Storage", "Security"],
      results: ["Seamless Remote Transition", "Enhanced Productivity", "Military-grade Security"],
    },
    {
      id: 14,
      title: t('portfolio.projects.projectList.13.title'),
      client: "Healthcare Data Center",
      description: t('portfolio.projects.projectList.13.description'),
      tech: ["AWS Backup", "Disaster Recovery", "Data Replication", "Monitoring", "Automation"],
      results: ["RPO: 15 minutes", "RTO: 1 hour", "100% Data Integrity", "Automated Failover"],
    },
    {
      id: 15,
      title: t('portfolio.projects.projectList.14.title'),
      client: "Multinational Corporation",
      description: t('portfolio.projects.projectList.14.description'),
      tech: ["AI Chatbots", "Ticketing System", "Knowledge Base", "Remote Support", "Analytics"],
      results: ["90% Ticket Resolution Rate", "50% Faster Response", "24/7 Support Coverage"],
    },
    {
      id: 16,
      title: t('portfolio.projects.projectList.15.title'),
      client: "Crypto Exchange International",
      description: t('portfolio.projects.projectList.15.description'),
      tech: ["Blockchain", "Solidity", "React", "Node.js", "PostgreSQL"],
      results: ["99.99% Uptime", "Sub-second Transactions", "Bank-grade Security"],
    }
  ];

  const clients = [
    { name: "TechCorp", logo: "TC", since: "2018" },
    { name: "GlobalBank", logo: "GB", since: "2019" },
    { name: "MediCare", logo: "MC", since: "2020" },
    { name: "RetailCo", logo: "RC", since: "2021" },
    { name: "AutoDrive", logo: "AD", since: "2020" },
    { name: "EduTech", logo: "ET", since: "2022" }
  ];

  const stats = [
    { value: "150+", label: t('portfolio.stats.projects'), icon: <CheckCircle />, suffix: "" },
    { value: "98%", label: t('portfolio.stats.satisfaction'), icon: <TrendingUp />, suffix: "" },
    { value: "50+", label: t('portfolio.stats.team'), icon: <Users />, suffix: "" },
    { value: "24/7", label: t('portfolio.stats.support'), icon: <Server />, suffix: "" }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: t('portfolio.team.cto'),
      expertise: "Cloud & DevOps",
      image: "SC",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "Michael Rodriguez",
      role: t('portfolio.team.headDev'),
      expertise: "Full Stack",
      image: "MR",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "Priya Sharma",
      role: t('portfolio.team.security'),
      expertise: "Cybersecurity",
      image: "PS",
      social: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "David Kim",
      role: t('portfolio.team.aiLead'),
      expertise: "Data Science",
      image: "DK",
      social: { linkedin: "#", twitter: "#", github: "#" }
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      company: "CEO, TechCorp",
      text: "KANDAX transformed our entire infrastructure. Their solutions saved us 40% in operational costs.",
      rating: 5
    },
    {
      name: "Maria Garcia",
      company: "CTO, GlobalBank",
      text: "Outstanding cybersecurity implementation. Our systems have never been more secure.",
      rating: 5
    },
    {
      name: "Robert Chen",
      company: "Director, RetailCo",
      text: "The e-commerce platform they built handles millions of transactions flawlessly. Highly recommended!",
      rating: 5
    }
  ];

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  const projectCategories = ["all", "finance", "healthcare", "retail", "iot"];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= rating ? "text-red-500 fill-red-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonialIndex(index);
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
      testimonialIntervalRef.current = setInterval(() => {
        setCurrentTestimonialIndex(prevIndex =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInLeft = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInRight = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-poppins scroll-smooth overflow-x-hidden">

      {/* Hero Section with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          id="home"
          src="/copy2.jpg"
          alt="Portfolio"
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Clients Section */}
      <motion.section 
        className="relative w-full py-12 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="/whitee.avif" 
            alt="Clients Background"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full">
            <motion.div 
              className="text-center mb-8 md:mb-12"
              variants={fadeInUp}
            >
              <h3 className="text-gray-900 mb-2 text-base md:text-lg font-semibold">
                {t('portfolio.clients.title')}
              </h3>
              <motion.div 
                className="w-24 h-0.5 bg-red-600 mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
              variants={staggerContainer}
            >
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  className="group p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-white/40 hover:border-red-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-2xl md:text-3xl font-bold text-red-600 mb-2"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {client.logo}
                    </motion.div>
                    <div className="text-gray-800 font-medium text-base mb-1">
                      {client.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {t('portfolio.clients.since')} {client.since}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services" 
        className="relative w-full py-12 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="/imagee.jpg" 
            alt="Services Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 md:mb-12"
            variants={fadeInUp}
          >
            <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-white leading-tight">
              {t('portfolio.services.title')}
            </h2>
            <p className="text-white/90 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
              {t('portfolio.services.subtitle')}
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={service.path}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer block ${
                    activeService === index
                      ? 'rounded-xl border-red-600 shadow-xl bg-white/95 backdrop-blur-sm'
                      : 'rounded-lg border-white/20 bg-white/90 backdrop-blur-sm hover:border-white/40'
                  }`}
                  style={{
                    borderWidth: '1px',
                    height: activeService === index ? 'auto' : '140px',
                    margin: activeService === index ? '0' : '0 auto',
                    padding: activeService === index ? '1.5rem' : '1rem',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '100%',
                    maxWidth: activeService === index ? 'none' : '280px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                >
                  {activeService === index && (
                    <motion.div 
                      className="absolute inset-0 rounded-xl border-2 border-red-500 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  <div className="relative">
                    <div className={`flex flex-col items-center transition-all duration-300 ${
                      activeService === index ? 'mb-4' : ''
                    }`}>
                      <motion.div 
                        className={`text-red-600 transition-all duration-300 ${
                          activeService === index ? 'scale-110 mb-3' : 'scale-100'
                        }`}
                        whileHover={{ rotate: 12 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {service.icon}
                      </motion.div>

                      <h3 className={`text-center font-bold transition-all duration-300 ${
                        activeService === index 
                          ? 'text-[18px] text-gray-900' 
                          : 'text-[15px] text-gray-800'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    {activeService === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-gray-700 mb-4 text-[15px] leading-relaxed text-center">
                          {service.description}
                        </p>
                        {service.features.length > 0 && (
                          <ul className="space-y-2.5 mb-4">
                            {service.features.map((feature, i) => (
                              <motion.li 
                                key={i} 
                                className="flex items-start text-[14px] leading-snug"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2.5 mt-1.5 flex-shrink-0"></div>
                                <span className="text-gray-700">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="relative w-full py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="/gree.jpg" 
            alt="About Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-gray-50/70 to-white/80"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div variants={fadeInLeft}>
                <h2 className="text-[30px] font-bold mb-6 text-gray-900 leading-tight">
                  {t('portfolio.about.title')}
                </h2>

                <p className="text-gray-700 mb-8 leading-relaxed text-[22px]">
                  {t('portfolio.about.description')}
                </p> 
                
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                >
                  {[
                    { icon: <Shield />, title: t('portfolio.about.features.security.title'), desc: t('portfolio.about.features.security.description') },
                    { icon: <Zap />, title: t('portfolio.about.features.monitoring.title'), desc: t('portfolio.about.features.monitoring.description') },
                    { icon: <TrendingUp />, title: t('portfolio.about.features.scalable.title'), desc: t('portfolio.about.features.scalable.description') },
                    { icon: <Award />, title: t('portfolio.about.features.team.title'), desc: t('portfolio.about.features.team.description') }
                  ].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-4 group"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-all duration-300 border border-white/30 shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        {React.cloneElement(item.icon, {
                          className: "text-red-600 group-hover:scale-110 transition-transform"
                        })}
                      </motion.div>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 flex-1">
                        <h4 className="font-semibold mb-1 text-[20px] text-gray-900">
                          {item.title}
                        </h4>
                        <p className="text-gray-700 text-[18px] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>        
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
              
              <motion.div variants={fadeInRight}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/40 shadow-xl">
                  <motion.div 
                    className="grid grid-cols-2 gap-4 md:gap-6"
                    variants={staggerContainer}
                  >
                    {[
                      { value: "10+", label: t('portfolio.about.stats.experience') },
                      { value: "50+", label: t('portfolio.about.stats.experts') },
                      { value: "24/7", label: t('portfolio.about.stats.support') },
                      { value: "99.9%", label: t('portfolio.about.stats.uptime') }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-300 shadow-sm hover:shadow-md"
                        variants={scaleIn}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div 
                          className="text-red-600 text-[30px] font-bold mb-2"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, delay: index * 0.5, repeat: Infinity }}
                        >
                          {stat.value}
                        </motion.div>
                        <div className="text-gray-800 text-[18px] font-medium">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    className="mt-6 md:mt-8 p-4 md:p-6 bg-white rounded-xl border border-red-100 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <motion.div 
                        className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shadow-sm"
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <Clock className="text-red-600" />
                      </motion.div>
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-bold text-[20px] text-gray-900">
                          {t('portfolio.about.cta.title')}
                        </h4>
                        <p className="text-gray-700 text-[18px]">
                          {t('portfolio.about.cta.description')}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/contact"
                          className="
                            px-5 py-2.5
                            bg-red-600 text-white
                            text-[18px] font-semibold
                            rounded-lg
                            hover:bg-red-700
                            transition-all duration-300
                            shadow-md hover:shadow-red-300 hover:shadow-lg
                            whitespace-nowrap
                          "
                        >
                          {t('portfolio.about.cta.button')}
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="relative w-full py-12 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="/img.jpg" 
            alt="Projects Background"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-gray-800/15 to-gray-900/20"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-full">
            <motion.div 
              className="text-center mb-8 md:mb-12"
              variants={fadeInUp}
            >
              <h2 className="text-[24px] md:text-[26px] lg:text-[28px] font-bold mb-3 text-white leading-tight">
                {t('portfolio.projects.title')}
              </h2>
              <p className="text-white/90 max-w-xl mx-auto text-[16px] md:text-[17px] leading-relaxed">
                {t('portfolio.projects.subtitle')}
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
              variants={staggerContainer}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className={`group relative transition-all duration-500 ease-out cursor-pointer ${
                    activeProject === project.id
                      ? 'rounded-xl border-red-500 shadow-xl bg-white/95 backdrop-blur-sm'
                      : 'rounded-lg border-white/30 bg-white/90 backdrop-blur-sm hover:border-white/50'
                  }`}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  style={{
                    borderWidth: '1px',
                    height: activeProject === project.id ? 'auto' : '140px',
                    margin: activeProject === project.id ? '0' : '0 auto',
                    padding: activeProject === project.id ? '1.5rem' : '1rem',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '100%',
                    maxWidth: activeProject === project.id ? 'none' : '280px',
                    display: 'flex',
                    alignItems: activeProject === project.id ? 'flex-start' : 'center',
                    justifyContent: activeProject === project.id ? 'flex-start' : 'center',
                  }}
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {activeProject === project.id && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-white/80 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative w-full">
                    <div className={`flex flex-col items-center transition-all duration-300 ${
                      activeProject === project.id ? 'mb-4' : ''
                    }`}>
                      <h3 className={`text-center font-bold transition-all duration-300 ${
                        activeProject === project.id 
                          ? 'text-[18px] text-gray-900' 
                          : 'text-[15px] text-gray-800'
                      }`}>
                        {project.title}
                      </h3>

                      <p className={`transition-all duration-300 mt-1 ${
                        activeProject === project.id 
                          ? 'text-[14px] opacity-100 text-gray-700' 
                          : 'text-[13px] opacity-80 text-gray-600'
                      }`}>
                        {project.client}
                      </p>
                    </div>

                    {activeProject === project.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-gray-700 mb-4 text-[15px] leading-relaxed text-center">
                          {project.description}
                        </p>

                        <div className="mb-4">
                          <h4 className="text-[14px] font-semibold text-gray-800 mb-2 text-center">
                            {t('portfolio.projects.techUsed')}
                          </h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {project.tech.map((tech, i) => (
                              <motion.span
                                key={i}
                                className="px-2.5 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-300/50 text-gray-800 rounded-lg text-[12px] hover:border-red-400 hover:bg-white transition-all duration-300 shadow-sm"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05, type: "spring" }}
                                whileHover={{ scale: 1.1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-[14px] font-semibold text-gray-800 mb-2 text-center">
                            {t('portfolio.projects.keyResults')}
                          </h4>
                          <div className="space-y-2.5">
                            {project.results.map((result, i) => (
                              <motion.div 
                                key={i} 
                                className="flex items-center group/result"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                <motion.div 
                                  className="w-2 h-2 bg-red-500 rounded-full mr-2.5 flex-shrink-0"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ 
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                  }}
                                />
                                <span className="text-gray-700 text-[14px] group-hover/result:text-gray-900 transition-colors duration-300">
                                  {result}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="w-full py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.h2 
            className="text-[30px] font-bold mb-4 md:mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('portfolio.finalCta.title')}
          </motion.h2>
          <motion.p 
            className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t('portfolio.finalCta.subtitle')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6 md:mb-8"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  "0 0 0px rgba(239, 68, 68, 0)",
                  "0 0 20px rgba(239, 68, 68, 0.5)",
                  "0 0 0px rgba(239, 68, 68, 0)"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {t('portfolio.finalCta.button')}
              <motion.svg
                className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-1
                           group-hover:opacity-100 group-hover:translate-x-0
                           transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
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
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {t('portfolio.finalCta.note')}
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}

export default Portfolio;