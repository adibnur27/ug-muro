import React, { useRef, useState } from "react";
import { downloadWorkshopTemplate, parseWorkshopResultFile } from "../../../../../utils/excelUtils";
import { uploadWorkshopResultsFromExcel } from "../../../../../service/workshopResultService";
import Swal from "sweetalert2";

export default function WorkshopListUpload({ onUploadSuccess, workshops }) {

    const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/\.(xlsx|xls)$/i.test(file.name)) {
      Swal.fire("Error", "Format file harus .xlsx atau .xls", "error");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      Swal.fire("Warning", "Pilih file Excel terlebih dahulu", "warning");
      return;
    }

    setLoading(true);
    try {
      const fileBuffer = await selectedFile.arrayBuffer();
      const rows = await parseWorkshopResultFile(fileBuffer);

      if (!rows || rows.length === 0) {
        throw new Error("File kosong atau format tidak sesuai");
      }

      await uploadWorkshopResultsFromExcel(rows);
      if (onUploadSuccess) onUploadSuccess();

      Swal.fire("Success", `Data berhasil diunggah: ${rows.length} record`, "success");

      // ✅ reset input file
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error parsing Excel file:", err);
      Swal.fire("Error", `Gagal membaca file Excel: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };


  

  return (
    <div className="flex justify-evenly gap-2 rounded w-[1/2] box-border">
      {/* Upload File */}
      <div className="bg-blue-200 p-2 rounded w-1/2">
        <h2 className="text-sm font-semibold mb-2 text-center">Upload Data Workshop</h2>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="border p-1 rounded w-full mb-2"
        />
        <button
          onClick={handleSubmit}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Submit"}
        </button>
      </div>

      {/* Download Template */}
      <div className="bg-green-200 p-2 rounded w-1/2">
        <h2 className="text-sm font-semibold mb-2 text-center">Download Data Workshop</h2>
        <select
          value={selectedWorkshopId}
          onChange={(e) => {
            const id = e.target.value;
            setSelectedWorkshopId(id);
            const workshop = workshops.find((w) => w.id === id);
            setSelectedWorkshop(workshop);
          }}
          className="border p-1 rounded w-full mb-2"
        >
          <option value="">-- Pilih Workshop --</option>
          {workshops.map((w) => (
            <option key={w.id} value={w.id}>
              {w.title} ({w.start_date} - {w.end_date})
            </option>
          ))}
        </select>
        <button
          onClick={() => downloadWorkshopTemplate(selectedWorkshop)}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 w-full"
        >
          Download Template
        </button>
      </div>
    </div>
  );
}
