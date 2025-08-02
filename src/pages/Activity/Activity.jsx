import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";

const Activity = () => {
  return (
    <div className="bg-deepBlend h-screen text-white">
      <Navbar />
      {/*  Hero Section */}
      <section className="relative bg-cover bg-center h-[450px] text-white flex items-center justify-center" style={{ backgroundImage: "url('/images/background/registrationBg1.jpg')" }}>
        <div className=" p-10 rounded-xl text-center max-w-2xl">
          <h1 className="text-4xl font-bold font-orbitron">Aktivitas Kami</h1>
          <p className="text-2xl mt-4 font-rajdhani">Eksplorasi potensi melalui kursus, workshop, dan kompetisi berbasis teknologi. Belajar, berinovasi, dan berkompetisi bersama Pusat Studi Multimedia dan Robotika.</p>
        </div>
      </section>

      {/* Kursus Section */}

      <section className="bg-deepBlend py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold font-orbitron text-center mb-10">Program Kursus</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Dasar Pemrograman IoT",
              desc: "Belajar pemrograman dasar Arduino dan sensor digital. Cocok untuk pemula yang ingin masuk ke dunia embedded system.",
              image: "/images/course/arduino.jpg",
            },
            {
              title: "Pemrograman Python untuk Robotika",
              desc: "Menggunakan Raspberry Pi untuk automasi robotika berbasis Python.",
              image: "/images/course/python.jpg",
            },
            {
              title: "Pengenalan Sistem Tertanam",
              desc: "Belajar arsitektur mikrokontroler, komunikasi serial, dan aplikasi praktis.",
              image: "/images/course/mikrokontroler.jpg",
            },
          ].map((kursus, i) => (
            <div key={i} className="bg-gray-100 shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition hover:scale-90">
              <img src={kursus.image} alt={kursus.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-black">{kursus.title}</h3>
                <p className="text-gray-600 text-sm">{kursus.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop Section */}

      <section className="bg-white text-black py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold font-orbitron text-center mb-10">Workshop Unggulan</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "Drone Engineering", 
              desc: "Pelajari dasar pengoperasian dan perakitan drone secara langsung.", 
              img: "/images/workshop/workshop-drone.jpg" 
            },
            { 
              title: "Mikon Agrotech", 
              desc: "Automasi pertanian dengan mikrokontroler. Solusi cerdas untuk pertanian modern.", 
              img: "/images/workshop/workshop-agrotech.jpg" 
            },
            { title: "Mikon Healthcare", desc: "Rancang prototipe alat kesehatan sederhana berbasis sensor biometrik.", img: "/images/workshop/workshop-health.jpg" },
            { title: "Raspberry Pi Dasar", desc: "Belajar dasar Linux dan kendali GPIO dengan Raspberry Pi.", img: "/images/workshop/workshop-raspi.jpg" },
            { title: "Robot Berbasis Raspberry", desc: "Bangun robot pintar berbasis Raspberry Pi dan Python.", img: "/images/workshop/workshop-robot.jpg" },
            { title: "Computer Vision & Recognition", desc: "Pengenalan face/object recognition dengan OpenCV dan Python.", img: "/images/workshop/workshop-recognition.webp" },
          ].map((workshop, i) => (
            <div key={i} className="bg-white text-black rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition">
              <img src={workshop.img} alt={workshop.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{workshop.title}</h3>
                <p className="text-sm mt-1">{workshop.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESC (Embedded System Competition) */}

      <section className="bg-deepBlend py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-orbitron font-bold mb-4">Embedded System Competition (ESC)</h2>
          <p className="font-rajdhani text-lg text-white mb-6">
            ESC adalah ajang tahunan untuk mahasiswa dan siswa tingkat akhir yang ingin menunjukkan inovasi terbaik dalam bidang embedded system. Kompetisi ini meliputi kategori robotika, agroteknologi, dan healthcare dengan penilaian
            langsung dari praktisi industri dan akademisi.
          </p>
          <img src="/images/workshop/workshop-robot.jpg" alt="ESC Competition" className="mx-auto rounded-lg shadow-xl max-h-[400px] object-cover" />
          <div className="mt-6">
            <a href="/esc" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-md">
              Lihat Detail Kompetisi
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Activity;
