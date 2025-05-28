import React, { FC, useRef, useState } from 'react';
import './index.css';

interface HakiVerifyCodeProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  length?: number;
  type?: 'block' | 'line';
  inputMode?: 'text' | 'numeric';
  isSubmitting?: boolean;
  autoFocus?: boolean;
  className?: string;
  cursorStyle?: React.CSSProperties;
}

const VerifyCode: FC<HakiVerifyCodeProps> = (props) => {
  const {
    value,
    onChange,
    error,
    length = 4,
    type = 'block',
    inputMode = 'numeric',
    isSubmitting = false,
    autoFocus = true,
    className,
    cursorStyle,
  } = props;
  const [focus, setFocus] = useState(false);

  const inputRef = useRef(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 如果用户尝试移动光标（左右箭头键）则阻止默认行为
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
    }
  };

  const handleSelect = (e: React.MouseEvent<HTMLInputElement>) => {
    // 强制光标始终位于末尾
    const input = e.target as HTMLInputElement;
    requestAnimationFrame(() => {
      input.selectionStart = input.selectionEnd = input.value.length;
    });
  };

  const renderContent = () => {
    const className =
      type === 'block'
        ? 'haki-verify-code-input-box'
        : 'haki-verify-code-input-line';
    const classNameFocus =
      type === 'block'
        ? 'haki-verify-code-input-box-focus'
        : 'haki-verify-code-input-line-focus';
    const classNameError =
      type === 'block'
        ? 'haki-verify-code-input-box-error'
        : 'haki-verify-code-input-line-error';
    return Array.from({ length }).map((_, index) => (
      <div
        key={index}
        className={
          focus &&
          (value.length === index ||
            (value.length === length && index === length - 1))
            ? `${className} ${classNameFocus}`
            : error && value.length < index + 1
            ? `${className} ${classNameError}`
            : className
        }
      >
        {value.length >= index + 1 ? value[index] : ''}
      </div>
    ));
  };

  return (
    <div className={`haki-verify-code-root ${className}`}>
      <div className="haki-verify-code-root-container">
        {renderContent()}
        <div
          className="haki-verify-code-cursor"
          style={{
            left: `${value.length * 60 + 23.25}px`,
            display: focus && value.length < length ? 'block' : 'none',
            ...cursorStyle,
          }}
        />
        <input
          ref={inputRef}
          value={value}
          className="haki-verify-code-real-input"
          type="text"
          inputMode={inputMode}
          autoFocus={autoFocus} // 浏览器限制，不一定能唤起键盘
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onKeyDown={handleKeyDown}
          onSelect={handleSelect}
          onClick={handleSelect}
          onChange={(e) => {
            const val = e.target.value;
            const regex = inputMode === 'text' ? /^[0-9a-zA-Z]*$/ : /^\d*$/;
            if (regex.test(val) && val.length <= length && !isSubmitting) {
              onChange(val);
            }
          }}
        />
      </div>
      {error && <div className="haki-verify-code-error">{error}</div>}
    </div>
  );
};

export default VerifyCode;
