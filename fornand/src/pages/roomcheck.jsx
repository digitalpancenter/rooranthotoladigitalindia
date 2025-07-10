import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RoomConfirmation = () => {
  const navigate = useNavigate();

  // 🔒 Token check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // ⬅️ Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-green-900 text-white">
      <Sidebar activePage="Room Confirmation" />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-green-800 p-10 rounded-lg shadow-lg text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">📢 ध्यान दें</h1>
          <p className="text-lg mb-6">
            पहले आप Room चेक करें कि Available है या नहीं
          </p>

          <button
            onClick={() => navigate("/room-available")}
            className="px-6 py-2 bg-white text-green-800 font-semibold rounded hover:bg-gray-200 transition-all duration-300"
          >
            Room Available चेक करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomConfirmation;
