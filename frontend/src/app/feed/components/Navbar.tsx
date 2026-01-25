"use client";

import SearchBtn from "@/app/feed/components/navbar_comp/SearchBtn";
import WriteComp from "@/app/feed/components/navbar_comp/WriteComp";
import ProfileComponent from "@/app/feed/components/navbar_comp/ProfileComponent";
import {FiMenu, FiX} from "react-icons/fi"
import NotificationsComp from "@/app/feed/components/navbar_comp/NotificationsComp";
import Link from "next/link";
import {useState} from "react";
import { motion,AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/universal/ThemeToggle";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

  
  return (
    <>
      <nav className="p-5 flex justify-between border-b border-[#121212] dark:border-[#fafafa]">
      {/* Left section */}
      <div className="flex items-center space-x-5 flex-1">
        <div className="hamburger-menu">
           <button onClick={()=> setIsOpen(true)}
           aria-label = "Open Menu"
           className="text-2xl">
            <FiMenu />
           </button>
        </div>
        <div className="text-xl font-medium">Hamro Club</div>
        <SearchBtn />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-10 flex-1 justify-end">
        <WriteComp />
        <NotificationsComp />
        <ProfileComponent />
        <ThemeToggle />
      </div>
    </nav>



    </>
  
  );
}