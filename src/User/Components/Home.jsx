// components/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import httpClient from '../../Api/axios';

const Home = () => {
  // State for testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [testimonialsError, setTestimonialsError] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonialIntervalRef = useRef(null);

  // Video reference
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

  // Handle video load and autoplay
  useEffect(() => {
    const video = videoRef.current;
    
    const handleVideoLoad = () => {
      setIsVideoLoaded(true);
      
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
            video.muted = false;
            video.volume = 0.5;
          })
          .catch((error) => {
            console.log("Autoplay failed, attempting muted autoplay:", error);
            video.muted = true;
            video.play()
              .then(() => setIsVideoPlaying(true))
              .catch(e => console.log("Muted autoplay also failed:", e));
          });
      }
    };

    if (video) {
      video.addEventListener('loadeddata', handleVideoLoad);
      video.addEventListener('playing', () => setIsVideoPlaying(true));
      video.addEventListener('pause', () => setIsVideoPlaying(false));
      video.preload = "auto";
      video.load();
    }

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoad);
        video.removeEventListener('playing', () => setIsVideoPlaying(true));
        video.removeEventListener('pause', () => setIsVideoPlaying(false));
      }
    };
  }, []);

  // Toggle video play/pause
  const toggleVideoPlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  // Toggle video mute
  const toggleVideoMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
    }
  };

  // Fetch testimonials data using axios - FIXED ENDPOINT
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setTestimonialsLoading(true);
        setTestimonialsError(null);
        
        console.log('Fetching testimonials from API...');
        
        // FIX: Changed from 'getall_testimonial' to 'getall__testimonial' (two underscores)
        const response = await httpClient.get('getall__testimonial');
        
        console.log('API Response:', response);
        
        // Check different response structures
        if (response.data) {
          // Case 1: Data is in response.data.data array
          if (response.data.data && Array.isArray(response.data.data)) {
            setTestimonials(response.data.data);
          }
          // Case 2: Data is directly in response.data array
          else if (Array.isArray(response.data)) {
            setTestimonials(response.data);
          }
          // Case 3: Data is in response.data.testimonials
          else if (response.data.testimonials && Array.isArray(response.data.testimonials)) {
            setTestimonials(response.data.testimonials);
          }
          // Case 4: Data is in some other property
          else {
            console.log('Unexpected response structure:', response.data);
            // Try to find array in response
            const data = Object.values(response.data).find(val => Array.isArray(val));
            if (data) {
              setTestimonials(data);
            } else {
              setTestimonials([]);
              setTestimonialsError('Unexpected API response format');
            }
          }
        } else {
          setTestimonials([]);
          setTestimonialsError('No data received from API');
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        
        // Detailed error handling
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response data:', err.response.data);
          console.error('Error response status:', err.response.status);
          console.error('Error response headers:', err.response.headers);
          setTestimonialsError(`API Error: ${err.response.status} - ${err.response.data?.message || 'No message'}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.error('Error request:', err.request);
          setTestimonialsError('No response from server. Please check your connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', err.message);
          setTestimonialsError(`Request error: ${err.message}`);
        }
        
        // Fallback to static data
        setTestimonials([
          {
            "_id": "694d0879b8e7d669c231927d",
            "client_name": "Ravindra Torave",
            "client_designation": "Founder of Nature Daily",
            "rating": 5,
            "client_image": "https://res.cloudinary.com/artnstockimg/image/upload/v1766656119/TechMigrates/Banners/vadw9ohkaeihktox3xeq.jpg",
            "testimonial_text": "Outstanding experience! The website is user-friendly, modern, and optimized for performance. Highly recommended",
            "status": "Active",
            "createdAt": "2025-12-25T09:48:41.011Z",
            "updatedAt": "2025-12-30T11:24:51.537Z",
            "__v": 0
          },
          {
            "_id": "694d074a668181a3d3fb0a5a",
            "client_name": "Ashish Dhenghe",
            "client_designation": "Founder of elitecode",
            "rating": 5,
            "client_image": "https://res.cloudinary.com/artnstockimg/image/upload/v1767094531/TechMigrates/Banners/e3tnhbfmabmsy9lej3tp.jpg",
            "testimonial_text": "Professional service and great attention to detail. Communication was smooth, and the final result was exactly what we needed",
            "status": "Active",
            "createdAt": "2025-12-25T09:43:38.371Z",
            "updatedAt": "2025-12-30T11:35:32.595Z",
            "__v": 0
          },
          {
            "_id": "694d06b5668181a3d3fb0a56",
            "client_name": "Khalid shaikh",
            "client_designation": "Founder Artnstock",
            "rating": 5,
            "client_image": "https://res.cloudinary.com/artnstockimg/image/upload/v1766655668/TechMigrates/Banners/wbqc8oppmzhpjcdvlnex.webp",
            "testimonial_text": "The website design exceeded our expectations. The team delivered a fast, responsive, and visually appealing site that perfectly represents our brand.",
            "status": "Active",
            "createdAt": "2025-12-25T09:41:09.348Z",
            "updatedAt": "2025-12-30T11:30:35.543Z",
            "__v": 0
          }
        ]);
      } finally {
        setTestimonialsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Testimonial slider auto-play
  useEffect(() => {
    if (testimonials.length > 1) {
      if (testimonialIntervalRef.current) {
        clearInterval(testimonialIntervalRef.current);
      }
      
      testimonialIntervalRef.current = setInterval(() => {
        setCurrentTestimonialIndex(prevIndex => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
      
      return () => {
        if (testimonialIntervalRef.current) {
          clearInterval(testimonialIntervalRef.current);
        }
      };
    }
  }, [testimonials]);

  // Function to handle testimonial navigation
  const goToTestimonial = (index) => {
    setCurrentTestimonialIndex(index);
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
      testimonialIntervalRef.current = setInterval(() => {
        setCurrentTestimonialIndex(prevIndex => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }
  };

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(
          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div style={{ paddingTop: '0px' }} id="home-container" className="min-h-screen bg-white overflow-x-hidden font-poppins">
 
      {/* ===== VIDEO SECTION ===== */}
      <section className="relative w-full overflow-hidden bg-black">
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            loop
            muted={false}
            poster="/placeholder-video-poster.jpg"
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src="/banner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
            <h1 className="text-white text-center font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-tight tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
              Where Human Insight Meets Technology
            </h1>
          </div>

          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
              <div className="text-white text-center">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg">Loading video...</p>
              </div>
            </div>
          )}

        
        </div>
      </section>

      {/* ===== SEPARATE TEXT SECTION ===== */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-20"
      >
        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full">
            <img 
              src="/pic1.jpg"
              alt="Hero Background"
              className="object-cover w-full h-full blur-sm"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
        
        <div className="absolute inset-0 opacity-5 z-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6">
              <motion.span variants={fadeInUp} className="block text-grey-900 drop-shadow-lg">Human-Led Technology</motion.span>
              <motion.span variants={fadeInUp} className="block mt-2 text-grey-900 drop-shadow-lg">North American Accountability</motion.span>
              <motion.span variants={fadeInUp} className="block mt-2 text-red-700 drop-shadow-lg">Indian Execution Excellence</motion.span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg sm:text-xl md:text-2xl text-grey-900 max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed drop-shadow-lg">
              Real people. Clear ownership. End-to-end IT consulting and delivery for USA , Canada & Middle East businesses.
            </motion.p>

            <motion.div 
              variants={scaleIn}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-8 md:mb-10"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all duration-300"
              >
                Let's Talk
                <svg className="w-5 h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <main id="main-content">
        {/* ===== 2. THE PROBLEM WE SOLVE ===== */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="py-12 md:py-20 bg-gray-900 text-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-[30px] font-bold mb-4 md:mb-6">
                The IT Industry Has a <span className="text-red-400">Responsibility</span> Problem
              </h2>
              <p className="text-[22px] text-gray-300 max-w-3xl mx-auto px-4">
                Technology fails when responsibility is outsourced to faceless teams and automated responses.
              </p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0"
            >
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Anonymous vendors, no ownership",
                  color: "text-red-500",
                  description: "No single point of contact, endless support tickets"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18" />
                    </svg>
                  ),
                  title: "AI tools but no accountability",
                  color: "text-blue-500",
                  description: "Automated responses without human understanding"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01" />
                    </svg>
                  ),
                  title: "Offshore teams with zero business context",
                  color: "text-amber-500",
                  description: "Cultural and timezone gaps causing misalignment"
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6" />
                    </svg>
                  ),
                  title: "Projects delivered, but problems remain",
                  color: "text-purple-500",
                  description: "Solutions that don't solve real business problems"
                }
              ].map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover="hover"
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 md:p-6 hover:border-red-500/50 transition-all duration-300"
                >
                  <motion.div variants={iconRotate} className={`${point.color} mb-3 md:mb-4`}>
                    {point.icon}
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">
                    {point.title}
                  </h3>
                  <p className="text-base text-gray-400">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mt-12 md:mt-16 text-center p-6 md:p-8 bg-gradient-to-r from-red-900/30 to-blue-900/30 rounded-2xl border border-gray-700 mx-4 md:mx-0"
            >
              <p className="text-xl md:text-2xl font-bold italic">
                "Technology without ownership is just another expense."
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ===== 3. THE KANDAX DIFFERENCE ===== */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="relative py-12 md:py-20 bg-white"
        >
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <img 
                src="/pic.png"
                alt="Background"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <motion.div 
                variants={fadeInUp}
                className="text-center mb-12 md:mb-16"
              >
                <h2 className="text-[30px] font-bold text-white mb-4 md:mb-6">
                  What Makes <span className="text-red-600">KANDAX</span> Different
                </h2>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 px-4 md:px-0"
              >
                {[
                  {
                    icon: "🧠",
                    title: "Human-Led Engagement",
                    description: "Named account owner. Direct access. Real conversations.",
                    color: "from-purple-500 to-pink-500",
                    features: [
                      "Dedicated account executive",
                      "Direct Slack/Teams access",
                      "Weekly strategic reviews",
                      "Executive escalation path"
                    ]
                  },
                  {
                    icon: "🇨🇦",
                    title: "North American Accountability",
                    description: "Strategy, compliance, and ownership stay in Canada.",
                    color: "from-red-500 to-red-600",
                    features: [
                      "Canadian legal entity",
                      "GDPR/PIPEDA compliance",
                      "In-country data sovereignty",
                      "Local contract enforcement"
                    ]
                  },
                  {
                    icon: "🇮🇳",
                    title: "Indian Execution Excellence",
                    description: "Senior engineers, structured delivery, long-term teams.",
                    color: "from-green-500 to-emerald-600",
                    features: [
                      "10+ years average experience",
                      "<5% annual attrition",
                      "Domain-specific training",
                      "Career growth paths"
                    ]
                  }
                ].map((pillar, index) => (
                  <motion.div 
                    key={index} 
                    variants={fadeInUp}
                    whileHover="hover"
                    className="relative group"
                  >
                    <motion.div 
                      variants={cardHover}
                      className="relative bg-white/95 backdrop-blur-sm border-2 border-gray-100/80 rounded-2xl p-6 md:p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`inline-flex items-center justify-center p-3 md:p-4 rounded-xl bg-gradient-to-r ${pillar.color} mb-4 md:mb-6`}
                      >
                        <span className="text-xl md:text-2xl">{pillar.icon}</span>
                      </motion.div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 md:mb-4">{pillar.title}</h3>
                      <p className="text-gray-600 mb-4 md:mb-6 text-base">{pillar.description}</p>
                      <ul className="space-y-2">
                        {pillar.features.map((item, i) => (
                          <motion.li 
                            key={i} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                variants={scaleIn}
                className="text-center p-6 md:p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200/80 mx-4 md:mx-0 shadow-xl"
              >
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  We don't outsource responsibility. We <span className="text-red-600">own outcomes</span>.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== 4. WHAT WE DO (SERVICES) ===== */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
          className="relative py-12 md:py-20"
        >
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <img 
                src="/pic7.webp"
                alt="Services Background"
                className="object-cover w-full h-full blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
              <motion.div 
                variants={fadeInUp}
                className="text-center mb-12 md:mb-16"
              >
                <h2 className="text-[30px] font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
                  Focused Services. <span className="text-red-500">Clear Outcomes</span>.
                </h2>
                <p className="text-[22px] text-gray-200 max-w-3xl mx-auto px-4 drop-shadow">
                  End-to-end technology solutions with measurable business impact
                </p>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0"
              >
                {[
                  { 
                    icon: "✨", 
                    title: 'Generative AI Solutions', 
                    description: 'Content generation & creative AI tools',
                    path: '/generative-ai',
                    color: 'bg-purple-100'
                  },
                  { 
                    icon: "🌐", 
                    title: 'Web Development', 
                    description: 'Custom web applications & solutions',
                    path: '/web-development',
                    color: 'bg-blue-100'
                  },
                  { 
                    icon: "☁️", 
                    title: 'Cloud Solutions', 
                    description: 'AWS, Azure & Google Cloud migration',
                    path: '/cloud-solutions',
                    color: 'bg-sky-100'
                  },
                  { 
                    icon: "📱", 
                    title: 'Mobile App Development', 
                    description: 'iOS & Android applications',
                    path: '/mobile-development',
                    color: 'bg-green-100'
                  },
                  { 
                    icon: "🗄️", 
                    title: 'Database Management', 
                    description: 'SQL, NoSQL & Data warehousing',
                    path: '/database-management',
                    color: 'bg-amber-100'
                  },
                  { 
                    icon: "📢", 
                    title: 'Digital Marketing', 
                    description: 'Data-driven marketing strategies',
                    path: '/digital-marketing',
                    color: 'bg-pink-100'
                  },
                  { 
                    icon: "🛡️", 
                    title: 'Cybersecurity', 
                    description: 'Advanced security solutions',
                    path: '/cybersecurity',
                    color: 'bg-red-100'
                  },
                  { 
                    icon: "⚡", 
                    title: 'DevOps Services', 
                    description: 'CI/CD & automation solutions',
                    path: '/devops-services',
                    color: 'bg-orange-100'
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover="hover"
                    className="bg-white/95 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/30 hover:border-red-300 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full shadow-xl"
                  >
                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4 flex-grow">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`text-xl md:text-2xl ${service.color} p-2 md:p-3 rounded-lg group-hover:bg-red-50 transition-colors flex-shrink-0`}
                      >
                        {service.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-base md:text-lg mb-1 md:mb-2 group-hover:text-red-600 transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-gray-700 text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          to={service.path}
                          className="inline-flex items-center gap-1 text-sm text-red-600 font-medium hover:text-red-700 transition-colors"
                        >
                          Explore Service
                          <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== 5. WHO WE SERVE ===== */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="relative py-12 md:py-20 bg-white"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="relative h-full w-full">
              <img 
                src="/pic2.avif" 
                alt="Industries Background"
                className="object-cover w-full h-full blur-l scale-110"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <motion.div 
                variants={fadeInUp}
                className="text-center mb-12 md:mb-16"
              >
                <h2 className="text-[30px] font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
                  Built for Businesses That <span className="text-red-600">Value Ownership</span>
                </h2>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 px-4 md:px-0"
              >
                {[
                  { name: "SMBs & Mid-Market", desc: "Growing companies needing scalable solutions", icon: "🏢" },
                  { name: "Funded Startups", desc: "Founders requiring strategic tech leadership", icon: "🚀" },
                  { name: "Healthcare", desc: "HIPAA-compliant systems and patient data security", icon: "🏥" },
                  { name: "Professional Services", desc: "Legal, accounting, and consulting firms", icon: "⚖️" },
                  { name: "Manufacturing", desc: "Operational technology and supply chain systems", icon: "🏭" },
                  { name: "FinTech", desc: "Secure, compliant financial technology", icon: "💰" },
                  { name: "E-commerce", desc: "Scalable platforms with seamless UX", icon: "🛒" },
                  { name: "Enterprises", desc: "Legacy modernization and digital transformation", icon: "🏛️" }
                ].map((industry, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    whileHover="hover"
                    className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 text-center hover:border-red-300 hover:shadow-2xl transition-all duration-300 shadow-xl"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-2xl md:text-3xl mb-2 md:mb-4"
                    >
                      {industry.icon}
                    </motion.div>
                    <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 md:mb-2">{industry.name}</h3>
                    <p className="text-sm text-gray-600">{industry.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                variants={scaleIn}
                className="text-center p-6 md:p-8 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 mx-4 md:mx-0 shadow-2xl"
              >
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  If <span className="text-red-600">accountability matters</span>, KANDAX fits.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== 6. HOW WE WORK (PROCESS) ===== */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="py-12 md:py-20 bg-gray-900 text-white"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div 
              variants={fadeInUp}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-[30px] font-bold mb-4 md:mb-6">
                A Human-Centered <span className="text-red-400">Delivery Process</span>
              </h2>
              <p className="text-[22px] text-gray-300 max-w-3xl mx-auto px-4">
                Transparent, collaborative, and designed for long-term success
              </p>
            </motion.div>

            <div className="relative px-4 md:px-0">
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-red-500 to-green-500 z-0"></div>
              
              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10"
              >
                {[
                  {
                    number: "01",
                    icon: "🔍",
                    title: "Discover",
                    subtitle: "Business-first understanding",
                    description: "We start by understanding your business goals, challenges, and constraints before discussing technology.",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    number: "02",
                    icon: "🎨",
                    title: "Design",
                    subtitle: "Strategy before code",
                    description: "Architectural design, technology selection, and project planning with clear milestones and deliverables.",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    number: "03",
                    icon: "⚡",
                    title: "Deliver",
                    subtitle: "India-led execution, Canada-led oversight",
                    description: "Agile development with weekly demos, continuous integration, and transparent progress tracking.",
                    color: "from-red-500 to-orange-500"
                  },
                  {
                    number: "04",
                    icon: "🤝",
                    title: "Support",
                    subtitle: "Long-term partnership, not handoff",
                    description: "Ongoing maintenance, updates, and evolution of your solution with dedicated support teams.",
                    color: "from-green-500 to-emerald-500"
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -10 }}
                    className="text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className={`mb-4 md:mb-6 inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-xl md:text-2xl shadow-lg`}
                    >
                      {step.number}
                    </motion.div>
                    
                    <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[300px] md:min-h-[340px] flex flex-col items-center">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex items-center justify-center p-2 md:p-3 rounded-xl bg-gradient-to-r ${step.color} mb-3 md:mb-4 text-xl md:text-2xl`}
                      >
                        {step.icon}
                      </motion.div>
                      
                      <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{step.title}</h3>
                      <p className="text-gray-300 font-medium mb-2 md:mb-4 text-sm md:text-base">{step.subtitle}</p>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== 7. TRUST & CREDIBILITY ===== */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="relative py-12 md:py-20 bg-white"
        >
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <img 
                src="/pic.avif"
                alt="Why Clients Choose KANDAX Background"
                className="object-cover w-full h-full blur-sm"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <motion.div 
                variants={fadeInUp}
                className="text-center mb-12 md:mb-16"
              >
                <h2 className="text-[30px] font-bold text-white mb-4 md:mb-6 drop-shadow-sm">
                  Why Clients <span className="text-red-600">Choose KANDAX</span>
                </h2>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12 px-4 md:px-0"
              >
                {[
                  {
                    title: "Canadian Leadership & Governance",
                    description: "All strategic decisions made in Canada with local accountability",
                    icon: "🛡️"
                  },
                  {
                    title: "Senior Engineering Teams",
                    description: "No junior engineers. Average 10+ years experience per developer",
                    icon: "👨‍💻"
                  },
                  {
                    title: "Clear SLAs & Communication",
                    description: "Guaranteed response times and regular executive reviews",
                    icon: "📋"
                  },
                  {
                    title: "Long-Term Partnerships",
                    description: "We grow with you, not just complete projects",
                    icon: "🤝"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover="hover"
                    className="text-center p-4 md:p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="text-3xl md:text-4xl mb-3 md:mb-4"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 md:mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-base">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ===== 8. INDIA DELIVERY STORY ===== */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="relative py-12 md:py-20"
        >
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <img 
                src="/pic5.png"
                alt="India Center of Excellence Background"
                className="object-cover w-full h-full blur-sm"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center px-4 md:px-0">
                <motion.div 
                  variants={fadeInLeft}
                  className="text-white"
                >
                  <h2 className="text-[30px] font-bold mb-4 md:mb-6">
                    Our India <span className="text-red-600">Center of Excellence</span>
                  </h2>
                  <p className="text-[16px] mb-6 md:mb-8">
                    India is not a cost center for us—it's our execution backbone. Our teams are domain-trained, stable, and deeply integrated with our Canadian leadership.
                  </p>
                  
                  <motion.div 
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                  >
                    {[
                      { label: "Senior engineers", value: "10+ years avg." },
                      { label: "Team attrition", value: "< 5%" },
                      { label: "Domain training", value: "Ongoing" },
                      { label: "Security certified", value: "100%" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-xl border border-gray-200/80 shadow-lg"
                      >
                        <div className="text-xl md:text-2xl font-bold text-red-600 mb-1">{stat.value}</div>
                        <div className="text-gray-800 text-sm md:text-base">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  variants={fadeInRight}
                  whileHover={{ y: -5 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-200/80"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Execution Excellence</h3>
                  <ul className="space-y-3 md:space-y-4">
                    {[
                      "Stable, long-term engineering teams",
                      "Deep domain expertise across industries",
                      "Secure development processes (ISO 27001)",
                      "Continuous training & certification programs",
                      "Seamless integration with Canadian leadership",
                      "Follow-the-sun delivery model"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <motion.svg 
                          whileHover={{ scale: 1.2 }}
                          className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </motion.svg>
                        <span className="text-gray-800 text-base">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== 9. TESTIMONIAL SECTION ===== */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
          className="relative py-12 md:py-20 bg-gray-50"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full">
              <img 
                src="/image.avif"
                alt="Testimonials Background"
                className="object-cover w-full h-full opacity-15"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-[30px] font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
                  What Our <span className="text-red-600">Clients Say</span>
                </h2>
                <p className="text-[22px] text-gray-200 max-w-3xl mx-auto px-4 drop-shadow">
                  KANDAX is a transformative technology partner, uniquely fusing Canadian accountability with Indian execution to own outcomes.
                </p>
              </div>

              {testimonialsLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  {[1, 2].map((item) => (
                    <div key={item} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/30 animate-pulse">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                        <div className="ml-4">
                          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                          <div className="h-3 bg-gray-300 rounded w-24"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : testimonialsError ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-2 text-white bg-red-600/20 backdrop-blur-sm p-4 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-base">{testimonialsError}</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 px-4 md:px-0">
                  {/* Left Column - Kandax Verified Section */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow">Zplus Verified</h3>
                      <p className="text-gray-200 text-lg mb-6 drop-shadow">Top-rated IT Services Provider</p>
                      {/* Rating Display */}
                    <div className="flex flex-col items-center mb-4">
  <div className="flex mb-2">
    {[...Array(5)].map((_, i) => {
      // 4.7 rating means:
      // - 4 full stars
      // - 1 partial star (70% filled)
      if (i < 4) {
        // Full stars for first 4
        return (
          <svg key={i} className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        // 5th star - partial fill (70%)
        return (
          <div key={i} className="relative">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-300 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '70%' }}>
              <svg className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      }
    })}
  </div>
  <div>
    <span className="text-3xl md:text-4xl font-bold text-white drop-shadow">4.7</span>
  </div>
</div>
                    </div>
                  </div>
                  
                  {/* Right Column - API Testimonials in Slider */}
                  <div className="relative h-full min-h-[400px] md:min-h-[500px]">
                    {testimonials.length > 0 ? (
                      <>
                        {/* Testimonial Slider Container */}
                        <div className="overflow-hidden rounded-2xl h-full">
                          <div
                            className="flex transition-transform duration-500 ease-in-out h-full"
                            style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
                          >
                            {testimonials.map((testimonial, index) => (
                              <div
                                key={testimonial._id || index}
                                className="w-full flex-shrink-0 h-full"
                              >
                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                                  {/* Client Image and Info */}
                                  <div className="flex flex-col items-center mb-6">
                                    <img
                                      src={testimonial.client_image}
                                      alt={testimonial.client_name}
                                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-red-100 mb-4"
                                      onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.client_name)}&background=ff4444&color=fff&size=128`;
                                      }}
                                    />
                                    <div>
                                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{testimonial.client_name}</h3>
                                      <p className="text-gray-600 text-base md:text-lg">{testimonial.client_designation}</p>
                                      <div className="flex justify-center items-center mt-2">
                                        {renderStars(testimonial.rating || 5)}
                                        <span className="ml-2 text-base font-medium text-gray-900">
                                          {testimonial.rating || 5}/5
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Testimonial Text */}
                                  <div className="relative w-full max-w-2xl mb-8">
                                    <svg className="absolute -top-4 -left-4 w-8 h-8 text-red-200 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10v-10h-4c0-2.2 1.8-4 4-4zm14 0c-3.3 0-6 2.7-6 6v10h10v-10h-4c0-2.2 1.8-4 4-4z" />
                                    </svg>
                                    <p className="text-gray-700 italic text-lg md:text-xl px-4">
                                      "{testimonial.testimonial_text || "Great service and support!"}"
                                    </p>
                                  </div>
                                  {/* Navigation Dots */}
                                  {testimonials.length > 1 && (
                                    <div className="flex justify-center space-x-2 mt-auto">
                                      {testimonials.map((_, dotIndex) => (
                                        <button
                                          key={dotIndex}
                                          onClick={() => goToTestimonial(dotIndex)}
                                          className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                            dotIndex === currentTestimonialIndex
                                              ? 'bg-red-600 scale-125'
                                              : 'bg-gray-300 hover:bg-gray-400'
                                          }`}
                                          aria-label={`Go to testimonial ${dotIndex + 1}`}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/30 text-center h-full flex items-center justify-center">
                        <div className="inline-flex flex-col items-center gap-3 text-gray-500">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                          <p className="text-lg">No testimonials available yet</p>
                          <p className="text-sm">Check back soon for client reviews!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* ===== 10. FINAL CTA ===== */}
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
                className="group inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base shadow-sm shadow-red-600/20 hover:bg-red-700 transition-all duration-300"
              >
                Let's Talk
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
            <motion.p 
              variants={fadeInUp}
              className="mt-8 md:mt-10 text-gray-400 text-base px-4 md:px-0"
            >
              No bots. No runaround. Just real conversations with accountable partners.
            </motion.p>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Home;