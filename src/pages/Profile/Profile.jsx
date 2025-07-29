import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import GlobeRadar from "./ui/GlobeRadar";

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
    <div className="bg-deepBlend h-[10000px] text-white">
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
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/fallbackBackground.png"
            className="absolute inset-0 w-full h-full object-cover z-0"
            onError={() => setVideoError(true)}
            role="presentation"
            aria-hidden="true"
          >
            <source src="/videos/backgorundHeader.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Fallback image untuk mobile atau saat video gagal */}
        {(isMobile || videoError) && (
          <img
            src="/images/fallbackBackground.png"
            alt="Fallback Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

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
      <div>
        <p className="text-5xl text-center p-10"> VISI & MISI</p>
      </div>
    </div>
  );
};

export default Profile;
