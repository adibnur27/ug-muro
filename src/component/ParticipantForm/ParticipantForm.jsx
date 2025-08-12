import React, { useState, useEffect } from "react";
import { LoaderOne } from "../ui/loader"; // pastikan path sesuai
import { useWorkshop } from "../../context/WorkshopContext/WorkshopContext";

const ParticipantForm = ({ initialData = {}, onSubmit, mode = "add", isSubmitting }) => {
  const {workshop, error, loading} = useWorkshop();
  
  const [form, setForm] = useState({
    name: "",
    npm: "",
    email: "",
    workshop_id: "",
  });

  


  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);

      if (mode === "add") {
        setForm({
          name: "",
          npm: "",
          email: "",
          workshop_id: null,
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

      <h2 className="text-xl font-bold">{mode === "add" ? "Tambah" : "Edit"} Participant</h2>

      <div className="flex gap-10">
        <div className="w-3/5 flex flex-col justify-between">
          <div>
            <label htmlFor="name">name</label>
            <input type="text" name="name" value={form.name} placeholder="Add name" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" />
          </div>

          <div>
            <label htmlFor="npm">npm</label>
            <input type="text" name="npm" value={form.npm} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded" required />
          </div>

          <div>
            <label>Email </label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input border-2 border-gray-300 px-1 rounded ms-3" required />
          </div>
          <div>
            <label>Workshop </label>
            <select name="workshop_id" value={form.workshop_id || ""} onChange={handleChange} className="input border-2 border-gray-300 px-1 rounded ms-3" required>
              <option value="">pilih workshop</option>
              {workshop.map((w) => {
                return (
                  <option key={w.id} value={w.id}>
                    {w.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={isSubmitting}>
        {isSubmitting ? "Processing..." : mode === "add" ? "Tambah" : "Update"} Workshop
      </button>
    </form>
  );
};

export default ParticipantForm;
