import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="w-full flex-1 bg-booth-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-booth-cocoa hover:text-booth-espresso transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="border-b border-booth-border pb-4">
          <span className="font-sans text-xs font-bold text-booth-caramel uppercase tracking-wider block mb-1">
            PHOTOBOOTH STUDIO
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-booth-espresso">
            Terms of Service
          </h1>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-booth-cocoa leading-relaxed font-sans">
          <p>
            Welcome to the Photobooth experience. By using our event setup, guests can enjoy interactive filters, fun photo strips, and instant local delivery.
          </p>
          <h2 className="font-serif text-base font-bold text-booth-espresso pt-3">
            Event Photo Use
          </h2>
          <p>
            All generated strips and prints are provided for your personal enjoyment and event keepsakes.
          </p>
          <h2 className="font-serif text-base font-bold text-booth-espresso pt-3">
            Hardware & Camera
          </h2>
          <p>
            Camera feeds are processed in real time solely to position playful filters and capture the final high-resolution commemorative picture.
          </p>
        </div>
      </div>
    </div>
  );
}
