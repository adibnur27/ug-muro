import React, { useState } from "react";
import { login } from "../../service/authService";
import { useNavigate } from "react-router-dom";
import { LoaderOne } from "../../component/ui/loader";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "email wajib di isi";
    if (!formData.password) newErrors.password = "password wajib di isi";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const result = await login(formData.email, formData.password);
        const role = result.user.user_metadata?.role;
        if (role === "admin") {
          Swal.fire({
            icon: "success",
            title: "Login Berhasil",
            text: `Selamat datang, ${role}!`,
            timer: 2000,
            showConfirmButton: false,
          });
          navigate("/admin");
        } else {
          alert("kamu bukan admin");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: error.response?.data?.message || "Terjadi kesalahan saat login.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative bg-gray-200 h-screen flex items-center justify-center rounded p-5">
      {loading && (
        <div className="absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black/50">
          <LoaderOne />
        </div>
      )}
      <form onSubmit={handleSubmit} className="lg:w-[30%] md:w-[70%] w-full space-y-6 py-6 px-10 rounded shadow bg-white">
        <div>
          <img src="/images/logo.png" alt="Logo Pusat Studi Multimedia & Robotika" className="mx-auto w-16" />
          <h2 className="font-semibold text-2xl text-center">Sign In To Admin</h2>
          <p className="text-center text-sm">Pusat Studi Multimedia & Robotika</p>
        </div>
        <div className="">
          {errors.email && <p className="text-red-500 italic">{errors.email}</p>}
          <label htmlFor="email" className="mb-1 block font-semibold text-md">
            Email
          </label>
          <input name="email" type="text" id="email" value={formData.email} onChange={handleChange} className="border-2 border-gray-300 active:border-black px-2 hover:shadow-lg shadow-black w-full h-9 rounded-lg" />
        </div>
        <div className="">
          {errors.password && <p className="text-red-500 italic">{errors.password}</p>}
          <label htmlFor="password" className="me-2 block font-semibold text-md">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="border-2 border-gray-300 active:border-black px-2 hover:shadow-lg shadow-black w-full h-9 rounded-lg"
            autoComplete="off"
          />
        </div>

        <button type="submit" className="bg-black w-full py-1 rounded-xl text-white font-bold hover:shadow-lg hover:bg-gray-900 transition-all">
          Login
        </button>
        <p className="font-semibold text-sm text-center">Forgot Your Password ?</p>
        <div className="text-center text-sm text-gray-500">
          <p>If you don't have an account,</p>
          <p>please contact the admin.</p>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
