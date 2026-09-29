import React from 'react';
import Link from 'next/link';
import { Camera, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-booth-border bg-booth-card/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-booth-espresso text-booth-bg flex items-center justify-center rounded-md">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <span className="font-serif text-base font-bold text-booth-espresso">
                PHOTOBOOTH
              </span>
            </div>
            <p className="text-xs sm:text-sm text-booth-cocoa max-w-sm leading-relaxed">
              Create sweet photo memories, vintage strips, and instant prints with friends at any event.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-sans text-xs font-bold text-booth-espresso uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-booth-cocoa">
              <li>
                <Link href="/" className="hover:text-booth-caramel transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-booth-caramel transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/booth" className="hover:text-booth-caramel transition-colors">
                  Create Photo
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="font-sans text-xs font-bold text-booth-espresso uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-booth-cocoa">
              <li>
                <Link href="/privacy" className="hover:text-booth-caramel transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-booth-caramel transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-booth-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-booth-muted">
          <p>© {new Date().getFullYear()} Photobooth. Made for happy memories.</p>
          <div className="flex items-center gap-1.5">
            <span>Keep your memories forever</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
