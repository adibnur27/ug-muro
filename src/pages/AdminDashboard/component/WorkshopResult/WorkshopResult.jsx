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

export default function WorkshopResult() {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);

  // Pagination States
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Filter states
  const [categories, setCategories] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // ✅ state pencarian

  const getDataWorkshopResults = async () => {
    const {data} = await getWorkshopResults();
    setResults(data);
  }

  // Ambil data hasil workshop
  useEffect(() => {
    getDataWorkshopResults();
  }, []);

  // Ambil daftar kategori workshop
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data: workshops, error: workshopError } = await supabase.from("workshop").select("id, title").order("title");

        if (workshopError) throw workshopError;
        setCategories(workshops || []);
      } catch (err) {
        console.error("Error fetching workshops:", err);
      }
    };
    fetchCategories();
  }, []);

  // Terapkan filter di client-side (workshop, status, dan search)
  // useEffect(() => {
    // let filtered = [...results];

  //   if (selectedWorkshop) {
  //     filtered = filtered.filter((result) => result.participant?.workshop_id === selectedWorkshop);
  //   }

  //   if (selectedStatus) {
  //     filtered = filtered.filter((result) => result.status === selectedStatus);
  //   }

  //   if (searchQuery) {
  //     const lowerSearch = searchQuery.toLowerCase();
  //     filtered = filtered.filter(
  //       (result) =>
  //         result.participant?.name?.toLowerCase().includes(lowerSearch) ||
  //         result.participant?.npm?.toLowerCase().includes(lowerSearch) ||
  //         result.participant?.email?.toLowerCase().includes(lowerSearch) ||
  //         result.participant?.workshop?.title?.toLowerCase().includes(lowerSearch)
  //     );
  //   }

  //   setFilteredResults(filtered);
  // }, [results, selectedWorkshop, selectedStatus, searchQuery]);

  const totalPages = Math.ceil(total / limit);

  // Event handlers
  const handleWorkshopChange = (e) => setSelectedWorkshop(e.target.value);
  const handleStatusChange = (e) => setSelectedStatus(e.target.value);
  const clearFilters = () => {
    setSelectedWorkshop("");
    setSelectedStatus("");
    setSearchQuery("");
  };

  const handleEdit = (result) => {
    setSelectedResult(result);
    setShowForm(true);
  };

  const handleDelete = async ({r: data}) => {
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
    setReload(!reload);
  };

  const handleUploadSuccess = () => setReload(!reload);
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
        <WorkshopResultUpload onUploadSuccess={handleUploadSuccess} />
      </div>
      {/* Upload Excel */}

      {/* Filter Section */}
      {/* <WorkshopResultFilter
        categories={categories}
        selectedWorkshop={selectedWorkshop}
        selectedStatus={selectedStatus}
        onWorkshopChange={handleWorkshopChange}
        onStatusChange={handleStatusChange}
        onClearFilters={clearFilters}
        resultsLength={results.length}
        filteredLength={filteredResults.length}
      /> */}

      {/* List */}
      <WorkshopResultList results={results} onEdit={handleEdit} onDelete={handleDelete} currentPage={page} itemsPerPage={limit} />

      {/* Pagination */}
      {/* {total > limit && (
        <div className="mt-4 flex justify-between items-center px-2">
          <div className="text-gray-400 text-sm">
            Page {page} of {totalPages} pages
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
        </div>
      )} */}

      {/* Form Edit/Add */}
      {showForm && <WorkshopResultForm initialData={selectedResult} onClose={handleFormClose} />}
    </div>
  );
}
