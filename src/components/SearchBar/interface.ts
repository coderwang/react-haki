export interface HakiSearchBarProps {
  value?: string;
  className?: string;
  searchIcon?: string;
  closeIcon?: string;
  placeholder?: string;
  autoFocus?: boolean;
  clearable?: boolean;
  shouldBlurOnSearch?: boolean;
  onSearch?: (value: string) => void;
  onCompositionStart?: () => void;
  onCompositionEnd?: (value: string) => void;
  onChange?: (value: string) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onClear?: () => void;
}

export interface HakiSearchBarRef {
  blur: () => void;
  focus: () => void;
  clear: () => void;
  nativeElement: HTMLInputElement | null;
}
