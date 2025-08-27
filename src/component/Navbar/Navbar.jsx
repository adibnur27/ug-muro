import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const tabs = [
  { label: "PROFIL", path: "/" },
  { label: "DAFTAR", path: "/daftar" },
  { label: "AKTIVITAS", path: "/aktivitas" },
  { label: "RISET", path: "/riset" },
  { label: "GALERI", path: "/galeri" },
  { label: "KONTAK", path: "/kontak" },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const [showNavbar, setShowNavbar] = useState(true);
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
      // scroll ke bawah, sembunyikan navbar
      setShowNavbar(false);
    } else {
      // scroll ke atas, tampilkan navbar
      setShowNavbar(true);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <nav className={`shadow-md md:px-10 pt-5 text-white fixed left-0 right-0 md:left-0 md:right-0 lg:left-10 lg:right-10 top-0 z-50 bg-black/70 lg:bg-black/10  transition-transform duration-700 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex gap-3 items-center ms-10 md:ms-0 lg:ms-0">
          <img src="/images/logo.png" alt="logo" className="z-0 w-[15%]" />
          <div className="leading-tight flex flex-col justify-center">
            <h1 className="font-bold text-xs md:text-sm font-rajdhani">PUSAT STUDI</h1>
            <h1 className="font-bold text-xs md:text-sm font-rajdhani">MULTIMEDIA & ROBOTIKA</h1>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-8 items-center text-sm relative">
          {tabs.map((tab) => (
            <li key={tab.path} className="relative">
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `text-lg font-semibold font-rajdhani nav-link ${
                    isActive ? "text-white" : "text-gray-300"
                  }`
                }
              >
                {tab.label}
              </NavLink>
              {location.pathname === tab.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white text-3xl z-50 me-10"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.ul
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col mt-4 lg:hidden gap-2 text-center "
        >
          {tabs.map((tab) => (
            <li key={tab.path}>
              <NavLink
                to={tab.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-semibold font-rajdhani ${
                    isActive ? "text-black bg-white px-40 rounded-md" : "text-gray-300"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
};

export default Navbar;