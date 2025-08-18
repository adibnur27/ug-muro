import React, { useEffect, useState } from "react";
import { addJournal, deleteJournal, getJournal, updateJournal, uploadJournal } from "../../../../service/journalService";
import Modal from "../../../../component/Modal/Modal";
import Swal from "sweetalert2";
import JournalForm from "./component/JournalForm";

const Journal = () => {
  const[journals, setJournals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null)

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
  setIsModalOpen(false);
  setEditingJournal(null);
};

  const getDataJournal = async() => {
    try {
      const data = await getJournal();
      setJournals(data);
    } catch (error) {
      Swal.fire("error",`Journal Gagal diload${error}`,"error");
    }
  }

  useEffect(() => {
    getDataJournal();
  },[]);


  const createJournal = async ({ title, authors, file }) => {
    try {
      const fileUrl = file ? await uploadJournal(file) : null;
      await addJournal(title, authors, fileUrl); // sekarang sesuai service
      Swal.fire("Success", "Journal Berhasil ditambahkan", "success");
      await getDataJournal();
      handleCloseModal();
    } catch (error) {
      Swal.fire("Error", `Journal Gagal ditambahkan: ${error.message}`, "error");
    }
  };


  const editJournal = async ({title, authors, file}) => {
    try {
      console.log(editingJournal);
      let fileUrl = editingJournal.file_url;
      if(file){
        fileUrl = await uploadJournal(file);
      }
      await updateJournal(editingJournal.id, title, authors, fileUrl);
      await getDataJournal();
      handleCloseModal();
      Swal.fire("success","Update Data Berhasil", "success");
    } catch (error) {
      Swal.fire("error",`Gagal Update data ${error.message}`, "error");
    }
  }

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


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Journal Page</h1>

      {/* Tombol buka modal */}
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload Journal
      </button>

      {/* Tabel daftar journal */}
      <table className="w-full mt-6 border border-gray-300 rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">No</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Authors</th>
            <th className="p-2 border">File</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {journals.length > 0 ? (
            journals.map((journal, index) => (
              <tr key={journal.id} className="text-center">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{journal.title}</td>
                <td className="p-2 border">{journal.authors}</td>
                <td className="p-2 border">
                  {journal.file_url ? (
                    <a
                      href={journal.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Lihat File
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-2 border">
                  {new Date(journal.created_at).toLocaleDateString()}
                </td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => {
                      setEditingJournal(journal);
                      setIsModalOpen(true);
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(journal.id, journal.title)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold mb-4">
          {editingJournal ? "Edit Journal" : "Upload Journal"}
        </h2>
        <JournalForm
          onSubmit={editingJournal ? editJournal : createJournal}
          initialData={editingJournal}
        />
      </Modal>
    </div>
  );
};

export default Journal;
