import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLinks } from "../constants";
//import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  // Update active link on route change
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Handle dropdown open/close
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <section className="w-full flex justify-between items-center py-4 px-5 md:px-20 border-b-2 bg-gray-800 sticky top-0 z-40">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white">
        LOGO
      </Link>

      {/* Hamburger Menu Icon for Small Screens */}
      <div className="md:hidden w-full flex justify-end">
        {/* <IconButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <CloseIcon className="text-white" />
          ) : (
            <MenuIcon className="text-white" />
          )}
        </IconButton> */}
      </div>

      {/* Navigation Links for Desktop */}
      <div className={`hidden md:flex gap-8 items-center w-full justify-end mr-12`}>
        {NavLinks.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`text-sm ${activeLink === item.link
                ? "text-red-600 font-bold"
                : "text-white hover:text-blue-400"
              }`}
          >
            {item.label}
          </Link>
        ))}
        <Link
          to="/register"
          onClick={toggleMobileMenu} // Close menu when clicked
          className="text-sm text-white hover:text-white bg-blue-500 py-2 px-3 font-bold rounded-full"
        >
          Apply University
        </Link>
      </div>

      {/* Profile Icon with Dropdown */}
      <div className="relative">
        {/* <Avatar
          className="cursor-pointer"
          onClick={handleClick}
          alt="User Avatar"
          src="/path-to-avatar-image.jpg" // Replace with your avatar image URL
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          className="mt-2"
          PaperProps={{
            style: {
              transform: "translateY(10px)",
              backgroundColor: "#fff",
            },
          }}
        >
          <MenuItem>
            <Link to="/profile" className="w-full text-gray-700">
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/settings" className="w-full text-gray-700">
              Settings
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/logout" className="w-full text-gray-700">
              Logout
            </Link>
          </MenuItem>
        </Menu> */}
      </div>

      {/* Mobile Menu (Hamburger Navigation) */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 p-5 md:hidden flex flex-col gap-4">
          {NavLinks.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              onClick={toggleMobileMenu} // Close menu when a link is clicked
              className={`text-sm ${activeLink === item.link
                  ? "text-red-600 font-bold"
                  : "text-white hover:text-orange-400"
                }`}
            >
              {item.label}
            </Link>
          ))}
          {/* Register link in mobile menu */}
          <Link
            to="/register"
            onClick={toggleMobileMenu} // Close menu when clicked
            className="text-sm text-white hover:text-orange-400"
          >
            Register
          </Link>
        </div>
      )}
    </section>
  );
};

export default Navbar;
