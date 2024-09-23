import { useState } from "react";
import { formatDate } from "../../utils/formatedDate";
import { FiSearch } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { RiNotification2Line } from "react-icons/ri";
import React from "react";
const TopNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const currentDate = new Date();

  return (
    <nav className="border-b p-4 text-black sticky top-0 bg-white z-10 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-slate-700">Hello, Calvin</h1>
          <p className="text-sm font-light text-slate-600">
            {formatDate(currentDate)}
          </p>
        </div>
        <div className="relative flex flex-1 mx-4 max-w-[352px]  h-[56px] items-center justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-4 pr-8 bg-[#F5F5F5] border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <FiSearch className="absolute right-3 top-5 text-gray-500" />
        </div>
        <button
          type="button"
          className="py-4 px-6 flex items-center justify-center bg-primary-2 rounded-lg text-white gap-2"
        >
          <CiCirclePlus size={24} />
          Create Client
        </button>
        <div className=" p-3 bg-[#F5F5F5] rounded-lg">
          <RiNotification2Line size={24} />
        </div>
        <div className="relative ml-4">
          <div
            className="flex items-center cursor-pointer bg-[#F5F5F5] py-2 px-3 rounded-lg"
            onClick={toggleDropdown}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-[#D2F2F7]">
              <img
                src="/images/girl-student.png"
                className="rounded"
                alt="user-1"
                height={40}
                width={40}
              />
            </div>
            <svg
              className="ml-2 w-4 h-4 text-gray-800"
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
    </nav>
  );
};

export default TopNavbar;
