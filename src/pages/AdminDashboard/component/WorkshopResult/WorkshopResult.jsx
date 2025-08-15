import React, { useState, useEffect } from "react";
import WorkshopResultList from "./component/WorkshopResultList";
import WorkshopResultForm from "./component/WorkshopResultForm";
import WorkshopResultUpload from "./component/WorkshopListUpload";
import { deleteWorkshopResult, getWorkshopResults } from "../../../../service/workshopResultService";
import Swal from "sweetalert2";

export default function WorkshopResult() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchResults();
  }, [reload]);

  const fetchResults = async () => {
    const data = await getWorkshopResults();
    setResults(data);
  };
  console.log("data untuk table",results);

  const handleEdit = (result) => {
    setSelectedResult(result);
  };

  const handleDelete = async(data) => {
    console.log("from handle Delete",data);
    const confirmDelete = await Swal.fire({
          title: "Yakin hapus?",
          html: `<p>nama: ${data.name}</p><p>workshop: ${data.workshop}</p>Data akan dihapus permanen`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus",
          cancelButtonText: "Batal",
        });
    
        if (confirmDelete.isConfirmed) {
          try {
            await deleteWorkshopResult(data.id);
            await Swal.fire("Berhasil!", "Workshop Result berhasil dihapus", "success");
            await fetchResults();
          } catch (err) {
            Swal.fire("Gagal", err.message, "error");
          }
        }
  }

  const handleFormClose = () => {
    setSelectedResult(null);
    setReload(!reload);
  };

  const handleUploadSuccess = () => {
    setReload(!reload);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Workshop Results</h1>

      {/* Upload Excel */}
      <WorkshopResultUpload onUploadSuccess={handleUploadSuccess} />

      {/* List */}
      <WorkshopResultList results={results} onEdit={handleEdit} onDelete={ handleDelete }/>

      {/* Form Edit */}
      {selectedResult && (
        <WorkshopResultForm
          result={selectedResult}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}
