import React, { useRef } from 'react';
import { Carousel, CarouselRef } from 'react-haki';

const CarouselItem = (props: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const { children, onClick } = props;

  return (
    <div
      style={{
        flexShrink: 0,
        width: '80px',
        height: '80px',
        marginRight: '16px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CarouselDemo = () => {
  const carouselRefs = useRef<(CarouselRef | null)[]>([]);

  const handlePrev = () => {
    carouselRefs.current.forEach((ref) => ref?.prev(3));
  };
  const handleNext = () => {
    carouselRefs.current.forEach((ref) => ref?.next(3));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Carousel ref={(ref) => (carouselRefs.current[0] = ref)} startDelay={0}>
        {new Array(20).fill(0).map((_, index) => (
          <CarouselItem key={index} onClick={() => alert('点击了滑块' + index)}>
            <div>Item {index}</div>
          </CarouselItem>
        ))}
      </Carousel>
      <Carousel
        ref={(ref) => (carouselRefs.current[1] = ref)}
        startDelay={0}
        direction="backward"
      >
        {new Array(20).fill(0).map((_, index) => (
          <CarouselItem key={index} onClick={() => alert('点击了滑块' + index)}>
            <div>Item {index}</div>
          </CarouselItem>
        ))}
      </Carousel>
      <Carousel
        ref={(ref) => (carouselRefs.current[2] = ref)}
        startDelay={0}
        offset={80}
      >
        {new Array(20).fill(0).map((_, index) => (
          <CarouselItem key={index} onClick={() => alert('点击了滑块' + index)}>
            <div>Item {index}</div>
          </CarouselItem>
        ))}
      </Carousel>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={handlePrev}>
          回滚3个滑块
        </button>
        <button type="button" onClick={handleNext}>
          前进3个滑块
        </button>
      </div>
    </div>
  );
};

export default CarouselDemo;
