import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Heart,
  Building2,
  ShoppingBag,
  GraduationCap,
  Plane,
  Banknote,
  Car,
  Utensils,
  Sparkles,
  Megaphone,
  HardDrive,
  Award,
  Users,
  Globe,
  Building,
  Cpu,
  Code,
  Database,
  Zap,
  TrendingUp,
  CheckCircle,
  Target,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  ExternalLink,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MessageSquare,
  FileText,
  Server,
  Network,
  Lock,
  Eye,
  Cloud,
  Smartphone,
  Monitor,
  Headphones,
  Briefcase,
  User,
  Send,
  AlertCircle,
  ChevronRight,
  X,
  Trophy,
  Medal,
  Ribbon,
  Crown,
  Gem,
  BadgeCheck,
  Sparkle,
  Target as TargetIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Partners() {
  const { t } = useTranslation();
  
  // Animation state for scroll-triggered animations
  const [isVisible, setIsVisible] = useState({
    heroLeft: false,
    heroRight: false,
    overviewSection: false,
    servicesSection: false,
    industriesSection: false,
    techStack: false,
    awardsSection: false,
    contactSection: false
  });

  // Refs for each section
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);
  const overviewRef = useRef(null);
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const techStackRef = useRef(null);
  const awardsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all sections
    const sections = [
      { ref: heroLeftRef, key: 'heroLeft' },
      { ref: heroRightRef, key: 'heroRight' },
      { ref: overviewRef, key: 'overviewSection' },
      { ref: servicesRef, key: 'servicesSection' },
      { ref: industriesRef, key: 'industriesSection' },
      { ref: techStackRef, key: 'techStack' },
      { ref: awardsRef, key: 'awardsSection' },
      { ref: contactRef, key: 'contactSection' }
    ];

    sections.forEach(({ ref, key }) => {
      if (ref.current) {
        ref.current.dataset.section = key;
        observer.observe(ref.current);
      }
    });

    return () => {
      sections.forEach(({ ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // Company Information
  const companyInfo = {
    name: t('partnersPage.company.name'),
    tagline: t('partnersPage.company.tagline'),
    founded: 2018,
    employees: '250+',
    headquarters: t('partnersPage.company.headquarters'),
    ceo: t('partnersPage.company.ceo'),
    industry: t('partnersPage.company.industry'),
    website: 'https://zpluscybertech.com/#/Home',
    email: t('partnersPage.company.email'),
    phone: t('partnersPage.company.phone')
  };

  // Awards Data
  const awardsData = [
    {
      id: 1,
      title: t('partnersPage.awards.items.award1.title'),
      year: t('partnersPage.awards.items.award1.year'),
      category: t('partnersPage.awards.items.award1.category'),
      description: t('partnersPage.awards.items.award1.description'),
      image: "/award.png",
      icon: Trophy,
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50"
    },
    {
      id: 2,
      title: t('partnersPage.awards.items.award2.title'),
      year: t('partnersPage.awards.items.award2.year'),
      category: t('partnersPage.awards.items.award2.category'),
      description: t('partnersPage.awards.items.award2.description'),
      image: "/award2.png",
      icon: Shield,
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50"
    },
    {
      id: 3,
      title: t('partnersPage.awards.items.award3.title'),
      year: t('partnersPage.awards.items.award3.year'),
      category: t('partnersPage.awards.items.award3.category'),
      description: t('partnersPage.awards.items.award3.description'),
      image: "/award3.png",
      icon: TrendingUp,
      color: "from-green-600 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
    },
    {
      id: 4,
      title: t('partnersPage.awards.items.award4.title'),
      year: t('partnersPage.awards.items.award4.year'),
      category: t('partnersPage.awards.items.award4.category'),
      description: t('partnersPage.awards.items.award4.description'),
      image: "/award4.png",
      icon: Sparkle,
      color: "from-purple-600 to-violet-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50"
    },
    {
      id: 5,
      title: t('partnersPage.awards.items.award5.title'),
      year: t('partnersPage.awards.items.award5.year'),
      category: t('partnersPage.awards.items.award5.category'),
      description: t('partnersPage.awards.items.award5.description'),
      image: "/award5.png",
      icon: Users,
      color: "from-pink-600 to-rose-600",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50"
    },
    {
      id: 6,
      title: t('partnersPage.awards.items.award6.title'),
      year: t('partnersPage.awards.items.award6.year'),
      category: t('partnersPage.awards.items.award6.category'),
      description: t('partnersPage.awards.items.award6.description'),
      image: "/award6.png",
      icon: Cpu,
      color: "from-red-600 to-orange-600",
      bgColor: "bg-gradient-to-br from-red-50 to-orange-50"
    }
  ];

  // Core Services
  const coreServices = [
    {
      icon: Sparkles,
      title: t('partnersPage.services.items.service1.title'),
      description: t('partnersPage.services.items.service1.description'),
      features: t('partnersPage.services.items.service1.features', { returnObjects: true })
    },
    {
      icon: Code,
      title: t('partnersPage.services.items.service2.title'),
      description: t('partnersPage.services.items.service2.description'),
      features: t('partnersPage.services.items.service2.features', { returnObjects: true })
    },
    {
      icon: Server,
      title: t('partnersPage.services.items.service3.title'),
      description: t('partnersPage.services.items.service3.description'),
      features: t('partnersPage.services.items.service3.features', { returnObjects: true })
    },
    {
      icon: Smartphone,
      title: t('partnersPage.services.items.service4.title'),
      description: t('partnersPage.services.items.service4.description'),
      features: t('partnersPage.services.items.service4.features', { returnObjects: true })
    },
    {
      icon: Database,
      title: t('partnersPage.services.items.service5.title'),
      description: t('partnersPage.services.items.service5.description'),
      features: t('partnersPage.services.items.service5.features', { returnObjects: true })
    },
    {
      icon: Megaphone,
      title: t('partnersPage.services.items.service6.title'),
      description: t('partnersPage.services.items.service6.description'),
      features: t('partnersPage.services.items.service6.features', { returnObjects: true })
    },
    {
      icon: Shield,
      title: t('partnersPage.services.items.service7.title'),
      description: t('partnersPage.services.items.service7.description'),
      features: t('partnersPage.services.items.service7.features', { returnObjects: true })
    },
    {
      icon: Zap,
      title: t('partnersPage.services.items.service8.title'),
      description: t('partnersPage.services.items.service8.description'),
      features: t('partnersPage.services.items.service8.features', { returnObjects: true })
    },
    {
      icon: Briefcase,
      title: t('partnersPage.services.items.service9.title'),
      description: t('partnersPage.services.items.service9.description'),
      features: t('partnersPage.services.items.service9.features', { returnObjects: true })
    },
    {
      icon: Monitor,
      title: t('partnersPage.services.items.service10.title'),
      description: t('partnersPage.services.items.service10.description'),
      features: t('partnersPage.services.items.service10.features', { returnObjects: true })
    },
    {
      icon: HardDrive,
      title: t('partnersPage.services.items.service11.title'),
      description: t('partnersPage.services.items.service11.description'),
      features: t('partnersPage.services.items.service11.features', { returnObjects: true })
    },
    {
      icon: Headphones,
      title: t('partnersPage.services.items.service12.title'),
      description: t('partnersPage.services.items.service12.description'),
      features: t('partnersPage.services.items.service12.features', { returnObjects: true })
    }
  ];

  const [activeCategory, setActiveCategory] = useState(0);

  // Technology Stack
  const technologies = [
    {
      category: t('partnersPage.techStack.categories.category1'),
      items: t('partnersPage.techStack.items.category1', { returnObjects: true })
    },
    {
      category: t('partnersPage.techStack.categories.category2'),
      items: t('partnersPage.techStack.items.category2', { returnObjects: true })
    },
    {
      category: t('partnersPage.techStack.categories.category3'),
      items: t('partnersPage.techStack.items.category3', { returnObjects: true })
    },
    {
      category: t('partnersPage.techStack.categories.category4'),
      items: t('partnersPage.techStack.items.category4', { returnObjects: true })
    },
    {
      category: t('partnersPage.techStack.categories.category5'),
      items: t('partnersPage.techStack.items.category5', { returnObjects: true })
    },
    {
      category: t('partnersPage.techStack.categories.category6'),
      items: t('partnersPage.techStack.items.category6', { returnObjects: true })
    },
    {
      category: t('partnersPage.techStack.categories.category7'),
      items: t('partnersPage.techStack.items.category7', { returnObjects: true })
    },
    {
      category: t('partnersPage.techStack.categories.category8'),
      items: t('partnersPage.techStack.items.category8', { returnObjects: true })
    }
  ];

  const industries = t('partnersPage.industries.items', { returnObjects: true });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Single Banner Image */}
      <div className="w-full">
        <img
          src="/copy5.jpg"
          alt={t('partnersPage.banner.alt')}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Hero Section - Left/Right Animation */}
      <div className="relative pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/pic1.jpg"
            alt={t('partnersPage.hero.backgroundAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05),transparent_50%)] z-0"></div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content - Slides from LEFT */}
            <div
              ref={heroLeftRef}
              className={`lg:w-2/3 transition-all duration-1000 ${isVisible.heroLeft
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-20'
                }`}
            >
              <div className="inline-flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full mb-6 border border-red-200 backdrop-blur-sm bg-white/80">
                <Award className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  {t('partnersPage.hero.awardBadge')}
                </span>
              </div>

              <h1 className="text-5xl font-bold mb-6 text-grey-900">
                <span className="">{t('partnersPage.hero.title1')}</span>
                <span className="block text-red-600 mt-2">{t('partnersPage.hero.title2')}</span>
              </h1>

              <p className="text-xl text-gray-200 mb-8 max-w-3xl">
                {t('partnersPage.hero.description')}
              </p>
            </div>

            {/* Right Content - Award Image */}
            <div
              ref={heroRightRef}
              className={`lg:w-1/3 transition-all duration-1000 delay-200 ${isVisible.heroRight
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-20'
                }`}
            >
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 flex flex-col items-center justify-center text-center h-full">
                <div className="mb-4">
                  <Award className="w-16 h-16 mx-auto mb-3 text-red-600" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t('partnersPage.hero.awardSection.title')}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t('partnersPage.hero.awardSection.subtitle')}
                  </p>
                </div>

                {/* Award Image Container */}
                <div className="w-full max-w-xs flex items-center justify-center overflow-hidden rounded-lg shadow-md">
                  <img
                    src="/award.png"
                    alt={t('partnersPage.hero.awardSection.imageAlt')}
                    className="w-full h-auto object-contain max-h-64"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/award-placeholder.jpg";
                    }}
                  />
                </div>

                <div className="mt-6">
                  <p className="text-sm text-gray-700 font-medium">
                    {t('partnersPage.hero.awardSection.description')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {t('partnersPage.hero.awardSection.location')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Overview - Fade Up Animation */}
      <div
        ref={overviewRef}
        className={`py-16 relative overflow-hidden transition-all duration-1000 ${isVisible.overviewSection
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/connn.jpg"
            alt={t('partnersPage.overview.backgroundAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/30"></div>
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('partnersPage.overview.title')}
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              {t('partnersPage.overview.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 hover:border-red-300 hover:bg-white/95 transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6 border border-red-200">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('partnersPage.overview.mission.title')}
              </h3>
              <p className="text-gray-700 flex-grow">
                {t('partnersPage.overview.mission.description')}
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 hover:border-red-300 hover:bg-white/95 transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6 border border-red-200">
                <Eye className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('partnersPage.overview.vision.title')}
              </h3>
              <p className="text-gray-700 flex-grow">
                {t('partnersPage.overview.vision.description')}
              </p>
            </div>

            {/* Expertise Card */}
            <div className="p-8 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 hover:border-red-300 hover:bg-white/95 transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6 border border-red-200">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('partnersPage.overview.expertise.title')}
              </h3>
              <p className="text-gray-700 flex-grow">
                {t('partnersPage.overview.expertise.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Services - Fade Up Animation with Stagger */}
      <div
        ref={servicesRef}
        className="relative py-16"
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/greyy.avif)',
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-6 sm:px-8 lg:px-16">
            <div className={`text-center mb-12 transition-all duration-1000 delay-100 ${isVisible.servicesSection
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
              }`}>
              <h2 className="text-4xl font-bold text-white mb-4">
                {t('partnersPage.services.title')}
              </h2>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto">
                {t('partnersPage.services.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <div
                  key={index}
                  className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 hover:shadow-2xl hover:border-red-300 transition-all duration-300 hover:-translate-y-2 transform transition-all duration-1000 delay-${index * 100} ${isVisible.servicesSection
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-red-600" />
                        <span className="text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Industries We Serve - Fade Up Animation */}
      <div
        ref={industriesRef}
        className={`py-16 relative overflow-hidden transition-all duration-1000 ${isVisible.industriesSection
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/imgg.jpg"
            alt={t('partnersPage.industries.backgroundAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('partnersPage.industries.title')}
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              {t('partnersPage.industries.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div
                key={index}
                className={`relative group transform transition-all duration-1000 delay-${index * 100} ${isVisible.industriesSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/95 backdrop-blur-sm border-2 border-white/30 rounded-xl p-6 hover:border-red-300 hover:bg-white transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full">
                  <div className="flex flex-col h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center mb-4 border border-red-200 group-hover:scale-110 transition-transform duration-300">
                      <industry.icon className="w-7 h-7 text-red-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{industry.name}</h3>
                      <ul className="space-y-1.5 mb-4">
                        {industry.services.map((service, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div
        ref={awardsRef}
        className={`relative py-20 overflow-hidden transition-all duration-1000 ${isVisible.awardsSection
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
          }`}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/contttt.avif"
            alt={t('partnersPage.awards.backgroundAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {t('partnersPage.awards.title1')} <span className="bg-clip-text text-red-600">
                {t('partnersPage.awards.title2')}
              </span>
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto drop-shadow">
              {t('partnersPage.awards.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {awardsData.map((award, index) => (
              <div
                key={award.id}
                className={`group transform transition-all duration-1000 delay-${index * 100} ${isVisible.awardsSection
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                  <div className="relative overflow-hidden bg-white p-8 flex items-center justify-center min-h-[280px]">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-auto h-auto max-w-full max-h-64 object-contain transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/award-placeholder.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6 bg-white border-t border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${award.color} text-white text-xs font-medium`}>
                        {award.year}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {award.category}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{award.title}</h3>
                    <p className="text-sm text-gray-600">{award.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack - Fade Up Animation */}
      <div
        ref={techStackRef}
        className={`relative py-16 transition-all duration-1000 ${isVisible.techStack
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
          }`}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/pic.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {t('partnersPage.techStack.title')}
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t('partnersPage.techStack.subtitle')}
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {technologies.map((tech, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${activeCategory === index
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30'
                    : 'bg-white/90 backdrop-blur-sm text-gray-700 border border-white/30 hover:border-red-300 hover:bg-red-50/90 hover:text-red-700'
                  }`}
              >
                {tech.category}
              </button>
            ))}
          </div>

          {/* Active Category Content */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {technologies[activeCategory].items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm rounded-lg border border-white/30 hover:border-red-300/50 p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group transform"
                >
                  <span className="font-medium text-gray-800 text-sm md:text-base group-hover:text-red-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for smooth transitions */}
      <style jsx>{`
        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Smooth transitions for all elements */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Custom hover effects */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        /* Glowing animation for awards */
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(245, 158, 11, 0.5);
          }
        }

        .glowing-award {
          animation: glow 3s ease-in-out infinite;
        }

        /* Floating animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Partners;