import { IconEdit, IconTrash } from "@tabler/icons-react";
import ActionButton from "../../../../../component/Button/ActionButton";

export default function WorkshopResultList({ results, onEdit, onDelete,currentPage, itemsPerPage }) {
  return (
    <table className="w-full border-separate border-spacing-y-3">
      <thead className="">
        <tr className="">
          <th className="border-y bg-blue-100 rounded-s p-2 ">No</th>
          <th className="border-y bg-blue-100 p-2 ">Name</th>
          <th className="border-y bg-blue-100 p-2 ">NPM</th>
          <th className="border-y bg-blue-100 p-2 ">Email</th>
          <th className="border-y bg-blue-100 p-2 ">Status</th>
          <th className="border-y bg-blue-100 p-2 ">Workshop</th>
          <th className="border-y bg-blue-100 rounded-e p-2 ">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r,index) => (
          <tr key={r.id}>
            <td className="border-y rounded-s border-l p-2 text-center shadow-blue-50 shadow-lg bg-white">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
            <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.participant?.name}</td>
            <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.participant?.npm}</td>
            <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.participant?.email}</td>
            <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">
              {r.status === "lulus" ? <p className="bg-green-400 rounded">{r.status}</p> : <p className="bg-red-400 rounded">{r.status}</p>}
              </td>
            <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.participant.workshop.title}</td>
            <td className="p-2 border-y rounded-e border-r space-x-1 space-y-1 text-center shadow-blue-50 shadow-lg bg-white">
                  <ActionButton
                    hoverShadowColor={"yellow"}
                    children={
                      <IconEdit className="text-yellow-600"/>
                    }
                    onClick={() => onEdit(r)}
                  />
                  <ActionButton
                    hoverShadowColor={"red"}
                    children={
                     <IconTrash className="text-red-600"/>
                    }
                    onClick={() => onDelete({id:r.id,name:r.participant?.name,workshop:r.participant.workshop.title})}
                  />
                  
                </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
