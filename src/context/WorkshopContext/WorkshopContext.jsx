import { createContext, useContext, useEffect, useState } from "react";
import { getWorkshop } from "../../service/workshopService";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabaseClient";



const WorkshopContext = createContext();

export const WorkshopProvider = ({children}) => {
    const [workshop, setWorkshop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWorkshop = async() => {
        try {
            setLoading(true)
            const data = await supabase
            .from("workshop").select("*");
            setWorkshop(data.data);
        } catch (error) {
            Swal.fire("Error",`Data Workshop gagal Diambil ${error}`, "error");
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
       fetchWorkshop(); 
    },[])



    return (
        <WorkshopContext.Provider value={{ workshop, loading, error, refetch: fetchWorkshop }}>
            { children }
        </WorkshopContext.Provider>
    )
};

export const useWorkshop = () => {
    return useContext(WorkshopContext);
};