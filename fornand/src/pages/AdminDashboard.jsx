import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-10 space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Money" value="$53,000" trend="+55%" />
        <StatCard title="Today's Users" value="2,300" trend="+5%" />
        <StatCard title="New Clients" value="+3,462" trend="-2%" />
        <StatCard title="Sales" value="$103,430" trend="+3%" />
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Active Users</h3>
          <Bar
            data={{
              labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              datasets: [
                {
                  label: "Users",
                  data: [36, 45, 25, 40, 50, 30, 43],
                  backgroundColor: "#4f46e5",
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May"],
              datasets: [
                {
                  label: "Sales",
                  data: [150, 200, 170, 240, 210],
                  borderColor: "#3b82f6",
                  tension: 0.4,
                },
              ],
            }}
            options={{ responsive: true }}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h4 className="text-gray-600">{title}</h4>
    <p className="text-2xl font-bold">{value}</p>
    <p className={`text-sm ${trend.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
      {trend}
    </p>
  </div>
);

export default AdminDashboard;
