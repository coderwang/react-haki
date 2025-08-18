import React, { useCallback, useRef } from 'react';

import ArrowIcon from './assets/arrow_right.svg';
import BouncingCirclesIcon from './assets/bouncing-circles.svg';

import clsx from 'clsx';
import './index.css';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  clickStatus?: 'default' | 'loading' | 'success';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = '',
  clickStatus = 'default',
  style = {},
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const currentRippleRef = useRef<HTMLDivElement | null>(null);
  const startDelayTimerRef = useRef<number>(-Infinity); // 开始延迟定时器
  const endClearTimerRef = useRef<number>(-Infinity); // 结束清理定时器
  const isHoveringRef = useRef(false);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || clickStatus !== 'default') return;

      isHoveringRef.current = true;
      const button = buttonRef.current;
      if (!button) return;

      // 清除之前的定时器和水波纹
      window.clearTimeout(startDelayTimerRef.current);
      window.clearTimeout(endClearTimerRef.current);
      if (currentRippleRef.current) {
        currentRippleRef.current.remove();
        currentRippleRef.current = null;
      }

      // 获取按钮的位置和尺寸
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 计算需要的圆形半径（确保能覆盖整个按钮）
      const radius = Math.sqrt(
        Math.pow(Math.max(x, rect.width - x), 2) +
          Math.pow(Math.max(y, rect.height - y), 2) +
          1,
      );

      // 设置0.1秒延迟，防止误触
      startDelayTimerRef.current = window.setTimeout(() => {
        // 检查鼠标是否还在按钮上
        if (!isHoveringRef.current) return;

        // 创建水波纹元素
        const ripple = document.createElement('div');
        ripple.className = 'haki-ripple-button-ripple';

        // 设置初始样式（从鼠标位置开始，大小为0）
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.transition =
          'width 0.4s cubic-bezier(.33,0,.67,1), height 0.4s cubic-bezier(.33,0,.67,1)';

        // 添加到按钮中
        button.appendChild(ripple);
        currentRippleRef.current = ripple;

        // 强制重绘后开始动画
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (currentRippleRef.current && isHoveringRef.current) {
              const size = radius * 2;
              ripple.style.width = size + 'px';
              ripple.style.height = size + 'px';
            }
          });
        });
      }, 100); // 0.1秒延迟
    },
    [disabled, clickStatus],
  );

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;

    // 清除开始延迟定时器
    window.clearTimeout(startDelayTimerRef.current);

    if (currentRippleRef.current) {
      const ripple = currentRippleRef.current;
      // 缩小动画
      ripple.style.transition =
        'width 0.4s cubic-bezier(.33,0,.67,1), height 0.4s cubic-bezier(.33,0,.67,1), opacity 0.4s cubic-bezier(.33,0,.67,1)';
      ripple.style.width = '0px';
      ripple.style.height = '0px';
      ripple.style.opacity = '0';

      // 动画结束后移除元素
      endClearTimerRef.current = window.setTimeout(() => {
        if (currentRippleRef.current && currentRippleRef.current.parentNode) {
          currentRippleRef.current.remove();
        }
        currentRippleRef.current = null;
      }, 400);
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || clickStatus === 'loading') return;
      onClick?.(e);
    },
    [onClick, disabled, clickStatus],
  );

  return (
    <div
      ref={buttonRef}
      className={clsx(
        'haki-ripple-button-root',
        clickStatus === 'loading' && 'haki-ripple-button-root-loading',
        clickStatus === 'success' && 'haki-ripple-button-root-success',
        disabled && 'haki-ripple-button-root-disabled',
        className,
      )}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {clickStatus === 'default' && (
        <div className="haki-ripple-button-default-content">
          <img
            src={ArrowIcon}
            className="haki-ripple-button-arrow-icon"
            alt=""
          />
          <div className="haki-ripple-button-text">{children}</div>
        </div>
      )}

      {clickStatus === 'loading' && (
        <img
          src={BouncingCirclesIcon}
          className="haki-ripple-button-loading-icon"
          alt=""
        />
      )}

      {clickStatus === 'success' && (
        <div className="haki-ripple-button-success-content">
          <img
            src={ArrowIcon}
            className="haki-ripple-button-success-arrow-icon"
            alt=""
          />
          <div className="haki-ripple-button-success-text">{children}</div>
        </div>
      )}
    </div>
  );
};

export default RippleButton;
