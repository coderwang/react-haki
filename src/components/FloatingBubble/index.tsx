import clsx from 'clsx';
import React, { FC, useEffect, useRef, useState } from 'react';
import './index.css';

interface FloatingBubbleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  defaultOffset?: Offset;
  storageKey?: string;
  onOffsetChange?: (offset: Offset) => void;
  onClick?: () => void;
  edgeDistance?: { top: number; right: number; bottom: number; left: number };
}

type HorizontalAnchor = 'left' | 'right';
type VerticalAnchor = 'top' | 'bottom';
type Offset = {
  x: number;
  y: number;
  xAnchor?: HorizontalAnchor;
  yAnchor?: VerticalAnchor;
};
type ResolvedOffset = {
  x: number;
  y: number;
  xAnchor: HorizontalAnchor;
  yAnchor: VerticalAnchor;
};
type Position = { left: number; top: number };
type EdgeDistance = NonNullable<FloatingBubbleProps['edgeDistance']>;

const CLICK_MOVE_THRESHOLD = 4;

const normalizeOffset = (offset: Offset): ResolvedOffset => ({
  x: Math.abs(offset.x),
  y: Math.abs(offset.y),
  xAnchor: offset.xAnchor ?? (offset.x < 0 ? 'right' : 'left'),
  yAnchor: offset.yAnchor ?? (offset.y < 0 ? 'bottom' : 'top'),
});

const readOffset = (
  storageKey: string | undefined,
  defaultOffset: Offset,
): ResolvedOffset => {
  const normalizedDefaultOffset = normalizeOffset(defaultOffset);
  if (!storageKey || typeof window === 'undefined')
    return normalizedDefaultOffset;

  try {
    const value = window.localStorage.getItem(storageKey);
    return value
      ? normalizeOffset(JSON.parse(value) as Offset)
      : normalizedDefaultOffset;
  } catch {
    return normalizedDefaultOffset;
  }
};

const writeOffset = (
  storageKey: string | undefined,
  offset: ResolvedOffset,
) => {
  if (!storageKey || typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(offset));
  } catch {
    /* ignore storage failures */
  }
};

const offsetToPosition = (
  offset: ResolvedOffset,
  el: HTMLElement,
  edgeDistance: EdgeDistance,
): Position => ({
  left:
    offset.xAnchor === 'left'
      ? offset.x + edgeDistance.left
      : window.innerWidth - el.offsetWidth - offset.x - edgeDistance.right,
  top:
    offset.yAnchor === 'top'
      ? offset.y + edgeDistance.top
      : window.innerHeight - el.offsetHeight - offset.y - edgeDistance.bottom,
});

const positionToOffset = (
  position: Position,
  el: HTMLElement,
  edgeDistance: EdgeDistance,
): ResolvedOffset => {
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  const midX = position.left + width / 2;
  const midY = position.top + height / 2;
  const xAnchor: HorizontalAnchor =
    midX <= window.innerWidth / 2 ? 'left' : 'right';
  const yAnchor: VerticalAnchor =
    midY <= window.innerHeight / 2 ? 'top' : 'bottom';

  return {
    x:
      xAnchor === 'left'
        ? position.left - edgeDistance.left
        : window.innerWidth - width - position.left - edgeDistance.right,
    y:
      yAnchor === 'top'
        ? position.top - edgeDistance.top
        : window.innerHeight - height - position.top - edgeDistance.bottom,
    xAnchor,
    yAnchor,
  };
};

const clampPosition = (
  position: Position,
  el: HTMLElement,
  edgeDistance: EdgeDistance,
): Position => {
  const maxLeft = Math.max(
    edgeDistance.left,
    window.innerWidth - el.offsetWidth - edgeDistance.right,
  );
  const maxTop = Math.max(
    edgeDistance.top,
    window.innerHeight - el.offsetHeight - edgeDistance.bottom,
  );

  return {
    left: Math.min(Math.max(position.left, edgeDistance.left), maxLeft),
    top: Math.min(Math.max(position.top, edgeDistance.top), maxTop),
  };
};

const FloatingBubble: FC<FloatingBubbleProps> = ({
  children,
  className,
  style,
  defaultOffset = { x: 0, y: 0 },
  storageKey,
  onOffsetChange,
  onClick,
  edgeDistance = { top: 0, right: 0, bottom: 0, left: 0 },
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const posRef = useRef<Position | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const startPointerRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ left: 0, top: 0 });

  const [pos, setPos] = useState<Position | null>(null);

  const updatePos = (nextPos: Position) => {
    posRef.current = nextPos;
    setPos(nextPos);
  };

  useEffect(() => {
    if (hasInitializedRef.current) return;

    const el = rootRef.current;
    if (!el) return;

    hasInitializedRef.current = true;
    const initialPos = clampPosition(
      offsetToPosition(readOffset(storageKey, defaultOffset), el, edgeDistance),
      el,
      edgeDistance,
    );
    updatePos(initialPos);
  }, [defaultOffset, edgeDistance, storageKey]);

  useEffect(() => {
    const handleResize = () => {
      const el = rootRef.current;
      if (!el) return;

      if (posRef.current) {
        updatePos(clampPosition(posRef.current, el, edgeDistance));
        return;
      }

      const initialPos = clampPosition(
        offsetToPosition(
          readOffset(storageKey, defaultOffset),
          el,
          edgeDistance,
        ),
        el,
        edgeDistance,
      );
      updatePos(initialPos);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [defaultOffset, edgeDistance, storageKey]);

  const finishDrag = (pointerId: number) => {
    const el = rootRef.current;
    if (activePointerIdRef.current !== pointerId || !el) return;

    if (el.hasPointerCapture(pointerId)) {
      el.releasePointerCapture(pointerId);
    }

    activePointerIdRef.current = null;
    suppressClickRef.current = hasMovedRef.current;

    if (!hasMovedRef.current || !posRef.current) return;

    const offset = positionToOffset(posRef.current, el, edgeDistance);
    writeOffset(storageKey, offset);
    onOffsetChange?.(offset);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== null) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (!rootRef.current || !posRef.current) return;

    suppressClickRef.current = false;
    activePointerIdRef.current = e.pointerId;
    hasMovedRef.current = false;
    startPointerRef.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = { ...posRef.current };
    rootRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== e.pointerId || !rootRef.current) return;

    const dx = e.clientX - startPointerRef.current.x;
    const dy = e.clientY - startPointerRef.current.y;

    if (!hasMovedRef.current && Math.hypot(dx, dy) < CLICK_MOVE_THRESHOLD) {
      return;
    }

    hasMovedRef.current = true;
    updatePos(
      clampPosition(
        {
          left: startPosRef.current.left + dx,
          top: startPosRef.current.top + dy,
        },
        rootRef.current,
        edgeDistance,
      ),
    );
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(e.pointerId);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(e.pointerId);
  };

  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;

    suppressClickRef.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={rootRef}
      className={clsx('haki-floating-bubble-root', className)}
      style={{
        ...style,
        left: pos?.left,
        top: pos?.top,
        visibility: pos ? 'visible' : 'hidden',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FloatingBubble;
