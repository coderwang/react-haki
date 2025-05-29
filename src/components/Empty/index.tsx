import React, { type FC } from 'react';
import emptyImage from './assets/empty.png';
import './index.css';

interface EmptyProps {
  image?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Empty: FC<EmptyProps> = (props) => {
  const { title, description, image, buttonText, onClick, className, style } =
    props;

  return (
    <div className={`haki-empty-root ${className}`} style={style}>
      <img className="haki-empty-image" src={image || emptyImage} alt="" />
      {title && <div className="haki-empty-title">{title}</div>}
      {description && (
        <div className="haki-empty-description">{description}</div>
      )}
      {buttonText && (
        <div className="haki-empty-button" onClick={onClick}>
          {buttonText}
        </div>
      )}
    </div>
  );
};

export default Empty;
