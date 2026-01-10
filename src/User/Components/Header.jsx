import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Handshake
} from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  
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
  }, [location.pathname]);

  // Navigation items
  const navItems = [
    { 
      label: 'Home', 
      path: '/',
      dropdown: false,
      icon: HomeIcon
    },
    { 
      label: 'About Us', 
      path: '/about',
      dropdown: false,
      icon: Users
    },
    { 
      label: 'Services', 
      path: '#',
      dropdown: true,
      icon: Briefcase,
      items: [
        { 
          icon: Sparkles, 
          label: 'Generative AI Solutions', 
          description: 'Content generation & creative AI tools',
          path: '/generative-ai'
        },
        { 
          icon: Code, 
          label: 'Web Development', 
          description: 'Custom web applications & solutions',
          path: '/web-development'
        },
        { 
          icon: Server, 
          label: 'Cloud Solutions', 
          description: 'AWS, Azure & Google Cloud migration',
          path: '/cloud-solutions'
        },
        { 
          icon: Smartphone, 
          label: 'Mobile App Development', 
          description: 'iOS & Android applications',
          path: '/mobile-development'
        },
        { 
          icon: Database, 
          label: 'Database Management', 
          description: 'SQL, NoSQL & Data warehousing',
          path: '/database-management'
        },
        { 
          icon: Megaphone, 
          label: 'Digital Marketing', 
          description: 'Data-driven marketing strategies',
          path: '/digital-marketing'
        },
        { 
          icon: Shield, 
          label: 'Cybersecurity', 
          description: 'Advanced security solutions',
          path: '/cybersecurity'
        },
        { 
          icon: Zap, 
          label: 'DevOps Services', 
          description: 'CI/CD & automation solutions',
          path: '/devops-services'
        },
        { 
          icon: Briefcase, 
          label: 'Technology Consulting', 
          description: 'IT strategy, architecture & digital advisory',
          path: '/technology-consulting'
        },
        { 
          icon: Monitor, 
          label: 'Remote Workplace Solutions', 
          description: 'Secure remote work & collaboration tools',
          path: '/remote-workplace'
        },
        { 
          icon: HardDrive, 
          label: 'Backup & Disaster Recovery', 
          description: 'Business continuity & data protection',
          path: '/backup-disaster-recovery'
        },
        { 
          icon: Headphones, 
          label: 'IT Help Desk Services', 
          description: '24/7 technical support & issue resolution',
          path: '/help-desc'
        },
      ]
    },
    { 
      label: 'Portfolio', 
      path: '/portfolio',
      dropdown: false,
      icon: BarChart
    },
    { 
      label: 'Our Partners',
      path: '/partners',
      dropdown: false,
      icon: Handshake
    },
    { 
      label: 'Team',  
      path: '/team',
      dropdown: false,
      icon: Users
    },
    { 
      label: 'Contact Us', 
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
          <div className="flex items-center justify-between py-2 md:py-3"> {/* Reduced py to accommodate larger logo */}
            {/* Logo - INCREASED SIZE */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <Link to="/" className="flex items-center space-x-2 md:space-x-3">
                {/* LARGER LOGO IMAGE - Increased from h-10 sm:h-12 md:h-14 to: */}
                <img
                  src="/loggo.jpeg"
                  alt="KANDAX Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto object-contain" /* Increased size here */
                />
                <div className="hidden sm:block">
                  {/* Adjusted text size to match larger logo */}
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    KANDAX
                  </h1>
                  <p className="text-sm text-red-600 -mt-1 font-medium"> {/* Increased text-sm */}
                    Human-Led Technology
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Show on lg screens and above */}
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
            </div>

            {/* Action Buttons - Hidden on mobile, shown on tablet and up */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <a 
                href="tel:+1 833-370-0333"
                className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition-colors duration-200 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+1 833-370-0333</span>
              </a>
              <Link 
                to="/contact"
                className="px-4 py-2 lg:px-6 lg:py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm lg:text-base whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile/Tablet Phone Button - Show on mobile and tablet */}
            <div className="flex md:hidden items-center space-x-2">
              <a 
                href="tel:+14167007091"
                className="flex items-center justify-center p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              
              {/* Mobile Menu Button */}
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

        {/* Mobile/Tablet Menu Overlay */}
        {isMenuOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Mobile/Tablet Menu Panel */}
        <div className={`lg:hidden fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            {/* Menu Header - Updated Logo Size */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                {/* LARGER LOGO IN MOBILE MENU - Increased from h-10 to h-16 */}
                <img
                  src="/loggo.jpeg"
                  alt="KANDAX Logo"
                  className="h-16 w-auto object-contain" /* Increased size here */
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">KANDAX</h1>
                  <p className="text-xs text-red-600 font-medium">Human-Led Technology</p>
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
                  <span className="font-medium"> +1 833-370-0333</span>
                </a>
                <Link 
                  to="/contact"
                  className="block py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-center hover:from-red-700 hover:to-red-800 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* INCREASED SPACER to prevent content from being hidden under larger header */}
      <div className="h-20 md:h-28"></div> {/* Increased from h-16 md:h-20 */}

      {/* Custom CSS for Scrollbar */}
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
        
        /* Line clamp utility */
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