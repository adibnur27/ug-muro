import React, { useState } from "react";
import Swal from "sweetalert2";

const AlbumCard = ({ album, onClick }) => {
 



  return (
    <div className="relative group">
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
        onClick={() => onClick(album.id, album.title)}
      >
       

        {/* Thumbnail Container */}
        <div className="relative w-full h-48 bg-gray-100 rounded-t-lg overflow-hidden">
          {album.loadingThumbnail ? (
            // Loading state untuk thumbnail
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="animate-pulse flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                <span className="text-xs text-gray-500">Loading...</span>
              </div>
            </div>
          ) : album.latest_photo ? (
            <>
              <img 
                src={album.latest_photo.image_url} 
                alt={`Thumbnail from ${album.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  // Handle broken image
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `
                    <div class="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                      <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5C3.312 17.333 4.274 19 5.814 19z" />
                      </svg>
                      <span class="text-xs">Gambar Error</span>
                    </div>
                  `;
                }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Photo count badge on image */}
              <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {album.photo_count} foto
              </div>
            </>
          ) : (
            // Empty album state
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-gray-100">
              <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium">Album Kosong</span>
              <span className="text-xs mt-1">Belum ada foto</span>
            </div>
          )}
        </div>

        {/* Album Info */}
        <div className="p-4">
          <div className="flex flex-col items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate pr-2 flex-1 group-hover:text-blue-600 transition-colors">
              {album.title}
            </h3>
            {!album.latest_photo && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex-shrink-0">
                {album.photo_count} foto
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Dibuat: {new Date(album.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            
            {album.latest_photo && (
              <span className="text-xs">
                Update: {new Date(album.latest_photo.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            )}
          </div>

          {/* Progress indicator for albums without photos */}
          {album.photo_count === 0 && (
            <div className="mt-3 p-2 bg-blue-50 rounded text-center">
              <span className="text-xs text-blue-600">Klik untuk menambah foto pertama</span>
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-blue-500 bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300 rounded-lg pointer-events-none"></div>
      </div>
    </div>
  );
};

export default AlbumCard;