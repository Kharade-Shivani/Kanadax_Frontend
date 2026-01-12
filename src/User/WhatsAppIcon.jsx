import React, { useState, useEffect, useRef } from 'react';

function WhatsAppIcon() {
  const [isPulsing, setIsPulsing] = useState(true);
  const [showNumberOptions, setShowNumberOptions] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    // Pulsing animation every 3 seconds
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 3000);

    // Close number options when clicking outside
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setShowNumberOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleIconClick = () => {
    setShowNumberOptions(!showNumberOptions);
  };

  const handleNumberClick = (isCanada) => {
    if (isCanada) {
      window.open("https://wa.me/14167007091", "_blank"); 
      
    } else {
      window.open("https://wa.me/919850083751", "_blank");
    }
    setShowNumberOptions(false);
  };

  return (
    <div className="fixed bottom-6 right-24 z-40 flex flex-col items-end gap-4 font-['Segoe_UI',_Arial,_sans-serif]">
      {/* Number Selection Options */}
      {showNumberOptions && (
        <div 
          ref={tooltipRef}
          className="absolute bottom-14 right-0 bg-white rounded-xl p-4 min-w-[260px] 
                     shadow-xl border border-gray-200 transition-all duration-300 
                     transform translate-y-0 opacity-100 pointer-events-auto z-50"
        >
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <span className="text-2xl">💬</span>
            <div>
              <div className="font-bold text-base">Chat with Support</div>
              <div className="text-sm text-gray-600">Choose your region</div>
            </div>
          </div>

          {/* Canada Option */}
          <div 
            className={`flex items-center gap-4 p-3 my-2 rounded-lg cursor-pointer transition-all duration-200 
                       ${hoveredOption === 'canada' 
                         ? 'bg-green-50 border-2 border-green-500 transform -translate-x-1 shadow-md' 
                         : 'bg-gray-50 border-2 border-transparent'}`}
            onClick={() => handleNumberClick(true)}
            onMouseEnter={() => setHoveredOption('canada')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="text-xl w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md">
              🇨🇦
            </div>
            <div className="flex-1 flex flex-col">
              <div className="font-semibold text-gray-800 text-sm mb-0.5">Canada Support</div>
              <div className="text-green-600 font-bold text-xs">+1 (416) 700-7091</div>
            </div>
            <div className="text-green-600 text-lg">→</div>
          </div>

          {/* India Option */}
          <div 
            className={`flex items-center gap-4 p-3 my-2 rounded-lg cursor-pointer transition-all duration-200 
                       ${hoveredOption === 'india' 
                         ? 'bg-green-50 border-2 border-green-500 transform -translate-x-1 shadow-md' 
                         : 'bg-gray-50 border-2 border-transparent'}`}
            onClick={() => handleNumberClick(false)}
            onMouseEnter={() => setHoveredOption('india')}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="text-xl w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md">
              🇮🇳
            </div>
            <div className="flex-1 flex flex-col">
              <div className="font-semibold text-gray-800 text-sm mb-0.5">India Support</div>
              <div className="text-green-600 font-bold text-xs">+91 98500 83751</div>
            </div>
            <div className="text-green-600 text-lg">→</div>
          </div>

          <div className="text-center text-xs text-gray-600 mt-3 pt-3 border-t border-dashed border-gray-300">
            Click on a number to start chatting
          </div>
          <div className="absolute bottom-[-10px] right-5 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}

      {/* WhatsApp Icon */}
      <div
        className={`
          relative w-12 h-12 rounded-full flex items-center justify-center
          cursor-pointer transition-all duration-300
          bg-gradient-to-br from-green-500 to-green-700
          shadow-md border-2 border-white
          ${isHovered ? 'scale-110 -translate-y-0.5' : 'scale-100'}
          ${isPulsing ? 'animate-pulse' : ''}
          hover:shadow-lg hover:shadow-green-500/25
        `}
        onClick={handleIconClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact us on WhatsApp"
      >
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full  
                        w-4 h-4 flex items-center justify-center text-[9px] font-bold
                        shadow-sm">
          <span>2</span>
        </div>

        {/* WhatsApp SVG Icon */}
        <svg 
          viewBox="0 0 32 32" 
          width="22"
          height="22"
          className="drop-shadow-sm"
        >
          <path 
            fill="#FFFFFF" 
            d="M16 0C7.163 0 0 7.163 0 16c0 3.093.876 6.067 2.537 8.663L.672 31.33l6.7-1.86C9.933 31.124 12.907 32 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0z"
          />
          <path 
            fill="#25D366" 
            d="M23.9 22.4c-.3.9-1.6 1.6-2.6 1.8-.7.2-1.6.3-4.8-1.2-4.1-1.9-6.8-6.3-7-6.6-.2-.3-1.6-2.2-1.6-4.2 0-2 .8-3.1 1.1-3.5.3-.3.7-.4 1-.4h.8c.3 0 .6 0 .8.4.3.3 1 1.4 1.1 1.5.2.3.3.6.1 1-.1.3-.3.6-.5.9-.2.3-.4.5-.6.8-.2.3-.4.6-.2 1 .2.3 1.1 1.6 2.4 2.6 1.6 1.3 2.9 1.7 3.3 1.9.4.2.6.2 1-.2.3-.3 1.2-1.4 1.5-1.9.3-.5.6-.4 1-.2.4.2 2.5 1.2 2.9 1.4.4.2.7.3.8.5.1.2.1 1.1-.3 2z"
          />
        </svg>

        {/* Floating label */}
        <div className={`
          absolute top-1/2 -translate-y-1/2 right-14
          bg-white text-green-600 px-2.5 py-1 rounded-full
          text-xs font-medium whitespace-nowrap shadow-md
          transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          Chat with us
        </div>
      </div>
    </div>
  );
}

export default WhatsAppIcon;