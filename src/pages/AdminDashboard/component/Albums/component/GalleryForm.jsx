// File: AdminProfile/Albums/component/GalleryForm.jsx
import React, { useEffect, useState } from "react";
import { getAlbums } from "../../../../../service/galleryService";
import Swal from "sweetalert2";

const GalleryForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState("");
  const [newAlbumTitle, setNewAlbumTitle] = useState("");

  useEffect(() => {
    const dataAlbums = async () => {
      try {
        const data = await getAlbums();
        setAlbums(data);
      } catch (error) {
        Swal.fire("Error", `Gagal mendapatkan data album: ${error.message}`, "error");
      }
    };
    dataAlbums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      Swal.fire("Warning", "Silahkan pilih File Terlebih Dahulu", "warning");
      return;
    }

    // Validasi: harus pilih album atau input album baru
    if (!albumId && (!newAlbumTitle || newAlbumTitle.trim() === '')) {
      Swal.fire("Warning", "Silahkan pilih album atau tambah album baru", "warning");
      return;
    }

    // Jika user input album baru, reset albumId agar tidak konflik
    const finalAlbumId = newAlbumTitle && newAlbumTitle.trim() !== '' ? null : albumId;
    const finalNewAlbumTitle = newAlbumTitle && newAlbumTitle.trim() !== '' ? newAlbumTitle.trim() : null;

    console.log("Submit data:", {
      file,
      albumId: finalAlbumId,
      newAlbumTitle: finalNewAlbumTitle,
    });

    try {
      // Fix: Panggil onUpload dengan parameter terpisah
      await onUpload(file, finalAlbumId, finalNewAlbumTitle);
      
      // Reset form setelah berhasil
      setFile(null);
      setAlbumId("");
      setNewAlbumTitle("");
      
      // Reset file input
      const fileInput = document.getElementById("photo");
      if (fileInput) fileInput.value = "";
      
      Swal.fire("Success", "Berhasil Mengupload Foto", "success");
    } catch (error) {
      Swal.fire("Error", `Gagal Mengupload Photo: ${error.message}`, "error");
    }
  };

  // Handler untuk clear album selection ketika user mulai mengetik album baru
  const handleNewAlbumChange = (e) => {
    const value = e.target.value;
    setNewAlbumTitle(value);
    // Jika user mengetik album baru, clear selection album existing
    if (value.trim() !== '') {
      setAlbumId("");
    }
  };

  // Handler untuk clear new album input ketika user pilih existing album
  const handleAlbumChange = (e) => {
    const value = e.target.value;
    setAlbumId(value);
    // Jika user pilih existing album, clear new album input
    if (value !== '') {
      setNewAlbumTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
          Pilih Foto *
        </label>
        <input 
          type="file" 
          id="photo" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
        />
      </div>

      {/* Dropdown Albums Existing */}
      <div>
        <label htmlFor="albumChoice" className="block text-sm font-medium text-gray-700">
          Pilih Album Existing
        </label>
        <select
          id="albumChoice"
          value={albumId}
          onChange={handleAlbumChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
          disabled={newAlbumTitle && newAlbumTitle.trim() !== ''}
        >
          <option value="">- Pilih Album -</option>
          {albums.map((album) => (
            <option value={album.id} key={album.id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>

      {/* Atau */}
      <div className="text-center text-gray-500 font-medium">
        ATAU
      </div>

      {/* Input album baru */}
      <div>
        <label htmlFor="addAlbumTitle" className="block text-sm font-medium text-gray-700">
          Tambahkan Album Baru
        </label>
        <input 
          type="text" 
          value={newAlbumTitle} 
          id="addAlbumTitle" 
          onChange={handleNewAlbumChange}
          placeholder="Nama album baru..."
          className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
          disabled={albumId !== ''}
        />
      </div>

      <button 
        type="submit" 
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Upload Photo
      </button>
    </form>
  );
};

export default GalleryForm;