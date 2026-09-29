'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/templates', label: 'Templates' },
    { href: '/booth', label: 'Create' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-booth-border bg-booth-bg/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-booth-espresso text-booth-bg flex items-center justify-center rounded-lg shadow-sm group-hover:bg-booth-caramel transition-colors">
            <Camera className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base font-black tracking-tight text-booth-espresso group-hover:text-booth-caramel transition-colors">
              PHOTOBOOTH
            </span>
            <span className="font-sans text-[10px] font-semibold text-booth-muted tracking-wider uppercase -mt-0.5">
              Studio & Memories
            </span>
          </div>
        </Link>

        {/* Friendly Consumer Navigation */}
        <nav className="flex items-center gap-1.5 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'bg-booth-card text-booth-espresso border border-booth-border-dark'
                    : 'text-booth-cocoa hover:text-booth-espresso hover:bg-booth-card/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Primary Action Button (Strictly Rectangular with 8px radius, NO pill) */}
        <div className="flex items-center">
          <Link
            href="/booth"
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-booth-caramel hover:bg-booth-caramel-hover rounded-lg transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>START PHOTOBOOTH</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
