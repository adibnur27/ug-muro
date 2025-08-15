import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { downloadWorkshopTemplate, parseWorkshopResultFile } from "../../../../../utils/excelUtils";
import { uploadWorkshopResultsFromExcel } from "../../../../../service/workshopResultService";

export default function WorkshopListUpload({ onUploadComplete }) {
  const [loading, setLoading] = useState(false);
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const { data, error } = await supabase.from("workshop").select("id, title");
      if (error) {
        console.error("Gagal memuat workshop:", error);
        return;
      }
      setWorkshops(data || []);
    };
    fetchWorkshops();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi format file
    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      alert("Format file harus .xlsx atau .xls");
      e.target.value = "";
      return;
    }

    // Validasi size file (opsional, misalnya max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleDownload = async () => {
    if (!selectedWorkshop) {
      alert("Pilih workshop terlebih dahulu");
      return;
    }
    await downloadWorkshopTemplate(selectedWorkshop);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Pilih file Excel terlebih dahulu");
      return;
    }

    setLoading(true);
    try {
      // Pastikan file masih bisa diakses
      const fileBuffer = await selectedFile.arrayBuffer();
      const rows = await parseWorkshopResultFile(fileBuffer);
      console.log("data saat submit:", JSON.stringify(rows, null, 2));

      if (!rows || !Array.isArray(rows) || rows.length === 0) {
        throw new Error("File kosong atau format tidak sesuai");
      }

      // Filter data yang valid
      const validRows = rows.filter((row) => row.participant_id && row.status);

      if (validRows.length === 0) {
        throw new Error("Tidak ada data valid yang ditemukan");
      }

      // Gunakan batch upload instead of loop
      await uploadWorkshopResultsFromExcel(validRows);

      if (onUploadComplete) onUploadComplete();
      alert(`Data berhasil diunggah: ${validRows.length} record`);
    } catch (err) {
      console.error("Error parsing Excel file:", err);
      if (err.name === "NotReadableError") {
        alert("File tidak bisa dibaca. Pastikan file sudah ditutup dari Excel sebelum upload.");
      } else {
        alert(`Gagal membaca file Excel: ${err.message}`);
      }
    } finally {
      setLoading(false);
      setSelectedFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-lg font-semibold mb-2">Download & Upload Hasil Workshop</h2>

      {/* Pilih Workshop */}
      <select value={selectedWorkshop} onChange={(e) => setSelectedWorkshop(e.target.value)} className="border p-2 rounded mb-2 w-full">
        <option value="">-- Pilih Workshop --</option>
        {workshops.map((ws) => (
          <option key={ws.id} value={ws.id}>
            {ws.title}
          </option>
        ))}
      </select>

      {/* Tombol Download */}
      <button onClick={handleDownload} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 w-full">
        Download Template
      </button>

      {/* Upload File */}
      <div className="mt-3">
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="border p-2 rounded w-full" />
      </div>

      {/* Tombol Submit */}
      <button onClick={handleSubmit} className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 w-full" disabled={loading}>
        {loading ? "Memproses..." : "Submit"}
      </button>
    </div>
  );
}
