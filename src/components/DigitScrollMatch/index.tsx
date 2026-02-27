import { clsx } from 'clsx';
import React, { useEffect, useMemo, useRef } from 'react';
import './index.css';

interface DigitScrollMatchProps {
  className?: string;
  style?: React.CSSProperties;
  targetNumber: number;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'up-down' | 'down-up';
}

interface DigitSlotProps {
  targetDigit: number;
  startDigit: number;
  duration: number;
  direction: 'up' | 'down';
  delay: number;
}

const BASE_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const DigitSlot: React.FC<DigitSlotProps> = ({
  targetDigit,
  startDigit,
  duration,
  direction,
  delay,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const digitHeight = container.clientHeight;
    if (digitHeight === 0) return;

    const cycleLen = 10 * digitHeight;
    const speed = cycleLen / duration;
    const toIndex = (d: number) => (direction === 'up' ? d : (10 - d) % 10);
    const targetOff = toIndex(targetDigit) * digitHeight;
    const startOff = toIndex(startDigit) * digitHeight;

    let offset = startOff;
    let phase: 'constant' | 'decel' | 'done' = delay > 0 ? 'constant' : 'decel';
    let t0: number | null = null;
    let dStart = 0;
    let dDist = 0;
    let dDur = 0;
    let dT0 = 0;
    let raf: number;

    const setupDecel = (currentOffset: number) => {
      dStart = currentOffset;
      const cur = currentOffset % cycleLen;
      let rem = targetOff - cur;
      if (rem <= 0) rem += cycleLen;
      if (rem < cycleLen * 0.5) rem += cycleLen;
      dDist = rem;
      dDur = (2 * dDist) / speed;
    };

    if (delay <= 0) setupDecel(startOff);

    const applyTransform = (scrollOffset: number) => {
      const mod = scrollOffset % cycleLen;
      const ty = direction === 'up' ? -mod : -cycleLen + mod;
      track.style.transform = `translateY(${ty}px)`;
    };

    const tick = (now: number) => {
      if (t0 === null) {
        t0 = now;
        if (delay <= 0) dT0 = now;
      }
      const elapsed = now - t0;

      if (phase === 'constant') {
        offset = startOff + speed * elapsed;
        if (elapsed >= delay) {
          phase = 'decel';
          dT0 = now;
          setupDecel(offset);
        }
      }

      if (phase === 'decel') {
        const p = Math.min((now - dT0) / dDur, 1);
        offset = dStart + dDist * (1 - (1 - p) ** 2);
        if (p >= 1) {
          phase = 'done';
          offset = dStart + dDist;
        }
      }

      applyTransform(offset);

      if (phase !== 'done') {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetDigit, startDigit, duration, direction, delay]);

  return (
    <div ref={containerRef} className="haki-digit-slot-root">
      <div ref={trackRef} className="haki-digit-slot-track">
        {[...BASE_DIGITS, ...BASE_DIGITS].map((d, i) => (
          <div key={i} className="haki-digit-slot-digit">
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

const DigitScrollMatch: React.FC<DigitScrollMatchProps> = (props) => {
  const {
    className,
    style,
    targetNumber,
    delay = 0,
    duration = 800,
    direction = 'up-down',
  } = props;

  const digits = useMemo(() => {
    const str = String(targetNumber);
    return str.split('').map(Number);
  }, [targetNumber]);

  return (
    <div
      className={clsx('haki-digit-scroll-match-root', className)}
      style={style}
    >
      {digits.map((digit, index) => (
        <DigitSlot
          key={index}
          targetDigit={digit}
          startDigit={((index * 2 + 1) % 10) as DigitSlotProps['startDigit']}
          duration={duration}
          direction={
            direction === 'up-down'
              ? index % 2 === 0
                ? 'up'
                : 'down'
              : direction === 'down-up'
              ? index % 2 === 0
                ? 'down'
                : 'up'
              : direction
          }
          delay={delay}
        />
      ))}
    </div>
  );
};

export default DigitScrollMatch;
