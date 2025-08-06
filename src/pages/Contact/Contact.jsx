import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";

import Footer from "../../component/Footer/Footer";
import FormContact from "./formContact/FormContact";

const Contact = () => {
  const backgrounds = ["/images/background/ContactBg.webp", "/images/background/ContactBg1.webp", "/images/background/ContactBg2.webp"];

  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // mulai fade-out
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % backgrounds.length);
        setFade(true); // fade-in setelah ganti gambar
      }, 1000); // waktu fade-out
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-deepBlend">
      <Navbar />
      <div className="relative h-[500px] overflow-hidden">
        <div className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${fade ? "opacity-100" : "opacity-0"}`} style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }} />
        <div className="relative z-10 text-white flex flex-col p-20 justify-end h-full">
          <h1 className="md:text-6xl lg:text-7xl text-4xl pt-10 font-orbitron">Hubungi Kami</h1>
          <p className="md:text-2xl lg:text-3xl font-bold pt-10 lg:w-2/3 font-rajdhani">Halaman ini menyediakan informasi untuk menghubungi kami secara langsung. Kami terbuka untuk komunikasi dan kolaborasi.</p>
        </div>
      </div>

      <div className="bg-gradient-to-tl from-[#79BAD9] to-[#6C8EC4] shadow-xl shadow-black flex items-center justify-center p-8">
        <div className="w-full bg-transparent text-white flex flex-col md:flex-row justify-between font-rajdhani">
          <div className="mb-10 md:w-[40%]">
            <h4 className="text-lg font-semibold border-b-2 border-white inline-block mb-2">GET IN TOUCH WITH US</h4>
            <h2 className="text-4xl font-bold mb-4">How can we support your journey?</h2>
            <p className="text-md max-w-xl">In today's fast-changing world, digital transformation is no longer optional. Is your business ready to thrive in the future?</p>
          </div>

          <FormContact />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
