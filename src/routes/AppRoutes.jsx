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

// pages Admin
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Dashboard from "../pages/AdminDashboard/component/Dashboard/Dashboard";
import Participants from "../pages/AdminDashboard/component/Participants/Participants";
import Workshop from "../pages/AdminDashboard/component/Workshop/Workshop";
import Journal from "../pages/AdminDashboard/component/Journals/Journal";
import Albums from "../pages/AdminDashboard/component/Albums/Albums";
import AdminProfile from "../pages/AdminDashboard/component/AdminProfile/AdminProfile";
import WorkshopResult from "../pages/AdminDashboard/component/WorkshopResult/WorkshopResult";
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
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard/>} />
          <Route path="participants" element={<Participants />} />
          <Route path="workshop" element={<Workshop />} />
          <Route path="journal" element={<Journal />} />
          <Route path="albums" element={<Albums />} />
          <Route path="adminProfile" element={<AdminProfile />} />
          <Route path="workshopResult" element={<WorkshopResult />} />
        </Route>

        {/* NOT FOUND PAGES */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default routes;
