import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://admin-dashboard-backend-xcxm.onrender.com/api/v1/user/login",
        formData,
      );
      console.log("LOGIN SUCCESS", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-400 items-center justify-center px-4 py-8">
        <div className="bg-white max-w-md w-full items-center justify-center rounded-lg p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Login your account?
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-gray-800 font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 cursor-pointer"
              />
            </div>
            <div>
              <label className="mb-2 block text-gray-800 font-bold">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 border rounded-lg outline-none focus:ring-2 cursor-pointer"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 text-center bg-blue-500 hover:bg-blue-800 cursor-pointer rounded-xl text-white font-bold transition duration-300"
            >
              {loading ? "Loggin in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
