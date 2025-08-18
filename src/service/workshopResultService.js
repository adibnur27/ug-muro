import { supabase } from "../lib/supabaseClient";

// Update function getWorkshopResults di workshopResultService.js
export async function getWorkshopResults(page, limit) {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("workshop_results")
      .select(
        `
        id,
        status,
        created_at,
        participants (
          id,
          name,
          npm,
          email,
          workshop_id,
          workshop (
            id,
            title,
            description,
            start_date,
            registration_close,  
            registration_open
          )
        )
      `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    const transformedData = data.map((result) => ({
      id: result.id,
      status: result.status,
      created_at: result.created_at,
      participant: result.participants
        ? {
            id: result.participants.id,
            name: result.participants.name,
            npm: result.participants.npm,
            email: result.participants.email,
            workshop_id: result.participants.workshop_id,
            workshop: result.participants.workshop,
          }
        : null,
    }));

    return {
      results: transformedData,
      total: count,
    };
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

// ✅ TAMBAHAN: Function untuk update workshop result
export async function updateWorkshopResult(id, rowData) {
  console.log("Updating workshop result:", id, rowData);

  try {
    const dataToUpdate = {
      participant_id: rowData.participant_id,
      status: rowData.status,
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
