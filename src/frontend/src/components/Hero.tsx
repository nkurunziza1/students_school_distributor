

import React from "react";

const Hero = () => {
  return (
    <section className=" w-full Hero h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-3xl font-bold text-gray-300">
          Revolutionizing Education in Africa through Digitization with
          BlockChain
        </h1>
        <button className="border-2 mt-24 animate-bounce border-blue-500 text-white py-1 px-3 rounded-full text-base font-semibold">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;
