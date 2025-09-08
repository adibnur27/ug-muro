import React, { useState, useEffect } from "react";
import { createWorkshopResult, updateWorkshopResult } from "../../../../../service/workshopResultService";
import Swal from "sweetalert2";
import { useWorkshop } from "../../../../../context/WorkshopContext/WorkshopContext";

export default function WorkshopResultForm({ initialData = null, onClose }) {
  const { workshop } = useWorkshop();

  console.log("from form", workshop);

  const [formData, setFormData] = useState({
    name: "",
    npm: "",
    email: "",
    status: "",
    workshop: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  console.log("from workshopresult form", initialData);

  // Status options
  const statusOptions = [
    { value: "lulus", label: "Lulus" },
    { value: "tidak_lulus", label: "Tidak Lulus" },
    { value: "pending", label: "Pending" },
  ];

  // Mode Edit vs Create
  const isEditMode = Boolean(initialData);

  // Kalau ada data dari parent → isi form (edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        npm: initialData.npm || "",
        email: initialData.email || "",
        status: initialData.status || "",
        workshop: initialData.workshop_name || "",
        start_date: initialData.start_date || "",
        end_date: initialData.end_date || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "workshop") {
      const selectedWorkshop = workshop.find((w) => w.title === value);
      if (selectedWorkshop) {
        setFormData((prev) => ({
          ...prev,
          workshop: value,
          start_date: selectedWorkshop.start_date?.split("T")[0] || "",
          end_date: selectedWorkshop.end_date?.split("T")[0] || "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          workshop: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.npm || !formData.email || !formData.workshop || !formData.status || !formData.start_date || !formData.end_date) {
      Swal.fire("Error", "Semua field wajib diisi", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditMode) {
        await updateWorkshopResult(initialData.id, formData);
        await Swal.fire("Berhasil!", "Data berhasil diupdate", "success");
      } else {
        await createWorkshopResult(formData);
        await Swal.fire("Berhasil!", "Data berhasil ditambahkan", "success");
      }
      onClose(true); // refresh parent
    } catch (err) {
      Swal.fire("Error", err.message || "Gagal menyimpan data", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Workshop Result" : "Tambah Workshop Result"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-1 border rounded-lg" required />
          </div>

          {/* NPM */}
          <div>
            <label className="block text-sm font-medium">NPM</label>
            <input type="text" name="npm" value={formData.npm} onChange={handleChange} className="w-full p-1 border rounded-lg" required />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-1 border rounded-lg" required />
          </div>

          {/* Workshop */}
          <div>
            <label className="block text-sm font-medium">Workshop</label>
            <select name="workshop" value={formData.workshop} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
              <option value="">-- Pilih Workshop --</option>
              {workshop.map((w) => (
                <option key={w.id} value={w.title}>
                  {w.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between">
            {/* start date */}

            <div className="">
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-500">
                Start Date
              </label>
              <input type="date" name="start_date" id="start_date" className="w-full p-2 border rounded-lg text-gray-500" value={formData.start_date} onChange={handleChange} required readOnly />
            </div>
            {/* End Date */}
            <div className="">
              <label htmlFor="end_date" className="block text-sm font-medium text-gray-500">
                End Date
              </label>
              <input type="date" name="end_date" id="end_date" className="w-full p-2 border rounded-lg text-gray-500" value={formData.end_date} onChange={handleChange} required readOnly />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-lg" required>
              <option value="">-- Pilih Status --</option>
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => onClose(false)} className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg" disabled={loading}>
              Batal
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg" disabled={loading}>
              {loading ? "Menyimpan..." : isEditMode ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
