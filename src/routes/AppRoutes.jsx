import React from "react";
import { Route, Routes } from "react-router-dom";

// PAGES
import Profile from "../pages/Profile/Profile";
import Registration from "../pages/Registration/Registration";
import Activity from "../pages/Activity/Activity";
import Research from "../pages/Research/Research";
import Galery from "../pages/Galery/Galery";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import ScrollToTop from "../component/ScrollToTop/ScrollToTop";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
const routes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/daftar" element={<Registration />} />
        <Route path="/aktivitas" element={<Activity />} />
        <Route path="/riset" element={<Research />} />
        <Route path="/galeri" element={<Galery />} />
        <Route path="/kontak" element={<Contact />} />

        {/* Admin pages */}
        <Route path="/adminLogin" element={<AdminLogin/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>

        {/* NOT FOUND PAGES */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default routes;
