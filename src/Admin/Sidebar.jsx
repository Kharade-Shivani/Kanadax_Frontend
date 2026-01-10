import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  ChevronRight, 
  Menu, 
  X, 
  Building,
  Terminal,
  Image,
  Users,
  Info,
  Layers,
  Star,
  Flag
} from 'lucide-react';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setIsCollapsed(true);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      id: 'banner',
      label: 'Banner Master',
      icon: Image,
      path: '/admin/banner'
    },
    {
      id: 'team',
      label: 'Team Master',
      icon: Users,
      path: '/admin/team'
    },
    {
      id: 'about',
      label: 'About Us Master',
      icon: Info,
      path: '/admin/about'
    },
    {
      id: 'testimonial',
      label: 'Testimonial Master',
      icon: Star,
      path: '/admin/testimonial'
    },
    {
      id: 'footer',
      label: 'Footer Master',
      icon: Layers,
      path: '/admin/footer'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed z-50 p-3 rounded-lg bg-gradient-to-r from-red-700 to-rose-600 text-white top-4 left-4 transition-all duration-300 md:hidden shadow-lg hover:from-red-600 hover:to-rose-500 hover:shadow-xl border-2 border-red-800"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          h-screen bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900 text-white fixed left-0 top-0 z-40
          transition-all duration-300 ease-in-out shadow-2xl border-r-2 border-red-600
          ${isMobile 
            ? (mobileMenuOpen ? 'w-72 translate-x-0' : '-translate-x-full') 
            : (isCollapsed ? 'w-20' : 'w-72')
          }
        `}
      >
        {/* Header */}
        <div className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center p-4' : 'justify-between p-6'} border-b border-red-600 relative`}>
          {(!isCollapsed || isMobile) && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-rose-500 rounded-xl flex items-center justify-center shadow-lg border border-red-500">
                <img 
                  src="/loggo.jpeg" 
                  alt="KANDAX Canada Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
                  KANDAX
                </h2>
                <p className="text-xs text-rose-300">Canada Admin Panel</p>
              </div>
            </div>
          )}
          
          {/* Desktop collapse button */}
          {!isMobile && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-gradient-to-r hover:from-red-700 hover:to-rose-600 hover:text-white absolute -right-3 top-1/2 transform -translate-y-1/2 bg-slate-900 shadow-lg border-2 border-red-600 transition-all duration-200"
            >
              <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className={`p-4 ${isCollapsed && !isMobile ? 'space-y-4' : 'space-y-2'}`}>
          {/* Dashboard */}
          <button
            onClick={() => handleNavigation('/admin')}
            className={`
              w-full flex items-center ${isCollapsed && !isMobile ? 'justify-center p-3' : 'justify-between p-4'} 
              rounded-xl transition-all duration-200 group
              ${isActive('/admin') 
                ? 'bg-gradient-to-r from-red-700 to-rose-500 shadow-lg transform scale-105 text-white' 
                : 'hover:bg-gradient-to-r hover:from-red-800 hover:to-rose-700 hover:transform hover:scale-105 hover:text-white'
              }
            `}
          >
            <div className={`flex items-center ${isCollapsed && !isMobile ? '' : 'space-x-4'}`}>
              <div className={`
                p-2 rounded-lg transition-colors
                ${isActive('/admin') 
                  ? 'bg-white bg-opacity-20' 
                  : 'bg-gradient-to-r from-red-700 to-rose-600 group-hover:from-red-600 group-hover:to-rose-500'
                }
              `}>
                <Home className="w-5 h-5" />
              </div>
              {(!isCollapsed || isMobile) && (
                <div className="text-left">
                  <span className="font-medium">Dashboard</span>
                </div>
              )}
            </div>
            {(!isCollapsed || isMobile) && (
              <ChevronRight className={`
                w-4 h-4 transition-transform duration-200
                ${isActive('/admin') ? 'rotate-90' : 'group-hover:rotate-90'}
              `} />
            )}
          </button>

          {/* Menu Items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center ${isCollapsed && !isMobile ? 'justify-center p-3' : 'justify-between p-4'} 
                  rounded-xl transition-all duration-200 group
                  ${isActive(item.path) 
                    ? 'bg-gradient-to-r from-red-700 to-rose-500 shadow-lg transform scale-105 text-white' 
                    : 'hover:bg-gradient-to-r hover:from-red-800 hover:to-rose-700 hover:transform hover:scale-105 hover:text-white'
                  }
                `}
              >
                <div className={`flex items-center ${isCollapsed && !isMobile ? '' : 'space-x-4'}`}>
                  <div className={`
                    p-2 rounded-lg transition-colors
                    ${isActive(item.path) 
                      ? 'bg-white bg-opacity-20' 
                      : 'bg-gradient-to-r from-red-700 to-rose-600 group-hover:from-red-600 group-hover:to-rose-500'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {(!isCollapsed || isMobile) && (
                    <div className="text-left">
                      <span className="font-medium">{item.label}</span>
                    </div>
                  )}
                </div>
                {(!isCollapsed || isMobile) && (
                  <ChevronRight className={`
                    w-4 h-4 transition-transform duration-200
                    ${isActive(item.path) ? 'rotate-90' : 'group-hover:rotate-90'}
                  `} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {(!isCollapsed || isMobile) && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-red-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-rose-500 rounded-full flex items-center justify-center border border-red-500">
                  <Flag className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">KANDAX Canada</p>
                  <p className="text-xs text-rose-300">Administration System</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 transition-all duration-300 ${
          isMobile ? 'ml-0' : (isCollapsed ? 'ml-20' : 'ml-72')
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;