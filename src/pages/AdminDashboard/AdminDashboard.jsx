import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsAdmin, logout } from "../../service/authService";
import { Sidebar, SidebarBody, SidebarLink } from "../../component/ui/sidebar"; // sesuaikan pathnya jika beda
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUser, IconUserBolt } from "@tabler/icons-react";
import { motion } from "framer-motion"; // atau dari motion/react kalau kamu pakai motion/react
import { cn } from "@/lib/utils";
import { LoaderOne } from "../../component/ui/loader";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { user, accessToken } = await checkIsAdmin();
        setUser(user);
        setAccessToken(accessToken);
      } catch (error) {
        alert(error.message);
        navigate("/adminLogin");
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [navigate]);
  console.log(user);
  const handleLogout = async () => {
    await logout();
    navigate("/adminLogin");
  };

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Participants",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Workshop",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Journal",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Album & Photos",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Logout",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      onClick: handleLogout, // tambahkan event ini
    },
  ];

  if (loading)
    return (
      <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black/50">
        <LoaderOne />
      </div>
    );

  return (
    <div className={cn("flex w-full h-screen p-3 gap-3 bg-gradient-to-b from-blue-50 via-blue-50 to-blue-50 ")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-white rounded border">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto ">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.onClick || (() => {})} className="hover:bg-blue-50 px-1 cursor-pointer">
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <SidebarLink
            link={{
              label: <p className="font-bold uppercase">{user?.user_metadata.role || "admin"}</p>,
              href: "#",
              icon: <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200 bg-blue-50 rounded-full" />,
            }}
          />
        </SidebarBody>
      </Sidebar>

      {/* Dashboard content area */}
      <div className="flex flex-1 flex-col p-10 bg-white dark:bg-neutral-900 border rounded">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Selamat Datang, Admin</h1>
        <p className="text-black dark:text-white">Ini adalah halaman dashboard admin kamu.</p>
      </div>
    </div>
  );
};

const Logo = () => (
  <a href="#" className="flex items-center space-x-2 text-sm font-normal text-black py-1">
    <img src="/images/logo.png" className="h-7 w-7 shrink-0 rounded-full" alt="Avatar" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-black dark:text-white">
      UG MURO
    </motion.span>
  </a>
);

const LogoIcon = () => (
  <a href="#" className="flex items-center space-x-2 text-sm font-normal text-black py-1">
    <img src="/images/logo.png" className="h-7 w-7 shrink-0 rounded-full" alt="Avatar" />
  </a>
);

export default AdminDashboard;
