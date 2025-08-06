import {supabase} from '../lib/supabaseClient';


export const login = async (email,password) => {
    const {data,error} = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error) throw error;
    return data;

};

export const logout = async() => {
    return supabase.auth.signOut();
}


export const getCurrentUser = async() => {
    const { data: {user} } = await supabase.auth.getUser();
    return user;
}

export const getCurrentSession = async() => {
    const {data, error} = await supabase.auth.getSession();
    if(error) throw new Error ("gagal mendapatkan sesi pengguna");

    return data?.session || null;
}


export const checkIsAdmin = async() => {
    const session = await getCurrentSession();

    if(!session) throw new Error("Belum Login");
    console.log(session);
    const role = session.user.app_metadata?.role;
    if (role !== "admin") throw new Error ("Kamu bukan admin");

    return {
        user: session.user,
        accessToken: session.access_token,
    }
}