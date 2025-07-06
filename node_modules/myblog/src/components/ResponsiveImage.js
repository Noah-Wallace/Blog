import React from 'react';
import './ResponsiveImage.css';

const ResponsiveImage = ({ src, alt, sizes, aspectRatio = '16/9' }) => {
  const widths = [320, 480, 640, 768, 896, 1024, 1280, 1440, 1600, 1920];

  const generateSrcSet = () =>
    widths.map(width => `${src}?w=${width} ${width}w`).join(', ');

  return (
    <div className="image-container" style={{ aspectRatio }}>
      <img
        src={`${src}?w=640`}
        alt={alt}
        srcSet={generateSrcSet()}
        sizes={
          sizes ||
          `(max-width: 480px) 100vw,
           (max-width: 768px) 95vw,
           (max-width: 1024px) 85vw,
           75vw`
        }
        loading="lazy"
        className="responsive-image"
      />
    </div>
  );
};

export default ResponsiveImage;
