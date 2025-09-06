import React, { useState, useCallback } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import Threads from "./ui/Threads";
import WorkshopFormParticipant from "./Component/WorkshopFormParticipant";
import Swal from "sweetalert2";
import { addParticipant } from "../../service/participantsService";
import { useWorkshop } from "../../context/WorkshopContext/WorkshopContext";
import ButtonActivity from "../../component/Button/ButtonActivity";
import WhatsAppButton from "../../component/Button/WhatsAppButton";

const Registration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { workshop } = useWorkshop();
  // Memoize handleSubmit untuk mencegah re-render berlebihan
  const handleSubmit = useCallback(async (formData) => {
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      await addParticipant(formData);
      // Success message akan ditangani di component form
    } catch (error) {
      console.error("Registration error:", error);
      // Error akan di-throw kembali ke form untuk ditangani
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return (
    <div className="bg-deepBlend min-h-screen overflow-hidden">
      <Navbar />

      {/* Background Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(/images/background/registrationBg.webp)`,
          }}
        />
        <div className="relative z-10 text-white flex flex-col md:p-20 p-5 justify-center h-full">
          <h1 className="md:text-3xl lg:text-4xl text-lg pt-10 font-orbitron">
            Bangun Keahlian. Siap Hadapi Masa Depan.
          </h1>
          <p className="md:text-xl lg:text-xl text-sm font-bold md:pt-10 pt-2 lg:w-2/3 font-rajdhani">
            Di era digital yang terus berkembang, skill praktis dan wawasan teknologi menjadi kunci untuk bersaing dan berkontribusi di dunia industri. Melalui program Workshop dan Kursus Bersertifikat dari Pusat Studi Multimedia dan Robotika Universitas Gunadarma, kami hadir untuk membimbing Anda dari pemula hingga siap terjun ke dunia profesional.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-tr from-[#3d0939] via-[#330754] to-[#3d0939] z-10 relative">
        {/* Threads Background */}
        <div 
          style={{ 
            width: "100%", 
            height: "900px", 
            position: "absolute", 
            top: "0px", // Adjusted position
            pointerEvents: "none" // Prevent interference with form
          }}
        >
          {/* <Threads amplitude={1} distance={0} enableMouseInteraction={false} /> */}
        </div>

        {/* Form Container */}
        <section className="bg-deepBlend py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold font-orbitron text-center mb-10 text-white">Workshop</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshop.map((ws,) => (
            <div key={ws.id} className="bg-gray-100 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition hover:scale-105">
              <img src={ws.image_url} alt={ws.title} className="h-48 w-full object-cover" />
              <div className="p-5 space-y-2">
               
                <h3 className="text-xl font-semibold text-black">{ws.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-1">{ws.description}</p>
                <div className="flex gap-5">

                <ButtonActivity
                  children={"Pengajuan Blanko"}
                   onClick={() => window.open(ws.registration_link, "_blank")}
                />
                <ButtonActivity
                  children={"Konfirmasi Pembayaran"}
                   onClick={() => window.open(ws.payment_confirmation_link, "_blank")}
                />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* help and complaint center */}

      <section className="bg-deepBlend">
        <div className="py-8">
          <h3 className="text-3xl font-bold font-orbitron text-center mb-14 text-white">Pusat Bantuan Dan Aduan </h3>
          <div className="mx-auto w-full text-center my-10">
            <WhatsAppButton />
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
};

export default Registration;