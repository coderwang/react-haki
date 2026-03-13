import { clsx } from 'clsx';
import AutoScroll from 'embla-carousel-auto-scroll';
import useEmblaCarousel from 'embla-carousel-react';
import React, { forwardRef, useImperativeHandle } from 'react';
import './index.css';
import { CarouselProps, CarouselRef } from './interface';

const Carousel = forwardRef<CarouselRef, CarouselProps>((props, ref) => {
  const {
    className,
    style,
    children,
    startDelay = 500,
    direction = 'forward',
    offset = 0,
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
    },
    [
      AutoScroll({
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        startDelay,
        direction,
      }),
    ],
  );

  useImperativeHandle(ref, () => ({
    prev: (count) => {
      if (emblaApi) {
        const autoScroll = emblaApi.plugins().autoScroll;
        // 暂停自动滚动
        autoScroll.stop();
        // 计算最终滚动到的位置
        const finalScrollTo =
          direction === 'forward'
            ? emblaApi.selectedScrollSnap() - count
            : emblaApi.selectedScrollSnap() + count;
        emblaApi.scrollTo(finalScrollTo);
        // 恢复自动滚动
        setTimeout(() => {
          autoScroll.play();
        }, 500);
      }
    },
    next: (count) => {
      if (emblaApi) {
        const autoScroll = emblaApi.plugins().autoScroll;
        autoScroll.stop();
        const finalScrollTo =
          direction === 'forward'
            ? emblaApi.selectedScrollSnap() + count
            : emblaApi.selectedScrollSnap() - count;
        emblaApi.scrollTo(finalScrollTo);
        setTimeout(() => {
          autoScroll.play();
        }, 500);
      }
    },
  }));

  const viewport = (
    <div
      ref={emblaRef}
      className={clsx('haki-carousel-root', className)}
      style={{
        ...style,
        ...(offset > 0 && {
          transform: `translateX(-${offset}px)`,
          width: `calc(100% + ${offset}px)`,
        }),
      }}
    >
      <div className="haki-carousel-track">{children}</div>
    </div>
  );

  if (offset > 0) {
    return <div style={{ overflow: 'hidden' }}>{viewport}</div>;
  }

  return viewport;
});

export default Carousel;
