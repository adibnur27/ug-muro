
import { supabase } from "../lib/supabaseClient";

/**
 * Ambil data workshop dengan pagination & search dari Supabase
 * @param {string} search - kata kunci pencarian
 * @param {number} page - halaman aktif
 * @param {number} limit - jumlah data per halaman
 */
export const getWorkshop = async (search = "", page = 1, limit) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("workshop")
    .select("*", { count: "exact" })
    .order("id", { ascending: true })
    .range(from, to);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, count, error } = await query;

  if (error) throw error;

  return { data, count };
};

// upload file to storage
export const uploadFile = async (file, bucket, folder) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage.from(bucket).upload(filePath, file);

  if (error) throw error;

  // get public url
  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

// add workshop
export const addWorkshop = async (formData) => {
  const { title, description, start_date, registration_open, registration_close, image, module } = formData;

  const imageUrl = await uploadFile(image, "workshop-images", "images");
  const moduleUrl = await uploadFile(module, "workshop-module", "modules");

  const { data, error } = await supabase.from("workshop").insert([
    {
      title,
      description,
      start_date,
      registration_open,
      registration_close,
      module_file: moduleUrl,
      image_url: imageUrl,
    },
  ]);
  if (error) throw error;
  return data;
};

// update workshop
export const updateWorkshop = async (id, formData) => {
  const { title, description, start_date, registration_open, registration_close, image, module } = formData;

  let imageUrl = null;
  let moduleFile = null;
  // Upload image hanya kalau ada file baru
  if (image instanceof File) {
    imageUrl = await uploadFile(image, "workshop-images", "images");
  }

  // Upload module hanya kalau ada file baru
  if (module instanceof File) {
    moduleFile = await uploadFile(module, "workshop-module", "modules");
  }


  const { data, error } = await supabase
    .from("workshop")
    .update({
      title,
      description,
      start_date,
      registration_open,
      registration_close,
      ...(imageUrl && { image_url: imageUrl }),
      ...(moduleFile && { module_file: moduleFile })
    })
    .eq("id", id);
    
  if (error) throw error;
  return data;
};



export const deleteWorkshop = async (id, imageUrl, moduleUrl) => {
  // ambil path dari URL
  const getPathFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split("/storage/v1/object/public/");
    return parts.length > 1 ? parts[1] : null;
  };

  const imagePath = getPathFromUrl(imageUrl);
  const modulePath = getPathFromUrl(moduleUrl);

  // hapus file gambar
  if (imagePath) {
    await supabase.storage
      .from(imagePath.split("/")[0])
      .remove([imagePath.replace(`${imagePath.split("/")[0]}/`, "")]);
  }

  // hapus file module
  if (modulePath) {
    await supabase.storage
      .from(modulePath.split("/")[0])
      .remove([modulePath.replace(`${modulePath.split("/")[0]}/`, "")]);
  }

  // hapus data dari tabel
  const { error } = await supabase
    .from("workshop")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
};
