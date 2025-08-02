import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import { SparklesCore } from "../../component/ui/sparkles";

const Research = () => {
  const focusData = [
    {
      title: "Artificial Intelligence & Machine Learning",
      description: "Pengembangan sistem cerdas untuk analisis data, pengenalan pola, dan prediksi berbasis model machine learning.",
      image: "/images/course/python.jpg",
    },
    {
      title: "Robotika & Sistem Tertanam",
      description: "Penelitian dalam desain robot, sensor, aktuator, serta integrasi sistem tertanam menggunakan Raspberry Pi dan mikrokontroler.",
      image: "/images/course/arduino.jpg",
    },
    {
      title: "Computer Vision & Image Processing",
      description: "Riset dalam pengolahan citra digital, deteksi objek, dan sistem pengenalan visual berbasis kamera dan sensor.",
      image: "/images/course/mikrokontroler.jpg",
    },
  ];

  const projects = [
    {
      title: "Deteksi Penyakit Daun Berbasis CNN",
      year: "2024",
      category: "AI for Agriculture",
      image: "/images/research/plant-disease.png",
    },
    {
      title: "Robot Pengantar Obat untuk Layanan Kesehatan",
      year: "2023",
      category: "Healthcare Robotics",
      image: "/images/research/robot-health.jpg",
    },
    {
      title: "Drone Monitoring untuk Pertanian Presisi",
      year: "2023",
      category: "Agricultural IoT",
      image: "/images/research/robot-agri.jpg",
    },
  ];

  const publications = [
    {
      title: "Smart Embedded System for Urban Farming Automation",
      authors: "Sutanto, A. et al.",
      journal: "International Journal of Smart Computing",
      year: 2022,
    },
    {
      title: "Object Detection using YOLOv5 for Industrial Inspection",
      authors: "Fitriani, D. et al.",
      journal: "Journal of Computer Vision and Robotics",
      year: 2023,
    },
  ];

  return (
    <div className="bg-deepBlend h-screen text-white">
      <Navbar />

      <section className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/images/research/hero-bg.jpg')" }}>
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore id="tsparticlesfullpage" background="transparent" minSize={0.6} maxSize={1.4} particleDensity={100} className="w-full h-full" particleColor="#FFFFFF" />
        </div>
        <div className="bg-black bg-opacity-60 p-8 w-full h-full rounded-xl text-center pt-48">
          <h1 className="text-4xl font-orbitron">Riset Inovatif untuk Masa Depan Teknologi</h1>
          <p className="mt-4 text-lg font-rajdhani">Kami menjelajahi batas teknologi melalui riset yang berdampak di bidang AI, Robotika, dan Sistem Cerdas.</p>
        </div>
      </section>

      {/* Focus riset */}

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold font-orbitron text-blue-800">Fokus Riset Kami</h2>
        <div className="grid md:grid-cols-3 gap-10 mt-10 px-10">
          {focusData.map((item) => (
            <div key={item.title} className="bg-deepBlend rounded-xl shadow-md pb-2 hover:shadow-xl transition-all duration-100">
              <img src={item.image} alt={item.title} className="h-48 w-full object-cover mb-4 rounded-t-xl" />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* projects */}

      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center font-orbitron text-blue-800">Proyek Riset Terkini</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10 px-10">
          {projects.map((project) => (
            <div key={project.title} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
              <img src={project.image} alt={project.title} className="w-full h-52 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-500">
                  {project.category} | {project.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-deepBlend">
        <h2 className="text-3xl font-bold text-center font-orbitron text-blue-800">Publikasi Ilmiah</h2>
        <div className="max-w-4xl mx-auto mt-10 px-6">
          {[...publications, ...publications].map((pub) => (
            <div key={pub.title} className="border-l-4 bg-black/50 border-blue-800 pl-4 py-4 mb-4">
              <h3 className="font-semibold">{pub.title}</h3>
              <p className="text-sm text-gray-600">{pub.authors}</p>
              <p className="text-sm italic text-gray-500">
                {pub.journal}, {pub.year}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Research;
