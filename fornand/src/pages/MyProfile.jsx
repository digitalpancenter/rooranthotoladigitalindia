import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [activePage, setActivePage] = useState("My Profile");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (err) {
        alert("Session expired or invalid token. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />

      <main className="flex-1 p-6 overflow-auto space-y-6 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-lg text-gray-800">
          <div className="bg-blue-600 text-white p-6 text-center">
            <h2 className="text-3xl font-bold">My Profile</h2>
          </div>
          <div className="p-6">
            <table className="w-full table-auto text-left text-gray-700">
              <tbody>
                <TableRow label="Name" value={profile.name} />
                <TableRow label="Email" value={profile.email} />
                <TableRow label="Role" value={profile.role} />
                <TableRow label="User ID" value={profile._id} />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr className="border-b">
    <td className="py-3 px-4 font-semibold text-gray-600">{label}</td>
    <td className="py-3 px-4">{value}</td>
  </tr>
);

export default MyProfile;
