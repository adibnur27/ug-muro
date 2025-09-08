import React, { useState, useEffect } from "react";
import WorkshopResultList from "./component/WorkshopResultList";
import WorkshopResultForm from "./component/WorkshopResultForm";
import WorkshopResultUpload from "./component/WorkshopListUpload";
import { deleteWorkshopResult, getWorkshopResults } from "../../../../service/workshopResultService";
import { supabase } from "../../../../lib/supabaseClient";
import Swal from "sweetalert2";
import WorkshopResultFilter from "./component/WorkshopResultFilter";
import Pagination from "../../../../component/Pagination/Pagination";
import SearchBar from "../../../../component/SearchBar/SearchBar"; // ✅ sesuaikan path
import DeleteByWorkshop from "./component/DeleteByWorkshop";
import { useWorkshop } from "../../../../context/WorkshopContext/WorkshopContext";

export default function WorkshopResult() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);

  // workshop from context
  const {workshop} = useWorkshop()

  // Pagination States
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  // Filter states
  const [categories, setCategories] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // ✅ state pencarian
  console.log(searchQuery);


  const getDataWorkshopResults = async (query = "", currentPage = page) => {
    try {
      const { data, count } = await getWorkshopResults(
        query,
        currentPage,
        limit,
        selectedWorkshop, // ✅ kirim workshopId
        selectedStatus // ✅ kirim status
      );
      setResults(data);
      setTotal(count);
    } catch (error) {
      Swal.fire("error", `Data gagal diambil ${error}`, "error");
    }
  };

  // Ambil data hasil workshop
  useEffect(() => {
    getDataWorkshopResults(searchQuery, page);
  }, [searchQuery, page, selectedWorkshop, selectedStatus]);

  // Ambil daftar kategori workshop
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("workshop_results").select("workshop_name");

        if (error) throw error;

        // ambil hanya nama unik
        const uniqueWorkshops = [...new Set(data.map((d) => d.workshop_name))];

        // set dalam format yang cocok untuk select
        setCategories(uniqueWorkshops.map((name, idx) => ({ id: idx, workshop_name: name })));
      } catch (err) {
        console.error("Error fetching workshops:", err);
      }
    };
    fetchCategories();
  }, []);

  // Event handlers
  const handleWorkshopChange = (e) => {
    setSelectedWorkshop(e.target.value);
    setPage(1);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setPage(1);
  };
  const clearFilters = () => {
    setSelectedWorkshop("");
    setSelectedStatus("");
    setSearchQuery("");
  };

  const handleEdit = (result) => {
    setSelectedResult(result);
    setShowForm(true);
  };

  const handleDelete = async ({ r: data }) => {
    console.log(data);
    const confirmDelete = await Swal.fire({
      title: "Yakin hapus?",
      html: `<p>nama: <strong>${data?.name || "N/A"}</strong></p>
             <p>workshop: <strong>${data?.workshop_name || "N/A"}</strong></p>
             Data akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deleteWorkshopResult(data.id);
        await Swal.fire("Berhasil!", "Workshop Result berhasil dihapus", "success");
        getDataWorkshopResults();
      } catch (err) {
        Swal.fire("Gagal", err.message, "error");
      }
    }
  };

  const handleFormClose = () => {
    setSelectedResult(null);
    setShowForm(false);
    getDataWorkshopResults(searchQuery, page);
  };

  const handleUploadSuccess = async() => {
    await getDataWorkshopResults(searchQuery, page);
  };

  const handleAddNew = () => {
    setSelectedResult(null);
    setShowForm(true);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center my-2">
        <h1 className="text-2xl font-bold text-gray-400 ">Workshop Results</h1>
      </div>
      <div className="flex items-end mb-6 ">
        {/* Search Bar */}
        <div className="flex space-x-2 h-9">
          <SearchBar placeholder="Cari nama, NPM, email, atau workshop..." onSearch={(q) => setSearchQuery(q)} />
          <button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white px-1 py-2 rounded">
            Add Result
          </button>
        </div>
        {/* Upload Excel */}
        <WorkshopResultUpload onUploadSuccess={handleUploadSuccess} workshops={workshop}/>

        <DeleteByWorkshop categories={categories} onDeleted={() => getDataWorkshopResults(searchQuery, page)} />
      </div>

      {/* Filter Section */}
      <WorkshopResultFilter
        categories={categories}
        selectedWorkshop={selectedWorkshop}
        selectedStatus={selectedStatus}
        onWorkshopChange={handleWorkshopChange}
        onStatusChange={handleStatusChange}
        onClearFilters={clearFilters}
        resultsLength={results.length}
        filteredLength={total} // ganti: total hasil dari DB
      />

      {/* List */}
      <WorkshopResultList results={results} onEdit={handleEdit} onDelete={handleDelete} currentPage={page} itemsPerPage={limit} />

      {/* Pagination */}
      {total > limit && (
        <div className="mt-4 flex justify-between items-center px-2">
          <div className="text-gray-400 text-sm">
            Page {page} of {totalPages} pages
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
        </div>
      )}

      {/* Form Edit/Add */}
      {showForm && <WorkshopResultForm initialData={selectedResult} onClose={handleFormClose} />}
    </div>
  );
}
