"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

/**
 * A HeroSection component that is the first section of the website.
 * It displays a brief introduction of the author, a call-to-action button
 * to contact the author, and a button to download the author's CV.
 *
 * The component uses motion to animate the opacity of the elements.
 * The delay of each element is staggered to create a smooth animation.
 */
const HeroSection = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-7 place-self-center text-center sm:text-left">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Hello, my name is{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={["Surim Kim", 1000]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.175 }}
          >
            <p className="text-[#ADB7BE] text-lg sm:text-lg lg:text-xl mb-6">
              I am a Software Engineer based in New York City with a
              Bioinformatics background.
            </p>
          </motion.div>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.25 }}
              className="md:inline-block flex"
            >
              <button className="px-6 py-3 rounded-full w-full sm:w-fit mr-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-200 text-white">
                <a href="/contact">Contact Me</a>
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="md:inline-block flex"
            >
              <button
                className="px-1 py-1 rounded-full w-full sm:w-fit bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:bg-slate-800 text-white mt-3"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href =
                    "https://surim-public-data.s3.us-east-2.amazonaws.com/surim_site/Surim_Kim_CV.pdf";
                  link.download = "Surim_Kim_CV.pdf";
                  link.target = "_blank";
                  link.click();
                }}
              >
                <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                  Download CV
                </span>
              </button>
            </motion.div>
          </div>
        </div>
        <div className="col-span-5 place-self-center mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
          >
            <Image
              src="/images/headshot.jpg"
              alt="surim"
              className="rounded-full object-fit-cover "
              width={300}
              height={300}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
