"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Resume",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNavbarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="fixed top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-90">
        <div className="flex flex-wrap items-center justify-between mx-auto p-8">
          <br />
          <div className="mobile-menu block md:hidden h-4">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <div
            className="menu hidden md:block md:w-auto h-screen md:h-4"
            id="navbar"
          >
            <ul className="flex p-2 md:p-0 md:flex-row md:space-x-6 mt-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink href={link.path} title={link.title} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
      </nav>
    </motion.div>
  );
};

export default Navbar;
