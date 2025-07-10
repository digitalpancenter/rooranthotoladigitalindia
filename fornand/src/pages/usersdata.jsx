import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // ✅ Ensure the path is correct

const UsersData = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/roomrents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        alert("Unable to fetch data");
      });
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">
      {/* ✅ Sidebar */}
      <Sidebar activePage="Room Data" />

      {/* ✅ Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Room Rent Data</h1>

        <div className="overflow-auto">
          <table className="min-w-full bg-white text-black rounded shadow text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Address</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Email</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Extra</th>
                <th className="p-3">Shortage</th>
                <th className="p-3">Issue Date</th>
                <th className="p-3">Pay Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => (
                <tr
                  key={i}
                  className={`border-t hover:bg-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.fullAddress}</td>
                  <td className="p-3">{user.mobile || "-"}</td>
                  <td className="p-3">{user.email || "-"}</td>
                  <td className="p-3">₹{user.amount}</td>
                  <td className="p-3 text-green-600">
                    {user.extra > 0 ? `+₹${user.extra}` : "₹0"}
                  </td>
                  <td className="p-3 text-red-600">
                    {user.shortage > 0 ? `-₹${user.shortage}` : "₹0"}
                  </td>
                  <td className="p-3">{user.issueDate?.slice(0, 10)}</td>
                  <td className="p-3">{user.payDate?.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UsersData;
