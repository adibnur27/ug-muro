  import React, { useState } from "react";
  import { login } from "../../service/authService";
  import { useNavigate } from "react-router-dom";

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
            alert("login berhasil");
            navigate("/adminDashboard");
          } else {
            alert("kamu bukan admin");
          }
        } catch (error) {
          alert("Login gagal", error);
        } finally {
          setLoading(false);
        }
      }
    };

    return (
      <div className="bg-gray-200 h-screen pt-52">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-6 rounded shadow bg-white">
          <h2 className="font-bold text-xl text-center">Login Form</h2>
          <div className="">
            {errors.email && <p className="text-red-500 italic">{errors.email}</p>}
            <label htmlFor="email" className="mb-1 block">
              email :
            </label>
            <input name="email" type="text" id="email" value={formData.email} onChange={handleChange} placeholder="email" className="border-2 border-black" />
          </div>
          <div className="">
            {errors.password && <p className="text-red-500 italic">{errors.password}</p>}
            <label htmlFor="password" className="me-2 block">
              Password :
            </label>
            <input name="password" type="password" id="password" value={formData.password} onChange={handleChange} placeholder="password" className="border-2 border-black" autoComplete="off"/>
          </div>

          <button type="submit" className="bg-blue-600 w-32 py-1 rounded-xl text-white font-bold hover:shadow-lg hover:bg-blue-700">
            {loading ? <p>Loading...</p> : <p>Login</p> }
          </button>
        </form>
      </div>
    );
  };

  export default AdminLogin;
