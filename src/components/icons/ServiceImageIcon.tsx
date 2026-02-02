import React from "react";

interface ServiceImageIconProps {
  imageUrl: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

/**
 * Component to display service images with fallback to icon
 * Recommended image sizes:
 * - For Services.tsx (home page): 112x112px (2x for retina) = 224x224px
 * - For ServicesDetails.tsx: 80x80px (2x for retina) = 160x160px
 * - Format: PNG with transparent background
 * - Aspect ratio: 1:1 (square)
 */
const ServiceImageIcon: React.FC<ServiceImageIconProps> = ({
  imageUrl,
  alt,
  className = "w-full h-full object-contain",
  fallbackIcon
}) => {
  const [hasError, setHasError] = React.useState(false);

  if (hasError && fallbackIcon) {
    return <>{fallbackIcon}</>;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
    />
  );
};

export default ServiceImageIcon;

