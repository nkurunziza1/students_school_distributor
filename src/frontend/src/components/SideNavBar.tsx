import { Link } from "react-router-dom";
import NavLinks from "../constants/NavLinks";
import { GoSignOut } from "react-icons/go";
import React from "react";

const SideNavbar = () => {
  return (
    <div className="flex flex-col gap-9 py-4 md:px-2 h-[90vh] fixed text-white xs:bg-slate-200 xs:h-fit glassmorphism items-center justify-center rounded-3xl">
      <Link
        className="mb-2 flex justify-center rounded-md  w-full items-center h-[80px]"
        to="/"
      >
        <img src="/icons/logo001.svg" width={40} height={40} />
        AI-NESA
      </Link>
      <div className="flex h-full grow flex-row lg:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form>
          <button className="flex h-[48px] bg-purple-500 w-full grow items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="glassmorphism2 rounded-lg flex items-center justify-between gap-2 w-full">
              <GoSignOut className="w-4 h-4" />
              Sign Out
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideNavbar;
