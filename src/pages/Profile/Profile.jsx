import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import GlobeRadar from "./ui/GlobeRadar";
import Footer from "../../component/Footer/Footer";

const Profile = () => {
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Deteksi ukuran layar (bisa ganti pakai window.matchMedia juga)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // cek awal
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-deepBlend text-white">
      <Navbar />

      {/* Background animation */}
      <div className="fixed top-10 z-0 animate-pulse-slow" style={{ right: "-100px" }}>
        <div className="w-[250px] h-[250px] bg-purple-500 opacity-60 blur-3xl rounded-full"></div>
      </div>
      <div className="fixed z-0 animate-pulse-slow" style={{ left: "-50px", bottom: "-100px" }}>
        <div className="w-[250px] h-[250px] bg-purple-500 opacity-60 blur-3xl rounded-full"></div>
      </div>

      {/* HEADER */}
      <div className="relative h-screen overflow-hidden">
        {/* Video (khusus md ke atas dan hanya jika tidak error) */}
        {!isMobile && !videoError && (
          <video autoPlay muted loop playsInline poster="/images/fallbackBackground.png" className="absolute inset-0 w-full h-full object-cover z-0" onError={() => setVideoError(true)} role="presentation" aria-hidden="true">
            <source src="/videos/backgorundHeader.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback image untuk mobile atau saat video gagal */}
        {(isMobile || videoError) && <img src="/images/fallbackBackground.png" alt="Fallback Background" className="absolute inset-0 w-full h-full object-cover z-0" />}

        {/* Foreground Content */}
        <div className="flex md:justify-start gap-32 items-center h-full z-10 relative text-white md:mx-16">
          <div className="text-center">
            <h1 className="font-semibold text-5xl font-orbitron mb-3">PUSAT STUDI</h1>
            <h1 className="font-semibold text-5xl font-orbitron mb-3">MULTIMEDIA & ROBOTIKA</h1>
            <p className="text-4xl font-rajdhani">UNIVERSITAS GUNADARMA</p>
          </div>
        </div>
      </div>

      {/* VISI & MISI */}
      <div className="lg:h-screen min-w-screen-xl w-full p-5 flex flex-col gap-32 z-10 py-10 relative bg-gradient-to-t from-deepBlend via-white/20 to-black">
        <div className="absolute z-0 top-24 right-0 opacity-30">
          <img src="/images/logo.png" alt="robotic" className="z-0 w-[90%]" />
        </div>
        <div className="absolute z-0 bottom-0 md:w-1/2 right-0">
          <img src="/images/robotic1.png" alt="robotic" className="z-0 w-[90%]" />
        </div>
        <div className="px-5 border-l-2 border-white flex flex-col gap-5 w-fit max-w-xl z-10">
          <h3 className="text-5xl font-orbitron"> VISI</h3>
          <p className="font-rajdhani font-bold text-xl">
            Menjadi pusat studi unggulan dalam bidang multimedia dan robotika yang inovatif, kolaboratif, dan berdaya saing global, serta mendukung perkembangan teknologi berbasis riset dan pendidikan unggul.
          </p>
        </div>
        <div className="flex flex-col gap-8 px-5 border-l-2 border-white z-10 text-center lg:text-left">
          <h3 className="text-5xl w-min font-orbitron mx-auto md:mx-0">MISI</h3>

          <div className="flex flex-wrap justify-evenly backdrop-blur-sm bg-black/10 md:bg-white/10 py-2">
            {[
              "Menyelenggarakan penelitian dan pengembangan di bidang multimedia dan robotika yang berorientasi pada kebutuhan masyarakat dan industri.",
              "Meningkatkan kompetensi sumber daya manusia melalui pelatihan, seminar, dan program pengembangan teknologi terkini.",
              "Menjalin kerja sama strategis dengan institusi dalam dan luar negeri di bidang riset dan implementasi teknologi multimedia dan robotika.",
              "Mendorong inovasi dan penerapan teknologi robotika serta multimedia dalam berbagai bidang kehidupan.",
            ].map((text, index) => (
              <div
                key={index}
                className={`w-full md:w-[48%] lg:w-[22%] p-4 border-white
          ${index < 3 ? "lg:border-r-2" : ""}
          ${index < 2 ? "md:border-b-2" : ""}
          border-b-2 lg:border-b-0`}
              >
                <p className="text-lg lg:text-xl font-bold font-rajdhani">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Organization Structure */}
      <div className="h-screen bg-gradient-to-bl from-black via-deepBlend to-deepBlend">
        <p className="text-5xl text-center p-10"> Structure Organisasi</p>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
