import React, { useState, useEffect } from 'react';
import { 
  Target, 
  Eye, 
  Award, 
  Users, 
  CheckCircle, 
  ChevronRight,
  Globe,
  TrendingUp,
  Flame,
  Shield,
  Star,
  Zap,
  Rocket,
  Handshake
} from 'lucide-react';
import { Link } from 'react-router-dom';
import httpClient from '../../Api/axios';
import { motion } from 'framer-motion';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardHover = {
  hover: { 
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const timelineItem = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const progressLine = {
  hidden: { height: 0 },
  visible: { 
    height: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      delay: 0.3
    }
  }
};

const bounceIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.6
    }
  }
};

const floatAnimation = {
  hidden: { y: 0 },
  visible: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get('/getall__aboutus');
      
      // Handle different response formats
      let aboutItems = [];
      
      if (Array.isArray(response.data)) {
        aboutItems = response.data;
      } else if (response.data && typeof response.data === 'object') {
        if (Array.isArray(response.data.data)) {
          aboutItems = response.data.data;
        } else if (Array.isArray(response.data.items)) {
          aboutItems = response.data.items;
        } else if (response.data._id) {
          aboutItems = [response.data];
        } else {
          aboutItems = Object.values(response.data).filter(item => 
            item && typeof item === 'object' && item.About_us_title
          );
        }
      }
      
      if (!Array.isArray(aboutItems)) {
        aboutItems = [];
      }
      
      // Filter to show only active items
      const activeAboutItems = aboutItems.filter(item => 
        item?.status === "Active" || item?.status === "active"
      );
      
      // Take the first active item (or null if none)
      setAboutData(activeAboutItems.length > 0 ? activeAboutItems[0] : null);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch about us data: ${err.message || 'Please try again later.'}`);
      console.error('Error fetching about us:', err);
      setAboutData(null);
    } finally {
      setLoading(false);
    }
  };

  // Updated team stats with new icons and values
  const teamStats = [
    { icon: Users, value: '50+', label: 'Team Members' },
    { icon: Globe, value: '100+', label: 'Projects Completed' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' },
    { icon: Award, value: '25+', label: 'Awards Won' }
  ];

  // Updated values with red/blue theme
  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Transparent and honest communication with accountability at every level.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technologies and creative solutions.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Flame,
      title: 'Passion',
      description: 'Genuine commitment to excellence and client success.',
      color: 'from-red-600 to-orange-500'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Striving for the highest quality in every project we undertake.',
      color: 'from-blue-600 to-purple-500'
    }
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Started with passionate technology experts' },
    { year: '2019', title: 'First Major Client', description: 'Landed our first enterprise client partnership' },
    { year: '2020', title: 'Team Expansion', description: 'Grew to 50+ dedicated team members' },
    { year: '2021', title: 'Award Recognition', description: 'Won industry recognition for excellence' },
    { year: '2022', title: 'Global Expansion', description: 'Established multiple delivery centers' },
    { year: '2023', title: 'Milestone Projects', description: 'Completed 100+ successful projects' }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white text-gray-900 font-poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Banner Section with Partners Button */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.img
          src="/copy4.jpg"
          alt="aboutus"
          className="w-full h-auto object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>
      
      {/* Who We Are Section */}
      <motion.section 
        className="relative py-8 md:py-12 lg:py-16 px-4 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Background Image with Overlay */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative h-full w-full">
            <img 
              src="/picc.avif" 
              alt="Who We Are Background"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10"></div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute top-1/4 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-x-32"
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
        />
        <motion.div 
          className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl translate-x-32"
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Left Grid - Text Content */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl"
              variants={fadeInRight}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h2 
                className="text-[26px] md:text-[30px] lg:text-[32px] font-bold mb-4 md:mb-6 text-gray-900"
                variants={fadeInUp}
              >
                Who <span className="text-red-600">We Are</span>
              </motion.h2>
              
              <motion.div className="space-y-4 md:space-y-6" variants={staggerContainer}>
                {[
                  "<b>KANDAX</b> is a human-led technology consulting firm with Canadian accountability and Indian execution excellence—built for businesses that want real ownership, not robotic delivery.",
                  "At KANDAX, technology is delivered by experts, but accountability stays human. We combine North American leadership with India's best engineering talent to build systems that work—and relationships that last.",
                  "In a world full of automation and anonymous vendors, KANDAX stands for clarity, ownership, and human-led technology delivery.",
                  "We're not just service providers; we're accountable partners who take ownership of your digital success from start to scale."
                ].map((text, index) => (
                  <motion.p 
                    key={index}
                    className="text-gray-700 text-[16px] md:text-[18px] leading-relaxed"
                    variants={fadeInUp}
                    custom={index}
                  >
                    <span dangerouslySetInnerHTML={{ __html: text }} />
                  </motion.p>
                ))}
              </motion.div>
              
              <motion.div className="mt-8" variants={fadeInUp}>
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-2
                             text-red-600 hover:text-red-700
                             font-semibold text-base md:text-lg
                             transition-colors duration-300
                             group bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white"
                >
                  <span>View Our Trusted Partners</span>
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 
                                           group-hover:translate-x-1
                                           transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right Grid - Image */}
            <motion.div 
              className="relative mt-6 lg:mt-0"
              variants={fadeInLeft}
            >
              <motion.div 
                className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl md:shadow-3xl border-4 border-white/30 bg-white/10 backdrop-blur-sm"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src="/aboutt.png"  
                  alt="Who We Are - KANDAX Team"
                  className="w-full h-auto object-cover mix-blend-normal"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                
                {/* Decorative corners */}
                {[
                  { position: "top-4 left-4", border: "border-t-2 border-l-2", color: "border-red-500/50" },
                  { position: "top-4 right-4", border: "border-t-2 border-r-2", color: "border-red-500/50" },
                  { position: "bottom-4 left-4", border: "border-b-2 border-l-2", color: "border-blue-500/50" },
                  { position: "bottom-4 right-4", border: "border-b-2 border-r-2", color: "border-blue-500/50" }
                ].map((corner, index) => (
                  <motion.div 
                    key={index}
                    className={`absolute ${corner.position} w-8 h-8 ${corner.border} ${corner.color} rounded-${index === 0 ? 'tl' : index === 1 ? 'tr' : index === 2 ? 'bl' : 'br'}-lg`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Parth Handa Section */}
      <motion.section 
        className="relative overflow-hidden py-8 md:py-12 lg:py-16 px-4 md:px-8 bg-gradient-to-b from-gray-100 to-gray-200"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Image */}
            <motion.div 
              className="order-2 lg:order-1 relative mt-6 lg:mt-0 flex justify-center"
              variants={fadeInLeft}
            >
              <motion.div 
                className="relative rounded-lg md:rounded-xl overflow-hidden border border-gray-200 shadow-lg md:shadow-xl max-w-md w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src="/parth sir.jpeg" 
                  alt="KANDAX CEO - Leadership with Accountability"
                  className="w-full h-auto object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
            
            {/* Text Content */}
            <motion.div 
              className="order-1 lg:order-2"
              variants={fadeInRight}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4 text-red-600"
                variants={fadeInUp}
              >
                Mr. Parth Handa
              </motion.h2>
              <motion.div 
                className="inline-block mb-5"
                variants={scaleIn}
              >
                <span className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  <Award className="w-4 h-4 mr-2" />
                  CEO & Founder, Canada
                </span>
              </motion.div>
              
              <motion.div variants={staggerContainer}>
                {[
                  "I'm Parth Handa, a Canada-based company driven by vision, integrity, and a commitment to delivering impactful solutions with a global mindset. With a strong focus on leadership, innovation, and growth, I work closely with teams and partners to build meaningful strategies.",
                  "Inspired by Franklin D. Roosevelt's words, 'The only limit to our realization of tomorrow is our doubts of today,' I believe in continuous evolution, bold thinking, and turning ideas into lasting impact.",
                  "At Kandax, our mission is to move forward with clarity, professionalism, and a fresh perspective—building value through innovation and purposeful leadership."
                ].map((text, index) => (
                  <motion.p 
                    key={index}
                    className="text-gray-600 text-base mb-5 leading-relaxed"
                    variants={fadeInUp}
                    custom={index}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-6 space-y-3"
                variants={staggerContainer}
              >
                {[
                  "Canadian Accountability Standards",
                  "Indian Technical Excellence",
                  "Human-Led Technology Delivery"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    variants={fadeInRight}
                    custom={index}
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-4 h-4 text-red-600" />
                    </motion.div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Gorakh Bhosale Section */}
      <motion.section 
        className="relative overflow-hidden py-8 md:py-12 lg:py-16 px-4 md:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Text Content */}
            <motion.div 
              className="order-1"
              variants={fadeInLeft}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4 text-red-600"
                variants={fadeInUp}
              >
                Mr. Gorakh Bhosale
              </motion.h2>
              
              <motion.div 
                className="inline-block mb-5"
                variants={scaleIn}
              >
                <span className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  <Award className="w-4 h-4 mr-2" />
                  Director & Founder, India
                </span>
              </motion.div>
              
              <motion.div variants={staggerContainer}>
                {[
                  "With a strong background in MCM, DCM, PGDCS, CEH, ITIL, Gorakh holds over 18 years of experience as a Cyber Security Expert at Quick Heal. Beyond his technical expertise, he is passionate about Social Awareness for Cyber Security.",
                  "Throughout his skillful career, he has taken on various challenging roles while managing fundamental business aspects including IT retails, marketing, sales, and cloud computing solutions.",
                  "Gorakh plays a crucial role in driving the company's growth through strategic business planning and sales initiatives, while also organizing company conferences, trade shows, and major events."
                ].map((text, index) => (
                  <motion.p 
                    key={index}
                    className="text-gray-600 text-base mb-5 leading-relaxed"
                    variants={fadeInUp}
                    custom={index}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>

              <motion.div 
                className="mt-6 space-y-3"
                variants={staggerContainer}
              >
                {[
                  "18+ Years Cyber Security Experience",
                  "Certifications: MCM, DCM, PGDCS, CEH, ITIL",
                  "Business Strategy & Event Management"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    variants={fadeInLeft}
                    custom={index}
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-4 h-4 text-red-600" />
                    </motion.div>
                    <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Image */}
            <motion.div 
              className="order-2 lg:order-2 relative mt-6 lg:mt-0 flex justify-center items-center"
              variants={fadeInRight}
            >
              <motion.div 
                className="relative rounded-lg md:rounded-xl overflow-hidden border border-gray-200 shadow-lg md:shadow-xl w-64 md:w-72 lg:w-80"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src="/gb.jpeg" 
                  alt="Mr. Gorakh Bhosale - Director & Founder"
                  className="w-full h-auto object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section 
        id="mission-section"
        className="relative py-8 md:py-12 lg:py-16 px-4 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative h-full w-full">
            <img 
              src="/imgg.jpg" 
              alt="Mission & Vision Background"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"></div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute top-10 left-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12 lg:mb-16"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-[30px] font-bold mb-3 md:mb-4 text-white"
              variants={fadeInUp}
            >
              Our <span className="text-red-400">Mission & Vision</span>
            </motion.h2>
            <motion.p 
              className="text-gray-200 max-w-2xl mx-auto text-[22px]"
              variants={fadeInUp}
            >
              Driving innovation and delivering excellence in every project we undertake
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Mission Card */}
            <motion.div 
              variants={fadeInRight}
              whileHover="hover"
              className="bg-white/90 backdrop-blur-sm border-2 border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-red-400/50 hover:shadow-2xl transition-all duration-300 hover:bg-white/95"
            >
              <motion.div 
                className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
                variants={fadeInUp}
              >
                <motion.div 
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Target className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                </motion.div>
                <h3 className="text-[22px] md:text-[26px] lg:text-[28px] font-bold text-gray-900">Our Mission</h3>
              </motion.div>
              <motion.p 
                className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-[14px] md:text-[18px]"
                variants={fadeInUp}
              >
                Design and deliver world-class software solutions, robust cybersecurity frameworks, and data-driven digital marketing strategies that help enterprises and startups succeed globally. By combining innovation, security-first thinking, agile execution, and customer-centric values, we create measurable impact and long-term digital excellence for our clients.
              </motion.p>
            </motion.div>
            
            {/* Vision Card */}
            <motion.div 
              variants={fadeInLeft}
              whileHover="hover"
              className="bg-white/90 backdrop-blur-sm border-2 border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-blue-400/50 hover:shadow-2xl transition-all duration-300 hover:bg-white/95"
            >
              <motion.div 
                className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
                variants={fadeInUp}
              >
                <motion.div 
                  className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Eye className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                </motion.div>
                <h3 className="text-[22px] md:text-[26px] lg:text-[28px] font-bold text-gray-900">Our Vision</h3>
              </motion.div>
              <motion.p 
                className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-[14px] md:text-[18px]"
                variants={fadeInUp}
              >
                To be a globally trusted IT leader that empowers businesses through secure, intelligent, and scalable digital solutions—driving innovation, resilience, and sustainable growth in the connected digital world.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="relative py-8 md:py-12 lg:py-16 px-4 md:px-8 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative h-full w-full">
            <img 
              src="/image.avif" 
              alt="Core Values Background"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20"></div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -translate-x-32 -translate-y-32"
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl translate-x-40 translate-y-40"
          variants={floatAnimation}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12 lg:mb-16"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-[30px] font-bold mb-3 md:mb-4 text-white"
              variants={fadeInUp}
            >
              Our <span className="text-red-400">Core Values</span>
            </motion.h2>
            <motion.p 
              className="text-gray-200 max-w-2xl mx-auto text-[20px]"
              variants={fadeInUp}
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div 
                  key={index}
                  variants={timelineItem}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl p-5 md:p-6 hover:border-red-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-red-500/20"
                >
                  <motion.div 
                    className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 md:mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                  </motion.div>
                  <motion.h3 
                    className="text-[20px] md:text-[22px] font-bold text-gray-900 mb-2 md:mb-3"
                    variants={fadeInUp}
                  >
                    {value.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-700 text-[14px] md:text-[16px] leading-relaxed"
                    variants={fadeInUp}
                  >
                    {value.description}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Partners CTA */}
          <motion.div 
            className="text-center mt-12"
            variants={scaleIn}
          >
            <Link
              to="/partners"
              className="inline-flex items-center gap-3
                         bg-gradient-to-r from-red-600 to-red-700 text-white
                         px-6 py-3 md:px-8 md:py-4
                         rounded-full
                         font-semibold text-base md:text-lg
                         shadow-lg shadow-red-600/50
                         hover:from-red-700 hover:to-red-800
                         hover:shadow-xl hover:shadow-red-600/60
                         hover:-translate-y-1
                         backdrop-blur-sm
                         border border-white/20
                         transition-all duration-300"
            >
              <Handshake className="w-5 h-5 md:w-6 md:h-6" />
              Explore Our Partnerships
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-8 md:py-12 px-4 md:px-8 bg-zinc-200/60"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  variants={timelineItem}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-4 md:p-6 text-center hover:border-red-500/50 hover:shadow-lg transition-all duration-300"
                >
                  <motion.div 
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-red-50 to-blue-50 border border-gray-100 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-red-600" />
                  </motion.div>
                  <motion.div 
                    className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-gray-900 mb-1 md:mb-2"
                    variants={fadeInUp}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div 
                    className="text-gray-600 text-[14px] md:text-[16px] lg:text-[18px]"
                    variants={fadeInUp}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        className="relative py-8 md:py-12 lg:py-16 px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative h-full w-full">
            <img 
              src="/build.jpg"
              alt="Journey Background"
              className="object-cover w-full h-full opacity-60"
            />
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-8 md:mb-12 lg:mb-16"
            variants={fadeInUp}
          >
            <motion.h2 
              className="text-[30px] font-bold mb-3 md:mb-4 text-gray-900"
              variants={fadeInUp}
            >
              Our <span className="text-red-600">Journey</span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto text-[22px]"
              variants={fadeInUp}
            >
              Milestones in our journey of innovation and growth
            </motion.p>
          </motion.div>
          
          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-red-600 to-red-500 shadow-lg"
              variants={progressLine}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
            
            <motion.div variants={staggerContainer}>
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center mb-8 md:mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                  variants={timelineItem}
                >
                  {/* Timeline Node */}
                  <motion.div 
                    className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-white border-4 border-red-600 z-10 shadow-lg shadow-red-600/30"
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  
                  {/* Content */}
                  <motion.div 
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-6 md:pr-8 lg:pr-12 md:text-right' : 'md:pl-6 md:pl-8 lg:pl-12'}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 ml-10 md:ml-0 mt-8 md:mt-0 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-red-200">
                      <motion.div 
                        className="text-red-600 font-bold text-[20px] md:text-[22px] lg:text-[24px] mb-1 md:mb-2"
                        variants={fadeInUp}
                      >
                        {milestone.year}
                      </motion.div>
                      <motion.h3 
                        className="text-[18px] md:text-[20px] lg:text-[22px] font-bold text-gray-900 mb-1 md:mb-2"
                        variants={fadeInUp}
                      >
                        {milestone.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-600 text-[14px] md:text-[16px] lg:text-[18px]"
                        variants={fadeInUp}
                      >
                        {milestone.description}
                      </motion.p>
                    </div>
                  </motion.div>
                  
                  {/* Spacer for mobile */}
                  <div className="md:w-2/12"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div variants={staggerContainer}>
            <motion.h2 
              className="text-[30px] font-bold mb-4 md:mb-6"
              variants={fadeInUp}
            >
              Technology Is Everywhere. <span className="text-red-400">Ownership Is Rare</span>.
            </motion.h2>
            <motion.p 
              className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
              variants={fadeInUp}
            >
              Partner with a team that stays accountable from start to scale.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-6 md:mb-8"
              variants={fadeInUp}
            >
              <motion.a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2
                           bg-red-600 text-white
                           px-6 py-3 md:px-8 md:py-4
                           rounded-full
                           font-semibold text-sm md:text-base
                           shadow-sm shadow-red-600/20
                           hover:bg-red-700
                           transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.a>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/partners"
                  className="group inline-flex items-center justify-center gap-2
                             bg-transparent border-2 border-white/30 text-white
                             px-6 py-3 md:px-8 md:py-4
                             rounded-full
                             font-semibold text-sm md:text-base
                             hover:border-white hover:bg-white/10
                             transition-all duration-300"
                >
                  <Handshake className="w-4 h-4 md:w-5 md:h-5" />
                  View Our Partners
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-1
                                           group-hover:opacity-100 group-hover:translate-x-0
                                           transition-all duration-300" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="mt-8 md:mt-10 text-gray-400 text-base px-4 md:px-0"
              variants={fadeInUp}
            >
              No bots. No runaround. Just real conversations with accountable partners.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default AboutUs;