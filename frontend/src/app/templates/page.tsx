'use client';

import React, { useState, useMemo } from 'react';
import { TEMPLATES } from '@/data/templates';
import { TemplateCategory, TemplateLayout } from '@/types/template';
import { TemplateCard } from '@/components/TemplateCard';
import { TemplateDetailModal } from '@/components/TemplateDetailModal';
import { Search, Sparkles, Check, Play, Heart } from 'lucide-react';
import Link from 'next/link';

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingTemplate, setInspectingTemplate] = useState<TemplateLayout | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateLayout | null>(TEMPLATES[0]);
  const [showToast, setShowToast] = useState(false);

  const categories: { key: TemplateCategory; label: string }[] = [
    { key: 'all', label: 'All Styles' },
    { key: 'classic', label: 'Classic' },
    { key: 'minimal', label: 'Minimal' },
    { key: 'retro', label: 'Retro' },
    { key: 'cute', label: 'Cute' },
    { key: 'celebration', label: 'Celebration' },
    { key: 'events', label: 'Events' },
    { key: 'studio', label: 'Studio' },
  ];

  const orientations = [
    { key: 'all', label: 'All Layouts' },
    { key: 'strip', label: 'Photo Strips' },
    { key: 'portrait', label: 'Portraits' },
    { key: 'landscape', label: 'Landscape' },
    { key: 'square', label: 'Instant Square' },
  ];

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter((t) => {
      if (activeCategory !== 'all' && t.category !== activeCategory) {
        return false;
      }
      if (selectedOrientation !== 'all' && t.orientation !== selectedOrientation) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = t.name.toLowerCase().includes(q);
        const matchDesc = t.description.toLowerCase().includes(q);
        const matchTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, selectedOrientation, searchQuery]);

  const handleSelectTemplate = (template: TemplateLayout) => {
    setSelectedTemplate(template);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <div className="w-full flex-1 bg-booth-bg py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-booth-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-sans text-xs font-bold text-booth-caramel uppercase tracking-wider">
                CREATIVE COLLECTION
              </span>
              <span className="text-xs text-booth-muted font-medium">
                · {TEMPLATES.length} Styles
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-booth-espresso tracking-tight">
              Photo Templates
            </h1>
            <p className="mt-2 text-sm text-booth-cocoa max-w-xl leading-relaxed">
              Find the perfect aesthetic for your memories—vintage film rolls, sweet three-shot strips, or instant polaroid prints.
            </p>
          </div>

          {/* Active Preset Pill/Card */}
          {selectedTemplate && (
            <div className="flex items-center gap-3 bg-booth-surface border border-booth-border p-3.5 rounded-xl shadow-warm">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-booth-muted uppercase block">
                  SELECTED PRESET
                </span>
                <span className="font-serif text-sm font-bold text-booth-espresso">
                  {selectedTemplate.name}
                </span>
                <span className="text-[11px] text-booth-muted block">
                  {selectedTemplate.photoCount} photos · {selectedTemplate.shape}
                </span>
              </div>
              <Link
                href="/booth"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-booth-caramel hover:bg-booth-caramel-hover rounded-lg transition-colors ml-2 shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Launch</span>
              </Link>
            </div>
          )}
        </div>

        {/* Selected Notification Banner */}
        {showToast && selectedTemplate && (
          <div className="mt-4 p-3.5 bg-booth-surface border border-booth-border-dark rounded-lg flex items-center justify-between shadow-warm animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-booth-caramel text-white flex items-center justify-center">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-booth-espresso">
                Selected <span className="font-serif font-bold text-booth-caramel">{selectedTemplate.name}</span> for your next photobooth session!
              </span>
            </div>
            <Link
              href="/booth"
              className="text-xs font-bold text-booth-caramel hover:underline ml-3 flex items-center gap-1"
            >
              Start Session &rarr;
            </Link>
          </div>
        )}

        {/* =========================================================
            WARM FILTERS & SEARCH TOOLBAR (Rectangular tabs, 8px radius)
            ========================================================= */}
        <div className="mt-8 space-y-4">
          {/* Category Tabs (Lightly rounded rectangles, strictly NO pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-lg border transition-colors ${
                    isActive
                      ? 'bg-booth-espresso text-booth-bg border-booth-espresso shadow-sm'
                      : 'bg-booth-surface text-booth-cocoa border-booth-border hover:border-booth-border-dark hover:text-booth-espresso'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sub-toolbar: Search & Orientation Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Search Input (Rectangular with 8px radius) */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-booth-muted" />
              <input
                type="text"
                placeholder="Search by name, style, or vibe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-booth-surface border border-booth-border focus:border-booth-border-dark text-booth-espresso placeholder:text-booth-muted rounded-lg outline-none transition-colors shadow-sm"
              />
            </div>

            {/* Orientation Filter Options (Rectangular with 8px radius) */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {orientations.map((ori) => {
                const isActive = selectedOrientation === ori.key;
                return (
                  <button
                    key={ori.key}
                    onClick={() => setSelectedOrientation(ori.key)}
                    className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap rounded-lg border transition-colors ${
                      isActive
                        ? 'bg-booth-card text-booth-espresso border-booth-border-dark font-bold'
                        : 'bg-booth-surface text-booth-muted border-booth-border hover:text-booth-espresso hover:border-booth-border-dark'
                    }`}
                  >
                    {ori.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================
            TEMPLATE GRID (Large, visual-first creative cards)
            ========================================================= */}
        <div className="mt-8">
          {filteredTemplates.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-booth-border rounded-xl bg-booth-surface/70">
              <p className="font-serif text-lg font-bold text-booth-espresso">
                No templates found
              </p>
              <p className="text-xs text-booth-muted mt-1">
                Try selecting a different category or clearing your search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedOrientation('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-booth-caramel rounded-lg hover:bg-booth-caramel-hover transition-colors shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={handleSelectTemplate}
                  onInspect={(t) => setInspectingTemplate(t)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Template Detail Inspection Modal */}
        <TemplateDetailModal
          template={inspectingTemplate}
          onClose={() => setInspectingTemplate(null)}
          onSelect={handleSelectTemplate}
        />
      </div>
    </div>
  );
}
