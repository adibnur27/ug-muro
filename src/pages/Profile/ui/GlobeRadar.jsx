import React from "react";

const GlobeRadar = () => {
  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      

      {/* SVG Radar Globe */}
      <svg viewBox="0 0 200 200" className="absolute w-96 h-w-96 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
        {/* Outer circle */}
        <circle cx="100" cy="100" r="95" stroke="currentColor" />

        {/* Inner circle accent ring */}
        <circle cx="100" cy="100" r="75" stroke="currentColor" strokeDasharray="15 10" />

        {/* Longitudinal lines */}
        <ellipse cx="100" cy="100" rx="50" ry="95" />
        <ellipse cx="100" cy="100" rx="20" ry="95" />

        {/* Latitudinal lines */}
        <ellipse cx="100" cy="100" rx="95" ry="50" />
        <ellipse cx="100" cy="100" rx="95" ry="20" />

        {/* Decorative arcs */}
        <path d="M20 100 a80 80 0 0 1 160 0" stroke="cyan" strokeWidth="5" strokeLinecap="round" />
        <path d="M180 100 a80 80 0 0 1 -160 0" stroke="cyan" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default GlobeRadar;
