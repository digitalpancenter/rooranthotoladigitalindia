import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import Sidebar from "../components/Sidebar"; // ✅ Sidebar should exist
import { useNavigate } from "react-router-dom";

const RoomAvailable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    textMessage: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/login");
    } else {
      fetchRoomStatus();
    }
  }, [navigate]);

  const fetchRoomStatus = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/room-availability");
      const data = await res.json();
      if (data && data.length > 0) {
        setFormData({
          ownerName: data[0].ownerName,
          textMessage: data[0].textMessage,
          status: data[0].status || "inactive",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/room-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save data");

      alert("Saved successfully!");
      setOpenModal(false);
    } catch (error) {
      console.error("Save error:", error.message);
      alert("Error saving data.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar activePage="Room Available" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Room Availability</h2>

        <div className="space-y-6 max-w-xl">
          <div>
            <label className="block mb-1">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              disabled
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Text Message</label>
            <textarea
              name="textMessage"
              value={formData.textMessage}
              disabled
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>

          {/* Show Edit button only if status is active */}
          {formData.status === "active" && (
            <button
              onClick={() => setOpenModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Edit Owner Info
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6 space-y-4 text-black">
            <Dialog.Title className="text-lg font-bold">Edit Owner Information</Dialog.Title>

            <div>
              <label className="block mb-1">Owner Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-400"
              />
            </div>

            <div>
              <label className="block mb-1">Text Message</label>
              <textarea
                name="textMessage"
                value={formData.textMessage}
                onChange={handleInputChange}
                className="w-full p-2 rounded border border-gray-400"
              />
            </div>

            {formData.status === "active" && (
              <>
                <button
                  className="w-full py-2 text-white bg-green-600 rounded mt-4"
                  disabled
                >
                  ✅ Room is Available
                </button>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setOpenModal(false);
                      navigate("/room-confirmation");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    OK
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default RoomAvailable;
