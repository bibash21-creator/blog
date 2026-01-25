"use client";
import {
  FiEdit,
  FiBook,
  FiUsers,
  FiFileText,
  FiMessageSquare,
  FiFeather,
  FiStar,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* -------------------- Quotes -------------------- */
const quotes = [
  "The journey of a thousand miles begins with a single step.",
  "What you think, you become.",
  "Do what you can, with what you have, where you are.",
];

/* -------------------- Background Blobs -------------------- */
const blobs = [
  { className: "-top-20 -left-20 w-64 h-64 bg-purple-400/30 dark:bg-purple-600/30 blur-3xl animate-float" },
  { className: "top-1/2 -right-24 w-72 h-72 bg-blue-400/30 dark:bg-blue-600/30 blur-3xl animate-float-slow" },
  { className: "bottom-0 left-1/3 w-40 h-40 bg-pink-400/30 dark:bg-pink-600/30 blur-2xl animate-float" },
  { className: "top-1/4 right-1/4 w-48 h-48 bg-yellow-400/20 dark:bg-yellow-600/20 blur-2xl animate-float-slow" },
  { className: "bottom-1/3 left-1/5 w-56 h-56 bg-green-400/20 dark:bg-green-600/20 blur-3xl animate-float" },
  { className: "top-2/3 left-2/3 w-52 h-52 bg-indigo-400/20 dark:bg-indigo-600/20 blur-3xl animate-float" },
  { className: "top-10 right-10 w-40 h-40 bg-rose-400/20 dark:bg-rose-600/20 blur-2xl animate-float-slow" },
];

/* -------------------- Animated Icons -------------------- */
const icons = [
  { Icon: FiBook, size: 28, className: "top-10 left-12 text-purple-500 dark:text-purple-400", duration: 6 },
  { Icon: FiEdit, size: 26, className: "bottom-12 right-16 text-blue-500 dark:text-blue-400", duration: 7 },
  { Icon: FiFileText, size: 24, className: "top-1/3 left-6 text-pink-500 dark:text-pink-400", duration: 8 },
  { Icon: FiMessageSquare, size: 26, className: "bottom-20 left-1/2 text-green-500 dark:text-green-400", duration: 9 },
  { Icon: FiStar, size: 24, className: "top-16 right-1/3 text-yellow-500 dark:text-yellow-400", duration: 10 },
  { Icon: FiFeather, size: 24, className: "bottom-24 left-1/4 text-indigo-500 dark:text-indigo-400", duration: 11 },
];

export default function Hero() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setQuoteIndex((prev) => (prev + 1) % quotes.length),
      8000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-12 py-8 bg-[#fafafa] dark:bg-[#121212]">
      {/* Background blobs */}
      {blobs.map((b, i) => (
        <div key={i} className={`absolute rounded-full ${b.className}`} />
      ))}

      {/* Animated icons */}
      {icons.map(({ Icon, size, className, duration }, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
          className={`absolute ${className}`}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* Hero Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-snug tracking-wide mb-3 text-center lg:text-left">
            Ideas that lift you <br /> Through highs and lows
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
          >
            Explore thoughts, stories, and connections that inspire growth.
          </motion.p>

          <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center lg:justify-start mb-6">
            <Button variant="default" className="transition-transform duration-300">
              Start Learning
            </Button>
          </motion.div>

          {/* Hero Actions */}
          <div className="hero-actions flex flex-col sm:flex-row sm:space-x-6 items-center lg:items-start mb-6 gap-y-3 sm:gap-y-0 justify-center lg:justify-start">
            {[
              { href: "", label: "Write", Icon: FiEdit, color: "purple" },
              { href: "", label: "Read", Icon: FiBook, color: "blue" },
              { href: "", label: "Connect", Icon: FiUsers, color: "pink" },
            ].map(({ href, label, Icon, color }, i) => (
              <Link
                key={i}
                href={href}
                className={`flex text-sm sm:text-base items-center gap-x-2 hover:text-${color}-600 dark:hover:text-${color}-400 transition-colors`}
              >
                <Icon className="text-base sm:text-lg" /> {label}
              </Link>
            ))}
          </div>

          {/* Rotating Quote */}
          <motion.p
            key={quoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 italic text-center lg:text-left text-base sm:text-lg text-gray-600 dark:text-gray-400"
          >
            "{quotes[quoteIndex]}"
          </motion.p>
        </motion.div>

        {/* Hero Image */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full h-auto flex justify-center">
          <Image
            src="/person.jpg"
            alt="Creative blogging illustration"
            width={280}
            height={280}
            className="w-full max-w-xs sm:max-w-sm h-auto object-contain rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:scale-105 transition-transform duration-500"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}