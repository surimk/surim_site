"use client";
import { FaGithub, FaLinkedin, FaEnvelope, FaAws } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTerraform,
  SiDocker,
  SiGithubactions,
} from "react-icons/si";
import { motion } from "framer-motion";

/**
 * The footer component for the website. It contains links to the technologies used
 * to build the website and a link to the GitHub repository.
 * @returns The footer component.
 */
const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <footer className="bg-black text-center p-2 mt-4 sticky bottom-0 bg-opacity-100">
        <ul className="flex justify-center mt-2 mb-2">
          <p className="text-gray-400 text-xs">
            This site is powered by &nbsp; &nbsp;
          </p>
          <li className="mr-4">
            <a
              href="https://aws.amazon.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaAws size={18} />
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <SiNextdotjs size={18} />
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.terraform.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <SiTerraform size={18} />
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://www.docker.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <SiDocker size={18} />
            </a>
          </li>
          <li className="mr-4">
            <a
              href="https://github.com/features/actions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <SiGithubactions size={18} />
            </a>
          </li>
        </ul>
        <ul className="mt-2 mb-2">
          <p className="text-gray-400 text-xs ">
            Check out the code for this website&nbsp;
            <a
              href="https://github.com/surimk/surim_site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              here
            </a>
          </p>
        </ul>
      </footer>
    </motion.div>
  );
};

export default Footer;
