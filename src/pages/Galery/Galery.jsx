// UG-MURO/src/pages/AdminDashboard/component/Albums/Albums.jsx

import React, { useState } from "react";
import GalleryDisplay from "./component/GalleryDisplay";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";
import Swal from "sweetalert2";

const Gallery = () => {
  return (
    <div className="bg-deepBlend pt-20">
      <Navbar/>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <GalleryDisplay />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Gallery;
