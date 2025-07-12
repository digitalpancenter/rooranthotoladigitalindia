// components/SidebarItem.jsx
import React from "react";

export default function SidebarItem({ icon, label, collapsed, onClick, badge }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-700 rounded transition-colors"
    >
      {icon}
      {!collapsed && (
        <>
          <span>{label}</span>
          {badge && (
            <span className="ml-auto bg-green-400 text-black px-2 rounded-full text-xs">
              {badge}
            </span>
          )}
        </>
      )}
    </div>
  );
}
