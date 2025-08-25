import React, { useState, useCallback } from "react";
import { LoaderOne } from "../../../component/ui/loader";
import { useWorkshop } from "../../../context/WorkshopContext/WorkshopContext";
import Swal from "sweetalert2";
import Input from "./Input";

const WorkshopFormParticipant = ({ onSubmit, isSubmitting = false }) => {
  const { workshop = [], error, loading } = useWorkshop();

  const [form, setForm] = useState({
    name: "",
    npm: "",
    email: "",
    workshop_id: "",
  });

  // Memoize handleChange untuk mencegah re-render berlebihan
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Memoize handleSubmit dan tambahkan error handling yang lebih baik
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Validasi form sebelum submit
    if (!form.name.trim() || !form.npm.trim() || !form.email.trim() || !form.workshop_id) {
      Swal.fire("Error", "Semua field harus diisi", "error");
      return;
    }

    try {
      if (typeof onSubmit === 'function') {
        await onSubmit(form);
        // Hanya tampilkan success jika tidak ada error
        await Swal.fire("Berhasil!", "Pendaftaran berhasil disimpan", "success");
        // Reset form setelah berhasil
        setForm({ name: "", npm: "", email: "", workshop_id: "" });
      }
    } catch (error) {
      console.error("Submit error:", error);
      await Swal.fire("Error", `Data gagal disimpan: ${error.message || 'Unknown error'}`, "error");
    }
  }, [form, onSubmit]);

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto lg:w-2/5 w-full pt-10 flex justify-center">
        <LoaderOne />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mx-auto lg:w-2/5 w-full pt-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading workshops: {error.message || 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto relative lg:w-2/5 w-full pt-5 bg-white/90 p-6 rounded-lg "
    >
      {isSubmitting && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center k z-10 rounded-lg">
          <LoaderOne />
        </div>
      )}

      <h2 className="text-2xl font-bold text-center mb-16">Form Pendaftaran Workshop</h2>

      <div className="space-y-5">
        <div>
          <Input name={"name"} value={form.name} onChange={handleChange} label={"username"}/>
        </div>

        <div>
          <Input name={"npm"} value={form.npm} onChange={handleChange} label={"npm"}/>
        </div>

        <div>
          <Input name={"email"} value={form.email} onChange={handleChange} label={"email"} type="email"/>
        </div>

        <div >
          <label htmlFor="workshop_id" className="block mb-2">Workshop *</label>
          <select
            id="workshop_id"
            name="workshop_id"
            value={form.workshop_id}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
            disabled={isSubmitting}
          >
            <option value="">Pilih workshop</option>
            {Array.isArray(workshop) && workshop.map((w) => (
              <option key={w.id} value={w.id} className="hover:bg-black">
                {w.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="text-md font-bold text-center my-5 text-gray-600">Pastikan data yang anda kirim sudah benar</h2>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2  rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors "
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Daftar Workshop"}
      </button>
    </form>
  );
};

export default WorkshopFormParticipant;