import React from "react";
import { FaSchool, FaUserGraduate, FaChartBar, FaCog } from "react-icons/fa";
import { BsFillBookmarksFill } from "react-icons/bs";
import { CiHome } from "react-icons/ci";
import { Link } from "react-router-dom";
import clsx from "clsx";

// Navigation Links for the app
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: CiHome },
  { name: 'Schools', href: '/dashboard/schools', icon: FaSchool },
  { name: 'Exams Results', href: '/dashboard/exams-results', icon: FaChartBar },
  { name: 'Suggestions', href: '/dashboard/suggestions', icon: BsFillBookmarksFill },
  { name: 'Settings', href: '/dashboard/settings', icon: FaCog },
];

export default function NavLinks() {
  return (
    <div className="flex flex-col gap-5">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx(
              'flex  text-white items-center justify-start text-sm leading-tight font-light hover:bg-purple-600'
            )}
          >
            <div className="w-fit p-3 rounded-lg glassmorphism2 ">
              <LinkIcon className='w-5 h-5' />
            </div>
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
