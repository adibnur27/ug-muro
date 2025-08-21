// File: service/galleryService.js
import { supabase } from "../lib/supabaseClient";

// service untuk upload photo
export const uploadPhoto = async (file, albumId = null, newAlbumTitle = null) => {
  console.log("console form service:", file, albumId, newAlbumTitle);
  try {
    let album_id = albumId;

    //1. kalau ada newAlbumTitle, buat album baru
    if (newAlbumTitle && newAlbumTitle.trim() !== '') {
      const { data: albumData, error: albumerror } = await supabase
        .from("albums")
        .insert([{ title: newAlbumTitle.trim() }])
        .select()
        .single();

      if (albumerror) throw albumerror;
      album_id = albumData.id;
    }

    // Validasi: harus ada album_id atau newAlbumTitle
    if (!album_id && (!newAlbumTitle || newAlbumTitle.trim() === '')) {
      throw new Error("Harus Pilih Album atau Tambah Album Baru Terlebih Dahulu");
    }

    // 2. upload file ke bucket
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${album_id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery-photos")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // 3. Dapatkan Public Url File
    const { data: publicUrlData } = supabase.storage
      .from("gallery-photos")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    // 4. simpan ke tabel photo
    const { data: photoData, error: photoError } = await supabase
      .from("photos")
      .insert([
        {
          album_id,
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    if (photoError) throw photoError;

    return { photo: photoData, album_id };
  } catch (error) {
    console.log("Error Upload Photo:", error);
    throw error;
  }
};

// get albums
export const getAlbums = async () => {
  const { data, error } = await supabase
    .from("albums")
    .select("*")
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};

// get albums with photo count
export const getAlbumsWithPhotoCount = async () => {
  try {
    // 1. Ambil semua album
    const { data: albums, error: albumsError } = await supabase
      .from("albums")
      .select("*")
      .order("created_at", { ascending: false });

    if (albumsError) throw albumsError;
    if (!albums) return [];

    // 2. Ambil semua foto
    const { data: photos, error: photosError } = await supabase
      .from("photos")
      .select("id, album_id, image_url, created_at")
      .order("created_at", { ascending: false }); // Urutkan dari yang terbaru

    if (photosError) throw photosError;

    // 3. Proses data di client-side untuk menggabungkan informasi
    const albumsWithDetails = albums.map((album) => {
      // Filter foto yang sesuai untuk album ini
      const photosInAlbum = photos.filter((photo) => photo.album_id === album.id);

      // Cari foto terbaru (karena sudah diurutkan, ambil yang pertama)
      const latestPhoto = photosInAlbum.length > 0 ? photosInAlbum[0] : null;

      return {
        ...album,
        photo_count: photosInAlbum.length, // Hitung jumlah foto
        latest_photo: latestPhoto, // Tambahkan data foto terbaru
      };
    });

    return albumsWithDetails;
    
  } catch (error) {
    console.error("Error fetching albums with photo count:", error);
    throw error;
  }
};

// get all photos
export const getAllPhotos = async () => {
  const { data, error } = await supabase
    .from("photos")
    .select(`
      *,
      albums(
        id,
        title
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};

// get photos by album id
export const getPhotosByAlbumId = async (albumId) => {
  if (!albumId) throw new Error("Album ID is required");

  const { data, error } = await supabase
    .from("photos")
    .select(`
      *,
      albums(
        id,
        title
      )
    `)
    .eq('album_id', albumId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};

// get single album with all photos
export const getAlbumWithPhotos = async (albumId) => {
  if (!albumId) throw new Error("Album ID is required");

  const { data, error } = await supabase
    .from("albums")
    .select(`
      *,
      photos(*)
    `)
    .eq('id', albumId)
    .single();

  if (error) throw error;

  return data;
};

// get recent photos (limit)
export const getRecentPhotos = async (limit = 10) => {
  const { data, error } = await supabase
    .from("photos")
    .select(`
      *,
      albums(
        id,
        title
      )
    `)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
};

// search photos by album title
export const searchPhotosByAlbumTitle = async (searchTerm) => {
  if (!searchTerm) return [];

  const { data, error } = await supabase
    .from("photos")
    .select(`
      *,
      albums!inner(
        id,
        title
      )
    `)
    .ilike('albums.title', `%${searchTerm}%`)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
};


// Delete Single Photo

export const deletePhoto = async (photoId) => {
  try {
    // 1. Dapatkan data foto untuk mendapatkan path file
    const { data: photoData, error: photoError } = await supabase
      .from("photos")
      .select("image_url")
      .eq("id", photoId)
      .single();

    if (photoError) throw photoError;

    if (photoData && photoData.image_url) {
      // Ekstrak path file dari URL
      const urlParts = photoData.image_url.split('/');
      const filePath = urlParts.slice(urlParts.indexOf('gallery-photos') + 1).join('/');

      // 2. Hapus file dari Storage
      const { error: storageError } = await supabase.storage
        .from("gallery-photos")
        .remove([filePath]);

      if (storageError) {
        console.warn(
          "Peringatan: Tidak dapat menghapus file dari storage:",
          storageError
        );
      }
    }

    // 3. Hapus record dari database
    const { error: deleteError } = await supabase
      .from("photos")
      .delete()
      .eq("id", photoId);

    if (deleteError) throw deleteError;

    return { success: true, message: "Foto berhasil dihapus" };
  } catch (error) {
    console.error("Error saat menghapus foto:", error);
    throw error;
  }
};

// Delete Album with All photos
export const deleteAlbum = async (albumId) => {
  try {
    // 1. Dapatkan semua foto dalam album
    const { data: photos, error: getPhotosError } = await supabase
      .from("photos")
      .select("id, image_url")
      .eq("album_id", albumId);

    if (getPhotosError) throw getPhotosError;

    // 2. Hapus semua file dari storage
    if (photos && photos.length > 0) {
      const filePaths = photos
        .filter((photo) => photo.image_url)
        .map((photo) => {
            const urlParts = photo.image_url.split('/');
            return urlParts.slice(urlParts.indexOf('gallery-photos') + 1).join('/');
        });

      if (filePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("gallery-photos")
          .remove(filePaths);
        if (storageError) {
          console.warn(
            "Peringatan: Tidak dapat menghapus beberapa file dari Storage",
            storageError
          );
        }
      }

    }
    
    // 3. Hapus semua foto dari database (ini akan otomatis terhapus jika ada relasi ON DELETE CASCADE)
    // Jika tidak ada, baris ini diperlukan:
    const { error: deletePhotosError } = await supabase
        .from("photos")
        .delete()
        .eq("album_id", albumId);
    if (deletePhotosError) throw deletePhotosError;


    // 4. Hapus album dari Database
    const { error: deleteAlbumError } = await supabase
      .from("albums")
      .delete()
      .eq("id", albumId);
    if (deleteAlbumError) throw deleteAlbumError;
    return {
      succes: true,
      message: `Album dan ${photos.length} foto Berhasil dihapus`,
    };
  } catch (error) {
    console.error("Gagal Menghapus album", error);
    throw error;
  }
};

// delete Multiple data foto sekaligus 
export const deleteMultiplePhotos = async(photoIds) => {
  try {
    // 1. Get Semua Photo data
    const {data: photos, error : getError} = await supabase
    .form("photos")
    .select("id, file_path")
    .in("id", photoIds);

    if (getError) throw getError;

    // 2.delete File dari Storage
    const filePaths = photos
    .filter(photo => photo.file_path)
    .map(photo => photo.file_path);

    if (filePaths.length > 0){
      const { error: storageError } = await supabase.storage
      .from("gallery-photos")
      .remove(filePaths);

      if(storageError) {
        console.warn("Warning: Could not delete some files From storage:", storageError);
      };
    }

    // 3. Delete records dari database
    const { error: deleteError} = await supabase
    .from("photos")
    .delete()
    .in("id", photoIds);

    if(deleteError) throw deleteError;

    return {
      success: true,
      message: `${photoIds.length} BerhasilDihapus`
    };
  } catch (error) {
    console.error("error deleting multiple photos:", error);
    throw error;
  }
}