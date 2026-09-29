import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-booth-cocoa leading-relaxed font-sans">
          <p>
            Your event memories belong to you. Our photobooth runs entirely on-premise at your venue without sending your photos or face data to external servers or third-party cloud services.
          </p>
          <h2 className="font-serif text-base font-bold text-booth-espresso pt-3">
            Local Photo Storage
          </h2>
          <p>
            Captured photographs and photostrips are saved directly on the local booth computer in the photos directory.
          </p>
          <h2 className="font-serif text-base font-bold text-booth-espresso pt-3">
            Direct Phone Downloads
          </h2>
          <p>
            When you scan the on-screen QR code with your mobile phone, the image is transferred directly over the venue Wi-Fi network without passing through internet intermediaries.
          </p>
        </div>
      </div>
    </div>
  );
}
