"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/universal/ThemeToggle";
import {
  FiMenu,
  FiX,
  FiBookOpen,
  FiEdit,
  FiFileText,
  FiMessageSquare,
  FiFeather,
  FiStar,
} from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="relative flex justify-between items-center bg-[#fafafa] dark:bg-[#121212] px-4 sm:px-6 md:px-10 py-4 border-b border-[#121212] dark:border-[#fafafa] overflow-hidden">
        {/* Dense animated blogging icons */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-4 left-12 text-purple-500 dark:text-purple-400"
        >
          <FiBookOpen size={22} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute bottom-4 right-16 text-blue-500 dark:text-blue-400"
        >
          <FiEdit size={20} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/2 left-6 text-pink-500 dark:text-pink-400"
        >
          <FiFileText size={20} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 text-green-500 dark:text-green-400"
        >
          <FiMessageSquare size={22} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-12 right-24 text-yellow-500 dark:text-yellow-400"
        >
          <FiStar size={20} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
          className="absolute bottom-16 left-1/4 text-indigo-500 dark:text-indigo-400"
        >
          <FiFeather size={20} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          className="absolute top-20 right-1/3 text-red-500 dark:text-red-400"
        >
          <FiBookOpen size={18} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
          className="absolute bottom-6 right-1/2 text-teal-500 dark:text-teal-400"
        >
          <FiEdit size={18} />
        </motion.div>

        {/* Logo */}
        <div className="text-lg md:text-xl font-bold cursor-pointer z-10">
          Hamro Club
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 z-10">
          <Link href="/login" className="hover:scale-105">
            Sign in
          </Link>
          <Button variant="default" className="cursor-pointer hover:scale-105">
            Get started
          </Button>
          <ThemeToggle />
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden z-10">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-3/4 sm:w-2/3 bg-[#fafafa] dark:bg-[#121212] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl focus:outline-none"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <div className="flex flex-col items-start p-6 space-y-6">
          <Link href="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>
            Sign in
          </Link>
          <Button
            variant="default"
            className="w-full cursor-pointer hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Get started
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}