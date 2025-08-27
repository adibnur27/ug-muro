// File: AdminProfile/Albums/component/PhotoModal.jsx
import React, { useEffect } from "react";

const PhotoModal = ({ photo, isOpen, onClose, onPrevious, onNext, hasNext, hasPrevious }) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, hasNext, hasPrevious, onClose, onNext, onPrevious]);

  if (!isOpen || !photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90" 
      onClick={onClose}
    >
      {/* Navigation Buttons */}
      {hasPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Photo Container */}
      <div className="relative max-w-6xl max-h-screen p-4 w-full" onClick={e => e.stopPropagation()}>
        <img
          src={photo.image_url}
          alt={`Photo from ${photo.albums?.title || 'album'}`}
          className="max-w-full max-h-full mx-auto object-contain rounded-lg"
        />
        
        {/* Photo Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 rounded-b-lg">
          <div className="text-white">
            {photo.albums && (
              <p className="text-lg font-medium">Album: {photo.albums.title}</p>
            )}
            <p className="text-sm opacity-75 mt-1">
              Diupload: {new Date(photo.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            
            {/* Action Buttons */}
            {/* <div className="flex gap-3 mt-4">
              <button
                onClick={() => window.open(photo.image_url, '_blank')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
              >
                Buka di Tab Baru
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = `${photo.image_url}?download=`;
                  link.href = photo.image_url;
                  link.download = `photo-${photo.id}.jpg`;
                  link.click();
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors"
              >
                Download
              </button>
            </div> */}
          </div>
        </div>

        {/* Navigation indicators */}
        {/* {(hasNext || hasPrevious) && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
            
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PhotoModal;