import React from "react";

export default function WorkshopResultFilter({
  categories,
  selectedWorkshop,
  selectedStatus,
  onWorkshopChange,
  onStatusChange,
  onClearFilters,
  resultsLength,
  filteredLength,
}) {
  return (
    <div className="bg-white px-4 rounded-lg">
      {/* <h3 className="text-lg font-semibold mb-3 text-gray-800">Filter Data</h3> */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Workshop Filter */}
        <div>
          {/* <label className="block text-sm font-medium text-gray-700">
            Workshop
          </label> */}
          <select
            value={selectedWorkshop}
            onChange={onWorkshopChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Workshop</option>
            {categories.map((workshop) => (
              <option key={workshop.id} value={workshop.id}>
                {workshop.title}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          {/* <label className="block text-sm font-medium text-gray-700">
            Status
          </label> */}
          <select
            value={selectedStatus}
            onChange={onStatusChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Status</option>
            <option value="lulus">Lulus</option>
            <option value="tidak_lulus">Tidak Lulus</option>
            <option value="belum_dinilai">Belum Dinilai</option>
          </select>
        </div>

        {/* Clear Filter Button */}
        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {/* Filter Summary */}
      <div className="mt-3 text-sm text-gray-600">
        <span className="font-medium">
          Showing {filteredLength} of {resultsLength} entries
        </span>
        {(selectedWorkshop || selectedStatus) && (
          <span className="ml-2">
            {selectedWorkshop &&
              `• Workshop: ${
                categories.find((w) => w.id === selectedWorkshop)?.title
              }`}
            {selectedStatus && `• Status: ${selectedStatus}`}
          </span>
        )}
      </div>
    </div>
  );
}
