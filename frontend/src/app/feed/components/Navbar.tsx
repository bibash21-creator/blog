"use client";

import SearchBtn from "@/app/feed/components/navbar_comp/SearchBtn";
import WriteComp from "@/app/feed/components/navbar_comp/WriteComp";
import ProfileComponent from "@/app/feed/components/navbar_comp/ProfileComponent";
import { FiMenu } from "react-icons/fi";
import NotificationsComp from "@/app/feed/components/navbar_comp/NotificationsComp";
import ThemeToggle from "@/components/universal/ThemeToggle";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  return (
    <nav className="p-2 md:p-5 flex justify-between border-b border-[#121212] dark:border-[#fafafa]">
      {/* Left section */}
      <div className="flex items-center md:space-x-5 flex-1">
        {/* Hamburger / Close button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="text-2xl bg-transparent text-[#121212] dark:text-[#fafafa]"
        >
          {isOpen ? <FiMenu /> : <FiMenu />}
        </Button>

        {/* Brand */}
        <div className="text-sm md:text-xl font-medium">Hamro Club</div>

        {/* Search */}
        <SearchBtn />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-5 md:space-x-10 flex-1 justify-end">
        {/* Hide these on mobile */}
        <div className="hidden md:flex items-center space-x-5 md:space-x-10">
          <WriteComp />
          <NotificationsComp />
        </div>
        <ProfileComponent />
        <ThemeToggle />
      </div>
    </nav>
  );
}