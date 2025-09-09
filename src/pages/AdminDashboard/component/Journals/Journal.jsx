import React, { useEffect, useState } from "react";
import { addJournal, deleteJournal, getJournal, updateJournal, uploadJournal } from "../../../../service/journalService";
import Modal from "../../../../component/Modal/Modal";
import Swal from "sweetalert2";
import JournalForm from "./component/JournalForm";
import Pagination from "../../../../component/Pagination/Pagination";
import SearchBar from "../../../../component/SearchBar/SearchBar";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import ActionButton from "../../../../component/Button/ActionButton";

const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);

  // state pagination search
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJournal(null);
  };

  const getDataJournal = async () => {
    try {
      const { data, count } = await getJournal(searchTerm, currentPage, itemsPerPage);
      setJournals(data || []);
      setTotalItems(count || 0);
    } catch (error) {
      Swal.fire("error", `Journal Gagal diload${error}`, "error");
    }
  };

  useEffect(() => {
    getDataJournal();
  }, [searchTerm, currentPage]);
  console.log("Journal",journals);
  const createJournal = async ({ title, authors,publisher,published_at, file }) => {
    try {
      const fileUrl = file ? await uploadJournal(file) : null;
      await addJournal(title, authors,publisher,published_at, fileUrl); // sekarang sesuai service
      Swal.fire("Success", "Journal Berhasil ditambahkan", "success");
      await getDataJournal();
      handleCloseModal();
    } catch (error) {
      Swal.fire("Error", `Journal Gagal ditambahkan: ${error.message}`, "error");
    }
  };

  const editJournal = async ({ title, authors,publisher,published_at, file }) => {
    try {
      console.log(editingJournal);
      let fileUrl = editingJournal.file_url;
      if (file) {
        fileUrl = await uploadJournal(file);
      }
      await updateJournal(editingJournal.id, title,authors,publisher,published_at, fileUrl);
      await getDataJournal();
      handleCloseModal();
      Swal.fire("success", "Update Data Berhasil", "success");
    } catch (error) {
      Swal.fire("error", `Gagal Update data ${error.message}`, "error");
    }
  };

  const handleDelete = async (id, title) => {
    const confirmDelete = await Swal.fire({
      title: "Yakin Menghapus Participant?",
      html: `Journal <strong>${title}</strong> akan <strong>dihapus Permanen</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deleteJournal(id);
        await Swal.fire("Berhasil!", "Participants berhasil dihapus", "success");
        await getDataJournal();
      } catch (err) {
        Swal.fire("Gagal", err.message, "error");
      }
    }
  };

  const handleSearch = (keywords) => {
    setSearchTerm(keywords);
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 h-9 items-end justify-between">
        {/* searcBar */}
        <div className="flex gap-2">
          <SearchBar onSearch={handleSearch} placeholder={"search By Title & Author"} />
          {/* Tombol buka modal */}
          <button onClick={handleOpenModal} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload Journal
          </button>
        </div>
      </div>

      {/* Tabel daftar journal */}
      <table className="w-full mt-4 border-separate border-spacing-y-3">
        <thead className="">
          <tr>
            <th className="p-2 border-s border-y bg-blue-100 rounded-s">No</th>
            <th className="p-2 border-y bg-blue-100 ">Title</th>
            <th className="p-2 border-y bg-blue-100 ">Authors</th>
            <th className="p-2 border-y bg-blue-100 ">File</th>
            <th className="p-2 border-y bg-blue-100 ">Publisher</th>
            <th className="p-2 border-y bg-blue-100 ">Published At</th>
            <th className="p-2 border-y bg-blue-100 ">Created At</th>
            <th className="p-2 border-e border-y bg-blue-100 rounded-e">Actions</th>
          </tr>
        </thead>
        <tbody>
          {journals.length > 0 ? (
            journals.map((journal, index) => (
              <tr key={journal.id} className="text-center">
                <td className="p-2 border-s border-y shadow-md shadow-blue-100 rounded-s">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td className="p-2 border-y shadow-md shadow-blue-100">{journal.title}</td>
                <td className="p-2 border-y shadow-md shadow-blue-100">{journal.authors}</td>
                <td className="p-2 border-y shadow-md shadow-blue-100">
                  {journal.file_url ? (
                    <a href={journal.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Lihat File
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                  <td className="p-2 border-y shadow-md shadow-blue-100">{journal.publisher}</td>
                  <td className="p-2 border-y shadow-md shadow-blue-100">{journal.published_at}</td>
                <td className="p-2 border-y shadow-md shadow-blue-100">{new Date(journal.created_at).toLocaleDateString()}</td>
                <td className="p-2 border-e border-y shadow-md shadow-blue-100 rounded-e space-x-1 space-y-1 text-center">
                  <ActionButton
                    hoverShadowColor={"yellow"}
                    children={<IconEdit className="text-yellow-600" />}
                    onClick={() => {
                      setEditingJournal(journal);
                      setIsModalOpen(true);
                    }}
                  />
                  <ActionButton hoverShadowColor={"red"} children={<IconTrash className="text-red-600" />} onClick={() => handleDelete(journal.id, journal.title)} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                Tidak ada data journal
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex mt-4 justify-between">
        {/* Pagination */}
        {totalItems > 0 && (
          <div className=" flex justify-between items-center w-full px-2">
            <div className="text-gray-400 text-sm">
              page {currentPage} of {totalPages} pages
            </div>
            <div className="text-gray-400 text-sm">
             Total Number of Journals {journals.length}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2 className="text-lg font-semibold mb-4">{editingJournal ? "Edit Journal" : "Upload Journal"}</h2>
          <JournalForm onSubmit={editingJournal ? editJournal : createJournal} initialData={editingJournal} />
        </Modal>
      </div>
    </div>
  );
};

export default Journal;
