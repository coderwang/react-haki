import React, { useEffect, useRef, useState } from 'react';
import './index.css';

interface RichTextEllipsisProps {
  content: string | React.ReactNode;
  maxHeight?: number;
  expandText?: string | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const RichTextEllipsis: React.FC<RichTextEllipsisProps> = ({
  content,
  maxHeight = 150,
  expandText = '查看更多',
  style,
  className,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(true);
  const [expanded, setExpanded] = useState(false);

  // 检查是否文本内容超出限制
  useEffect(() => {
    if (contentRef.current) {
      let timer = -Infinity;
      let height = contentRef.current.offsetHeight;

      setIsOverflow(height > maxHeight);

      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry || height === entry.contentRect.height) {
          return;
        }
        height = entry.contentRect.height;
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          setIsOverflow(height > maxHeight);
        }, 100);
      });
      resizeObserver.observe(contentRef.current);

      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    }
  }, [content, maxHeight]);

  const handleExpand = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setExpanded(true);
  };

  const getClassName = () => {
    if (className) {
      return expanded
        ? `haki-rich-text-ellipsis-root haki-rich-text-ellipsis-root-expanded ${className}`
        : `haki-rich-text-ellipsis-root ${className}`;
    }

    return expanded
      ? 'haki-rich-text-ellipsis-root haki-rich-text-ellipsis-root-expanded'
      : 'haki-rich-text-ellipsis-root';
  };

  return (
    <div
      className={getClassName()}
      style={{
        maxHeight: expanded ? 'none' : maxHeight,
        ...style,
      }}
    >
      {typeof content === 'string' ? (
        <div
          ref={contentRef}
          className="haki-rich-text-ellipsis-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div ref={contentRef} className="haki-rich-text-ellipsis-content">
          {content}
        </div>
      )}
      {isOverflow && !expanded && (
        <div
          className="haki-rich-text-ellipsis-expand-button"
          onClick={handleExpand}
        >
          {expandText}
        </div>
      )}
    </div>
  );
};

export default RichTextEllipsis;
