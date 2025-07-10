import React, { useState, useEffect } from "react";

const AdminRoomConfirmation = () => {
  const [formData, setFormData] = useState({
    tax1: "",
    tax2: "",
    contactNumber: "",
    customNote: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/room-confirmation-tax")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            tax1: data.tax1 || "",
            tax2: data.tax2 || "",
            contactNumber: data.contactNumber || "",
            customNote: data.customNote || "",
          });
        }
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/room-confirmation-tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        throw new Error("Failed to save data");
      }
    } catch (err) {
      console.error(err);
      setError("Server error while saving");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-2xl font-bold mb-6">Set Room Confirmation Details</h2>

      <div className="space-y-6 max-w-md">
        {["tax1", "tax2", "contactNumber", "customNote"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            />
          </div>
        ))}

        {success && (
          <div className="text-green-400">✅ Data saved successfully.</div>
        )}
        {error && (
          <div className="text-red-400">⚠️ {error}</div>
        )}

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminRoomConfirmation;
