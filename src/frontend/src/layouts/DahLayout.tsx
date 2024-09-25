import { Outlet } from "react-router-dom"
import SideNavbar from "../components/SideNavBar"
import TopNavbar from "../components/dashboard/TopDashHeader"
import React from "react"

const DahLayout = () => {
  return (
    <main className='flex bg-gray-800'>
      <div className="w-full flex flex-col md:w-44 shadow h-screen items-center justify-center mr-5">
        <SideNavbar />
      </div>
      <div className="min-h-screen w-full flex flex-col items-center">
        <TopNavbar />
        <Outlet />
      </div>
    </main>
  )
}

export default DahLayout
