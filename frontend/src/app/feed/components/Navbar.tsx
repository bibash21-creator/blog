"use client";

import SearchBtn from "@/app/feed/components/navbar_comp/SearchBtn";
import WriteComp from "@/app/feed/components/navbar_comp/WriteComp";
import ProfileComponent from "@/app/feed/components/navbar_comp/ProfileComponent";
import {FiMenu, FiX} from "react-icons/fi"
import NotificationsComp from "@/app/feed/components/navbar_comp/NotificationsComp";
import Link from "next/link";
import {useState} from "react";
import { motion,AnimatePresence } from "framer-motion";


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
      </div>
    </nav>

    {/* Sidebar with animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-5/6 sm:w-2/3 bg-[#fafafa] dark:bg-[#121212] shadow-lg z-50 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="text-2xl mb-6"
              >
                <FiX />
              </button>
              <nav className="flex flex-col space-y-6">
                <a href="/">Home</a>
                <a href="/blog">Blog</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>



    </>
  
  );
}