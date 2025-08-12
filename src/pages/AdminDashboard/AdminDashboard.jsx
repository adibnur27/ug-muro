  import React, { useEffect, useState } from "react";
  import { Link, Outlet, useNavigate } from "react-router-dom";
  import { checkIsAdmin, logout } from "../../service/authService";
  import { Sidebar, SidebarBody, SidebarLink } from "../../component/ui/sidebar"; // sesuaikan pathnya jika beda
  import { IconArrowLeft, IconBrandTabler, IconHome, IconLayoutDashboard, IconLogout, IconNotebook, IconPhoto, IconSettings, IconTools, IconUser, IconUserBolt, IconUsersGroup } from "@tabler/icons-react";
  import { motion } from "framer-motion"; // atau dari motion/react kalau kamu pakai motion/react
  import { cn } from "@/lib/utils";
  import { LoaderOne } from "../../component/ui/loader";
  import Swal from "sweetalert2";

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
          Swal.fire({
            icon: "error",
            title: "Anda belum login",
            text: error.response?.data?.message || "Silahkan login terlebih dahulu.",
          });
          navigate("/adminLogin");
        } finally {
          setLoading(false);
        }
      };
      fetchAdminData();
    }, [navigate]);

    const handleLogout = async () => {
      await logout();
      navigate("/adminLogin");
    };

    const links = [
      {
        label: "Dashboard",
        href: "/admin",
        icon: <IconLayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      },
      {
        label: "Admin Profile",
        href: "/admin/adminProfile",
        icon: <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200 bg-gray-50 rounded-full" />,
      },
      {
        label: "Participants",
        href: "/admin/participants",
        icon: <IconUsersGroup className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      },
      {
        label: "Workshop",
        href: "/admin/workshop",
        icon: <IconTools className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      },
      {
        label: "Journal",
        href: "/admin/journal",
        icon: <IconNotebook className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      },
      {
        label: "Album & Photos",
        href: "/admin/albums",
        icon: <IconPhoto className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
      },
    ];

    if (loading)
      return (
        <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black/50">
          <LoaderOne />
        </div>
      );

    return (
      <div className={cn("flex w-full h-screen p-3 gap-3 bg-gradient-to-b from-blue-50 via-blue-50 to-blue-50")}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 bg-white rounded border font-roboto">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto ">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => {
                  if (link.onClick) {
                    // Tombol logout
                    return (
                      <div key={idx} onClick={link.onClick} className="hover:bg-blue-50 px-1 cursor-pointer">
                        <SidebarLink link={link} />
                      </div>
                    );
                  } else {
                    // Navigasi menggunakan Link react-router
                    return (
                      <Link key={idx} to={link.href} className="hover:bg-blue-50 px-1">
                        <SidebarLink link={link} />
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
            <div onClick={handleLogout} className="hover:bg-blue-50 px-1 cursor-pointer">
              <SidebarLink
                link={{
                  label: <p className="cursor-pointer">Logout</p>,
                  icon: <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />,
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

        {/* Dashboard content area */}
        <div className="flex flex-1 flex-col p-10 bg-white dark:bg-neutral-900 border rounded overflow-y-scroll font-roboto">
          <Outlet />
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
