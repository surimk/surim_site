import React from "react";
import NavLink from "./NavLink";

interface Link {
  path: string;
  title: string;
  icon: React.ReactNode;
}

const MenuOverlay = ({ links }: { links: Link[] }) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} icon={link.icon} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
