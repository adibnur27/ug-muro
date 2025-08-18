import React, { useState, useEffect } from "react";
import { supabase } from "../../../../../lib/supabaseClient";
import { createWorkshopResult, updateWorkshopResult } from "../../../../../service/workshopResultService";
import Swal from "sweetalert2";

export default function WorkshopResultForm({ result, onClose }) {
  console.log("from handle edit:",result);
  const [formData, setFormData] = useState({
    participant_id: "",
    status: "lulus", // default value
  });
  const [participants, setParticipants] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [participantInfo, setParticipantInfo] = useState(null); // ✅ TAMBAH: Info participant untuk edit mode

  // Status options
  const statusOptions = [
    { value: "lulus", label: "Lulus" },
    { value: "tidak_lulus", label: "Tidak Lulus" },
    { value: "pending", label: "Pending" }
  ];

  useEffect(() => {
    fetchWorkshops();
    
    // Jika ada data result (edit mode)
    if (result) {
      setIsEditMode(true);
      setFormData({
        participant_id: result.participant.id,
        status: result.status
      });
      
      // ✅ PERBAIKAN: Fetch info participant untuk ditampilkan (read-only)
      fetchParticipantInfo(result.participant.id);
    }
  }, [result]);

  const fetchWorkshops = async () => {
    try {
      const { data, error } = await supabase
        .from("workshop")
        .select("id, title")
        .order("title");
      
      if (error) throw error;
      setWorkshops(data || []);
    } catch (err) {
      console.error("Error fetching workshops:", err);
      Swal.fire("Error", "Gagal memuat data workshop", "error");
    }
  };

  const fetchParticipantInfo = async (participantId) => {
    // ✅ VALIDASI: Cek apakah participantId valid
    if (!participantId || participantId === 'undefined') {
      console.error("❌ Invalid participant ID:", participantId);
      return;
    }

    try {
      console.log("🔍 Fetching participant info for ID:", participantId);
      
      const { data, error } = await supabase
        .from("participants")
        .select(`
          id,
          name,
          npm,
          email,
          workshop_id,
          workshop:workshop_id (
            title
          )
        `)
        .eq("id", participantId)
        .single();
      
      if (error) throw error;
      
      console.log("✅ Participant info fetched:", data);
      setParticipantInfo(data);
    } catch (err) {
      console.error("❌ Error fetching participant info:", err);
      Swal.fire("Error", "Gagal memuat informasi peserta", "error");
    }
  };

  const fetchParticipantWorkshop = async (participantId) => {
    try {
      const { data, error } = await supabase
        .from("participants")
        .select("workshop_id")
        .eq("id", participantId)
        .single();
      
      if (error) throw error;
      if (data?.workshop_id) {
        setSelectedWorkshop(data.workshop_id);
        fetchParticipantsByWorkshop(data.workshop_id);
      }
    } catch (err) {
      console.error("Error fetching participant workshop:", err);
    }
  };

  const fetchParticipantsByWorkshop = async (workshopId) => {
    if (!workshopId) {
      setParticipants([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("participants")
        .select(`
          id,
          name,
          npm,
          email
        `)
        .eq("workshop_id", workshopId)
        .order("name");
      
      if (error) throw error;
      setParticipants(data || []);
    } catch (err) {
      console.error("Error fetching participants:", err);
      Swal.fire("Error", "Gagal memuat data peserta", "error");
    }
  };

  const handleWorkshopChange = (workshopId) => {
    setSelectedWorkshop(workshopId);
    setFormData(prev => ({ ...prev, participant_id: "" })); // Reset participant
    fetchParticipantsByWorkshop(workshopId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.participant_id) {
      Swal.fire("Error", "Silakan pilih peserta", "error");
      return false;
    }
    if (!formData.status) {
      Swal.fire("Error", "Silakan pilih status", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditMode) {
        // Update existing result
        await updateWorkshopResult(result.id, formData);
        await Swal.fire("Berhasil!", "Data workshop result berhasil diupdate", "success");
      } else {
        // Create new result
        await createWorkshopResult(formData);
        await Swal.fire("Berhasil!", "Data workshop result berhasil ditambahkan", "success");
      }
      
      onClose(); // Close form and refresh parent
    } catch (err) {
      console.error("Error saving workshop result:", err);
      
      // Handle specific errors
      if (err.message.includes("already has a result")) {
        Swal.fire("Error", "Peserta sudah memiliki hasil untuk workshop ini", "error");
      } else {
        Swal.fire("Error", `Gagal menyimpan data: ${err.message}`, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form
    setFormData({
      participant_id: "",
      status: "lulus"
    });
    setSelectedWorkshop("");
    setParticipants([]);
    setParticipantInfo(null); // ✅ TAMBAH: Reset participant info
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Workshop Result" : "Tambah Workshop Result"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Workshop Selection - Only show in create mode */}
          {!isEditMode && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workshop <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedWorkshop}
                onChange={(e) => handleWorkshopChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">-- Pilih Workshop --</option>
                {workshops.map((workshop) => (
                  <option key={workshop.id} value={workshop.id}>
                    {workshop.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Participant Selection/Display */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peserta <span className="text-red-500">*</span>
            </label>
            
            {isEditMode ? (
              // ✅ EDIT MODE: Show participant info (read-only)
              <div className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50">
                {participantInfo ? (
                  <div>
                    <div className="font-medium text-gray-900">
                      {participantInfo.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      NPM: {participantInfo.npm}
                    </div>
                    <div className="text-sm text-gray-600">
                      Workshop: {participantInfo.workshop?.title}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">Loading...</div>
                )}
              </div>
            ) : (
              // ✅ CREATE MODE: Show dropdown selection
              <select
                name="participant_id"
                value={formData.participant_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">-- Pilih Peserta --</option>
                {participants.map((participant) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.name} - {participant.npm}
                  </option>
                ))}
              </select>
            )}
            
            {participants.length === 0 && selectedWorkshop && !isEditMode && (
              <p className="text-sm text-gray-500 mt-1">
                Tidak ada peserta di workshop ini
              </p>
            )}
          </div>

          {/* Status Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              disabled={loading}
            >
              {loading 
                ? "Menyimpan..." 
                : isEditMode 
                  ? "Update" 
                  : "Simpan"
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}