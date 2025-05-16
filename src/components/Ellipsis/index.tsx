import React, { useEffect, useRef, useState } from 'react';
import './index.css';

interface EllipsisProps {
  text: string;
  maxLines?: number;
  expandText?: string;
  collapseText?: string;
  style?: React.CSSProperties;
  className?: string;
};

const Ellipsis: React.FC<EllipsisProps> = ({
  text,
  maxLines = 2,
  expandText = '查看更多',
  collapseText,
  style,
  className,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // 检查是否文本内容超出限制
  useEffect(() => {
    if (textRef.current) {
      let timer = -Infinity;
      let lineHeight = parseFloat(
        window.getComputedStyle(textRef.current).lineHeight || '20'
      );
      let scrollHeight = textRef.current.scrollHeight;
      let lines = Math.ceil(scrollHeight / lineHeight);

      setIsOverflow(lines > maxLines);

      let width = textRef.current.clientWidth;

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if(!entry || width === entry.contentRect.width) {
          return
        }
        width = entry.contentRect.width;
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          lineHeight = parseFloat(
            window.getComputedStyle(entry.target).lineHeight || '20'
          );
          scrollHeight = entry.target.scrollHeight;
          lines = Math.ceil(scrollHeight / lineHeight);
          setIsOverflow(lines > maxLines);
        }, 100);
      });
      resizeObserver.observe(textRef.current);

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    }
  }, [text, maxLines]);

  const handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setExpanded(true);
  };

  const handleCollapse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    setExpanded(false);
  };

  return (
    <div
      className={className ? `haki-ellipsis-root ${className}` : 'haki-ellipsis-root'}
      style={{ ...style }}
    >
      <div
        ref={textRef}
        className='haki-ellipsis-text'
        style={{
          position: 'relative',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: expanded ? 'block' : '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : maxLines,
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}
      >
        {text}
        {isOverflow && !expanded && (
          <div
            className='haki-ellipsis-text-expand-button'
          >
            <div
              className='haki-ellipsis-text-expand-button-gradient'
            />
            <div
              className='haki-ellipsis-text-expand-button-text'
              onClick={handleExpand}
            >
              {expandText}
            </div>
          </div>
        )}
        {isOverflow && expanded && collapseText && (
          <span className='haki-ellipsis-text-collapse-button' onClick={handleCollapse}>
            {collapseText}
          </span>
        )}
      </div>
    </div>
  );
};

export default Ellipsis;
