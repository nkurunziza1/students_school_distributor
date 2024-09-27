import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="max-w-[1440px] h-screen relative bg-black bg-radial-custom flex items-center overflow-hidden px-20">
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-r from-[#2C1250] to-[#2C1250] rounded-full blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-r from-[#2C1250] to-[#2C1250] rounded-full blur-3xl opacity-70"></div>
      <div className="absolute left-0 h-full pointer-events-none opacity-20 flex flex-col space-y-10">
        <svg
          className="w-32 h-32 mt-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2L2 7l10 5 10-5-10-5zm0 7l10 5-10 5-10-5 10-5zm10 5v6M2 14v6"
          />
        </svg>

        <svg
          className="w-40 h-40 ml-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 11H5M12 6l-7 7 7 7"
          />
        </svg>

        <svg
          className="w-28 h-28 ml-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a8 8 0 00-8-8H5v2h9a6 6 0 016 6z"
          />
        </svg>
      </div>

      <div className="absolute right-0 h-full pointer-events-none opacity-20 flex flex-col space-y-10">
        <svg
          className="w-36 h-36 mb-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M3 14h18"
          />
        </svg>

        <svg
          className="w-48 h-48 mr-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16V6a1 1 0 011-1h3m-1 10H6a2 2 0 00-2 2v3h8v-3a2 2 0 00-2-2z"
          />
        </svg>

        <svg
          className="w-32 h-32 mr-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2l-5 9h10l-5-9zm0 3.3a1.7 1.7 0 11-1.7 1.7 1.7 1.7 0 011.7-1.7zm7 11.7v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1h8z"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="flex gap-8 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-6 text-4xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Welcome to Our AI-Powered Platform
            </span>
          </h1>
          <p className="mb-4 text-sm lg:leading-normal text-purple-300">
            Your future starts here! Our platform allows students to check their
            final exam marks, view their allocated schools based on performance,
            and explore different study sections. With AI, the Ministry of
            Education can efficiently distribute students to various schools
            across the country.
          </p>

          <h2 className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
            Discover your path today!
          </h2>

          <TypeAnimation
            sequence={[
              "Student Marks",
              1000,
              "School Placement",
              1000,
              "Educational Insights",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-purple-500 text-lg sm:text-xl lg:text-2xl font-semibold"
          />
          <br />
          <br />
          <br />

          <Link to="/results" className="relative px-5 py-2 font-medium text-white group mt-24 cursor-pointer">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
            <span className="relative">Get Started</span>
          </Link>
        </motion.div>

        {/* Image section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#2C1250] border border-blue-500 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative flex justify-center items-center overflow-hidden">
            <img
              src="/icons/logo001.svg"
              alt="hero image"
              className="w-[150px] h-[150px] lg:w-[350px] lg:h-[350px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
