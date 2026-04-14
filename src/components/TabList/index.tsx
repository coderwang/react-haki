import clsx from 'clsx';
import React, { FC, useEffect, useRef, useState } from 'react';
import AddIcon from './assets/add.svg';
import ArrowLeftIcon from './assets/arrow-left2.svg';
import ArrowRightIcon from './assets/arrow-right2.svg';
import './index.css';

interface TabItem {
  label: string;
  value: string | number;
  [key: string]: any;
}

interface TabListProps {
  className?: string;
  style?: React.CSSProperties;
  items: TabItem[];
  activeKey: string | number;
  onChange: (key: string | number) => void;
  onAdd?: () => void;
  scrollDistance?: number;
}

const TabList: FC<TabListProps> = (props) => {
  const {
    className,
    style,
    items,
    activeKey,
    onChange,
    onAdd,
    scrollDistance = 800,
  } = props;

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setShowRightArrow(hasOverflow);
    };

    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);
    for (const child of Array.from(el.children)) {
      ro.observe(child);
    }

    const mo = new MutationObserver(() => {
      for (const child of Array.from(el.children)) {
        ro.observe(child);
      }
      checkOverflow();
    });
    mo.observe(el, { childList: true });

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className={clsx('haki-tab-list-root', className)} style={style}>
      {showLeftArrow && (
        <div className="haki-tab-list-left-arrow">
          <div className="haki-tab-list-left-arrow-item">
            <div
              className="haki-tab-list-left-arrow-item-button"
              onClick={() => {
                stackRef.current?.scrollBy({
                  left: -scrollDistance,
                  behavior: 'smooth',
                });
              }}
            >
              <img
                src={ArrowLeftIcon}
                className="haki-tab-list-left-arrow-item-button-icon"
                alt=""
              />
            </div>
          </div>
          <div className="haki-tab-list-left-arrow-item-background" />
        </div>
      )}
      {showRightArrow && (
        <div className="haki-tab-list-right-arrow">
          <div className="haki-tab-list-right-arrow-item-background" />
          <div className="haki-tab-list-right-arrow-item">
            <div
              className="haki-tab-list-right-arrow-item-button"
              onClick={() => {
                stackRef.current?.scrollBy({
                  left: scrollDistance,
                  behavior: 'smooth',
                });
              }}
            >
              <img
                src={ArrowRightIcon}
                className="haki-tab-list-right-arrow-item-button-icon"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      <div
        className="haki-tab-list-stack"
        ref={stackRef}
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.scrollLeft <= 1.2) {
            setShowLeftArrow(false);
          } else {
            setShowLeftArrow(true);
          }
          if (
            target.scrollLeft + target.clientWidth >=
            target.scrollWidth - 1.2
          ) {
            setShowRightArrow(false);
          } else {
            setShowRightArrow(true);
          }
        }}
      >
        {items.map((item) => (
          <div
            className={clsx(
              'haki-tab-list-stack-item',
              activeKey === item.value && 'haki-tab-list-stack-item-active',
            )}
            key={item.value}
            onClick={(e) => {
              const target = e.target as HTMLDivElement;
              const offsetLeft = target.offsetLeft;
              const clientWidth = target.clientWidth;
              const offsetParentScrollLeft =
                target.offsetParent?.scrollLeft || 0;
              const offsetParentClientWidth =
                target.offsetParent?.clientWidth || 0;
              if (offsetLeft - offsetParentScrollLeft < 64) {
                stackRef.current?.scrollBy({
                  left: offsetLeft - offsetParentScrollLeft - 64,
                  behavior: 'smooth',
                });
              } else if (
                offsetLeft - offsetParentScrollLeft + clientWidth + 64 >
                offsetParentClientWidth
              ) {
                stackRef.current?.scrollBy({
                  left:
                    offsetLeft -
                    offsetParentScrollLeft +
                    clientWidth +
                    64 -
                    offsetParentClientWidth,
                  behavior: 'smooth',
                });
              }
              if (activeKey !== item.value) {
                onChange(item.value);
              }
            }}
          >
            {item.label}
          </div>
        ))}
        {onAdd && (
          <div className="haki-tab-list-stack-item-add" onClick={onAdd}>
            <img
              className="haki-tab-list-stack-item-add-icon"
              src={AddIcon}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabList;
