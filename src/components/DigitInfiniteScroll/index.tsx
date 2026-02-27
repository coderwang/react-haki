import clsx from 'clsx';
import React, { useMemo } from 'react';
import './index.css';

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface DigitInfiniteScrollProps {
  direction?: 'up' | 'down';
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  digits?: Digit[];
  startDigit?: Digit;
  randomDigits?: boolean;
}

const BASE_DIGITS: Digit[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function DigitInfiniteScroll({
  direction = 'up',
  className,
  style,
  duration = 800,
  digits = [...BASE_DIGITS],
  startDigit = 0,
  randomDigits = false,
}: DigitInfiniteScrollProps) {
  const shuffledDigits = () => {
    const arr: Digit[] = [...BASE_DIGITS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const fullDigits = useMemo(() => {
    if (randomDigits) {
      const shuffled = shuffledDigits();
      return [...shuffled, ...shuffled];
    }
    if (startDigit !== 0) {
      const startDigits = [...BASE_DIGITS]
        .slice(startDigit)
        .concat([...BASE_DIGITS].slice(0, startDigit));
      return [...startDigits, ...startDigits];
    }
    return [...digits, ...digits];
  }, [String(digits), startDigit, randomDigits]);

  return (
    <div
      className={clsx('haki-digit-infinite-scroll-root', className)}
      style={style}
    >
      <div
        className={clsx(
          'haki-digit-infinite-scroll-track',
          direction === 'up'
            ? 'haki-digit-infinite-scroll-track-up'
            : 'haki-digit-infinite-scroll-track-down',
        )}
        style={{
          animationDuration: `${duration}ms`,
        }}
      >
        {fullDigits.map((digit, index) => (
          <div
            key={`${digit}-${index}`}
            className="haki-digit-infinite-scroll-digit"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}
