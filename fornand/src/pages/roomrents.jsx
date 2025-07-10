import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // ✅ Ensure correct path

export default function RoomRents() {
  const [formData, setFormData] = useState({
    fullName: "",
    fullAddress: "",
    mobile: "",
    email: "",
    amount: "",
    issueDate: "",
    payDate: "",
  });

  const [expectedAmount, setExpectedAmount] = useState(2000);
  const [extra, setExtra] = useState(0);
  const [shortage, setShortage] = useState(0);
  const [rents, setRents] = useState([]);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const amt =
      name === "amount" ? parseInt(value || 0) : parseInt(formData.amount || 0);
    const expected =
      name === "expectedAmount"
        ? parseInt(value || 0)
        : parseInt(expectedAmount || 0);

    if (name === "amount" || name === "expectedAmount") {
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
    }
  };

  const fetchRents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/roomrents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRents(res.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      alert("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchRents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForm = {
      ...formData,
      extra,
      shortage,
    };

    try {
      await axios.post("http://localhost:5000/api/roomrents", updatedForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Submitted successfully!");
      fetchRents();
      setFormData({
        fullName: "",
        fullAddress: "",
        mobile: "",
        email: "",
        amount: "",
        issueDate: "",
        payDate: "",
      });
      setExtra(0);
      setShortage(0);
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Something went wrong while submitting.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <Sidebar activePage="Room Rents" />

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 text-black">
        <h1 className="text-2xl font-bold mb-6">Room Rent Submission</h1>

        {/* 🔽 Form */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 max-w-2xl bg-white p-6 rounded shadow mx-auto"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="fullAddress"
              placeholder="Full Address"
              value={formData.fullAddress}
              onChange={handleChange}
              required
              className="p-2 border rounded"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile (optional)"
              value={formData.mobile}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Expected Rent */}
          <input
            type="number"
            name="expectedAmount"
            placeholder="Expected Rent (default: 2000)"
            value={expectedAmount}
            onChange={(e) => {
              setExpectedAmount(e.target.value);
              handleChange({ target: { name: "expectedAmount", value: e.target.value } });
            }}
            className="p-2 border rounded"
          />

          {/* Paid Amount */}
          <input
            type="number"
            name="amount"
            placeholder="Paid Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
                className="p-2 border rounded w-full"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Pay Date</label>
              <input
                type="date"
                name="payDate"
                value={formData.payDate}
                onChange={handleChange}
                required
                className="p-2 border rounded w-full"
              />
            </div>
          </div>

          {/* Calculations */}
          <div className="flex justify-between text-sm text-gray-700">
            <span>Shortage: ₹{shortage}</span>
            <span>Extra: ₹{extra}</span>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {/* 🔽 Display Table */}
        <div className="mt-10 max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">My Submitted Rents</h2>
          {rents.length === 0 ? (
            <p>No data found.</p>
          ) : (
            <table className="min-w-full border text-sm bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Shortage</th>
                  <th className="p-2 border">Extra</th>
                  <th className="p-2 border">Issue Date</th>
                  <th className="p-2 border">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {rents.map((rent) => (
                  <tr key={rent._id} className="text-center">
                    <td className="p-2 border">{rent.fullName}</td>
                    <td className="p-2 border">₹{rent.amount}</td>
                    <td className="p-2 border text-red-600">₹{rent.shortage}</td>
                    <td className="p-2 border text-green-600">₹{rent.extra}</td>
                    <td className="p-2 border">
                      {new Date(rent.issueDate).toLocaleDateString()}
                    </td>
                    <td className="p-2 border">
                      {new Date(rent.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
