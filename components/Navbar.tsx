'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/Button';

export const Navbar = ({ onRegisterClick }: { onRegisterClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isOnMembersPage = pathname === '/members';

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Members', href: '/members' },
    { name: 'Our Mission', href: '/#mission' },
    { name: 'Projects', href: '/#projects' },
  ];

  const handleNavClick = (href: string) => {
    if (href === '/' || href === '/members') {
      router.push(href);
    } else if (isOnMembersPage && href.startsWith('/#')) {
      // Navigate to home with the hash
      router.push(href);
    } else {
      // Already on home or relative hash navigation
      window.location.href = href;
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <button onClick={handleLogoClick} className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity">
            <img src="/images/logo.png" alt="NEMOSA Logo" className="h-10 w-10 mr-3" />
            <span className="text-2xl font-black text-emerald-700 tracking-wider">NEMOSA</span>
          </button>
          
          {/* Desktop NavLinks */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <button key={link.name} onClick={() => handleNavClick(link.href)} className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200">
                {link.name}
              </button>
            ))}
            <Button onClick={onRegisterClick}>Register</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-emerald-600 focus:outline-none text-2xl">
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-3 absolute w-full left-0 top-20 animate-slideDown">
          {links.map((link) => (
            <button key={link.name} onClick={() => handleNavClick(link.href)} className="block w-full text-left text-gray-600 hover:text-emerald-600 font-medium py-2">
              {link.name}
            </button>
          ))}
          <Button onClick={() => { onRegisterClick(); setIsOpen(false); }} className="w-full justify-center">Register</Button>
        </div>
      )}
    </nav>
  );
};
