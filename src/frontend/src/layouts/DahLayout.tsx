import { Outlet } from "react-router-dom"
import SideNavbar from "../components/SideNavBar"
import TopNavbar from "../components/dashboard/TopDashHeader"
import React from "react"

const DahLayout = () => {
  return (
    <main className='flex'>
      <div className="w-full flex-none md:w-44 shadow">
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
