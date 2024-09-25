"use client";
import React, { useTransition, useState, useEffect } from "react";


const AboutSection = () => {
  const [tab, setTab] = useState("vision");
  const [isPending, startTransition] = useTransition();


  return (
    <section className="text-white bg-black bg-radial-custom" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <img
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in"
          src="/images/about-image.webp"
          width={500}
          height={500}
          alt="About Us"
        />
        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in"
          className="mt-4 md:mt-0 text-left flex flex-col h-full"
        >
          <h2 className="text-4xl font-bold mb-4 text-yellow-500">
            À propos de nous
          </h2>
          <p className="text-base text-slate-300 mb-4">
            Bienvenue chez{" "}
            <span className="font-bold text-yellow-500">SECURI4</span>, une
            enterprise de tech Tchadienne specialisée dans le domaine de:
          </p>
          <ol className="flex flex-col gap-3 text-slate-400 italic">
            <li> Securisation des documents, données et papiers;</li>
            <li>
              Conception et développement des applications web et mobile;{" "}
            </li>
            <li>Analyse et consultance en cyber securité.</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
