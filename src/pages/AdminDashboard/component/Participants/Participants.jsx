import React, { useEffect, useState } from "react";
import {
  addParticipant,
  deleteParticipant,
  getAllParticipants,
  updateParticipant,
} from "../../../../service/participantsService";
import Swal from "sweetalert2";
import { LoaderOne } from "../../../../component/ui/loader";
import Modal from "../../../../component/Modal/Modal";
import ParticipantForm from "../../../../component/ParticipantForm/ParticipantForm";
import { useWorkshop } from "../../../../context/WorkshopContext/WorkshopContext";
import SearchBar from "../../../../component/SearchBar/SearchBar";
import Pagination from "../../../../component/Pagination/Pagination";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // filter workshop
  const [selectedWorkshop, setSelectedWorkshop] = useState("");

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editData, setEditData] = useState(null);

  // workshop from context
  const { workshop } = useWorkshop();

  const getWorkshopTitle = (id) => {
    const workshopTitle = workshop.find((w) => w.id === id);
    return workshopTitle ? workshopTitle.title : "Name not Found";
  };

  const getParticipant = async () => {
    try {
      setLoading(true);
      const data = await getAllParticipants();
      setParticipants(data);
      setFilteredParticipants(data);
    } catch (error) {
      Swal.fire(`Gagal Mendapatkan Data`, error.message || error, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getParticipant();
  }, []);

  // filter data berdasarkan keyword & workshop
  const applyFilters = (keyword = "") => {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = participants.filter((p) => {
      const matchWorkshop = selectedWorkshop
        ? p.workshop_id === selectedWorkshop
        : true;
      const matchSearch =
        !keyword ||
        p.name.toLowerCase().includes(lowerKeyword) ||
        p.npm.toLowerCase().includes(lowerKeyword) ||
        p.email.toLowerCase().includes(lowerKeyword);

      return matchWorkshop && matchSearch;
    });

    setFilteredParticipants(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (keyword) => {
    applyFilters(keyword);
  };

  const handleWorkshopChange = (value) => {
    setSelectedWorkshop(value);
  };

  // jalankan filter saat workshop berubah
  useEffect(() => {
    applyFilters();
  }, [selectedWorkshop, participants]);

  const handleDelete = async (id, name) => {
    const confirmDelete = await Swal.fire({
      title: "Yakin Menghapus Participant?",
      html: `Participants <strong>${name}</strong> akan <strong>dihapus Permanen</strong>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (confirmDelete.isConfirmed) {
      try {
        setLoading(true);
        await deleteParticipant(id);
        await Swal.fire("Berhasil!", "Participants berhasil dihapus", "success");
        await getParticipant();
      } catch (err) {
        Swal.fire("Gagal", err.message, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddClick = () => {
    setMode("add");
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (participant) => {
    setMode("edit");
    setEditData(participant);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (mode === "add") {
        await addParticipant(formData);
        Swal.fire("Success", "Berhasil tambah data", "success");
      } else if (mode === "edit") {
        await updateParticipant(editData.id, formData);
        Swal.fire("Success", "Berhasil Edit Data", "success");
      }
      await getParticipant();
      setIsModalOpen(false);
    } catch (error) {
      Swal.fire("Error", `Data gagal Disimpan, ${error}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // pagination logic
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredParticipants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      {loading && <LoaderOne />}
      <h2 className="text-2xl font-semibold">Participant List</h2>
      <div className="flex gap-3 items-center my-5">
        <SearchBar
          onSearch={handleSearch}
          placeholder="search by name, npm, & email"
        />

        <select
          value={selectedWorkshop}
          onChange={(e) => handleWorkshopChange(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Workshops</option>
          {workshop.map((w) => (
            <option key={w.id} value={w.id}>
              {w.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Participant
        </button>
      </div>

      <div>
        <table className="border border-black w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">NO</th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">NPM</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Workshop</th>
              <th className="p-2 border">Created_at</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((participant, i) => (
              <tr key={participant.id}>
                <td className="p-2 border text-center">
                  {startIndex + i + 1}
                </td>
                <td className="p-2 border text-center">{participant.id}</td>
                <td className="p-2 border text-center">{participant.name}</td>
                <td className="p-2 border text-center">{participant.npm}</td>
                <td className="p-2 border text-center">{participant.email}</td>
                <td className="p-2 border text-center">
                  {getWorkshopTitle(participant.workshop_id)}
                </td>
                <td className="p-2 border text-center">
                  {participant.created_at}
                </td>
                <td className="p-2 border space-x-1 text-center">
                  <button
                    onClick={() => handleEditClick(participant)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(participant.id, participant.name)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && !loading && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {itemsPerPage > 0 && (
        <div className="mt-4 flex justify-between items-center px-2">
         <div className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages} pages 
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ParticipantForm
          mode={mode}
          initialData={editData}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Participants;
