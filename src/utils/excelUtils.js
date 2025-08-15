import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { supabase } from "../lib/supabaseClient";

export const downloadWorkshopTemplate = async (workshopId) => {
  const { data, error } = await supabase
    .from("participants")
    .select(`
      id,
      name,
      npm,
      email,
      workshop:workshop_id ( title )
    `)
    .eq("workshop_id", workshopId);

  if (error) {
    console.error(error);
    alert("Gagal mengambil data peserta");
    return;
  }
  console.log("from excelutils",data[0].workshop.title);

  const headers = ["participant_id", "name", "npm", "email", "workshop_title", "status"];
  const rows = data.map((p) => [
    p.id,
    p.name,
    p.npm,
    p.email,
    p.workshop?.title || "",
    ""
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `workshop_template_${data[0].workshop.title}_${workshopId}.xlsx`);
};

/**
 * Parse file Excel workshop_results dan pastikan semua participant_id valid UUID.
 * @param {File} file - File Excel (.xlsx) yang diupload
 * @returns {Promise<Array<Object>>} - Data hasil parsing siap diinsert ke Supabase
 */

 // pastikan ini sesuai dengan lokasi file validasi UUID

export function parseWorkshopResultFile(fileBuffer) {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);

  const results = [];

  rows.forEach((row) => {
    console.log("fromPharse" ,row);
    const idStr = String(row.participant_id || "").trim();

    // Validasi UUID saja
    

    results.push({
      participant_id: idStr,
      status: row.status || "",
    });
  });

  return results;
}
