import React, { useEffect, useState } from "react";
import { addParticipant, deleteParticipant, getAllParticipants, updateParticipant } from "../../../../service/participantsService";
import Swal from "sweetalert2";
import { LoaderOne } from "../../../../component/ui/loader";
import Modal from "../../../../component/Modal/Modal";
import ParticipantForm from "../../../../component/ParticipantForm/ParticipantForm";
import { useWorkshop } from "../../../../context/WorkshopContext/WorkshopContext";
import SearchBar from "../../../../component/SearchBar/SearchBar";
import Pagination from "../../../../component/Pagination/Pagination";
import ActionButton from "../../../../component/Button/ActionButton";
import { IconEdit, IconLayoutGridRemove, IconRowRemove, IconTrash, IconTrashFilled, IconTrashOff, IconTrashX } from "@tabler/icons-react";

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
  console.log(workshop);

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
      const matchWorkshop = selectedWorkshop ? p.workshop_id === selectedWorkshop : true;
      const matchSearch = !keyword || p.name.toLowerCase().includes(lowerKeyword) || p.npm.toLowerCase().includes(lowerKeyword) || p.email.toLowerCase().includes(lowerKeyword);

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
  const paginatedData = filteredParticipants.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {loading && <LoaderOne />}
      <h2 className="text-2xl font-bold text-gray-400 ">Participant List</h2>
      <div className="flex justify-between gap-3 items-center my-5">
        <div className="flex gap-2">

        <SearchBar onSearch={handleSearch} placeholder="search by name, npm, & email" />
        <select value={selectedWorkshop} onChange={(e) => handleWorkshopChange(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Workshops</option>
          {workshop.map((w) => (
            <option key={w.id} value={w.id}>
              {w.title}
            </option>
          ))}
        </select>
        </div>

        <button onClick={handleAddClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Participant
        </button>
      </div>

      <div>
        <table className=" w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 rounded-s border-s border-y bg-blue-100">NO</th>
              <th className=" border-y bg-blue-100">ID</th>
              <th className="p-2 border-y bg-blue-100">Nama</th>
              <th className="p-2  border-y bg-blue-100">NPM</th>
              <th className="p-2  border-y bg-blue-100">Email</th>
              <th className="p-2  border-y bg-blue-100">Workshop</th>
              <th className=" border-y bg-blue-100">Created_at</th>
              <th className="p-2 rounded-e border-y bg-blue-100 border-e">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((participant, i) => (
              <tr key={participant.id}>
                <td className="  border-y shadow border-s rounded-s shadow-blue-50 text-center">{startIndex + i + 1}</td>
                <td className="  border-y shadow  shadow-blue-50 text-center">{participant.id}</td>
                <td className="p-2  border-y shadow shadow-blue-50 text-center">{participant.name}</td>
                <td className="p-2  border-y shadow shadow-blue-50 text-center">{participant.npm}</td>
                <td className="p-2  border-y shadow shadow-blue-50 text-center">{participant.email}</td>
                <td className="p-2  border-y shadow shadow-blue-50 text-center">{getWorkshopTitle(participant.workshop_id)}</td>
                <td className="  border-y shadow shadow-blue-50 text-center">{participant.created_at}</td>
                <td className="p-2  border-y shadow border-e rounded-e shadow-blue-50 space-x-1 space-y-1 text-center">
                  <ActionButton
                    hoverShadowColor={"yellow"}
                    children={
                      <IconEdit className="text-yellow-600"/>
                    }
                    onClick={() => handleEditClick(participant)}
                  />
                  <ActionButton
                    hoverShadowColor={"red"}
                    children={
                     <IconTrash className="text-red-600"/>
                    }
                    onClick={() => {
                      handleDelete(participant.id, participant.name);
                    }}
                  />
                  
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
          <div className="text-gray-400 text-sm">
            Total Number of Participants {participants.length}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ParticipantForm mode={mode} initialData={editData} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

export default Participants;
