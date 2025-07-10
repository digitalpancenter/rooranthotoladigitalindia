import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", revenue: 2 },
  { month: "Feb", revenue: 4 },
  { month: "Mar", revenue: 4 },
  { month: "Apr", revenue: 3 },
  { month: "May", revenue: 5 },
  { month: "Jun", revenue: 6 },
  { month: "Jul", revenue: 7 },
];

const upcomingGuests = [
  { name: "Jocelyn", room: "18B", date: "09 - 12 June", image: "https://i.pravatar.cc/100?img=1" },
  { name: "Silvy", room: "18B", date: "09 - 12 June", image: "https://i.pravatar.cc/100?img=2" },
  { name: "Thomas", room: "18B", date: "09 - 12 June", image: "https://i.pravatar.cc/100?img=3" },
  { name: "Miguel", room: "18B", date: "09 - 12 June", image: "https://i.pravatar.cc/100?img=4" },
  { name: "Marcella", room: "18B", date: "09 - 12 June", image: "https://i.pravatar.cc/100?img=5" },
];

export default function RetailerDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const navigate = useNavigate();

  // ✅ Token Check for Authentication
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      <main className="flex-1 p-6 overflow-auto space-y-6">
        {activePage === "Dashboard" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard title="Departure" value="52.92%" sub="June, 2023" growth="1.25%" />
              <StatCard title="Booked" value="20.92%" sub="June, 2023" growth="1.11%" />
              <StatCard
                title="Satisfaction"
                value="4.52/5"
                sub="Total Score"
                note="Enhance your service to elevate customer satisfaction ratings."
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="col-span-2 bg-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Revenue Stats</h3>
                <p className="text-green-400 mb-2">Hotel Sari Ater</p>
                <p className="text-3xl font-bold mb-4">Rp16.247.000,00</p>
                <p className="text-green-400 mb-4">+12% vs last years</p>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="month" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} />
                      <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Upcoming Entry</h3>
                <div className="space-y-4 overflow-y-auto max-h-96">
                  {upcomingGuests.map((guest) => (
                    <div key={guest.name} className="flex items-center space-x-4">
                      <img src={guest.image} alt={guest.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <p className="font-semibold">{guest.name}</p>
                        <p className="text-gray-400 text-sm">
                          Room {guest.room} | {guest.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activePage !== "Dashboard" && (
          <div className="text-2xl font-bold">{activePage} Page Coming Soon!</div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, sub, growth, note }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 space-y-2">
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-3xl font-bold text-green-400">{value}</p>
      <p className="text-gray-400">{sub}</p>
      {growth && <p className="text-green-400 text-sm">+{growth} vs Last Month</p>}
      {note && <p className="text-gray-400 text-sm">{note}</p>}
    </div>
  );
}
