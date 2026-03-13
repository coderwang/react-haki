export interface CarouselProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode[];
  startDelay?: number;
  direction?: 'forward' | 'backward';
  offset?: number;
}

export interface CarouselRef {
  prev: (count: number) => void;
  next: (count: number) => void;
}
