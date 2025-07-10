// components/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Layers,
  CreditCard,
  MessageCircle,
  Calendar,
  Star,
  Settings,
  HelpCircle,
  Flag,
  UserPlus,
} from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/retailer" },
    { icon: <Layers size={20} />, label: "Rooms", path: "/rooms" },
    { icon: <CreditCard size={20} />, label: "Users Data", path: "/usersdata" },
    { icon: <MessageCircle size={20} />, label: "Chats", path: "/chats", badge: "4" },
    { icon: <Calendar size={20} />, label: "Staff Schedules", path: "/schedules" },
    { icon: <Star size={20} />, label: "Reviews", path: "/reviews" },
    { icon: <UserPlus size={20} />, label: "My Profile", path: "/profile" },
  ];

  const bottomItems = [
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    {
      icon: <HelpCircle size={20} />,
      label: "Logout",
      action: () => {
        localStorage.removeItem("token");
        alert("You have been logged out.");
        navigate("/login");
      },
    },
  ];

  const renderItem = ({ icon, label, path, badge, action }) => {
    const isActive = location.pathname === path;

    return (
      <div
        key={label}
        onClick={action || (() => navigate(path))}
        className={`flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-700 ${
          isActive ? "bg-gray-800 font-bold" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-white">{icon}</span>
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && badge && (
          <span className="bg-green-500 text-xs text-white px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gray-900 text-white min-h-screen p-4 transition-all duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-green-400 hover:text-green-300"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <Flag />
        </button>
      </div>

      {/* Sidebar Header */}
      {!collapsed && (
        <h2 className="text-2xl font-bold text-green-400 mb-6">
          🏨 R.A DIGITAL INDIA
        </h2>
      )}

      {/* Top Menu */}
      <nav className="space-y-3 flex-1">
        {menuItems.map(renderItem)}
      </nav>

      {/* Bottom Actions */}
      <div className="space-y-3 pt-4 border-t border-gray-700">
        {bottomItems.map(renderItem)}
      </div>
    </aside>
  );
}
