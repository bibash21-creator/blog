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
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState<null | "signin" | "signup">(null);

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

        {/* Logo */}
        <div className="text-lg md:text-xl font-bold cursor-pointer z-10">
          Hamro Club
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 z-10">
          <button
            onClick={() => setShowModal("signin")}
            className="hover:scale-105 transition-transform"
          >
            Sign in
          </button>
          <Button
            variant="default"
            className="cursor-pointer hover:scale-105"
            onClick={() => setShowModal("signup")}
          >
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
          <button
            onClick={() => {
              setIsOpen(false);
              setShowModal("signin");
            }}
          >
            Sign in
          </button>
          <Button
            variant="default"
            className="w-full cursor-pointer hover:scale-105"
            onClick={() => {
              setIsOpen(false);
              setShowModal("signup");
            }}
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

      {/* Sign in / Sign up Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex justify-center items-center z-50 overflow-hidden"
        >
          {/* Background with falling letters + wavy ink lines */}
          <div className="absolute inset-0 bg-[#0f172a]/90 dark:bg-black/90 backdrop-blur-sm">
            {/* Wavy ink lines + radial dots */}
            <div className="absolute inset-0 opacity-30 modal-background" />

            {/* Falling letters */}
            {Array.from("BLOGGINGIDEAS").map((char, i) => (
              <span
                key={i}
                className="absolute text-white/40 text-lg animate-fallLetters"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Modal card */}
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white dark:bg-[#1e1e1e] rounded-xl shadow-2xl p-8 w-[90%] max-w-md"
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {showModal === "signin" ? "Welcome back" : "Create your account"}
            </h2>

            {/* Provider buttons */}
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full flex items-center gap-3 justify-center rounded-full hover:scale-105 transition-transform"
              >
                <FcGoogle size={24} />{" "}
                {showModal === "signin"
                  ? "Sign in with Google"
                  : "Sign up with Google"}
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center gap-3 justify-center rounded-full hover:scale-105 transition-transform"
              >
                <FaFacebook size={24} color="#1877F2" />{" "}
                {showModal === "signin"
                  ? "Sign in with Facebook"
                  : "Sign up with Facebook"}
              </Button>

              <Button
                variant="outline"
                className="w-full flex items-center gap-3 justify-center rounded-full hover:scale-105 transition-transform"
              >
                <MdEmail size={24} color="#EA4335" />{" "}
                {showModal === "signin"
                  ? "Sign in with Email"
                  : "Sign up with Email"}
              </Button>
            </div>

            {/* Links */}
            <div className="mt-6 text-center text-sm">
              {showModal === "signin" ? (
                <p>
                  No account?{" "}
                  <span
                    onClick={() => setShowModal("signup")}
                    className="underline cursor-pointer hover:text-purple-600"
                  >
                    Create one
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => setShowModal("signin")}
                    className="underline cursor-pointer hover:text-purple-600"
                  >
                    Sign in
                  </span>
                </p>
              )}
            </div>

            {/* Terms */}
            <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
              By clicking "{showModal === "signin" ? "Sign in" : "Sign up"}", you
              accept Hamro Club’s{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}