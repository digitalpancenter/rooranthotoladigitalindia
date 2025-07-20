import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "retailer",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("https://rooranthotoladigitalindia.onrender.com/api/auth/signup", form);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('/img/limak.jpg')`, // Ensure this image exists in public/img
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Signup Form */}
      <div className="relative z-10 bg-gray-900 bg-opacity-90 p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Sign Up
        </h2>

        {/* Name */}
        <input
          name="name"
          autoComplete="off"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          name="email"
          type="email"
          autoComplete="off"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="retailer">Retailer</option>
         {/* <option value="admin">Admin</option> */}
        </select>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded-md text-white transition ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login Link */}
        <p className="text-center text-sm mt-4 text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
