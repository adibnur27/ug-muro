import React, { useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import {
  getAlbumsWithPhotoCount,
  getPhotosByAlbumId,
  getAllPhotos,
} from "../../../service/galleryService";

import AlbumCard from "./AlbumCard";
import PhotoItem from "./PhotoItem";
import PhotoModal from "./PhotoModal";

const   GalleryDisplay = ({ refreshTrigger }) => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("albums"); // 'albums', 'photos', 'all-photos'

  // --- Data Loading Functions ---

  const loadAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAlbumsWithPhotoCount();
      setAlbums(data);
    } catch (error) {
      Swal.fire("Error", "Gagal memuat album.", "error");
    } finally {
      setLoading(false);
    }
  }, []);
  console.log("data",albums);

  const loadPhotosByAlbum = useCallback(async (album) => {
    setLoading(true);
    try {
      const data = await getPhotosByAlbumId(album.id);
      setPhotos(data);
      setSelectedAlbum(album);
      setView("photos");
    } catch (error) {
      Swal.fire("Error", `Gagal memuat foto untuk album ${album.title}.`, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAllPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllPhotos();
      setPhotos(data);
      setSelectedAlbum(null);
      setView("all-photos");
    } catch (error) {
      Swal.fire("Error", "Gagal memuat semua foto.", "error");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (view === "albums") {
      loadAlbums();
    }
  }, [view, loadAlbums, refreshTrigger]);


  // --- Modal Handlers ---

  const openPhotoModal = (index) => {
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsModalOpen(false);
    setCurrentPhotoIndex(null);
  };

  // Logika navigasi diperbaiki agar tidak looping dan berhenti di ujung
  const showNextPhoto = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const showPrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  // --- Render Logic ---

  const renderContent = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }

    if (view === "albums") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onClick={() => loadPhotosByAlbum(album)}
            />
          ))}
        </div>
      );
    }

    if (view === "photos" || view === "all-photos") {
      if (photos.length === 0) {
        return <p>Tidak ada foto di album ini.</p>;
      }
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <PhotoItem
              key={photo.id}
              photo={photo}
              onClick={() => openPhotoModal(index)}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          {view === "albums" && "Daftar Album"}
          {view === "photos" && `Foto di Album: ${selectedAlbum?.title}`}
          {view === "all-photos" && "Semua Foto"}
        </h2>
        <div>
          {view !== "albums" && (
            <button
              onClick={() => setView("albums")}
              className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Kembali ke Album
            </button>
          )}
          <button
            onClick={loadAllPhotos}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Lihat Semua Foto
          </button>
        </div>
      </div>

      {renderContent()}

      {isModalOpen && (
        <PhotoModal
          isOpen={isModalOpen}
          onClose={closePhotoModal}
          photo={photos[currentPhotoIndex]}
          // Menggunakan nama prop yang benar: onPrevious
          onPrevious={showPrevPhoto}
          onNext={showNextPhoto}
          // Tambahkan dua props penting ini
          hasNext={currentPhotoIndex < photos.length - 1}
          hasPrevious={currentPhotoIndex > 0}
        />
      )}
    </div>
  );
};

export default GalleryDisplay;