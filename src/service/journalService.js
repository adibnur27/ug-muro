import { supabase } from "../lib/supabaseClient";

export const uploadJournal = async(file) => {
    const fileName = `${Date.now()}-${file.name}`;

    const {data,error} = await supabase.storage
    .from("journal-files")
    .upload(fileName,file);

    if(error) {
        console.log("upload Error",error.message);
        return null;
    }


    // ambil url publik
    const {data: urlData} = supabase.storage
    .from("journal-files")
    .getPublicUrl(fileName);

    return urlData.publicUrl;
}

export const addJournal = async(title,authors,fileUrl) => {
    const {data, error} = await supabase
    .from("journals")
    .insert([
        {
            title,
            authors,
            file_url: fileUrl,
        },
    ]);

    if (error) {
        console.log("Insert Error", error.message);
       throw error;
    }

    return data;
}


export const getJournal = async() => {
    const {data, error} = await supabase
    .from("journals")
    .select("*");

    if(error) throw error;

    return data;
}


export const updateJournal = async(id,title,authors,fileUrl) => {

    const {data, error} = await supabase
    .from("journals")
    .update({
        title: title,
        authors: authors,
        file_url: fileUrl
    })
    .eq("id",id);

    if (error) throw error;

    return data;

}

export const deleteJournal = async(id) => {
    const {data,error} = await supabase
    .from("journals")
    .delete()
    .eq("id", id);

    if (error) throw error;

    return data;
}