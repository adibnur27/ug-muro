import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getWorkshop, addWorkshop, updateWorkshop, deleteWorkshop } from "../../../../service/workshopService";
import { LoaderOne } from "../../../../component/ui/loader";
import WorkshopForm from "./component/WorkshopForm";
import Modal from "../../../../component/Modal/Modal";
import SearchBar from "../../../../component/SearchBar/SearchBar";
import Pagination from "../../../../component/Pagination/Pagination";

const Workshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState(null);
  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editData, setEditData] = useState(null);

  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getDataWorkshop = async () => {
    try {
      setLoadingTable(true);
      const { data, count } = await getWorkshop(searchTerm, currentPage, itemsPerPage);
      setWorkshops(data || []);
      setTotalItems(count || 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingTable(false);
    }
  };

  // Ambil data saat searchTerm / currentPage berubah
  useEffect(() => {
    getDataWorkshop();
  }, [searchTerm, currentPage]);

  const handleAddClick = () => {
    setMode("add");
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (workshop) => {
    setMode("edit");
    setEditData(workshop);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (workshop) => {
    const confirmDelete = await Swal.fire({
      title: "Yakin hapus?",
      text: `Workshop "${workshop.title}" akan dihapus permanen`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      try {
        setLoadingAction(true);
        await deleteWorkshop(workshop.id, workshop.image_url, workshop.module_file);
        await Swal.fire("Berhasil!", "Workshop berhasil dihapus", "success");
        await getDataWorkshop();
      } catch (err) {
        Swal.fire("Gagal", err.message, "error");
      } finally {
        setLoadingAction(false);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoadingAction(true);
      if (mode === "add") {
        await addWorkshop(formData);
        Swal.fire("Berhasil!", "Workshop berhasil ditambahkan", "success");
      } else if (mode === "edit") {
        await updateWorkshop(editData.id, formData);
        Swal.fire("Berhasil!", "Workshop berhasil diperbarui", "success");
      }
      await getDataWorkshop();
      setIsModalOpen(false);
    } catch (err) {
      Swal.fire("Error", `Data gagal disimpan,\n ${err.message}`, "error");
    } finally {
      setLoadingAction(false);
    }
  };
  const handleSearch = (keyword) => {
    setSearchTerm(keyword);
    setCurrentPage(1); // reset ke halaman 1
  };

  if (loadingTable) return <LoaderOne />;

  if (error) {
    return (
      <div>
        <p>Data gagal dimuat</p>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {loadingAction && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <LoaderOne />
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Workshop List</h2>
        <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Workshop
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <SearchBar onSearch={handleSearch} placeholder={"Search By Name"} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-center">No</th>
              <th className="border px-4 py-2 text-center">Title</th>
              <th className="border px-4 py-2 text-center">Description</th>
              <th className="border px-4 py-2 text-center">Image</th>
              <th className="border px-4 py-2 text-center">Module File</th>
              <th className="border px-4 py-2 text-center">Reg. Open</th>
              <th className="border px-4 py-2 text-center">Reg. Close</th>
              <th className="border px-4 py-2 text-center">Start Date</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop, index) => (
              <tr key={workshop.id} className="hover:bg-gray-50">
                <td className="border px-2 py-2 text-center">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td className="border px-2 py-2 text-center">{workshop.title}</td>
                <td className="border px-2 py-2 w-[30%]">{workshop.description}</td>
                <td className="border px-2 py-2">
                  <img src={workshop.image_url} alt={workshop.title} className="w-24 h-16 object-cover rounded" />
                </td>
                <td className="border px-2 py-2 text-center">
                  <a href={workshop.module_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Module
                  </a>
                </td>
                <td className="border px-2 py-2 text-center">{workshop.registration_open}</td>
                <td className="border px-2 py-2 text-center">{workshop.registration_close}</td>
                <td className="border px-2 py-2 text-center">{workshop.start_date}</td>
                <td className="border px-2 py-2 text-center space-x-1 space-y-1">
                  <button onClick={() => handleEditClick(workshop)} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(workshop)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="mt-4 flex justify-between  items-center px-2">
          <div className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages} pages 
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages} // ✅ ini yang benar
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {workshops.length === 0 && <p>Workshop belum tersedia, silakan tambah workshop sekarang juga</p>}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WorkshopForm mode={mode} initialData={editData} onSubmit={handleSubmit} isSubmitting={loadingAction} />
      </Modal>
    </div>
  );
};

export default Workshop;
