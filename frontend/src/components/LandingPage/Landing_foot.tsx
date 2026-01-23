"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative foot-padding border-t border-gray-200 dark:border-gray-700 bg-gradient-to-br from-[#fafafa] to-[#eaeaea] dark:from-[#121212] dark:to-[#1a1a1a] overflow-hidden">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-10 left-10 w-12 h-12 rounded-full bg-purple-400/40 dark:bg-purple-600/40"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-20 w-16 h-16 bg-blue-400/40 dark:bg-blue-600/40 rotate-45"
        animate={{ y: [0, 15, 0], rotate: [0, 45, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      {/* Footer links */}
      <div className="relative z-10 foot-actions grid grid-cols-2 sm:grid-cols-3 gap-4 text-center md:flex md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-0">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/status">Status</Link>
        <Link href="/careers">Careers</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}