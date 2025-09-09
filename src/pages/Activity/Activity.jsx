import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import { useWorkshop } from "../../context/WorkshopContext/WorkshopContext";
import ActionButton from "../../component/Button/ActionButton";
import ButtonActivity from "../../component/Button/ButtonActivity";
import Modal from "../../component/Modal/Modal";
import { useNavigate } from "react-router-dom";
import WhatsAppButton from "../../component/Button/WhatsAppButton";
import WorkshopResultDownloadList from "./component/WorkshopResultDownloadList";
import { SparklesCore } from "../../component/ui/sparkles";

const Activity = () => {
  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  console.log("selected Workshop", selectedWorkshop);

  const navigate = useNavigate();
  // workshop from context
  const { workshop } = useWorkshop();

  const workshopRegistration = workshop.filter((ws) => {
    if (!ws.end_date) return true; // kalau end_date kosong, tetap tampil
    const today = new Date();
    const endDate = new Date(ws.start_date);
    return endDate >= today; // hanya tampil kalau end_date >= hari ini
  });
  console.log("WR", workshopRegistration);

  console.log("workshop from context", workshop);

  const getWorkshopStatus = (workshop) => {
    const today = new Date();
    const startDate = new Date(workshop.start_date);
    const endDate = new Date(workshop.end_date);

    if (today < startDate) {
      return "Registration Open";
    } else if (today >= startDate && today <= endDate) {
      return "Ongoing";
    } else if (today > endDate) {
      return "Completed";
    } else {
      return "Unknown";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Registration Open":
        return "bg-green-100 w-fit text-green-600 px-1 py-1 rounded text-xs font-semibold";
      case "Ongoing":
        return "bg-purple-100 w-fit text-purple-600 px-1 py-1 rounded text-xs font-semibold";
      case "Completed":
        return "bg-red-100 w-fit text-red-600 px-1 py-1 rounded text-xs font-semibold";
      default:
        return "bg-gray-100 w-fit text-gray-600 px-1 py-1 rounded text-xs font-semibold";
    }
  };

  const handleDetailClick = (workshop) => {
    setIsModalOpen(true);
    setSelectedWorkshop(workshop);
  };
  console.log("selectedWorkshop data:", selectedWorkshop);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setSelectedWorkshop(null);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  return (
    <div className="bg-deepBlend h-screen">
      <Navbar />
      {/*  Hero Section */}
      <section className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-white">
        <div className="w-full absolute inset-0">
          <SparklesCore id="tsparticlesfullpage" background="transparent" minSize={0.6} maxSize={1.4} particleDensity={100} className="w-full h-full" particleColor="#f3f4f6" />
        </div>
        <div className="bg-black bg-opacity-60 p-8 w-full h-full rounded-xl text-center pt-48">
          <h1 className="text-4xl font-orbitron">Aktivitas Kami</h1>
          <p className="mt-4 text-lg font-rajdhani">Eksplorasi potensi melalui kursus, workshop, dan kompetisi berbasis teknologi. Belajar, berinovasi, dan berkompetisi bersama Pusat Studi Multimedia dan Robotika.</p>
        </div>
      </section>

      {/* Workshop Card Section */}

      <section className="bg-deepBlend text-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold font-orbitron text-center mb-10">Workshop</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workshop.map((ws) => (
            <div key={ws.id} className="bg-gray-100 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition hover:scale-105">
              <img src={ws.image_url} alt={ws.title} className="h-48 w-full object-cover" />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-black">{ws.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-1">{ws.description}</p>
                <ButtonActivity
                  children={"Selengkapnya"}
                  onClick={() => {
                    handleDetailClick(ws);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop resuslt card section */}

      <section className="bg-deepBlend text-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold font-orbitron text-center mb-10">Workshop Result</h2>
        <WorkshopResultDownloadList />
      </section>

      {/* help and complaint center */}

      <section className="bg-gray-100">
        <div className="py-8">
          <h3 className="text-3xl font-bold font-orbitron text-center mb-14">Pusat Bantuan Dan Aduan </h3>
          <div className="mx-auto w-full text-center my-10">
            <WhatsAppButton />
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          if (event.key === "Escape") {
            setIsModalOpen(false);
          }
          setIsModalOpen(false);
          setSelectedWorkshop(null);
        }}
      >
        {selectedWorkshop && (
          <div className=" flex justify-between rounded-xl shadow-lg p-6 mt-5">
            {/* text */}
            <div className="space-y-5">
              <h3 className="uppercase text-2xl font-bold text-gray-900">{selectedWorkshop.title}</h3>
              <p className={getStatusStyle(getWorkshopStatus(selectedWorkshop))}>{getWorkshopStatus(selectedWorkshop)}</p>

              <a href={selectedWorkshop.module_file} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                📄 Download Module
              </a>

              <div className="text-black">
                <p>
                  <span className="font-semibold">Tanggal Mulai:</span> {selectedWorkshop.start_date}
                </p>
                <p>
                  <span className="font-semibold">Tanggal Selesai:</span> {selectedWorkshop.end_date}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Deskripsi</h4>
                <p className="text-gray-600 mt-1">{selectedWorkshop.description}</p>
              </div>
            </div>

            {/* Foto */}
            <div className="flex flex-col justify-between">
              <img src={selectedWorkshop.image_url} alt={selectedWorkshop.title} className="w-40 h-28 object-cover rounded-lg shadow-md" />
              {/* Button daftar hanya muncul jika status = Registration Open atau Ongoing */}
              {getWorkshopStatus(selectedWorkshop) === "Registration Open" ? (
                <ButtonActivity
                  onClick={() => {
                    window.open(selectedWorkshop.registration_link, "_blank", "noopener,noreferrer");
                  }}
                >
                  Daftar
                </ButtonActivity>
              ) : (
                <p className="text-red-600 font-semibold">Pendaftaran workshop sudah ditutup</p>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default Activity;
