import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom"; // ⬅️ import

const RoomRentHandover = () => {
  const [records, setRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); // ⬅️ hook
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
    if (!token) {
      navigate("/login"); // ⬅️ redirect if not logged in
      return;
    }

    fetchRecords();
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      <Sidebar activePage="Room Rent Handover" />
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Room Rent Handover</h1>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
        >
          Show Message
        </button>

        <div className="max-w-5xl">
          <h2 className="text-xl font-semibold mb-4">My Handover Records</h2>

          {records.length === 0 ? (
            <p className="text-gray-600">No records found.</p>
          ) : (
            <table className="w-full bg-white rounded shadow text-sm border border-gray-300">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="p-2 border border-gray-300">#</th>
                  <th className="p-2 border border-gray-300">Full Name</th>
                  <th className="p-2 border border-gray-300">Owner</th>
                  <th className="p-2 border border-gray-300">Family</th>
                  <th className="p-2 border border-gray-300">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {records.map((item, i) => (
                  <tr key={item._id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border border-gray-300">{i + 1}</td>
                    <td className="p-2 border border-gray-300">{item.fullName}</td>
                    <td className="p-2 border border-gray-300">{item.ownerName}</td>
                    <td className="p-2 border border-gray-300">{item.familyName}</td>
                    <td className="p-2 border border-gray-300">₹{item.rentAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h2 className="text-xl font-bold text-green-700 text-center mb-3">Important Notice</h2>
              <p className="text-gray-700 text-center mb-4">
                आपने जिसको भी rent payment किया है,<br />
                कृपया अपने owner को जरूर बता दें।
              </p>
              <div className="text-center">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RoomRentHandover;
