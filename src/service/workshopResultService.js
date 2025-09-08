import { supabase } from "../lib/supabaseClient";

// get workshop result with searching adn pagination
export async function getWorkshopResults(query = "", page = 1, limit = 10, workshopId = "", status = "") {
  try {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let supabaseQuery = supabase
      .from("workshop_results")
      .select("*", { count: "exact" })
      .range(from, to);

    // 🔎 Search
    if (query) {
      supabaseQuery = supabaseQuery.or(
        `name.ilike.%${query}%,npm.ilike.%${query}%,email.ilike.%${query}%,workshop_name.ilike.%${query}%`
      );
    }

    // 🎯 Filter by Workshop
    if (workshopId) {
      supabaseQuery = supabaseQuery.eq("workshop_name", workshopId);
    }

    // 🎯 Filter by Status
    if (status) {
      supabaseQuery = supabaseQuery.eq("status", status);
    }

    const { data, error, count } = await supabaseQuery;

    if (error) throw error;

    return { data, count };
  } catch (err) {
    console.error("Error fetching workshop results:", err.message);
    throw err;
  }
}



// GUNAKAN INI untuk batch upload dari Excel
// service/workshopResultService.js
export async function uploadWorkshopResultsFromExcel(rows) {
  console.log("Batch uploading workshop results:", rows);

  const formatted = rows.map((row) => ({
    name: row.name,
    npm: row.npm,
    email: row.email,
    workshop_name: row.workshop_name,
    status: row.status,
    start_date: row.start_date,
    end_date: row.end_date,
  }));

  const { data, error } = await supabase
    .from("workshop_results")
    .insert(formatted)
    .select();

  if (error) {
    console.error("Error batch inserting workshop results:", error);
    throw new Error(`Database error: ${error.message}`);
  }

  return data;
}

// GUNAKAN INI hanya untuk create individual record (bukan dari Excel)
export async function createWorkshopResult(rowData) {
  const {name, npm, email, status, workshop, start_date, end_date } =  rowData;

  try {
    const dataToInsert = {
      name,
      npm,
      email,
      status,
      workshop_name: workshop,
      start_date,
      end_date,
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
      workshop_name: rowData.workshop,
      start_date : rowData.start_date, // konsisten sama create
      end_date : rowData.end_date, // konsisten sama create
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
