import React from 'react';
import { TemplateLayout } from '@/types/template';
import { TemplatePreviewVisual } from './TemplatePreviewVisual';
import { X, Check, Heart, Sparkles } from 'lucide-react';

interface TemplateDetailModalProps {
  template: TemplateLayout | null;
  onClose: () => void;
  onSelect?: (template: TemplateLayout) => void;
}

export const TemplateDetailModal: React.FC<TemplateDetailModalProps> = ({
  template,
  onClose,
  onSelect,
}) => {
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-booth-dark/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-booth-surface border border-booth-border rounded-xl shadow-warm-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-booth-border bg-booth-card/60">
          <div>
            <span className="font-sans text-[11px] font-bold tracking-wider text-booth-caramel uppercase">
              TEMPLATE DETAILS
            </span>
            <h2 className="font-serif text-lg font-bold text-booth-espresso">
              {template.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-booth-muted hover:text-booth-espresso border border-booth-border hover:border-booth-border-dark rounded-md bg-booth-surface transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Visual Preview */}
            <div className="flex items-center justify-center p-4 bg-booth-bg rounded-lg border border-booth-border">
              <div className="w-full max-w-[190px]">
                <TemplatePreviewVisual template={template} showLabels={true} />
              </div>
            </div>

            {/* Information */}
            <div className="space-y-4">
              <div>
                <h4 className="font-sans text-xs font-bold text-booth-muted uppercase tracking-wider mb-1">
                  About this layout
                </h4>
                <p className="text-xs text-booth-cocoa leading-relaxed font-sans">
                  {template.description}
                </p>
              </div>

              <div className="space-y-2 border-t border-booth-border/80 pt-3">
                <h4 className="font-sans text-xs font-bold text-booth-muted uppercase tracking-wider mb-2">
                  At a glance
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                  <div className="bg-booth-card/70 p-2.5 rounded-lg border border-booth-border">
                    <span className="text-booth-muted block text-[10px] uppercase font-semibold">Photo Count</span>
                    <span className="text-booth-espresso font-bold">{template.photoCount} Captures</span>
                  </div>
                  <div className="bg-booth-card/70 p-2.5 rounded-lg border border-booth-border">
                    <span className="text-booth-muted block text-[10px] uppercase font-semibold">Format</span>
                    <span className="text-booth-espresso font-bold">{template.shape}</span>
                  </div>
                  <div className="bg-booth-card/70 p-2.5 rounded-lg border border-booth-border">
                    <span className="text-booth-muted block text-[10px] uppercase font-semibold">Vibe</span>
                    <span className="text-booth-espresso font-bold capitalize">{template.category}</span>
                  </div>
                  <div className="bg-booth-card/70 p-2.5 rounded-lg border border-booth-border">
                    <span className="text-booth-muted block text-[10px] uppercase font-semibold">Orientation</span>
                    <span className="text-booth-espresso font-bold capitalize">{template.orientation}</span>
                  </div>
                </div>
              </div>

              {template.tags && (
                <div className="border-t border-booth-border/80 pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-sans font-medium text-booth-cocoa bg-booth-card border border-booth-border rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer (Rectangular buttons with 8px radius) */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-3.5 border-t border-booth-border bg-booth-card/60">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-booth-cocoa hover:text-booth-espresso bg-booth-surface hover:bg-booth-card border border-booth-border rounded-lg transition-colors"
          >
            Close
          </button>
          {onSelect && (
            <button
              onClick={() => {
                onSelect(template);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-booth-caramel hover:bg-booth-caramel-hover rounded-lg transition-colors shadow-sm"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Use This Layout</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
