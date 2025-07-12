// src/pages/Rooms.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Make sure Sidebar exists

const roomButtons = [
  { label: "All Room Rent", path: "/roomrents" },
  { label: "Room Rent Handover", path: "/roomranthandover" },
  { label: "Create Room Rent", path: "/roomcheck" },
  { label: "Room Available", path: "/room-available" },
  { label: "Room Close", path: "/RoomClose" },
  { label: "Add Room", path: "/admin/room-add-new" },
];

export default function Rooms() {
  const [activePage, setActivePage] = useState("Rooms");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Room Management</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomButtons.map((btn, index) => (
            <button
              key={index}
              onClick={() => navigate(btn.path)}
              className="w-full p-5 text-lg font-semibold text-white bg-gradient-to-r from-red-500 via-yellow-400 to-yellow-500 rounded-lg shadow hover:opacity-90 transition"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}