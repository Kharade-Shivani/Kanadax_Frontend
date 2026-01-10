import React from 'react';
import { Rocket } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-rose-50 via-white to-rose-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-gradient-to-r from-red-100 to-rose-100 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-l from-rose-100 to-red-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDuration: '8s'}} />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 border-4 border-red-200 rounded-3xl"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 10}%`,
                transform: `rotate(${i * 15}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Welcome Message - Enhanced */}
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] text-center">
        {/* Animated Rocket Container */}
        <div className="relative mb-12 group">
          {/* Glow Effect */}
          <div className="absolute inset-0 w-40 h-40 mx-auto bg-gradient-to-r from-red-600 to-rose-500 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-700 animate-pulse" />
          
          {/* Rocket with Animation */}
          
        </div>

        {/* Text Content with Enhancements */}
        <div className="relative max-w-3xl space-y-8">
          {/* KANDAX Canada Title with Glitch Effect */}
          <div className="relative">
            <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-rose-600 to-red-700 mb-2 animate-gradient">
              KANDAX
            </h1>
            <div className="text-4xl font-bold bg-gradient-to-r from-rose-700 to-red-600 bg-clip-text text-transparent mt-2">
              Canada
            </div>
            <div className="absolute inset-0 text-7xl font-black text-red-400 opacity-20 blur-sm animate-pulse">
              KANDAX
            </div>
          </div>

          {/* Welcome Message */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-slate-800 relative">
              <span className="relative">
                Welcome to Admin Dashboard
                {/* Underline Effect */}
                <div className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              </span>
            </h2>
            
            {/* Main Message with Card Effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl blur-xl opacity-50" />
              <div className="relative p-8 bg-gradient-to-br from-white/90 to-rose-50/90 backdrop-blur-sm rounded-2xl border-2 border-red-200 shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                <p className="text-2xl text-slate-800 leading-relaxed">
                  Welcome to the KANDAX Canada Migration Management System
                </p>
                
                {/* Pulse Indicator */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-red-500 to-rose-500 rounded-full animate-ping" />
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-red-500 to-rose-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Interactive Elements without Content */}
          <div className="flex items-center justify-center space-x-8 pt-8">
            {/* Hover Effects Only */}
            <button className="w-16 h-16 bg-gradient-to-br from-red-600 to-rose-500 rounded-2xl shadow-lg border-2 border-red-700 transform hover:scale-110 hover:rotate-12 hover:shadow-2xl transition-all duration-300 animate-pulse" />
            <button className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-400 rounded-2xl shadow-lg border-2 border-rose-600 transform hover:scale-110 hover:-rotate-12 hover:shadow-2xl transition-all duration-300 animate-pulse" />
            <button className="w-16 h-16 bg-gradient-to-br from-red-700 to-red-500 rounded-2xl shadow-lg border-2 border-red-800 transform hover:scale-110 hover:rotate-12 hover:shadow-2xl transition-all duration-300 animate-pulse" />
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full blur-sm mt-16" />
      </div>

      {/* Style for Gradient Animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;