// File: hooks/useGallery.js
import { useState, useEffect } from "react";
import { 
  getAlbumsWithPhotoCount, 
  getAllPhotos, 
  getPhotosByAlbumId,
  getRecentPhotos,
  searchPhotosByAlbumTitle 
} from "../service/galleryService";

// Hook untuk mengelola albums
export const useAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAlbums = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAlbumsWithPhotoCount();
      setAlbums(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  return {
    albums,
    loading,
    error,
    refreshAlbums: loadAlbums
  };
};

// Hook untuk mengelola photos
export const usePhotos = (albumId = null) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (albumId) {
        data = await getPhotosByAlbumId(albumId);
      } else {
        data = await getAllPhotos();
      }
      setPhotos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, [albumId]);

  return {
    photos,
    loading,
    error,
    refreshPhotos: loadPhotos
  };
};

// Hook untuk recent photos
export const useRecentPhotos = (limit = 10) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRecentPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecentPhotos(limit);
      setPhotos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecentPhotos();
  }, [limit]);

  return {
    photos,
    loading,
    error,
    refreshPhotos: loadRecentPhotos
  };
};

// Hook untuk search
export const usePhotoSearch = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const searchPhotos = async (term) => {
    if (!term.trim()) {
      setPhotos([]);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchTerm(term);
    
    try {
      const data = await searchPhotosByAlbumTitle(term);
      setPhotos(data);
    } catch (err) {
      setError(err.message);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setPhotos([]);
    setSearchTerm("");
    setError(null);
  };

  return {
    photos,
    loading,
    error,
    searchTerm,
    searchPhotos,
    clearSearch
  };
};