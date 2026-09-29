import React from 'react';
import { TemplateLayout } from '@/types/template';

interface TemplatePreviewVisualProps {
  template: TemplateLayout;
  className?: string;
  showLabels?: boolean;
}

export const TemplatePreviewVisual: React.FC<TemplatePreviewVisualProps> = ({
  template,
  className = '',
  showLabels = false,
}) => {
  const { slots, styling, canvasAspect, shape } = template;
  const isDarkFilm = styling.frameStyle === 'film';

  // Custom SVG Sticker Renderers (strictly SVG line/fill art, zero Unicode emojis)
  const renderSticker = (type?: string) => {
    switch (type) {
      case 'heart':
        return (
          <svg className="w-3.5 h-3.5 text-booth-terracotta" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      case 'star':
        return (
          <svg className="w-3.5 h-3.5 text-booth-caramel" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      case 'flower':
        return (
          <svg className="w-3.5 h-3.5 text-booth-rose" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="6" r="2.5" opacity="0.8" />
            <circle cx="12" cy="18" r="2.5" opacity="0.8" />
            <circle cx="6" cy="12" r="2.5" opacity="0.8" />
            <circle cx="18" cy="12" r="2.5" opacity="0.8" />
          </svg>
        );
      case 'stamp':
        return (
          <svg className="w-3.5 h-3.5 text-booth-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 2" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        );
      case 'sparkle':
      default:
        return (
          <svg className="w-3 h-3 text-booth-caramel" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden border border-booth-border/80 shadow-paper transition-transform duration-200 group-hover:scale-[1.02] ${className}`}
      style={{
        aspectRatio: canvasAspect,
        backgroundColor: styling.backgroundColor || '#FAF5EE',
        borderRadius: '6px',
      }}
    >
      {/* Film Sprocket Perforations for 35mm Retro Film */}
      {styling.hasFilmPerforations && (
        <>
          <div className="absolute top-0 bottom-0 left-0 w-[14%] flex flex-col justify-between py-2 items-center bg-[#1D120B] border-r border-[#382216] z-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`left-sprocket-${i}`}
                className="w-2.5 h-3.5 rounded-[1px] bg-[#0E0704] border border-[#4A2D1F]"
              />
            ))}
          </div>

          <div className="absolute top-0 bottom-0 right-0 w-[14%] flex flex-col justify-between py-2 items-center bg-[#1D120B] border-l border-[#382216] z-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`right-sprocket-${i}`}
                className="w-2.5 h-3.5 rounded-[1px] bg-[#0E0704] border border-[#4A2D1F]"
              />
            ))}
          </div>
        </>
      )}

      {/* Playful Header Stamp */}
      {styling.headerText && (
        <div className="absolute top-2 left-0 right-0 text-center px-3 z-10 pointer-events-none">
          <span
            className={`font-sans font-bold text-[8px] tracking-[0.18em] uppercase ${
              isDarkFilm ? 'text-[#D8BFA6]' : 'text-booth-muted'
            }`}
          >
            {styling.headerText}
          </span>
        </div>
      )}

      {/* Decorative Warm Sticker */}
      {styling.sticker && styling.sticker !== 'none' && (
        <div className="absolute top-2 right-2 z-20 pointer-events-none drop-shadow-sm opacity-90">
          {renderSticker(styling.sticker)}
        </div>
      )}

      {/* Photo Aperture Slots with Warm Finished-Print Aesthetic */}
      {slots.map((slot, index) => (
        <div
          key={slot.id}
          className={`absolute flex flex-col items-center justify-center overflow-hidden border transition-colors ${
            isDarkFilm
              ? 'border-[#4A2E20] bg-[#341F14]'
              : 'border-booth-border-dark/60 bg-[#EFE6DB]'
          }`}
          style={{
            left: `${slot.x}%`,
            top: `${slot.y}%`,
            width: `${slot.width}%`,
            height: `${slot.height}%`,
            borderRadius: '4px',
          }}
        >
          {/* Subtle Warm Silhouette Illustration (Giving feeling of a real photograph) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <svg
              className={`w-3/5 h-3/5 ${isDarkFilm ? 'text-[#C5A48A]' : 'text-[#8A6D60]'}`}
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Warm Portrait Silhouette / Sunlit Horizon Graphic */}
              <circle cx="50" cy="38" r="16" />
              <path d="M22 84 C22 64 35 56 50 56 C65 56 78 64 78 84 Z" />
              {/* Little cute smile or sparkle line */}
              <circle cx="75" cy="25" r="3" fill="#D46B4F" opacity="0.6" />
            </svg>
          </div>

          {/* Delicate Frame Corner Marks */}
          <div className={`absolute top-1 left-1 w-1.5 h-1.5 border-t border-l ${isDarkFilm ? 'border-[#8F664C]' : 'border-[#997968]'}`} />
          <div className={`absolute top-1 right-1 w-1.5 h-1.5 border-t border-r ${isDarkFilm ? 'border-[#8F664C]' : 'border-[#997968]'}`} />
          <div className={`absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l ${isDarkFilm ? 'border-[#8F664C]' : 'border-[#997968]'}`} />
          <div className={`absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r ${isDarkFilm ? 'border-[#8F664C]' : 'border-[#997968]'}`} />

          {/* Slot Label Indicator */}
          {showLabels && (
            <span
              className={`relative z-10 font-sans text-[8px] font-semibold tracking-wider ${
                isDarkFilm ? 'text-[#EFE2D3]' : 'text-booth-espresso'
              }`}
            >
              {slot.label || `0${index + 1}`}
            </span>
          )}
        </div>
      ))}

      {/* Footer Text & Keepsake Date */}
      <div className="absolute bottom-2.5 left-0 right-0 text-center px-3 z-10 pointer-events-none">
        {styling.footerText && (
          <p
            className={`font-sans font-semibold text-[8px] tracking-wider uppercase truncate ${
              isDarkFilm ? 'text-[#D8BFA6]' : 'text-booth-cocoa'
            }`}
          >
            {styling.footerText}
          </p>
        )}
        {styling.showDatePlaceholder && (
          <p
            className={`font-sans text-[7px] tracking-widest mt-0.5 ${
              isDarkFilm ? 'text-[#9A7A66]' : 'text-booth-muted'
            }`}
          >
            EVENT KEEPSAKE // 2026
          </p>
        )}
      </div>
    </div>
  );
};
