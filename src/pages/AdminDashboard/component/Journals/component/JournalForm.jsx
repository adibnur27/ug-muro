import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function JournalForm({
  initialData = {},
  onSubmit,
  mode = "add",
  isSubmitting,
}) {
    
  console.log(initialData);
  const [title, setTitle] = useState(initialData?.title || "");
  const [authors, setAuthors] = useState(initialData?.authors || "");
  const [file, setFile] = useState(null);

  // kalau ada perubahan pada initialData (misalnya edit)
useEffect(() => {
  if (mode === "edit" && initialData) {
    setTitle(initialData.title || "");
    setAuthors(initialData.authors || "");
  }
}, [initialData, mode]);

  const handleSubmit = async (e) => {
    console.log(title,authors,file);
    e.preventDefault();
    try {
      await onSubmit({ title, authors, file });
    } catch (error) {
      Swal.fire(
        "Error",
        `Gagal ${
          mode === "add" ? "menambahkan" : "mengupdate"
        } Journals: ${error.message}`,
        "error"
      );
    }
  };

  console.log(initialData);

  return (
   <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan Judul"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Authors */}
      <div>
        <label htmlFor="authors" className="block text-sm font-medium text-gray-700">
          Author
        </label>
        <input
          type="text"
          id="authors"
          name="authors"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          placeholder="Masukkan Penulis"
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* File Upload */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          File PDF
        </label>
        <input
          type="file"
          id="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-1 block w-full text-sm text-gray-600
                     file:mr-4 file:rounded-lg file:border-0
                     file:bg-blue-50 file:px-4 file:py-2
                     file:text-sm file:font-semibold
                     file:text-blue-700 hover:file:bg-blue-100"
        />
        {initialData?.file_url && (
          <p className="mt-2 text-sm text-gray-600">
            File Saat Ini:{" "}
            <a
              href={initialData.file_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Lihat PDF
            </a>
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? "Processing..." : mode === "add" ? "Tambah" : "Update"}
      </button>
    </form>
  );
}
