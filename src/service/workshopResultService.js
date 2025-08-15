import { supabase } from "../lib/supabaseClient";

export async function getWorkshopResults() {
  const { data, error } = await supabase.from("workshop_results").select(`
      id,
      status,
      participant:participants!fk_workshop_results_participant (
        id,
        name,
        npm,
        email,
        workshop:workshop(title)
      )
    `);

  if (error) {
    console.error("Error fetching workshop results:", error);
    return [];
  }
  return data;
}

export async function updateWorkshopResult(id, payload) {
  const { error } = await supabase.from("workshop_results").update(payload).eq("id", id);

  if (error) throw error;
}

// GUNAKAN INI untuk batch upload dari Excel
export async function uploadWorkshopResultsFromExcel(rows) {
  console.log("Batch uploading workshop results:", rows.length, "records");

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

  console.log("Successfully inserted:", data?.length || 0, "records");
  return data;
}

// GUNAKAN INI hanya untuk create individual record (bukan dari Excel)
export async function createWorkshopResult(rowData) {
  console.log("Creating single workshop result:", rowData);

  try {
    const dataToInsert = {
      participant_id: rowData.participant_id,
      status: rowData.status,
    };

    const { data, error } = await supabase.from("workshop_results").insert([dataToInsert]).select();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Failed to create workshop result:", err.message);
    throw err;
  }
}

export default createWorkshopResult;


export const deleteWorkshopResult = async(id) => {
  const {data, error} = await supabase
  .from("workshop_results")
  .delete()
  .eq("id", id);

  if(error) throw error;

  return data;
}
