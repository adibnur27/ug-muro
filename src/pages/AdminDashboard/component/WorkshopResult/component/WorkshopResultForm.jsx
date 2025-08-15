import { useState, useEffect } from "react";

export default function WorkshopResultForm({ participants, initialData, onSubmit, onCancel }) {
  const [participantId, setParticipantId] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialData) {
      setParticipantId(initialData.participant_id || "");
      setStatus(initialData.status || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ participant_id: participantId, status });
    setParticipantId("");
    setStatus("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded">
      <select
        value={participantId}
        onChange={(e) => setParticipantId(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Pilih Participant</option>
        {participants.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} - {p.npm}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full"
        required
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {initialData ? "Update" : "Tambah"}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
