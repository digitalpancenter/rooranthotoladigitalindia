import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Listen for scroll and toggle background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // You can adjust scroll threshold
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-8 py-6 text-white">
        <div
          className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="bg-white text-black px-2 py-1 rounded-full">🏨</span>
          R.A DIGITAL INDIA
        </div>

        <ul className="hidden md:flex gap-8 font-medium text-lg">
          <li className="cursor-pointer hover:text-blue-300" onClick={() => navigate("/")}>
            Home
          </li>
          <li className="cursor-pointer hover:text-blue-300" onClick={() => navigate("/")}>
            Hotels
          </li>
          <li className="cursor-pointer hover:text-blue-300" onClick={() => navigate("/")}>
            Experience
          </li>
          <li className="cursor-pointer hover:text-blue-300" onClick={() => navigate("/")}>
            About
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="text-white text-xl hover:scale-110 transition">🔍</button>
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
// return(<>
// </>)
};


export default Navbar;
