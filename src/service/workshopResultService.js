import { supabase } from "../lib/supabaseClient";

// Update function getWorkshopResults di workshopResultService.js
export async function getWorkshopResults() {
  try {
    const { data, error} = await supabase
      .from("workshop_results")
      .select("*"
      )

    if (error) throw error;

   

    return {data};
  } catch (err) {
    console.error("Error fetching workshop results:", err.message);
    throw err;
  }
}

// GUNAKAN INI untuk batch upload dari Excel
export async function uploadWorkshopResultsFromExcel(rows) {
  console.log("Batch uploading workshop results:", rows);
  
  // Format data sesuai skema database
  const formatted = rows.map((row) => ({
    participant_id: row.participant_id,
    status: row.status,
  }));

  const { data, error } = await supabase.from("workshop_results").insert(formatted).select();

  if (error) {
    console.error("Error batch inserting workshop results:", error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

// GUNAKAN INI hanya untuk create individual record (bukan dari Excel)
export async function createWorkshopResult(rowData) {
  const {name, npm, email, status, workshop } =  rowData;

  try {
    const dataToInsert = {
      name,
      npm,
      email,
      status,
      workshop_name: workshop,
    };

    const { data, error } = await supabase.from("workshop_results").insert([dataToInsert]);

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Failed to create workshop result:", err.message);
    throw err;
  }
}

export default createWorkshopResult;

// ✅ TAMBAHAN: Function untuk update workshop result
export async function updateWorkshopResult(id, rowData) {
  console.log("Updating workshop result:", id, rowData);

  try {
    const dataToUpdate = {
      name: rowData.name,
      npm: rowData.npm,
      email: rowData.email,
      status: rowData.status,
      workshop_name: rowData.workshop, // konsisten sama create
    };

    const { data, error } = await supabase
      .from("workshop_results")
      .update(dataToUpdate)
      .eq("id", id)
      .select();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Failed to update workshop result:", err.message);
    throw err;
  }
}


export const deleteWorkshopResult = async(id) => {
  const {data, error} = await supabase
  .from("workshop_results")
  .delete()
  .eq("id", id);

  if(error) throw error;

  return data;
}
