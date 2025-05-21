import React, {
  forwardRef,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
  type ChangeEvent,
} from 'react';
import hCloseIcon from './assets/close.png';
import hSearchIcon from './assets/search.png';
import './index.css';
import { HakiSearchBarProps, HakiSearchBarRef } from './interface';

const SearchBar = forwardRef<HakiSearchBarRef, HakiSearchBarProps>(
  (props, ref) => {
    const {
      value,
      className,
      searchIcon,
      closeIcon,
      placeholder = '请输入内容',
      shouldBlurOnSearch = false,
      onSearch,
      autoFocus = false,
      onCompositionStart,
      onCompositionEnd,
      onChange,
      clearable = true,
      onClear,
      onClick,
      onFocus,
    } = props;
    const isControlled = value !== undefined;

    const [focus, setFocus] = useState(autoFocus);

    const [_, forceUpdate] = useReducer((x: number) => x + 1, 0);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = () => {
      if (isControlled) {
        onClear?.();
      } else {
        onClear?.();
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        onChange?.('');
        forceUpdate();
      }
    };

    useImperativeHandle(ref, () => ({
      blur: () => {
        inputRef.current?.blur();
      },
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        handleClear();
      },
      nativeElement: inputRef.current,
    }));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (isControlled) {
        onChange?.(e.target.value);
      } else {
        onChange?.(e.target.value);
        forceUpdate();
      }
    };

    const handleClick = () => {
      onClick?.();
    };

    return (
      <div
        className={`haki-search-bar-root ${
          focus && 'haki-search-bar-root-focus'
        } ${className}`}
      >
        <img
          className="haki-search-bar-search-icon"
          src={searchIcon ?? hSearchIcon}
          alt=""
        />
        <form
          className="haki-search-bar-search-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            if (
              document.activeElement &&
              'blur' in document.activeElement &&
              typeof document.activeElement.blur === 'function' &&
              shouldBlurOnSearch
            ) {
              document.activeElement.blur();
            }
            onSearch?.(
              isControlled ? value ?? '' : inputRef.current?.value ?? '',
            );
          }}
        >
          <input
            ref={inputRef}
            value={value}
            className="haki-search-bar-search-input"
            type="search"
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={() => {
              setFocus(true);
              onFocus?.();
            }}
            onBlur={() => {
              setFocus(false);
            }}
            onCompositionStart={() => {
              onCompositionStart?.();
            }}
            onCompositionEnd={(e) => {
              onCompositionEnd?.((e.target as HTMLInputElement).value);
            }}
            onChange={handleChange}
            onClick={handleClick}
          />
          {clearable && (isControlled ? value : inputRef.current?.value) && (
            <img
              className="haki-search-bar-close-icon"
              src={closeIcon ?? hCloseIcon}
              alt=""
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onClick={handleClear}
            />
          )}
        </form>
      </div>
    );
  },
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
