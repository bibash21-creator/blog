import {
  FiHome,
  FiCompass,
  FiBookmark,
  FiMessageSquare,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import Link from "next/link";
import type { IconType } from "react-icons";

type NavItem = {
  href: string;
  label: string;
  icon: IconType;
};

const mainActions: NavItem[] = [
  { href: "/dashboard", label: "Feed", icon: FiHome },
  { href: "/explore", label: "Explore", icon: FiCompass },
  { href: "/saved", label: "Saved", icon: FiBookmark },
  { href: "/messages", label: "Messages", icon: FiMessageSquare },
];

const userActions: NavItem[] = [
  { href: "/settings", label: "Settings", icon: FiSettings },
  { href: "/following", label: "Following", icon: FiUsers },
];

export default function Sidebar() {
  return (
    <section className="side-padding min-w-[200px] h-auto dark:border-gray-700">
      {/* Main navigation */}
      <nav className="flex flex-col space-y-7 border-b border-gray-300 dark:border-gray-700 pb-6">
        {mainActions.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-200"
          >
            <Icon className="text-xl" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      {/* User section */}
      <div className="mt-6 flex flex-col space-y-5">
        {userActions.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 text-gray-700 dark:text-gray-200"
          >
            <Icon className="text-xl" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}