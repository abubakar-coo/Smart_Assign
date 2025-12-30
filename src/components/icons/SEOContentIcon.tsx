import React from "react";

interface SEOContentIconProps {
  className?: string;
  size?: number;
}

const SEOContentIcon: React.FC<SEOContentIconProps> = ({ 
  className = "w-10 h-10", 
  size = 40 
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Clean background */}
      <rect width="200" height="200" fill="transparent" />
      
      {/* Isometric document (floating) */}
      <g transform="translate(50, 30) rotate(-15)">
        {/* Document shadow */}
        <ellipse cx="50" cy="120" rx="35" ry="8" fill="rgba(0,0,0,0.1)" opacity="0.3" />
        
        {/* Document base - isometric perspective */}
        <g transform="skewX(-20)">
          {/* Main document */}
          <rect
            x="20"
            y="20"
            width="60"
            height="80"
            fill="#ffffff"
            stroke="#20C997"
            strokeWidth="2"
            rx="2"
          />
          
          {/* Text lines on document */}
          <line x1="30" y1="35" x2="70" y2="35" stroke="#20C997" strokeWidth="1.5" opacity="0.6" />
          <line x1="30" y1="45" x2="65" y2="45" stroke="#20C997" strokeWidth="1.5" opacity="0.6" />
          <line x1="30" y1="55" x2="70" y2="55" stroke="#20C997" strokeWidth="1.5" opacity="0.6" />
          <line x1="30" y1="65" x2="60" y2="65" stroke="#20C997" strokeWidth="1.5" opacity="0.6" />
          <line x1="30" y1="75" x2="68" y2="75" stroke="#20C997" strokeWidth="1.5" opacity="0.6" />
          <line x1="30" y1="85" x2="55" y2="85" stroke="#20C997" strokeWidth="1.5" opacity="0.6" />
        </g>
        
        {/* Growth arrow coming out of document */}
        <g transform="translate(50, 50)">
          {/* Arrow base */}
          <path
            d="M 0 40 L 0 20 L 15 20 L 15 10 L 30 25 L 15 40 L 15 30 L 0 30 Z"
            fill="#20C997"
            opacity="0.9"
          />
          {/* Arrow highlight */}
          <path
            d="M 0 40 L 0 20 L 15 20 L 15 10 L 30 25 L 15 40 L 15 30 L 0 30 Z"
            fill="url(#arrowGradient)"
            opacity="0.7"
          />
        </g>
      </g>
      
      {/* Sleek pen - isometric style */}
      <g transform="translate(120, 100) rotate(45)">
        {/* Pen shadow */}
        <ellipse cx="15" cy="45" rx="8" ry="3" fill="rgba(0,0,0,0.1)" opacity="0.3" />
        
        {/* Pen body */}
        <rect
          x="10"
          y="10"
          width="10"
          height="30"
          fill="#20C997"
          rx="1"
        />
        {/* Pen tip */}
        <path
          d="M 10 40 L 15 50 L 20 40 Z"
          fill="#17A085"
        />
        {/* Pen clip */}
        <rect
          x="12"
          y="12"
          width="6"
          height="8"
          fill="#17A085"
          rx="1"
        />
        {/* Pen highlight */}
        <line
          x1="12"
          y1="15"
          x2="12"
          y2="35"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
        />
      </g>
      
      {/* Floating particles/SEO indicators */}
      <circle cx="30" cy="50" r="3" fill="#20C997" opacity="0.4">
        <animate attributeName="cy" values="50;45;50" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="170" cy="60" r="2.5" fill="#20C997" opacity="0.3">
        <animate attributeName="cy" values="60;55;60" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="25" cy="150" r="2" fill="#20C997" opacity="0.35">
        <animate attributeName="cy" values="150;145;150" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#20C997" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Soft lighting effect */}
        <radialGradient id="documentGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#20C997" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#20C997" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Soft glow around document */}
      <ellipse
        cx="100"
        cy="90"
        rx="50"
        ry="40"
        fill="url(#documentGlow)"
        opacity="0.5"
      />
    </svg>
  );
};

export default SEOContentIcon;

