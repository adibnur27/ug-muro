// utils/excelUtils.js
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { supabase } from "../lib/supabaseClient";
import Swal from "sweetalert2";

/**
 * Download template workshop_results berdasarkan nama workshop yang dipilih
 * @param {string} workshopName
 */
export const downloadWorkshopTemplate = async (workshop) => {
  
  if (!workshop) {
    Swal.fire("warning","Pilih workshop terlebih dahulu!","warning");
    return;
  }

  const {title, start_date, end_date} = workshop;

  // Header sesuai tabel workshop_results
  const headers = [
    "name",
    "npm",
    "email",
    "status",
    "start_date",
    "end_date",
    "workshop_name"
  ];

  // Isi pertama, workshop_name langsung diisi biar admin tidak typo
  const firstRow = ["", "", "", "", start_date, end_date, title];

  // Buat worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([headers, firstRow]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

  // Export Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(blob, `workshop_template_${workshop.title}_${workshop.start_date}_${workshop.end_date}.xlsx`);
};


// utils/excelUtils.js
export function parseWorkshopResultFile(fileBuffer) {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);

  return rows.map((row) => ({
    name: row.name || "",
    npm: row.npm || "",
    email: row.email || "",
    workshop_name: row.workshop_name || "",
    status: row.status || "",
    start_date: row.start_date || null,
    end_date: row.end_date || null,
  }));
}



export async function downloadWorkshopResultByName(workshop, rows) {
  if (!rows || rows.length === 0) {
    alert(`Tidak ada data untuk workshop: ${workshop.workshop_name}`);
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  XLSX.writeFile(workbook, `${workshop.workshop_name}${workshop.start_date}_${workshop.end_date}_results.xlsx`);
}