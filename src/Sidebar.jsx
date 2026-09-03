import React from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaSignOutAlt, FaUserPlus, FaUsers } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen fixed left-0 top-0 p-5">
      <h2 className="text-xl font-bold mb-5">Admin Dashboard</h2>
      <ul className="space-y-4">
        <li className="p-2 hover:bg-gray-700 rounded">
          <Link to={"/dashboard"} className="flex items-center">
            <FaChartPie className="mr-3" />
            Dashboard
          </Link>
        </li>
        <li className="p-2 hover:bg-gray-700 rounded">
          <Link to={"/manage"} className="flex items-center">
            <FaUsers className="mr-3" />
            Manage Students
          </Link>
        </li>
        <li className="p-2 hover:bg-gray-700 rounded">
          <Link to={"/add"} className="flex items-center">
            <FaUserPlus className="mr-3" />
            Add Student
          </Link>
        </li>
        <button className="flex items-center">
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
