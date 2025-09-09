// UG-MURO/src/pages/AdminDashboard/component/Albums/Albums.jsx

import React, { useState } from "react";
import GalleryDisplay from "./component/GalleryDisplay";
import GalleryForm from "./component/GalleryForm";
import { uploadPhoto } from "../../../../service/galleryService";
import Swal from "sweetalert2";

const Albums = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUpload = async (file, albumId, newAlbumTitle) => {
    try {
      await uploadPhoto(file, albumId, newAlbumTitle);
      Swal.fire("Success", "Berhasil Mengupload Foto", "success");
      setRefreshTrigger(prev => prev + 1); // Memicu refresh
    } catch (error) {
      Swal.fire("Error", `Gagal Mengupload Photo: ${error.message}`, "error");
    }
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GalleryDisplay refreshTrigger={refreshTrigger} />
        </div>
        <div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Upload Foto Baru</h3>
            <GalleryForm onUpload={handleUpload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;