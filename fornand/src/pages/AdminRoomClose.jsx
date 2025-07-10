import React, { useEffect, useState } from "react";

const AdminRoomClose = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    email: "",
    amount: "",
    roomCloseDate: "",
    floor: "",
  });

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchRecords = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/room-close");
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("❌ Failed to fetch records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `http://localhost:5000/api/room-close/${editingId}`
        : "http://localhost:5000/api/room-close";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save data");

      setFormData({
        customerName: "",
        mobile: "",
        email: "",
        amount: "",
        roomCloseDate: "",
        floor: "",
      });
      setEditingId(null);
      fetchRecords();
    } catch (err) {
      console.error("❌ Submit failed:", err);
    }
  };

  const handleEdit = (record) => {
    setFormData({ ...record });
    setEditingId(record._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await fetch(`http://localhost:5000/api/room-close/${id}`, {
        method: "DELETE",
      });
      fetchRecords();
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {editingId ? "✏️ Edit Room Close" : "🛑 Admin Room Close Entry"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            placeholder="Customer Name"
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="Customer Mobile"
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Customer Email (Optional)"
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="Room Rent Amount"
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="date"
            name="roomCloseDate"
            value={formData.roomCloseDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />

          <select
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select Floor</option>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                Floor {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold"
        >
          {editingId ? "Update" : "Submit"}
        </button>
      </form>

      {/* ✅ Record Table */}
      <div className="w-full max-w-6xl mt-10">
        <h3 className="text-xl font-semibold mb-2">Room Close Records</h3>
        {records.length === 0 ? (
          <p className="text-gray-600">No records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border rounded shadow text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Mobile</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Close Date</th>
                  <th className="p-2 border">Floor</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec._id} className="text-center hover:bg-gray-50">
                    <td className="border p-1">{rec.customerName}</td>
                    <td className="border p-1">{rec.mobile}</td>
                    <td className="border p-1">{rec.email || "-"}</td>
                    <td className="border p-1">₹{rec.amount}</td>
                    <td className="border p-1">{rec.roomCloseDate}</td>
                    <td className="border p-1">{rec.floor}</td>
                    <td className="border p-1 space-x-2">
                      <button
                        onClick={() => handleEdit(rec)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rec._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRoomClose;
