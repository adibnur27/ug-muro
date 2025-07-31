import React, {useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import FormContact from "../Contact/formContact/FormContact";
import Footer from "../../component/Footer/Footer";
import WorkShopForm from "./RegistrationForm/WorkShopForm";
import CourseForm from "./RegistrationForm/CourseForm";
import Threads from "./ui/Threads";

const Registration = () => {

  const [activeTab, setActiveTab] = useState("workshop");


  return (
    <div className="bg-deepBlend">
      <Navbar />

      {/* Background Header */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 `}
          style={{
            backgroundImage: `url(/images/background/registrationBg.jpg)`,
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

      {/* Tab Navigation */}
      <div className="bg-gradient-to-tr from-[#3d0939] via-[#330754] to-[#3d0939] z-10">
        <div style={{ width: "100%", height: "900px", position: "absolute", top: "200px" }}>
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
        </div>

        <div className="flex justify-center pt-8 gap-4 relative font-rajdhani">
          <button
            onClick={() => setActiveTab("workshop")}
            className={`px-6 py-2  font-semibold ${
              activeTab === "workshop" ? "bg-blue-800 text-white" : "bg-gray-200 text-blue-800 hover:bg-gray-300"
            }`}
          >
            Daftar Workshop
          </button>
          <button
            onClick={() => setActiveTab("course")}
            className={`px-6 py-2  font-semibold ${
              activeTab === "course" ? "bg-blue-800 text-white" : "bg-gray-200 text-blue-800 hover:bg-gray-300"
            }`}
          >
            Daftar Kursus
          </button>
        </div>

        {/* Form div */}
        <div className="p-5 lg:py-10 relative">
          {activeTab === "workshop" ? <WorkShopForm /> : <CourseForm />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Registration;
