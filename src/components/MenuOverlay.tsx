import React from "react";
import NavLink from "./NavLink";

interface Link {
  path: string;
  title: string;
  icon: React.ReactNode;
}

/**
 * MenuOverlay
 *
 * Renders an unordered list of links as a flex column.
 *
 * @param {{ links: Link[] }} props
 * @prop {Link[]} links - an array of links to render
 * @returns {JSX.Element}
 */
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
