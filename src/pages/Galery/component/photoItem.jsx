import React, { useState } from "react";
import Swal from "sweetalert2";

const PhotoItem = ({ 
  photo, 
  onClick, 
  isSelectable = false, 
  isSelected = false, 
  onSelectionChange 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

 

  const handleSelectionChange = (e) => {
    e.stopPropagation();
    if (onSelectionChange) {
      onSelectionChange(photo.id, !isSelected);
    }
  };

  return (
    <div className="relative group rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Selection Checkbox */}
      {isSelectable && (
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelectionChange}
            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 shadow-md"
          />
        </div>
      )}


      {/* Image Container */}
      <div 
        className="relative w-full h-48 bg-gray-100 cursor-pointer overflow-hidden"
        onClick={() => onClick && onClick(photo)}
      >
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        )}

        <img
          src={photo.image_url}
          alt="Gallery photo"
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageLoaded(true);
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML += `
              <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5C3.312 17.333 4.274 19 5.814 19z" />
                </svg>
                <span class="text-xs">Error loading</span>
              </div>
            `;
          }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200"></div>

        {/* Selected overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 border-2 border-blue-500"></div>
        )}
      </div>

      {/* Photo Info */}
      <div className="p-3 absolute bottom-0 group-hover:bg-black/50 left-0 right-0 transition-all duration-200">
        <div className="flex items-center justify-between text-xs group-hover:text-white group-hover:font-bold text-gray-500">
          <span className="truncate flex-1 pr-2">
            {photo.albums?.title || 'Unknown Album'}
          </span>
          <span className="flex-shrink-0">
            {new Date(photo.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short'
            })}
          </span>
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default PhotoItem;