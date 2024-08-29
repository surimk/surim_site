import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

const NavLink = ({ href, title, icon }: NavLinkProps) => {
  return (
    <Link
      href={href}
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
