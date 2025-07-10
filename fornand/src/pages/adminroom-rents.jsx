import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const AdminRoomRents = () => {
  const [rents, setRents] = useState([]);
  const [editData, setEditData] = useState(null);
  const [expectedAmount, setExpectedAmount] = useState(2000);
  const [extra, setExtra] = useState(0);
  const [shortage, setShortage] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/all-roomrents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRents(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/roomrents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRents();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleEditClick = (rent) => {
    const expected = rent.expectedAmount || 2000;
    setEditData({
      ...rent,
      issueDate: rent.issueDate?.slice(0, 10),
      payDate: rent.payDate?.slice(0, 10),
      expectedAmount: expected,
    });
    setExpectedAmount(expected);
    recalculateDifference(rent.amount, expected);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" || name === "expectedAmount") {
      const amt = name === "amount" ? parseInt(value || 0) : parseInt(editData.amount || 0);
      const expected = name === "expectedAmount" ? parseInt(value || 0) : parseInt(editData.expectedAmount || 2000);

      setEditData((prev) => ({
        ...prev,
        [name]: value,
        expectedAmount: name === "expectedAmount" ? value : prev.expectedAmount,
      }));

      recalculateDifference(amt, expected);
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const recalculateDifference = (amt, expected) => {
    if (amt > expected) {
      setExtra(amt - expected);
      setShortage(0);
    } else if (amt < expected) {
      setShortage(expected - amt);
      setExtra(0);
    } else {
      setExtra(0);
      setShortage(0);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...editData,
        extra,
        shortage,
        expectedAmount: parseInt(editData.expectedAmount || 2000),
      };
      await axios.put(`http://localhost:5000/api/roomrents/${editData._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Updated successfully");
      setEditData(null);
      fetchRents();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">All Room Rent Records</h1>

      {/* ✅ Edit Form */}
      {editData && (
        <div className="bg-white p-4 rounded shadow mb-6 space-y-3">
          <h2 className="text-xl font-semibold">Edit Room Rent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              name="fullName"
              value={editData.fullName}
              onChange={handleEditChange}
              className="p-2 border rounded"
              placeholder="Full Name"
            />
            <input
              type="text"
              name="fullAddress"
              value={editData.fullAddress}
              onChange={handleEditChange}
              className="p-2 border rounded"
              placeholder="Full Address"
            />
            <input
              type="text"
              name="mobile"
              value={editData.mobile}
              onChange={handleEditChange}
              className="p-2 border rounded"
              placeholder="Mobile"
            />
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              className="p-2 border rounded"
              placeholder="Email"
            />
            <input
              type="number"
              name="amount"
              value={editData.amount}
              onChange={handleEditChange}
              className="p-2 border rounded"
              placeholder="Amount"
            />
            <input
              type="number"
              name="expectedAmount"
              value={editData.expectedAmount}
              onChange={handleEditChange}
              className="p-2 border rounded"
              placeholder="Expected Amount"
            />
            <input
              type="date"
              name="issueDate"
              value={editData.issueDate}
              onChange={handleEditChange}
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="payDate"
              value={editData.payDate}
              onChange={handleEditChange}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Shortage: ₹{shortage}</span>
            <span>Extra: ₹{extra}</span>
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      )}

      {/* ✅ Table */}
      <table className="min-w-full bg-white text-sm rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">#</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Address</th>
            <th className="p-3 border">Mobile</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Amount</th>
            <th className="p-3 border">Rantfix</th>
            <th className="p-3 border text-green-600">Extra</th>
            <th className="p-3 border text-red-600">Shortage</th>
            <th className="p-3 border">Issue</th>
            <th className="p-3 border">Pay</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rents.map((rent, i) => (
            <tr key={rent._id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              <td className="p-2 border">{rent.fullName}</td>
              <td className="p-2 border">{rent.fullAddress}</td>
              <td className="p-2 border">{rent.mobile || "-"}</td>
              <td className="p-2 border">{rent.email || "-"}</td>
              <td className="p-2 border">₹{rent.amount}</td>
              <td className="p-2 border">₹{rent.expectedAmount || 2000}</td>
              <td className="p-2 border text-green-600">₹{rent.extra}</td>
              <td className="p-2 border text-red-600">₹{rent.shortage}</td>
              <td className="p-2 border">{rent.issueDate?.slice(0, 10)}</td>
              <td className="p-2 border">{rent.payDate?.slice(0, 10)}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEditClick(rent)}
                  className="text-blue-600"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(rent._id)}
                  className="text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRoomRents;
