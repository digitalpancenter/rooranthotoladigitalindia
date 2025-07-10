import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginByToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      alert("No token found.");
      return navigate("/login");
    }

    localStorage.setItem("token", token);

    // Optionally: verify token or fetch user info
    axios.get("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      if (res.data.role === "admin") navigate("/admin");
      else navigate("/retailer");
    }).catch(() => {
      alert("Invalid or expired login link.");
      localStorage.removeItem("token");
      navigate("/login");
    });
  }, [navigate]);

  return <p className="text-white p-10">Logging in via link...</p>;
};

export default LoginByToken;
