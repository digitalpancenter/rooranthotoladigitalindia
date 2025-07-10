import React, { useEffect, useState } from "react";

const RoomRentHandover = () => {
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRecords = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/room-handover/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("❌ Failed to fetch records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Important Notice
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          आपने जिसको भी rent payment किया है,<br />
          कृपया अपने owner को जरूर बता दें।
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default RoomRentHandover;
