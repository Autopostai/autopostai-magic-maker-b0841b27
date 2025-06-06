
export interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'sticker' | 'graphic' | 'frame';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  content?: string;
  imageData?: string;
  style?: ElementStyle;
  selected?: boolean;
  locked?: boolean;
  visible?: boolean;
  name?: string;
  zIndex?: number;
  opacity?: number;
  filters?: ElementFilters;
  animation?: ElementAnimation;
}

export interface ElementStyle {
  // Text styles
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  textDecoration?: string;
  lineHeight?: number;
  letterSpacing?: number;
  
  // Shape styles
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  borderRadius?: number;
  shapeType?: 'rectangle' | 'circle' | 'triangle' | 'star' | 'heart' | 'polygon';
  
  // Filters - moved blur here from ElementFilters since it's being used in style
  blur?: number;
  
  // Shadow effects
  shadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  
  // Gradient
  gradient?: {
    type: 'linear' | 'radial';
    colors: Array<{ color: string; stop: number }>;
    angle?: number;
  };
  
  // Border
  border?: {
    width: number;
    style: 'solid' | 'dashed' | 'dotted';
    color: string;
  };
}

export interface ElementFilters {
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturate?: number;
  hueRotate?: number;
  invert?: number;
  sepia?: number;
  grayscale?: number;
}

export interface ElementAnimation {
  type: 'fadeIn' | 'slideIn' | 'bounce' | 'zoom' | 'rotate' | 'pulse';
  duration?: number;
  delay?: number;
  repeat?: boolean;
  direction?: 'normal' | 'reverse' | 'alternate';
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  element: DesignElement;
}

export interface CanvasSettings {
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImage?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  elements: DesignElement[];
  canvasSettings: CanvasSettings;
  tags: string[];
}

export interface ProjectHistory {
  id: string;
  timestamp: number;
  action: string;
  elements: DesignElement[];
  canvasSettings: CanvasSettings;
}
