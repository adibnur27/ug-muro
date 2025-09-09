import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { getWorkshopResultsByName } from "../../../service/workshopResultService";
import { downloadWorkshopResultByName } from "../../../utils/excelUtils";

export default function WorkshopResultDownloadList() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const { data, error } = await supabase.from("workshop_results").select("workshop_name, start_date, end_date");

      if (error) {
        console.error(error);
        return;
      }

      // 🔹 Grup berdasarkan workshop_name biar unik
      const unique = [];
      const seen = new Set();

      data.forEach((item) => {
        if (!seen.has(item.workshop_name)) {
          seen.add(item.workshop_name);
          unique.push({
            workshop_name: item.workshop_name,
            start_date: item.start_date,
            end_date: item.end_date,
          });
        }
      });

      setWorkshops(unique);
    };

    fetchWorkshops();
  }, []);
  console.log(workshops);

  const handleDownload = async (workshop) => {
    const rows = await getWorkshopResultsByName(workshop);
    await downloadWorkshopResultByName(workshop, rows);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {workshops.map((w,i) => (
        <div key={`${i}${w.title}_${w.start_date}_${w.end_date}`} className="bg-white shadow rounded-lg p-4 flex flex-col justify-between">
          <h3 className="font-semibold text-black text-center text-lg mb-2">{w.workshop_name}</h3>
          <p className="text-sm text-black mb-2">
            <span className="text-black font-bold">Tanggal Mulai:</span> {w.start_date}
          </p>
          <p className="text-sm text-black mb-2">
            <span className="text-black font-bold">Tanggal selesai: </span>{w.end_date}
          </p>
          <button onClick={() => handleDownload(w)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
            Download Hasil
          </button>
        </div>
      ))}
    </div>
  );
}
