import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-1000 text-center p-4 mt-4">
      <ul className="flex justify-center mt-2">
        <li className="mr-4">
          <a
            href="https://github.com/surimk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaGithub size={24} />
          </a>
        </li>
        <li className="mr-4">
          <a
            href="https://linkedin.com/in/surimkim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaLinkedin size={24} />
          </a>
        </li>
        <li>
          <a
            href="mailto:surimkim@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white"
          >
            <FaEnvelope size={24} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
