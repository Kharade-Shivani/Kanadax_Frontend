import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Menu, 
  Headphones,
  HardDrive,
  Monitor,
  X, 
  ChevronDown, 
  Phone, 
  Zap,
  Network,
  Smartphone,
  Server,
  TrendingUp,
  Eye,
  Sparkles,
  Brain,
  Bot,
  Mail, 
  Search,
  Code,
  Shield,
  Megaphone,
  Cloud,
  Cpu,
  BarChart,
  Database,
  Users,
  Briefcase,
  Home as HomeIcon,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Handshake,
  Languages
} from 'lucide-react';

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const languageRef = useRef(null);

  // Get current language
  const currentLanguage = i18n.language || 'en';

  // Change language function - NO RTL changes
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageDropdown(false);
    // Keep direction LTR always
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lng;
  };

  // Set initial direction to LTR
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);
  
  // Handle screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle mouse enter with delay
  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (!isSmallScreen) {
      setActiveDropdown(index);
    }
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    if (!isSmallScreen) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 200);
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setLanguageDropdown(false);
  }, [location.pathname]);

  // Navigation items
  const navItems = [
    { 
      label: t('header.home'),
      path: '/',
      dropdown: false,
      icon: HomeIcon
    },
    { 
      label: t('header.about'),
      path: '/about',
      dropdown: false,
      icon: Users
    },
    { 
      label: t('header.services'),
      path: '#',
      dropdown: true,
      icon: Briefcase,
      items: [
        { 
          icon: Sparkles, 
          label: t('header.servicesDropdown.generativeAI.label'),
          description: t('header.servicesDropdown.generativeAI.description'),
          path: '/generative-ai'
        },
        { 
          icon: Code, 
          label: t('header.servicesDropdown.webDev.label'),
          description: t('header.servicesDropdown.webDev.description'),
          path: '/web-development'
        },
        { 
          icon: Server, 
          label: t('header.servicesDropdown.cloud.label'),
          description: t('header.servicesDropdown.cloud.description'),
          path: '/cloud-solutions'
        },
        { 
          icon: Smartphone, 
          label: t('header.servicesDropdown.mobile.label'),
          description: t('header.servicesDropdown.mobile.description'),
          path: '/mobile-development'
        },
        { 
          icon: Database, 
          label: t('header.servicesDropdown.database.label'),
          description: t('header.servicesDropdown.database.description'),
          path: '/database-management'
        },
        { 
          icon: Megaphone, 
          label: t('header.servicesDropdown.digitalMarketing.label'),
          description: t('header.servicesDropdown.digitalMarketing.description'),
          path: '/digital-marketing'
        },
        { 
          icon: Shield, 
          label: t('header.servicesDropdown.cybersecurity.label'),
          description: t('header.servicesDropdown.cybersecurity.description'),
          path: '/cybersecurity'
        },
        { 
          icon: Zap, 
          label: t('header.servicesDropdown.devops.label'),
          description: t('header.servicesDropdown.devops.description'),
          path: '/devops-services'
        },
        { 
          icon: Briefcase, 
          label: t('header.servicesDropdown.consulting.label'),
          description: t('header.servicesDropdown.consulting.description'),
          path: '/technology-consulting'
        },
        { 
          icon: Monitor, 
          label: t('header.servicesDropdown.remote.label'),
          description: t('header.servicesDropdown.remote.description'),
          path: '/remote-workplace'
        },
        { 
          icon: HardDrive, 
          label: t('header.servicesDropdown.backup.label'),
          description: t('header.servicesDropdown.backup.description'),
          path: '/backup-disaster-recovery'
        },
        { 
          icon: Headphones, 
          label: t('header.servicesDropdown.helpDesk.label'),
          description: t('header.servicesDropdown.helpDesk.description'),
          path: '/help-desc'
        },
      ]
    },
    { 
      label: t('header.portfolio'),
      path: '/portfolio',
      dropdown: false,
      icon: BarChart
    },
    { 
      label: t('header.partners'),
      path: '/partners',
      dropdown: false,
      icon: Handshake
    },
    { 
      label: t('header.team'),
      path: '/team',
      dropdown: false,
      icon: Users
    },
    { 
      label: t('header.contact'),
      path: '/contact',
      dropdown: false,
      icon: MessageSquare
    },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mx-auto">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo - UPDATED SIZE */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <Link to="/" className="flex items-center space-x-2 md:space-x-3">
                <img
                  src="/loggo.jpeg"
                  alt="KANDAX Logo"
                  className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
                />
                <div className="hidden sm:block">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {t('header.company')}
                  </h1>
                  <p className="text-xs text-red-600 -mt-1 font-medium">
                    {t('header.tagline')}
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
              {navItems.map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  ref={item.dropdown ? dropdownRef : null}
                  onMouseEnter={() => item.dropdown && handleMouseEnter(index)}
                  onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
                >
                  {item.dropdown ? (
                    <>
                      <button
                        className={`flex items-center space-x-1 transition-colors duration-200 font-medium cursor-pointer whitespace-nowrap ${
                          location.pathname === item.path || activeDropdown === index 
                            ? 'text-red-600' 
                            : 'text-gray-700 hover:text-red-600'
                        }`}
                        onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                      >
                        <span className="text-sm xl:text-base">{item.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === index && (
                        <div 
                          className="absolute left-0 mt-2 w-80 xl:w-96 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                            {item.items && item.items.map((dropdownItem, dIndex) => (
                              <Link
                                key={dIndex}
                                to={dropdownItem.path}
                                className="flex items-start space-x-3 px-4 py-3 hover:bg-red-50 border-b border-gray-100 last:border-b-0 group/dropdown transition-colors duration-200"
                                onClick={() => setActiveDropdown(null)}
                              >
                                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-red-100 to-red-50 border border-red-200 flex items-center justify-center transition-all duration-200 group-hover/dropdown:border-red-300">
                                  <dropdownItem.icon className="w-5 h-5 text-red-600 transition-all duration-200 group-hover/dropdown:scale-110" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 group-hover/dropdown:text-red-600 transition-colors duration-200 truncate">
                                    {dropdownItem.label}
                                  </div>
                                  {dropdownItem.description && (
                                    <div className="text-xs text-gray-500 group-hover/dropdown:text-gray-600 transition-colors duration-200 line-clamp-2">
                                      {dropdownItem.description}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-1 transition-colors duration-200 font-medium whitespace-nowrap ${
                        location.pathname === item.path 
                          ? 'text-red-600' 
                          : 'text-gray-700 hover:text-red-600'
                      }`}
                    >
                      <span className="text-sm xl:text-base">{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Language Switcher - Desktop */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => setLanguageDropdown(!languageDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 transition-colors duration-200"
                >
                  <Languages className="w-4 h-4" />
                  <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    languageDropdown ? 'rotate-180' : ''
                  }`} />
                </button>

                {languageDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`w-full text-left px-4 py-3 hover:bg-red-50 transition-colors ${
                        currentLanguage === 'en' ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage('ar')}
                      className={`w-full text-left px-4 py-3 hover:bg-red-50 transition-colors ${
                        currentLanguage === 'ar' ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      العربية (Arabic)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <a 
                href="tel:+14167007091"
                className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition-colors duration-200 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{t('header.phone')}</span>
              </a>
              <Link 
                to="/contact"
                className="px-4 py-2 lg:px-6 lg:py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm lg:text-base whitespace-nowrap"
              >
                {t('header.getStarted')}
              </Link>
            </div>

            {/* Mobile Buttons */}
            <div className="flex lg:hidden items-center space-x-2">
              <a 
                href="tel:+14167007091"
                className="flex items-center justify-center p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              
              <button
                className="p-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white transition-all duration-300 hover:scale-105"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile Menu Panel - Always opens from LEFT */}
        <div className={`lg:hidden fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            {/* Menu Header - UPDATED LOGO SIZE */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <img
                  src="/loggo.jpeg"
                  alt="KANDAX Logo"
                  className="h-12 w-auto"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{t('header.company')}</h1>
                  <p className="text-xs text-red-600 font-medium">{t('header.tagline')}</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Menu Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
              <div className="px-4 space-y-2">
                {/* Language Switcher - Mobile */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <Languages className="w-4 h-4 mr-2" />
                      Language / اللغة
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentLanguage === 'en' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage('ar')}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentLanguage === 'ar' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-white text-gray-700 border border-gray-300'
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                </div>

                {navItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-b-0">
                    {item.dropdown ? (
                      <details className="group">
                        <summary className="flex items-center justify-between py-3 text-gray-700 hover:text-red-600 cursor-pointer list-none transition-colors duration-200">
                          <div className="flex items-center space-x-3">
                            <item.icon className="w-5 h-5 text-gray-400 group-open:text-red-600" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 duration-200" />
                        </summary>
                        <div className="ml-8 mt-2 mb-4 space-y-2 border-l border-gray-200 pl-4">
                          {item.items && item.items.map((dropdownItem, dIndex) => (
                            <Link
                              key={dIndex}
                              to={dropdownItem.path}
                              className="flex items-start space-x-3 py-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <dropdownItem.icon className="w-4 h-4 text-red-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{dropdownItem.label}</div>
                                <div className="text-xs text-gray-500 line-clamp-2">{dropdownItem.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        to={item.path}
                        className="flex items-center space-x-3 py-3 text-gray-700 hover:text-red-600 font-medium transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5 text-gray-400" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="space-y-4">
                <a 
                  href="tel:+14167007091"
                  className="flex items-center justify-center space-x-2 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">{t('header.callUs', { phone: t('header.phone') })}</span>
                </a>
                <Link 
                  to="/contact"
                  className="block py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-center hover:from-red-700 hover:to-red-800 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('header.getStarted')}
                </Link>
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">{t('header.followUs')}</p>
                  <div className="flex justify-center space-x-4 mt-3">
                    {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors duration-200"
                        aria-label={`Follow on ${Icon.name}`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 md:h-20"></div>

      {/* Custom CSS */}
      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #dc2626 #fef2f2;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fef2f2;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default Header;