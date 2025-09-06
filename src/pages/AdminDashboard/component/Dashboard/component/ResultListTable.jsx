import React from "react";

const ResultListTable = ({ results }) => {
  return (
    <div className="w-[75%]">
        <h3 className="text-xl font-bold text-black">Result List Last Updated</h3>
      <table className="w-full border-separate border-spacing-y-3">
        <thead className="">
          <tr className="">
            <th className="border-y bg-blue-100 rounded-s p-2 ">No</th>
            <th className="border-y bg-blue-100 p-2 ">Name</th>
            <th className="border-y bg-blue-100 p-2 ">NPM</th>
            <th className="border-y bg-blue-100 p-2 ">Email</th>
            <th className="border-y bg-blue-100 p-2 ">Status</th>
            <th className="border-y bg-blue-100 p-2 ">Workshop</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, index) => (
            <tr key={r.id}>
              <td className="border-y rounded-s border-l p-2 text-center shadow-blue-50 shadow-lg bg-white">{index + 1}</td>
              <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.name}</td>
              <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.npm}</td>
              <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.email}</td>
              <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.status === "lulus" ? <p className="bg-green-400 rounded">{r.status}</p> : <p className="bg-red-400 rounded">{r.status}</p>}</td>
              <td className="border-y p-2 text-center shadow-blue-50 shadow-lg bg-white">{r.workshop_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultListTable;
