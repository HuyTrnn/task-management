import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BaseInput } from "../BaseInput/BaseInput";
import SearchInput from "../BaseInput/SearchInput";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      key: "/",
      label: "All Tasks",
    },
    {
      key: "/completed",
      label: "Completed",
    },
  ];
  return (
    <aside className="w-64 bg-white shadow-lg relative">
      <div className="p-6">
        <div className="mb-4">
          <SearchInput placeholder="Basic usage" />
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center px-4 py-3 cursor-pointer ${
                location.pathname === item.key
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => navigate(item.key)}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
