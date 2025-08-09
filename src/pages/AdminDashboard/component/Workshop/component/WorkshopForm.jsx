import React, { useState, useEffect } from "react";

const WorkshopForm = ({ initialData = {}, onSubmit, mode = "add" }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    module: null,
    registration_open: "",
    registration_close: "",
    start_date: "",
  });

  useEffect(() => {
    // Jika ada data awal (edit), set default value
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

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
      alert(`Workshop berhasil di${mode === "add" ? "tambah" : "update"}`);
      if (mode === "add") {
        setForm({
          title: "",
          description: "",
          image: null,
          module: null,
          registration_open: "",
          registration_close: "",
          start_date: "",
        });
      }
    } catch (error) {
      alert(`Gagal ${mode === "add" ? "menambahkan" : "mengupdate"} workshop: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">{mode === "add" ? "Tambah" : "Edit"} Workshop</h2>

      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Add title"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div>
        <label>Registration Open</label>
        <input type="date" name="registration_open" value={form.registration_open} onChange={handleChange} className="input" required />
      </div>

      <div>
        <label>Registration Close</label>
        <input type="date" name="registration_close" value={form.registration_close} onChange={handleChange} className="input" required />
      </div>

      <div>
        <label>Start Date</label>
        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="input" required />
      </div>

      <div>
        <label>Image</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="input" {...(mode === "add" ? { required: true } : {})} />
      </div>

      <div>
        <label>Module</label>
        <input type="file" name="module" accept=".pdf" onChange={handleChange} className="input" {...(mode === "add" ? { required: true } : {})} />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {mode === "add" ? "Tambah" : "Update"} Workshop
      </button>
    </form>
  );
};

export default WorkshopForm;
