import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      const { token, role } = res.data;

      // ✅ Save token
      localStorage.setItem("token", token);

      alert("✅ Login successful");

      // ✅ Navigate based on role
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "retailer") {
        navigate("/retailer");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      alert("❌ Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/hotel.jpg')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black bg-opacity-60 text-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-transparent border border-white text-white placeholder-gray-300"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-transparent border border-white text-white placeholder-gray-300"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded"
        >
          Sign In
        </button>

         <div className="text-center text-sm mt-4">
          <Link to="/SendOtp" className="text-blue-400 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <p className="text-center text-sm mt-4 text-white">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-300 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
