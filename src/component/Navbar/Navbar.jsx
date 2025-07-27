import React from "react";
import {  NavLink } from "react-router-dom";

const Navbar = () => {

    const navItemStyle = ({isActive}) => isActive ? "font-semibold border-b-2 border-b-white" : "font-semibold"; 


  return (
    <nav className="bg-deepBlend shadow-md p-5 px-10 text-white">
      <div className=" flex justify-between">
        <div className="flex gap-2">
          <div className="text-4xl font-bold">UG MURO</div>
          <div className="">
            <h1 className="font-bold">PUSAT STUDI</h1>
            <h1 className="font-bold">MULTIMEDIA & ROBOTIKA</h1>
          </div>
        </div>
        <div className="flex gap-10  items-center">
          <NavLink to={"/"} className={navItemStyle}>PROFIL</NavLink>
          <NavLink to={"/daftar"} className={navItemStyle}>DAFTAR</NavLink>
          <NavLink to={"/aktivitas"} className={navItemStyle}>AKTIVITAS</NavLink>
          <NavLink to={"/riset"} className={navItemStyle}>RISET</NavLink>
          <NavLink to={"/galeri"} className={navItemStyle}>GALERI</NavLink>
          <NavLink to={"/kontak"} className={navItemStyle}>KONTAK</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
