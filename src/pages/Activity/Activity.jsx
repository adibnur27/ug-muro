import React, { useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import { useWorkshop } from "../../context/WorkshopContext/WorkshopContext";
import ActionButton from "../../component/Button/ActionButton";
import ButtonDetailCardWorkshop from "../../component/Button/ButtonDetailCardWorkshop";
import Modal from "../../component/Modal/Modal";
import { useNavigate } from "react-router-dom";
import WhatsAppButton from "../../component/Button/WhatsAppButton";

const Activity = () => {
  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // workshop from context
  const { workshop } = useWorkshop();
  

  const navigate = useNavigate();

  console.log(workshop);

  const getWorkshopStatus = (workshop) => {
    const today = new Date();
    const regOpen = new Date(workshop.registration_open);
    const regClose = new Date(workshop.registration_close);
    const startDate = new Date(workshop.start_date);
    const endDate = new Date(workshop.end_date);

    if (today < regOpen) {
      return "Upcoming";
    } else if (today >= regOpen && today <= regClose) {
      return "Registration Open";
    } else if (today > regClose && today < startDate) {
      return "Registration Closed";
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
      case "Upcoming":
        return "bg-blue-100 text-blue-600 px-1 py-1 rounded text-xs font-semibold";
      case "Registration Open":
        return "bg-green-100 text-green-600 px-1 py-1 rounded text-xs font-semibold";
      case "Registration Closed":
        return "bg-yellow-100 text-yellow-600 px-1 py-1 rounded text-xs font-semibold";
      case "Ongoing":
        return "bg-purple-100 text-purple-600 px-1 py-1 rounded text-xs font-semibold";
      case "Completed":
        return "bg-red-100 text-red-600 px-1 py-1 rounded text-xs font-semibold";
      default:
        return "bg-gray-100 text-gray-600 px-1 py-1 rounded text-xs font-semibold";
    }
  };

  const handleDetailClick = (workshop) => {
    setIsModalOpen(true);
    setSelectedWorkshop(workshop);
  };

  return (
    <div className="bg-deepBlend h-screen text-white">
      <Navbar />
      {/*  Hero Section */}
      <section className="relative bg-cover bg-center h-[450px] text-white flex items-center justify-center" style={{ backgroundImage: "url('/images/background/registrationBg1.webp')" }}>
        <div className=" p-10 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl font-bold font-orbitron">Aktivitas Kami</h1>
          <p className="text-2xl mt-4 font-rajdhani">Eksplorasi potensi melalui kursus, workshop, dan kompetisi berbasis teknologi. Belajar, berinovasi, dan berkompetisi bersama Pusat Studi Multimedia dan Robotika.</p>
        </div>
      </section>

      {/* Workshop Card Section */}

      <section className="bg-deepBlend py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold font-orbitron text-center mb-10">Workshop</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {workshop.map((ws, i) => (
            <div key={ws.id} className="bg-gray-100 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition hover:scale-105">
              <img src={ws.image_url} alt={ws.title} className="h-48 w-full object-cover" />
              <div className="p-5 space-y-2">
                <span className={getStatusStyle(getWorkshopStatus(workshop[i]))}>{getWorkshopStatus(workshop[i])}</span>
                <h3 className="text-xl font-semibold text-black">{ws.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-1">{ws.description}</p>
                <ButtonDetailCardWorkshop
                  onClick={() => {
                    handleDetailClick(ws);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* help and complaint center */}

      <section className="bg-deepBlend">
        <div className="py-8"> 
          <h3 className="text-3xl font-bold font-orbitron text-center mb-14" >Pusat Bantuan Dan Aduan </h3>
          <div className="mx-auto w-full text-center my-10">

          <WhatsAppButton/>
          </div>
        </div>
      </section>



      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedWorkshop(null);
        }}
      >
        {selectedWorkshop && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-5">
            {/* Header */}
            <div className="flex justify-between items-start gap-6">
              <div>
                <h3 className="uppercase text-2xl font-bold text-gray-900">{selectedWorkshop.title}</h3>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(getWorkshopStatus(selectedWorkshop))}`}>{getWorkshopStatus(selectedWorkshop)}</span>
                {getWorkshopStatus(selectedWorkshop) === "Registration Open" && (
                  <button className="text-black border-black border px-4 rounded hover:bg-black hover:text-white block mt-5" onClick={() => {navigate("/daftar")}}>
                    Daftar
                  </button>
                )}
              </div>

              <img src={selectedWorkshop.image_url} alt={selectedWorkshop.title} className="w-40 h-28 object-cover rounded-lg shadow-md" />
            </div>

            {/* Body */}
            <div className="mt-6 space-y-3 text-gray-700">
              <a href={selectedWorkshop.module_file} className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
                📄 Download Module
              </a>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  <span className="font-semibold">Pendaftaran Dibuka:</span> {selectedWorkshop.registration_open}
                </p>
                <p>
                  <span className="font-semibold">Pendaftaran Ditutup:</span> {selectedWorkshop.registration_close}
                </p>
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
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default Activity;
