import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { checkIsAdmin, logout } from "../../service/authService";
import { IconLayoutDashboard, IconLogout, IconNotebook, IconPhoto, IconReportSearch, IconTools, IconUser, IconUsersGroup } from "@tabler/icons-react";
import { LoaderOne } from "../../component/ui/loader";
import Swal from "sweetalert2";
import ButtonLogout from "../../component/Button/ButtonLogout";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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
    // ✅ cek device kecil
    if (window.innerWidth < 768) {
      Swal.fire({
        icon: "warning",
        title: "Perhatian",
        text: "Admin dashboard lebih optimal digunakan di perangkat desktop.",
      });
    }
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/adminLogin");
  };

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <IconLayoutDashboard className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Workshop",
      href: "/admin/workshop",
      icon: <IconTools className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Workshop Result",
      href: "/admin/workshopResult",
      icon: <IconReportSearch className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Journal",
      href: "/admin/journal",
      icon: <IconNotebook className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Album & Photos",
      href: "/admin/albums",
      icon: <IconPhoto className="h-5 w-5 shrink-0" />,
    },
  ];

  const currentPage = [...navigationItems]
    .sort((a, b) => b.href.length - a.href.length) // cek yang paling panjang dulu
    .find((item) => location.pathname.startsWith(item.href));

  const pageTitle = currentPage ? currentPage.label : "Admin Dashboard";

  if (loading) {
    return (
      <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black/50">
        <LoaderOne />
      </div>
    );
  }

  return (
    <div className="flex w-full h-screen bg-gradient-to-b from-blue-50 via-blue-50 to-blue-50 font-roboto">
      {/* Navigation Sidebar */}
      <nav
        className={`
          ${sidebarOpen ? "w-64" : "w-16"} 
          bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out
          flex flex-col p-4
        `}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-3 mb-8">
          <img src="/images/logo.png" className="h-8 w-8 shrink-0 rounded-full" alt="Logo" />
          {sidebarOpen && <span className="font-medium text-black text-lg">UG MURO</span>}
        </div>

        {/* Toggle Button */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-5 h-5 flex flex-col justify-center space-y-1">
            <div className="w-full h-0.5 bg-gray-600"></div>
            <div className="w-full h-0.5 bg-gray-600"></div>
            <div className="w-full h-0.5 bg-gray-600"></div>
          </div>
        </button>

        {/* Navigation Links */}
        <div className="flex-1 space-y-2">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="
                flex items-center space-x-3 px-3 py-3 rounded-lg
                text-gray-700 hover:bg-blue-100 hover:text-blue-700
                transition-colors duration-200
                group
              "
            >
              <div className="text-gray-600 group-hover:text-blue-700">{item.icon}</div>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <ButtonLogout onClick={handleLogout} />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Welcome, {user.name || "Admin"}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
