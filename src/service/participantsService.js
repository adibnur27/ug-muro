import { supabase } from "../lib/supabaseClient";


// get Participants
export const getAllParticipants = async() => {
    const { data, error } = await supabase
    .from("participants")
    .select("*")
    .order("created_at", {ascending: false});
    if (error) throw error;
    console.log("data participant: ",data);
    return data || []; 
}


// get participant by npm
export const getParticipantByNPM = async (npm) => {
    const {data, error} = await supabase
    .from("participants")
    .select("*")
    .eq("npm", npm)
    .single();

    if (error) throw error;
    return data;
}

export const addParticipant = async(participant) => {

    const {name, npm, email, workshop_id } = participant;

    const {data,error} = await supabase
    .from("participants")
    .insert({
        name,
        npm,
        email,
        workshop_id,
    })

    if(error) throw error;
    return data;
}

export const updateParticipant = async(id,participant) => {

    const {name, npm, email, workshop_id } = participant;

    const {data,error} = await supabase
    .from("participants")
    .update({
        name,
        npm,
        email,
        workshop_id,
    })
    .eq("id",id);

    if(error) throw error;
    return data;
}

export const deleteParticipant = async(id) => {
    const {error} = await supabase
    .from("participants")
    .delete()
    .eq("id",id);

    if (error) throw error;

    return true;
}