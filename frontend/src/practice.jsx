import React, { useState } from 'react';
import { Menu, X, ChevronRight, User } from 'lucide-react'; // Icons ke liye

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation Links
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Categories', href: '#categories' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'About Us', href: '#about' },
  ];

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-[#0b3d2e]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* 1. Left Side: Logo & Name */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
              <span className="text-[#0b3d2e] font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Saylani <span className="text-emerald-400">Sahulat</span>
            </span>
          </div>

          {/* 2. Center: Desktop Links (md screen se nazar ayenge) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-emerald-400 font-medium transition-colors text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* 3. Right Side: Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white font-medium hover:text-emerald-400 px-4 transition-colors">
              Login
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-[#0b3d2e] px-6 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/30">
              Register <ChevronRight size={18} />
            </button>
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Navigation Menu (Slide Down) */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 bg-[#0b3d2e] border-t border-white/10 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 text-lg text-gray-300 hover:text-emerald-400 hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsOpen(false)} 
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full py-3 text-white font-bold border border-white/20 rounded-xl">
              Login
            </button>
            <button className="w-full py-3 bg-emerald-500 text-[#0b3d2e] font-bold rounded-xl shadow-lg">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;