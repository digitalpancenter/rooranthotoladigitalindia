import React, { useState } from "react";
import { User, LayoutDashboard, Home, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Needed for logout redirection

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/admin/dashboard" },
   { name: "Admin Room", icon: <Home />, path: "/admin/AdminAddUsers" },
    { name: "Admin Profile", icon: <User />, path: "/admin/profile" },
    { name: "Admin AllUser", icon: <User />, path: "/admin/all-users" },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white h-screen p-4 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-white">
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Menu Items */}
      <div className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-2 rounded hover:bg-gray-700 ${
              location.pathname === item.path ? "bg-gray-800" : ""
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <button
        className="flex items-center p-2 hover:bg-red-600 mt-auto rounded"
        onClick={() => {
          localStorage.removeItem("token");
          alert("You have been logged out.");
          navigate("/login");
        }}
      >
        <LogOut className="mr-2" />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
};

export default AdminSidebar;
