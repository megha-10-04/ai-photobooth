'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Sparkles, ArrowRight, Heart, Star, Sliders, QrCode } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { TemplatePreviewVisual } from '@/components/TemplatePreviewVisual';

export default function HomePage() {
  const showcaseTemplates = TEMPLATES.slice(0, 5);

  return (
    <div className="w-full flex flex-col">
      {/* =========================================================
          HERO SECTION (Warm, creative, overlapping photo strip collage)
          ========================================================= */}
      <section className="relative overflow-hidden bg-booth-bg border-b border-booth-border px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-16 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Copy, and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Subtle Warm Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-booth-card border border-booth-border rounded-lg shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-booth-caramel" />
                <span className="font-sans text-xs font-bold text-booth-cocoa uppercase tracking-wider">
                  The Event Photobooth
                </span>
              </div>

              {/* Large Playful Headline */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-booth-espresso leading-[1.05] tracking-tight">
                YOUR PHOTO. <br />
                <span className="text-booth-caramel italic font-normal">
                  YOUR VIBE.
                </span>
              </h1>

              {/* Human, Friendly Subtitle */}
              <p className="font-sans text-base sm:text-lg text-booth-cocoa max-w-xl leading-relaxed">
                Pick a layout, add a little personality, and create your event photo in seconds. Made for friends, parties, weddings, and unforgettable nights.
              </p>

              {/* Action Buttons (Rectangular with 8px radius, NO pills) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/booth"
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-booth-caramel hover:bg-booth-caramel-hover rounded-lg transition-colors shadow-sm"
                >
                  <Camera className="w-4 h-4" />
                  <span>TAKE A PHOTO</span>
                </Link>

                <Link
                  href="/templates"
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-booth-espresso bg-booth-surface hover:bg-booth-card border border-booth-border rounded-lg transition-colors shadow-sm"
                >
                  <span>EXPLORE TEMPLATES</span>
                  <ArrowRight className="w-4 h-4 text-booth-muted" />
                </Link>
              </div>

              {/* Subtle Warm Highlights */}
              <div className="pt-6 border-t border-booth-border/80 flex items-center gap-6 text-xs font-medium text-booth-muted">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-booth-caramel" />
                  <span>Vintage & Classic Strips</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-booth-terracotta" />
                  <span>Fun AR Filters</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm bg-booth-rose" />
                  <span>Instant Phone Download</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Photobooth Composition (Layered, warm prints) */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-4 my-2">
              {/* Background Warm Blob / Cardboard Card */}
              <div className="absolute inset-0 bg-booth-card/70 border border-booth-border rounded-2xl -rotate-1 pointer-events-none" />

              {/* Decorative Subtle Corner Stamp (Positioned safely at the top corner, never near bottom) */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-booth-surface border border-booth-border px-3 py-1.5 rounded-md shadow-warm hidden sm:flex items-center gap-1.5 z-20">
                <Heart className="w-3.5 h-3.5 text-booth-terracotta fill-current" />
                <span className="font-sans text-[11px] font-bold text-booth-espresso">
                  EVENT READY
                </span>
              </div>

              {/* Overlapping Photostrip Layout Display */}
              <div className="relative z-10 w-full max-w-sm flex items-center justify-center p-6 gap-4">
                
                {/* Left Strip (Tilted Left) */}
                <div className="w-32 sm:w-36 -rotate-6 transition-transform duration-300 hover:rotate-0 hover:z-20">
                  <div className="bg-booth-surface p-2.5 rounded-lg border border-booth-border shadow-warm-md">
                    <TemplatePreviewVisual template={TEMPLATES[0]} showLabels={false} />
                    <p className="font-sans text-[10px] font-bold text-center text-booth-espresso mt-2">
                      CLASSIC 3-STRIP
                    </p>
                  </div>
                </div>

                {/* Right Polaroid (Tilted Right) */}
                <div className="w-36 sm:w-44 rotate-3 transition-transform duration-300 hover:rotate-0 hover:z-20 -ml-4 sm:-ml-6">
                  <div className="bg-booth-surface p-3 rounded-lg border border-booth-border shadow-warm-lg">
                    <TemplatePreviewVisual template={TEMPLATES[2]} showLabels={false} />
                    <div className="flex items-center justify-between mt-2.5 px-1">
                      <span className="font-serif text-xs font-bold text-booth-espresso">
                        POLAROID
                      </span>
                      <span className="text-[10px] font-sans font-medium text-booth-caramel">
                        SWEET SNAP
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SHOWCASE OF TEMPLATES (Horizontal grid of 5 warm previews)
          ========================================================= */}
      <section className="relative z-30 w-full bg-booth-surface border-b border-booth-border pt-24 pb-24 md:pt-32 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-50 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 md:mb-20">
            <div className="relative z-50">
              <span className="font-sans text-xs font-bold text-booth-caramel uppercase tracking-wider block mb-1">
                FEATURED COLLECTION
              </span>
              <h2 className="relative z-50 font-serif text-3xl sm:text-4xl font-bold text-booth-espresso">
                Popular Styles
              </h2>
            </div>
            <Link
              href="/templates"
              className="relative z-50 inline-flex items-center gap-1.5 text-xs font-bold text-booth-cocoa hover:text-booth-caramel uppercase tracking-wider group"
            >
              <span>See All 10 Templates</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 5-Column Grid with Contained Previews */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {showcaseTemplates.map((template) => {
              const [w, h] = template.canvasAspect.split('/').map(Number);
              const previewHeight = 180;
              const previewWidth = Math.round(previewHeight * (w / h));

              return (
                <Link
                  key={template.id}
                  href="/templates"
                  className="group flex flex-col bg-booth-card/40 border border-booth-border hover:border-booth-border-dark rounded-xl p-3 shadow-warm transition-all hover:-translate-y-1 relative z-10"
                >
                  <div className="w-full flex items-center justify-center p-3 bg-booth-bg rounded-lg border border-booth-border/60 h-[220px] overflow-hidden relative">
                    <div
                      style={{
                        height: `${previewHeight}px`,
                        width: `${previewWidth}px`,
                        maxWidth: '100%',
                      }}
                      className="flex items-center justify-center flex-shrink-0"
                    >
                      <TemplatePreviewVisual template={template} showLabels={false} />
                    </div>
                  </div>

                  <div className="mt-3">
                    <h3 className="font-serif text-sm font-bold text-booth-espresso truncate group-hover:text-booth-caramel transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-[11px] font-sans font-medium text-booth-muted mt-0.5">
                      {template.photoCount} {template.photoCount === 1 ? 'photo' : 'photos'} · {template.shape}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS (Simple, warm, 3-step event walkthrough)
          ========================================================= */}
      <section className="w-full bg-booth-bg py-16 px-4 sm:px-6 lg:px-8 border-b border-booth-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12">
            <span className="font-sans text-xs font-bold text-booth-caramel uppercase tracking-wider block mb-1">
              SIMPLE & FUN
            </span>
            <h2 className="font-serif text-3xl font-bold text-booth-espresso">
              How the Photobooth Works
            </h2>
            <p className="text-sm text-booth-cocoa mt-2 leading-relaxed">
              Snap photos with friends without confusing settings or waiting in long lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 bg-booth-surface border border-booth-border rounded-xl shadow-warm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-lg font-bold text-booth-caramel">01</span>
                  <div className="w-8 h-8 rounded-lg bg-booth-card border border-booth-border flex items-center justify-center">
                    <Sliders className="w-4 h-4 text-booth-cocoa" />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-booth-espresso">
                  Pick a Look
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-booth-cocoa leading-relaxed font-sans">
                  Choose your photostrip template and add playful party filters like crowns, retro glasses, or sweet mustache looks.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-booth-border text-[11px] font-semibold text-booth-muted">
                Classic strips, polaroids, and grids
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-booth-surface border border-booth-border rounded-xl shadow-warm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-lg font-bold text-booth-caramel">02</span>
                  <div className="w-8 h-8 rounded-lg bg-booth-card border border-booth-border flex items-center justify-center">
                    <Camera className="w-4 h-4 text-booth-cocoa" />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-booth-espresso">
                  Strike a Pose
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-booth-cocoa leading-relaxed font-sans">
                  Raise your hand to start the countdown, or tap spacebar. A friendly 3-2-1 timer gets everyone ready for the shot.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-booth-border text-[11px] font-semibold text-booth-muted">
                Hands-free gesture trigger or button tap
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-booth-surface border border-booth-border rounded-xl shadow-warm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-lg font-bold text-booth-caramel">03</span>
                  <div className="w-8 h-8 rounded-lg bg-booth-card border border-booth-border flex items-center justify-center">
                    <QrCode className="w-4 h-4 text-booth-cocoa" />
                  </div>
                </div>
                <h3 className="font-serif text-lg font-bold text-booth-espresso">
                  Take It With You
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-booth-cocoa leading-relaxed font-sans">
                  Scan the on-screen QR code with your phone camera to download your finished photo strip directly over the event Wi-Fi.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-booth-border text-[11px] font-semibold text-booth-muted">
                Direct phone download in seconds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WARM CALL TO ACTION STRIP
          ========================================================= */}
      <section className="w-full bg-booth-card py-12 px-4 sm:px-6 lg:px-8 border-b border-booth-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-booth-espresso">
              Ready to take some photos?
            </h3>
            <p className="text-xs sm:text-sm text-booth-cocoa mt-1">
              Choose your favorite template and start creating memories with friends.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/templates"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-booth-cocoa hover:text-booth-espresso bg-booth-surface border border-booth-border hover:border-booth-border-dark rounded-lg transition-colors shadow-sm"
            >
              Browse Templates
            </Link>
            <Link
              href="/booth"
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-booth-caramel hover:bg-booth-caramel-hover rounded-lg transition-colors shadow-sm"
            >
              Start Photobooth
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
