import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsAdmin, logout } from "../../service/authService";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);
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

  if (loading) return <p>Loading...</p>;

  const handleLogout = async() => {
     await logout();
     navigate('/adminLogin');
  }

  return <div className="">
    <p> ini adalah AdminDashboard pages</p>
    <button onClick={handleLogout} className="bg-blue-500 px-5 hover:bg-blue-700">Logout</button>
    </div>;
};

export default AdminDashboard;
