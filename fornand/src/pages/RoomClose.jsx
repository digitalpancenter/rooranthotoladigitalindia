import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RoomClose = () => {
  const navigate = useNavigate();

  // 🔒 Token check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // ⬅️ Redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Left Sidebar */}
      <Sidebar activePage="Room Close" />

      {/* ✅ Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center text-gray-600 space-y-4 max-w-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            My Room Close Records
          </h1>

          <p>
            Close hua hai ya nahin yahan se aapko pata nahin chalega. <br />
            <span className="font-semibold text-red-500">
              Only admin ko pata hota hai room khali hai ya nahin.
            </span>
          </p>

          <p className="mt-4">
            Kripya check karne ke liye{" "}
            <button
              onClick={() => navigate("/room-available")}
              className="inline-block mt-2 px-6 py-2 bg-white text-green-800 font-semibold border border-green-600 rounded hover:bg-green-50 transition-all duration-300"
            >
              Yahan Click Karen
            </button>{" "}
            room available hai ya nahin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomClose;
