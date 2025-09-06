import React from 'react';

const ActionButton = ({ children, onClick,hoverShadowColor }) => {

     const shadowClassMap = {
    red: 'hover:shadow-red-300 border border-red-200',
    blue: 'hover:shadow-blue-300 border border-blue-200',
    yellow: 'hover:shadow-yellow-300 border border-yellow-200',
    green: 'hover:shadow-green-300',
    // Tambahkan warna lain sesuai kebutuhan
  };

  const hoverShadowClass = hoverShadowColor ? shadowClassMap[hoverShadowColor] || '' : '';
  return (
    <div className="relative inline-block group">
      <button
        className={`
          flex flex-col items-center justify-center
          py-1
          px-4
          bg-white
          rounded-md
          transition-all duration-200
          hover:shadow-md
          ${hoverShadowClass}
        `}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default ActionButton;