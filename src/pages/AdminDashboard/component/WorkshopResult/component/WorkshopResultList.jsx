export default function WorkshopResultList({ results, onEdit, onDelete,currentPage, itemsPerPage }) {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">No</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">NPM</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Workshop</th>
          <th className="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r,index) => (
          <tr key={r.id}>
            <td className="border p-2">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
            <td className="border p-2">{r.participant?.name}</td>
            <td className="border p-2">{r.participant?.npm}</td>
            <td className="border p-2">{r.participant?.email}</td>
            <td className="border p-2">{r.status}</td>
            <td className="border p-2">{r.participant.workshop.title}</td>
            <td className="border p-2 flex gap-2">
              <button
                onClick={() => onEdit(r)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete({id:r.id,name:r.participant?.name,workshop:r.participant.workshop.title})}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
