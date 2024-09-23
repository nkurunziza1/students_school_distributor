import { Link } from "react-router-dom";
import NavLinks from "../constants/NavLinks";
import { GoSignOut } from "react-icons/go";
import React from "react";

const SideNavbar = () => {
  return (
    <div className="flex  w-[153px] flex-col gap-9 py-4 md:px-2 h-screen fixed text-white xs:bg-slate-200 xs:h-fit bg-blue-600 items-center justify-center">
      <Link
        className="mb-2 flex justify-center rounded-md  w-full items-center h-[80px]"
        to="/"
      >
        <h1 className=" p-3 text-white text-sm font-semibold glassmorphism2 rounded-lg w-full text-center">
          Logo
        </h1>
      </Link>
      <div className="flex h-full grow flex-row lg:justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form
        >
          <button className="flex h-[48px] xs:bg-amber-50 w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="glassmorphism2 p-5 rounded-lg">
              <GoSignOut className="w-4 h-4"/>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideNavbar;
