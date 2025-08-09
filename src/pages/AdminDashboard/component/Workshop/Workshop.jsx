import React, { useEffect, useState } from "react";
import { getWorkshop, addWorkshop, updateWorkshop, deleteWorkshop } from "../../../../service/workshopService";
import { LoaderOne } from "../../../../component/ui/loader";
import WorkshopForm from "./component/WorkshopForm";
import Modal from "../../../../component/Modal/Modal";

const Workshop = () => {
  const [workshops, setWorkshops] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" or "edit"
  const [editData, setEditData] = useState(null);

  const getDataWorkshop = async () => {
    try {
      setLoading(true);
      const data = await getWorkshop();
      setWorkshops(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataWorkshop();
  }, []);

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
  if (window.confirm(`Yakin ingin menghapus workshop "${workshop.title}"?`)) {
    try {
      await deleteWorkshop(
        workshop.id,
        workshop.image_url,
        workshop.module_file
      );
      alert("Workshop berhasil dihapus");
      await getDataWorkshop();
    } catch (err) {
      alert("Gagal menghapus: " + err.message);
    }
  }
};

  const handleSubmit = async (formData) => {
    try {
      if (mode === "add") {
        await addWorkshop(formData);
      } else if (mode === "edit") {
        await updateWorkshop(editData.id, formData);
      }
      await getDataWorkshop();
      setIsModalOpen(false);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <LoaderOne />;
  if (error) {
    return (
      <>
        <p>Data Gagal di Load</p>
        <p>Error: {error}</p>
      </>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Workshop List</h2>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Workshop
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-center">No</th>
              <th className="border px-4 py-2 text-center">Title</th>
              <th className="border px-4 py-2 text-center">Description</th>
              <th className="border px-4 py-2 text-center">Image </th>
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
                <td className="border px-2 py-2 text-center">{index + 1}</td>
                <td className="border px-2 py-2 text-center">{workshop.title}</td>
                <td className="border px-2 py-2 w-[30%]">{workshop.description}</td>
                <td className="border px-2 py-2">
                  <img
                    src={`${workshop.image_url}`}
                    alt={workshop.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td className="border px-2 py-2 text-center">
                  <a
                    href={workshop.module_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Module
                  </a>
                </td>
                <td className="border px-2 py-2 text-center">{workshop.registration_open}</td>
                <td className="border px-2 py-2 text-center">{workshop.registration_close}</td>
                <td className="border px-2 py-2 text-center">{workshop.start_date}</td>
                <td className="border px-2 py-2 text-center">
                  <button
                    onClick={() => handleEditClick(workshop)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(workshop)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <WorkshopForm
          mode={mode}
          initialData={editData}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Workshop;
