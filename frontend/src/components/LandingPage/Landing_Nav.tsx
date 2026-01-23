"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/universal/ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center bg-[#fafafa] dark:bg-[#121212] px-4 sm:px-6 md:px-10 py-4 border-b border-[#121212] dark:border-[#fafafa]">
        {/* Logo */}
        <div className="text-lg md:text-xl font-bold cursor-pointer">
          Hamro Club
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          
          <Link href="/login" className="hover:scale-105">Sign in</Link>
          <Button variant="default" className="cursor-pointer hover:scale-105">
            Get started
          </Button>
          <ThemeToggle />
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
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
        {/* Close Icon inside drawer */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl focus:outline-none"
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col items-start p-6 space-y-6">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link href="/login" onClick={() => setIsOpen(false)}>Sign in</Link>
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

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}