import React, { useState, useEffect } from "react";
import { LoaderOne } from "../../../../../component/ui/loader"; // pastikan path sesuai
import UploadImage from "../../../../../component/UploadImage/UploadImage";
import UploadFile from "../../../../../component/UploadFile/UploadFile";

const WorkshopForm = ({ initialData = {}, onSubmit, mode = "add", isSubmitting }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    module: null,
    registration_link: "",
    payment_confirmation_link: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  console.log(initialData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);

      if (mode === "add") {
        setForm({
          title: "",
          description: "",
          image: null,
          module: null,
          registration_link: "",
          payment_confirmation_link: "",
          start_date: "",
          end_date: "",
        });
      }
    } catch (error) {
      alert(`Gagal ${mode === "add" ? "menambahkan" : "mengupdate"} workshop: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto space-y-4 relative">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-10">
          <LoaderOne />
        </div>
      )}

      <h2 className="text-xl font-bold">{mode === "add" ? "Tambah" : "Edit"} Workshop</h2>
      <div className="flex gap-10">
        <div className="w-3/5 flex flex-col justify-between">
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={form.title} placeholder="Add title" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <div>
            <label htmlFor="registration_link">Registration Link</label>
            <input type="text" name="registration_link" value={form.registration_link} placeholder="Add Registration Link" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <div>
            <label htmlFor="payment_confirmation_link">payment Confirmation Link</label>
            <input type="text" name="payment_confirmation_link" value={form.payment_confirmation_link} placeholder="Add Payment Confirmation Link" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
          </div>

          <div>
            <label>Start Date: </label>
            <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="input border-2 border-gray-300 px-1 rounded ms-3" required />
          </div>
          <div>
            <label>End Date: </label>
            <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="input border-2 border-gray-300 px-1 rounded ms-3" required />
          </div>
        </div>
        <div>
          <div>
            <label>Image</label>
            <UploadImage
              name="image"
              defaultPreview={form.image} // kalau edit, isi dengan URL
              onChange={(file) => setForm((prev) => ({ ...prev, image: file }))}
            />
          </div>

          <div>
            <label>Module</label>
            <UploadFile name="module" defaultName={typeof form.module === "string" ? form.module.split("/").pop() : ""} onChange={(file) => setForm((prev) => ({ ...prev, module: file }))} />
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : mode === "add" ? "Tambah" : "Update"} Workshop
      </button>
    </form>
  );
};

export default WorkshopForm;
