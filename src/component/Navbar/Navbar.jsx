import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItemStyle = ({ isActive }) =>
    `text-xl font-semibold font-rajdhani nav-link ${
      isActive ? "nav-link-active" : ""
    }`;

  return (
    <nav className=" shadow-md px-10 py-5 text-white   fixed left-5 right-20 top-2 z-50">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="text-4xl font-bold font-orbitron">UG MURO</div>
          <div className="leading-tight flex flex-col justify-center">
            <h1 className="font-bold text-sm font-rajdhani">PUSAT STUDI</h1>
            <h1 className="font-bold text-sm font-rajdhani">MULTIMEDIA & ROBOTIKA</h1>
          </div>
        </div>
        <div className="flex gap-10 items-center text-sm">
          <NavLink to="/" className={navItemStyle}>PROFIL</NavLink>
          <NavLink to="/daftar" className={navItemStyle}>DAFTAR</NavLink>
          <NavLink to="/aktivitas" className={navItemStyle}>AKTIVITAS</NavLink>
          <NavLink to="/riset" className={navItemStyle}>RISET</NavLink>
          <NavLink to="/galeri" className={navItemStyle}>GALERI</NavLink>
          <NavLink to="/kontak" className={navItemStyle}>KONTAK</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
