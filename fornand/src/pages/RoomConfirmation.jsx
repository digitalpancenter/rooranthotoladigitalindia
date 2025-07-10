import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const RoomConfirmation = () => {
  const navigate = useNavigate();
  const [taxData, setTaxData] = useState({
    tax1: "",
    tax2: "",
    contactNumber: "",
    customNote: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/room-confirmation-tax")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON but got HTML");
        }
        return res.json();
      })
      .then((data) => {
        setTaxData({
          tax1: data.tax1,
          tax2: data.tax2,
          contactNumber: data.contactNumber,
          customNote: data.customNote,
        });
      })
      .catch((err) => {
        console.error("💥 Fetch failed:", err);
        setError("Failed to load room information. Please try again.");
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-green-900 text-white">
      <Sidebar activePage="Room Confirmation" />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-green-800 p-10 rounded-lg shadow-lg text-center max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">✅ Room is Available</h1>
          <p className="text-lg mb-2">Thank you! Please contact the room owner.</p>

          {error && (
            <div className="bg-red-100 text-red-800 p-3 mb-4 rounded shadow">
              ⚠️ {error}
            </div>
          )}

          <div className="text-left mb-4 space-y-1">
            <p>📌 <strong>Room Charge:</strong> ₹{taxData.tax1}</p>
            <p>📌 <strong>Maintenance:</strong> ₹{taxData.tax2}</p>
            <p>📞 <strong>Contact:</strong> {taxData.contactNumber}</p>
          </div>

          {taxData.customNote && (
            <p className="text-sm text-yellow-200 animate-pulse mt-2 bg-green-700 p-2 rounded">
              📝 <em>{taxData.customNote}</em>
            </p>
          )}

          <button
            onClick={() => navigate("/room-available")}
            className="mt-6 px-6 py-2 bg-white text-green-800 font-semibold rounded hover:bg-gray-200 transition-all duration-300"
          >
            GO TO BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomConfirmation;
