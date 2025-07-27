import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import GlobeRadar from "./ui/GlobeRadar";

const Profile = () => {
  return (
    <div className="bg-deepBlend h-[10000px] text-white">
      <Navbar />
      <div className="fixed top-10 z-0 animate-pulse-slow" style={{ right: "-100px" }}>
        <div className="w-[250px] h-[250px] bg-purple-500 opacity-60 blur-3xl rounded-full"></div>
      </div>
      <div className="fixed z-0 animate-pulse-slow" style={{ left: "-50px", bottom: "-100px" }}>
        <div className="w-[250px] h-[250px] bg-purple-500 opacity-60 blur-3xl rounded-full"></div>
      </div>

      {/* HEADER */}

      <div className="h-screen" style={{ backgroundImage: "url('/backgroundDark.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <div className="flex justify-center gap-32 items-center h-full z-10">
          <div className="text-center">
            <h1 className="font-semibold text-5xl font-orbitron mb-3">PUSAT STUDI</h1>
            <h1 className="font-semibold text-5xl font-orbitron mb-3">MULTIMEDIA & ROBOTIKA</h1>
            <p className=" text-4xl font-rajdhani">UNIVERSITAS GUNADARMA</p>
          </div>
          <GlobeRadar />
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
