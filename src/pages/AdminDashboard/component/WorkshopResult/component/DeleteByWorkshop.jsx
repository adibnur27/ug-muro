import React, { useState } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../../../../lib/supabaseClient";

export default function DeleteByWorkshop({ categories, onDeleted }) {
  const [selectedWorkshop, setSelectedWorkshop] = useState("");


  const handleDeleteByWorkshop = async () => {
    if (!selectedWorkshop) {
      Swal.fire("error", "silahkan Pilih Workshop Terlebih Dahulu", "error")
      return;
    };

    const confirmDelete = await Swal.fire({
      title: "Yakin hapus semua?",
      html: `<p>Semua hasil untuk workshop <strong>${selectedWorkshop}</strong> akan dihapus permanen.</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus semua",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const { error } = await supabase
          .from("workshop_results")
          .delete()
          .eq("workshop_name", selectedWorkshop);

        if (error) throw error;

        await Swal.fire(
          "Berhasil!",
          `Semua hasil workshop "${selectedWorkshop}" berhasil dihapus.`,
          "success"
        );

        onDeleted?.(); // refresh data
        setSelectedWorkshop(""); // reset dropdown
      } catch (err) {
        Swal.fire("Gagal", err.message, "error");
      }
    }
  };

  return (
    <div className="bg-red-200 p-2 w-[25%] rounded flex flex-col">
      <h2 className="text-sm font-semibold mb-2 text-center">Upload Data Workshop</h2>
      <select
        value={selectedWorkshop}
        onChange={(e) => setSelectedWorkshop(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">-- Pilih Workshop --</option>
        {categories.map((w) => (
          <option key={w.id} value={w.workshop_name}>
            {w.workshop_name}
          </option>
        ))}
      </select>
      <button
        onClick={handleDeleteByWorkshop}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded w-full"
      >
        Hapus Semua
      </button>
    </div>
  );
}
