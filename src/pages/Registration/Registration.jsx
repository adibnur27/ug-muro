import React, { useState, useCallback } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";

import { useWorkshop } from "../../context/WorkshopContext/WorkshopContext";

import ButtonActivity from "../../component/Button/ButtonActivity";
import WhatsAppButton from "../../component/Button/WhatsAppButton";
import { SparklesCore } from "../../component/ui/sparkles";

const Registration = () => {
  const { workshop } = useWorkshop();

  const workshopRegistration = workshop.filter((ws) => {
    if (!ws.end_date) return true; // kalau end_date kosong, tetap tampil
    const today = new Date();
    const endDate = new Date(ws.start_date);
    return endDate >= today; // hanya tampil kalau end_date >= hari ini
  });

  console.log("workshop from activitas ", workshopRegistration);

  return (
    <div className="bg-deepBlend min-h-screen overflow-hidden">
      <Navbar />

      {/* Background Header */}
      <section className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-white">
        <div className="w-full absolute inset-0">
          <SparklesCore id="tsparticlesfullpage" background="transparent" minSize={0.6} maxSize={1.4} particleDensity={100} className="w-full h-full" particleColor="#f3f4f6" />
        </div>
        <div className="bg-black bg-opacity-60 p-8 w-full h-full rounded-xl text-center pt-48">
          <h1 className="text-4xl font-orbitron">Bangun Keahlian. Siap Hadapi Masa Depan.</h1>
          <p className="mt-4 text-lg font-rajdhani">Di era digital yang terus berkembang, skill praktis dan wawasan teknologi menjadi kunci untuk bersaing dan berkontribusi di dunia industri. Melalui program Workshop dan Kursus Bersertifikat dari Pusat Studi Multimedia dan
            Robotika Universitas Gunadarma, kami hadir untuk membimbing Anda dari pemula hingga siap terjun ke dunia profesional.</p>
        </div>
      </section>
      

      {/* Main Content */}
      <div className="bg-gradient-to-tr from-[#3d0939] via-[#330754] to-[#3d0939] z-10 relative">
        {/* Threads Background */}
        <div
          style={{
            width: "100%",
            height: "900px",
            position: "absolute",
            top: "0px", // Adjusted position
            pointerEvents: "none", // Prevent interference with form
          }}
        >
          {/* <Threads amplitude={1} distance={0} enableMouseInteraction={false} /> */}
        </div>

        {/* Form Container */}
        <section className="bg-deepBlend py-16 px-6 md:px-20">
          <h2 className="text-3xl font-bold font-orbitron text-center mb-10 text-white">Workshop</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshopRegistration.map((ws) => (
              <div key={ws.id} className="bg-gray-100 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition hover:scale-105">
                <img src={ws.image_url} alt={ws.title} className="h-48 w-full object-cover" />
                <div className="p-5 space-y-2">
                  <h3 className="text-xl font-semibold text-black">{ws.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-1">{ws.description}</p>
                  <div className="flex gap-5">
                    <ButtonActivity children={"Pengajuan Blanko"} onClick={() => window.open(ws.registration_link, "_blank")} />
                    <ButtonActivity children={"Konfirmasi Pembayaran"} onClick={() => window.open(ws.payment_confirmation_link, "_blank")} />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      </div>

      <Footer />
    </div>
  );
};

export default Registration;
