import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

  /**
   * A component that renders an anchor tag with a link to the given href.
   *
   * The component automatically sets the target and rel attributes based on
   * whether the href is an external link or not.
   *
   * @param {string} href - The href attribute for the link.
   * @param {string} title - The title attribute for the link.
   * @param {React.ReactNode} icon - A React node that represents the icon to
   * display next to the link.
   *
   * @returns {JSX.Element} A JSX element that represents the link.
   */
const NavLink = ({ href, title, icon }: NavLinkProps) => {
  const target = href.startsWith("http") ? "_blank" : "_self";
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-l rounded md:p-0 hover:text-white"
    >
      <span className="flex items-center">
        {icon}
        <span className="ml-2 md:hidden">{title}</span>
      </span>
    </Link>
  );
};

export default NavLink;
