import React from 'react';
import { TemplateLayout } from '@/types/template';
import { TemplatePreviewVisual } from './TemplatePreviewVisual';
import { Sparkles, Eye, Check } from 'lucide-react';

interface TemplateCardProps {
  template: TemplateLayout;
  onSelect?: (template: TemplateLayout) => void;
  onInspect?: (template: TemplateLayout) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  onInspect,
}) => {
  return (
    <div className="group flex flex-col bg-booth-surface border border-booth-border hover:border-booth-border-dark rounded-xl p-4 shadow-warm transition-all duration-200 hover:-translate-y-0.5">
      {/* Visual Canvas Area — The Star of the Card */}
      <div className="w-full flex items-center justify-center p-4 bg-booth-bg/70 rounded-lg border border-booth-border/50 min-h-[280px] relative overflow-hidden">
        <div className="w-full max-w-[190px]">
          <TemplatePreviewVisual template={template} showLabels={false} />
        </div>

        {/* Quick View Button (Rectangular, 6px radius) */}
        {onInspect && (
          <button
            onClick={() => onInspect(template)}
            className="absolute top-2.5 right-2.5 p-1.5 bg-booth-surface/90 border border-booth-border hover:border-booth-border-dark text-booth-cocoa hover:text-booth-espresso rounded-md transition-colors shadow-sm"
            title="Inspect Layout"
            aria-label="Inspect template layout"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Title & Human Secondary Spec */}
      <div className="mt-4 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-base font-bold text-booth-espresso tracking-tight group-hover:text-booth-caramel transition-colors">
            {template.name}
          </h3>
          <span className="text-[11px] font-sans font-medium text-booth-muted whitespace-nowrap">
            {template.photoCount} {template.photoCount === 1 ? 'photo' : 'photos'}
          </span>
        </div>

        {/* Friendly secondary label */}
        <p className="text-xs font-sans text-booth-muted mt-0.5">
          {template.shape} · <span className="capitalize">{template.category}</span>
        </p>

        <p className="text-xs font-sans text-booth-cocoa line-clamp-2 mt-2 leading-relaxed">
          {template.description}
        </p>

        {/* Card Actions (Flat rectangular / 8px rounded buttons, NO pills) */}
        <div className="mt-4 pt-3 border-t border-booth-border/60 flex items-center gap-2">
          {onInspect && (
            <button
              onClick={() => onInspect(template)}
              className="flex-1 px-3 py-2 text-xs font-semibold text-booth-cocoa hover:text-booth-espresso bg-booth-card hover:bg-booth-sand border border-booth-border rounded-lg transition-colors text-center"
            >
              Details
            </button>
          )}
          {onSelect && (
            <button
              onClick={() => onSelect(template)}
              className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-booth-caramel hover:bg-booth-caramel-hover rounded-lg transition-colors text-center shadow-sm"
            >
              Pick This
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
