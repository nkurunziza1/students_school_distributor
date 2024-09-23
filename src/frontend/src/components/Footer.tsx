import React from 'react';
import { FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="flex items-center justify-center">
        <FaRegCopyright className="mr-2" />
        <span>2024 All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
