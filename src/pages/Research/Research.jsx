import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import { SparklesCore } from "../../component/ui/sparkles";
import { getJournal } from "../../service/journalService";
import Swal from "sweetalert2";
import { IconBook, IconBook2, IconNotebook, IconNotebookOff } from "@tabler/icons-react";

const Research = () => {
  const [journals, setJournals] = useState([]);
  const [TotalItems, setTotalItems] = useState(0);

  const getDataJournal = async () => {
    try {
      const { data, count } = await getJournal("", 1, 1000);
      setJournals(data || []);
      setTotalItems(count || 0);
    } catch (error) {
      Swal.fire("error", `Journal Gagal diload${error}`, "error");
    }
  };

  useEffect(() => {
    getDataJournal();
  }, []);

  return (
    <div className="bg-deepBlend h-screen text-white">
      <Navbar />

      <section className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-white">
        <div className="w-full absolute inset-0">
          <SparklesCore id="tsparticlesfullpage" background="transparent" minSize={0.6} maxSize={1.4} particleDensity={100} className="w-full h-full" particleColor="#f3f4f6" />
        </div>
        <div className="bg-black bg-opacity-60 p-8 w-full h-full rounded-xl text-center pt-48">
          <h1 className="text-4xl font-orbitron">Riset Inovatif untuk Masa Depan Teknologi</h1>
          <p className="mt-4 text-lg font-rajdhani">Kami menjelajahi batas teknologi melalui riset yang berdampak di bidang AI, Robotika, dan Sistem Cerdas.</p>
        </div>
      </section>

      {/* Journal */}

      <section className="py-16 bg-gray-100 z-10">
        <h2 className="text-3xl font-bold text-center font-orbitron text-blue-800">Publikasi Ilmiah</h2>
        <div className="max-w-4xl mx-auto mt-10 px-6">
          {journals.map((journal) => (
            <div key={journal.id} className="border-l-4 bg-deepBlend border-blue-800 px-4 py-4 mb-4 flex justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl">{journal.title}</h3>
                <p className="text-sm text-white">
                  Penulis: <span className="text-white font-bold">{journal.authors} </span>
                </p>
                <p className="text-sm text-white">
                  Penerbit: <span className="text-white font-bold">{journal.publisher}</span>
                </p>
                <p className="text-sm text-white">
                  Tanggal Terbit: <span className="text-white font-bold">{journal.published_at}</span>
                </p>
                <a href={journal.file_url} className="text-sm underline text-blue-200">
                  Journal File
                </a>
              </div>
              <div className="w-[18%] bg-blue-950/10 rounded-full shadow-2xl shadow-blue-950">
                <img src="/icon/3dicons-notebook-dynamic-color.png" alt="Journal Icon" className="w-full h-auto drop-shadow-[5px_5px_20px_rgb(23,37,84)]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Research;
