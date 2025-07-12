import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"; // 👈 don't forget to import
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const location = useLocation();

  // 👇 Console check
  console.log("Path:", location.pathname);

  // 👇 Match the exact route used in App.jsx
  const hideNavbarRoutes = [
    "/retailer",
    "/admin/dashboard",
    "/rooms",
    "/usersdata",
    "/chats",
    "/schedules",
    "/reviews",
    "/profile",
    "/room-confirmation",
    "/roomranthandover",
    "/roomrents",
    "/roomcheck",
    "/room-available",
    "/RoomClose",
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* ✅ Hide Navbar on specific paths */}
      {!shouldHideNavbar && <Navbar />}

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
