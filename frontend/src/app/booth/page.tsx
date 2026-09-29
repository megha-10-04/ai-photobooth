'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';

export default function BoothKioskPage() {
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
  const [countdownNum, setCountdownNum] = useState<number>(3);
  const activeTemplate = TEMPLATES[0]; // Classic Strip

  // Custom line-art SVG icons matching camera icon stroke style (strictly no Unicode / glyphs / placeholders)
  const filterOptions = [
    {
      id: 0,
      name: 'Natural',
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
        </svg>
      ),
    },
    {
      id: 1,
      name: 'Glasses',
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Left Lens Frame (Wayfarer style) */}
          <path d="M3 7h7v6a3.5 3.5 0 0 1-3.5 3.5h0A3.5 3.5 0 0 1 3 13V7z" />
          {/* Right Lens Frame (Wayfarer style) */}
          <path d="M14 7h7v6a3.5 3.5 0 0 1-3.5 3.5h0A3.5 3.5 0 0 1 14 13V7z" />
          {/* Nose Bridge */}
          <path d="M10 10a2.5 2.5 0 0 1 4 0" />
          {/* Outer Temple Stems */}
          <path d="M3 8.5H1.5" />
          <path d="M22.5 8.5H21" />
        </svg>
      ),
    },
    {
      id: 2,
      name: 'Crown',
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Royal Circlet Base Band */}
          <path d="M3 18h18" />
          {/* Crown Peaks with Tall Center Apex */}
          <path d="M4 18L2 8.5l5 3L12 3.5l5 8 5-3L20 18H4z" />
          {/* Crown Jewel Orbs */}
          <circle cx="12" cy="3.5" r="1" fill="currentColor" />
          <circle cx="2" cy="8.5" r="0.8" fill="currentColor" />
          <circle cx="22" cy="8.5" r="0.8" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 3,
      name: 'Mustache',
      icon: (
        <svg
          className="w-5 h-5 flex-shrink-0"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Left Wing & Handlebar Curl */}
          <path d="M12 15c-3-3.5-6.5-5-10-2C0.5 14.5 1.5 18 4 17c3-1 4-3.5 8-1" />
          {/* Right Wing & Handlebar Curl */}
          <path d="M12 15c3-3.5 6.5-5 10-2 1.5 1.5 0.5 5-2 4-3-1-4-3.5-8-1" />
        </svg>
      ),
    },
  ];

  const handleSimulateShutter = () => {
    if (isCountingDown) return;
    setIsCountingDown(true);
    setCountdownNum(3);

    const timer = setInterval(() => {
      setCountdownNum((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => setIsCountingDown(false), 800);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-booth-bg text-booth-espresso min-h-[calc(100vh-4rem)]">
      {/* Kiosk Top Bar */}
      <div className="h-14 border-b border-booth-border bg-booth-surface px-4 sm:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-booth-cocoa hover:text-booth-espresso transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Menu</span>
        </Link>

        {/* Center Event Title */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm sm:text-base font-bold text-booth-espresso uppercase tracking-wider">
            YOUR EVENT
          </span>
          <span className="text-booth-border font-light">|</span>
          <span className="text-xs font-sans font-semibold text-booth-caramel">
            {activeTemplate.name}
          </span>
        </div>

        <Link
          href="/templates"
          className="text-xs font-bold text-booth-cocoa hover:text-booth-caramel transition-colors"
        >
          Change Template
        </Link>
      </div>

      {/* Main Physical Photobooth Stage */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        {/* Dominant Live Camera Viewport */}
        <div className="relative w-full max-w-2xl bg-booth-card/80 border-2 border-booth-border rounded-xl shadow-warm-lg overflow-hidden p-3 aspect-[4/3] flex flex-col items-center justify-center">
          {/* Inner Camera Screen */}
          <div className="relative w-full h-full bg-[#180E09] rounded-lg border border-[#3D251A] overflow-hidden flex items-center justify-center">
            
            {/* Viewfinder Soft Framing Brackets */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D8BFA6]/60 rounded-tl-sm pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D8BFA6]/60 rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D8BFA6]/60 rounded-bl-sm pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D8BFA6]/60 rounded-br-sm pointer-events-none" />

            {/* Simulated Center Viewfinder Guide */}
            {!isCountingDown ? (
              <div className="flex flex-col items-center text-center p-6 space-y-3 z-10">
                <div className="w-14 h-14 rounded-xl bg-[#2A1911] border border-[#4D2F20] flex items-center justify-center text-[#E89D88] shadow-inner">
                  <Camera className="w-7 h-7 stroke-[2]" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFDF9]">
                  Live Camera Preview
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#D8BFA6] max-w-sm leading-relaxed">
                  Look right here at the lens! Select a party vibe below and smile when you are ready.
                </p>
              </div>
            ) : (
              /* Big Warm Countdown Animation */
              <div className="relative z-20 flex flex-col items-center justify-center">
                <span className="font-serif text-8xl sm:text-9xl font-black text-[#FFFDF9] animate-pulse drop-shadow-md">
                  {countdownNum > 0 ? countdownNum : 'CHEESE!'}
                </span>
                <span className="font-sans text-sm font-bold text-[#E89D88] tracking-widest uppercase mt-2">
                  STRIKE A POSE
                </span>
              </div>
            )}

            {/* Active Vibe Overlay Indicator */}
            <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none">
              <span className="px-3 py-1 bg-[#26150D]/80 border border-[#4A2D1F] text-[#EFE2D3] font-sans text-xs font-semibold rounded-md shadow-sm">
                VIBE: {filterOptions[selectedFilter].name.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            BOTTOM CONTROLS BAR: CHOOSE YOUR VIBE + TAKE PHOTO
            ========================================================= */}
        <div className="w-full max-w-2xl mt-6 flex flex-col items-center gap-5">
          {/* Choose Your Vibe Selector */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-sans text-xs font-bold text-booth-muted uppercase tracking-wider">
              Choose your vibe
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              {filterOptions.map((filter) => {
                const isSelected = selectedFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-booth-espresso text-booth-bg border-booth-espresso shadow-sm scale-105'
                        : 'bg-booth-surface text-booth-cocoa border-booth-border hover:border-booth-border-dark hover:bg-booth-card'
                    }`}
                  >
                    <span className="flex-shrink-0">{filter.icon}</span>
                    <span>{filter.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Big Tactile Shutter Button (Strictly Rectangular with 10px radius, NO pill) */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handleSimulateShutter}
              disabled={isCountingDown}
              className="flex items-center justify-center gap-3 px-10 py-4 text-base sm:text-lg font-black text-white bg-booth-caramel hover:bg-booth-caramel-hover active:scale-[0.98] rounded-xl transition-all shadow-warm-md hover:shadow-warm-lg disabled:opacity-50"
            >
              <Camera className="w-5 h-5 stroke-[2.5]" />
              <span>{isCountingDown ? 'CAPTURING...' : 'TAKE PHOTO'}</span>
            </button>

            {/* Friendly Hand-Raise Trigger Note with Custom SVG Hand Icon (NO emoji!) */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-booth-muted">
              {/* Custom SVG Hand Outline Icon */}
              <svg className="w-4 h-4 text-booth-caramel flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 11V6a1.5 1.5 0 0 0-3 0v5" />
                <path d="M15 9.5V4a1.5 1.5 0 0 0-3 0v7" />
                <path d="M12 8.5V2.5a1.5 1.5 0 0 0-3 0v9" />
                <path d="M9 10.5V5a1.5 1.5 0 0 0-3 0v9a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6v-3a1.5 1.5 0 0 0-3 0" />
              </svg>
              <span>or raise your hand to start</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
