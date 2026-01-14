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
import { useTranslation } from 'react-i18next';

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

// Helper function to safely get arrays from translations
const getSafeTranslationArray = (t, key) => {
  const data = t(key, { returnObjects: true });
  return Array.isArray(data) ? data : [];
};

// Helper function to safely get objects from translations
const getSafeTranslationObject = (t, key) => {
  const data = t(key, { returnObjects: true });
  return data && typeof data === 'object' ? data : {};
};

function AboutUs() {
  const { t } = useTranslation();
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

  // SAFELY get values from translations
  const teamStats = getSafeTranslationArray(t, 'aboutPage.stats.items');
  const values = getSafeTranslationArray(t, 'aboutPage.values.items');
  const milestones = getSafeTranslationArray(t, 'aboutPage.milestones.items');
  
  // Get descriptions safely
  const whoWeAreDescriptions = getSafeTranslationArray(t, 'aboutPage.whoWeAre.description');
  const parthHandaDescriptions = getSafeTranslationArray(t, 'aboutPage.parthHanda.description');
  const parthHandaHighlights = getSafeTranslationArray(t, 'aboutPage.parthHanda.highlights');
  const gorakhBhosaleDescriptions = getSafeTranslationArray(t, 'aboutPage.gorakhBhosale.description');
  const gorakhBhosaleHighlights = getSafeTranslationArray(t, 'aboutPage.gorakhBhosale.highlights');

  return (
    <motion.div 
      className="min-h-screen bg-white text-gray-900 font-poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Banner Section */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.img
          src="/copy4.jpg"
          alt={t('aboutPage.banner.alt')}
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
              alt={t('aboutPage.whoWeAre.backgroundAlt')}
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
                {t('aboutPage.whoWeAre.title1')} <span className="text-red-600">{t('aboutPage.whoWeAre.title2')}</span>
              </motion.h2>
              
              <motion.div className="space-y-4 md:space-y-6" variants={staggerContainer}>
                {whoWeAreDescriptions.map((text, index) => (
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
                  <span>{t('aboutPage.whoWeAre.partnersLink')}</span>
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
                  alt={t('aboutPage.whoWeAre.imageAlt')}
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
                  alt={t('aboutPage.parthHanda.imageAlt')}
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
                {t('aboutPage.parthHanda.title')}
              </motion.h2>
              <motion.div 
                className="inline-block mb-5"
                variants={scaleIn}
              >
                <span className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  <Award className="w-4 h-4 mr-2" />
                  {t('aboutPage.parthHanda.position')}
                </span>
              </motion.div>
              
              <motion.div variants={staggerContainer}>
                {parthHandaDescriptions.map((text, index) => (
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
                {parthHandaHighlights.map((item, index) => (
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
                {t('aboutPage.gorakhBhosale.title')}
              </motion.h2>
              
              <motion.div 
                className="inline-block mb-5"
                variants={scaleIn}
              >
                <span className="inline-flex items-center bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  <Award className="w-4 h-4 mr-2" />
                  {t('aboutPage.gorakhBhosale.position')}
                </span>
              </motion.div>
              
              <motion.div variants={staggerContainer}>
                {gorakhBhosaleDescriptions.map((text, index) => (
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
                {gorakhBhosaleHighlights.map((item, index) => (
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
                  alt={t('aboutPage.gorakhBhosale.imageAlt')}
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
              alt={t('aboutPage.missionVision.backgroundAlt')}
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
              {t('aboutPage.missionVision.title1')} <span className="text-red-400">{t('aboutPage.missionVision.title2')}</span>
            </motion.h2>
            <motion.p 
              className="text-gray-200 max-w-2xl mx-auto text-[22px]"
              variants={fadeInUp}
            >
              {t('aboutPage.missionVision.subtitle')}
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
                <h3 className="text-[22px] md:text-[26px] lg:text-[28px] font-bold text-gray-900">
                  {t('aboutPage.missionVision.mission.title')}
                </h3>
              </motion.div>
              <motion.p 
                className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-[14px] md:text-[18px]"
                variants={fadeInUp}
              >
                {t('aboutPage.missionVision.mission.description')}
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
                <h3 className="text-[22px] md:text-[26px] lg:text-[28px] font-bold text-gray-900">
                  {t('aboutPage.missionVision.vision.title')}
                </h3>
              </motion.div>
              <motion.p 
                className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-[14px] md:text-[18px]"
                variants={fadeInUp}
              >
                {t('aboutPage.missionVision.vision.description')}
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
              alt={t('aboutPage.values.backgroundAlt')}
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
              {t('aboutPage.values.title1')} <span className="text-red-400">{t('aboutPage.values.title2')}</span>
            </motion.h2>
            <motion.p 
              className="text-gray-200 max-w-2xl mx-auto text-[20px]"
              variants={fadeInUp}
            >
              {t('aboutPage.values.subtitle')}
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
              const IconComponent = {
                "Shield": Shield,
                "Zap": Zap,
                "Flame": Flame,
                "Star": Star
              }[value.icon] || Shield;
              
              return (
                <motion.div 
                  key={index}
                  variants={timelineItem}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl p-5 md:p-6 hover:border-red-400/50 transition-all duration-300 group shadow-lg hover:shadow-xl hover:shadow-red-500/20"
                >
                  <motion.div 
                    className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br ${value.color || 'from-red-500 to-red-600'} flex items-center justify-center mb-4 md:mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
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
              {t('aboutPage.values.partnersCta')}
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
              const IconComponent = {
                "Users": Users,
                "Globe": Globe,
                "TrendingUp": TrendingUp,
                "Award": Award
              }[stat.icon] || Users;
              
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
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-red-600" />
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
              alt={t('aboutPage.milestones.backgroundAlt')}
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
              {t('aboutPage.milestones.title1')} <span className="text-red-600">{t('aboutPage.milestones.title2')}</span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto text-[22px]"
              variants={fadeInUp}
            >
              {t('aboutPage.milestones.subtitle')}
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
              {t('aboutPage.cta.title1')} <span className="text-red-400">{t('aboutPage.cta.title2')}</span>.
            </motion.h2>
            <motion.p 
              className="text-[22px] text-gray-300 mb-8 md:mb-10 max-w-2xl mx-auto px-4"
              variants={fadeInUp}
            >
              {t('aboutPage.cta.description')}
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
                {t('aboutPage.cta.button1')}
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
                  {t('aboutPage.cta.button2')}
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
              {t('aboutPage.cta.subtext')}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default AboutUs;