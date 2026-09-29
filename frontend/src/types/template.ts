export type TemplateCategory =
  | 'all'
  | 'classic'
  | 'minimal'
  | 'retro'
  | 'cute'
  | 'celebration'
  | 'events'
  | 'studio';

export type TemplateOrientation = 'portrait' | 'landscape' | 'strip' | 'square';

export type FrameStyle = 'strip' | 'polaroid' | 'clean' | 'film' | 'editorial' | 'postcard';

export interface PhotoSlot {
  id: number;
  x: number; // Percentage coordinate (0-100)
  y: number; // Percentage coordinate (0-100)
  width: number; // Percentage dimension (0-100)
  height: number; // Percentage dimension (0-100)
  aspectRatio?: string;
  label?: string;
}

export interface TemplateStyling {
  backgroundColor: string; // Outer paper color
  paperColor?: string;      // Photo slot background
  borderColor?: string;
  borderWidth?: number;
  innerPadding: number;     // Percentage
  slotSpacing: number;      // Percentage
  frameStyle: FrameStyle;
  headerText?: string;
  footerText?: string;
  showDatePlaceholder?: boolean;
  hasFilmPerforations?: boolean;
  sticker?: 'heart' | 'star' | 'sparkle' | 'stamp' | 'flower' | 'none';
  accentColor?: string;
}

export interface TemplateLayout {
  id: string;
  name: string;
  slug: string;
  category: Exclude<TemplateCategory, 'all'>;
  photoCount: number;
  orientation: TemplateOrientation;
  shape: string; // e.g. "2\" × 6\" Strip", "3.5\" × 4.2\" Polaroid"
  canvasAspect: string; // CSS aspect ratio, e.g. "1/3", "2/3", "3/2", "1/1"
  description: string;
  tags: string[];
  slots: PhotoSlot[];
  styling: TemplateStyling;
  isPopular?: boolean;
  isNew?: boolean;
}
