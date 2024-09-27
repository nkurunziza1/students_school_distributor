import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLinks } from "../constants";
import React from "react";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open = Boolean(anchorEl);

  const [authenticated, setAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      const { isAuthenticated } = await import("../auth/auth");
      const authStatus = await isAuthenticated();
      setAuthenticated(authStatus as boolean);
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchPrincipal = async () => {
      const { getPrincipalText } = await import("../auth/auth");
      const principal = await getPrincipalText();
      setPrincipal(principal);
    };
    fetchPrincipal();
  }, []);

  const handleLogin = async () => {
    const { login } = await import("../auth/auth");
    login();
  };

  const handleLogout = async () => {
    const { logout: destroy } = await import("../auth/auth");
    destroy();
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <section className="w-full flex justify-between items-center py-4 px-5 md:px-20 bg-[#270C4A] sticky top-0 z-40">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-white flex items-center justify-start w-1/2">
        <img src="/icons/logo001.svg" width={40} height={40} />
        AI-NESA
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
              ? "text-purple-600 font-semibold"
              : "text-white hover:text-purple-400"
              }`}
          >
            {!authenticated && item.label === "dashboard" ? "" : item.label}
          </Link>
        ))}
        <Link
          to="/register"
          onClick={toggleMobileMenu} // Close menu when clicked
          className="text-sm text-white hover:text-white bg-purple-500 py-2 px-3 font-bold rounded-full"
        >
          Contact Us
        </Link>
        {authenticated ? (
          <button
            className="text-sm text-white hover:text-white py-2 px-5 font-bold border border-purple-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="text-sm text-white hover:text-white py-2 px-5 font-bold border border-purple-300"
          >
            Log in
          </button>)}

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
                ? "text-purple-600 font-semibold"
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
