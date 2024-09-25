import { useState } from "react";
import { formatDate } from "../../utils/formatedDate";
import { FiSearch } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import React from "react";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [level, setLevel] = useState("O-Level"); // Initial level set to "O-Level"

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const currentDate = new Date();

  return (
    <nav className="border-b py-4 px-2 text-white sticky top-0 z-10 w-full bg-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white">Hello, Calvin</h1>
          <p className="text-sm font-light text-white">
            {formatDate(currentDate)}
          </p>
        </div>
        <div className="relative flex flex-1 mx-4 max-w-[352px] h-[56px] items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-4 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <FiSearch className="absolute right-3 top-5 text-gray-500" />
        </div>

        <Link
          to="/dashboard/schools/add-student"
          className="py-4 px-6 flex items-center justify-center bg-purple-700 rounded-lg text-white gap-2"
        >
          <CiCirclePlus size={24} />
          Add Student
        </Link>
        <Link
          to="/dashboard/schools/add-school"
          className="py-4 px-6 flex items-center justify-center border border-white rounded-lg text-white gap-2"
        >
          <CiCirclePlus size={24} />
          Add School
        </Link>

        <div className="relative ml-4">
          <div
            className="flex items-center cursor-pointer py-2 px-3 rounded-lg"
            onClick={toggleDropdown}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 text-gray-300 border-[#D2F2F7]">
              <img
                src="/images/girl-student.png"
                className="rounded"
                alt="user-1"
                height={40}
                width={40}
              />
            </div>
            <svg
              className="ml-2 w-4 h-4 text-gray-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Conditionally render combinations if level is "A-Level" */}
      {level === "A-Level" && (
        <div className="combinations-section mt-4">
          <h2 className="text-lg font-bold">Combinations</h2>
          <ul>
            <li>MCB</li>
            <li>PCB</li>
            <li>MCE</li>
            {/* Add more combinations as needed */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TopNavbar;
