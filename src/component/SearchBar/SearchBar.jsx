import React, { useState } from "react";

const SearchBar = ({ onSearch, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue); // kirim keyword ke parent
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-300 px-3 py-2 rounded-md w-full md:w-64 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
