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
const quotes: string[] = [
  "The journey of a thousand miles begins with a single step.",
  "What you think, you become.",
  "Do what you can, with what you have, where you are.",
];

export default function Hero() {
  const [quoteIndex, setQuoteIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-12 py-8 bg-[#fafafa] dark:bg-[#121212]">
      {/* Subtle blur background blobs (dense) */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400/30 dark:bg-purple-600/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/2 -right-24 w-72 h-72 bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-pink-400/30 dark:bg-pink-600/30 rounded-full blur-2xl animate-float" />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-yellow-400/20 dark:bg-yellow-600/20 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-1/3 left-1/5 w-56 h-56 bg-green-400/20 dark:bg-green-600/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-2/3 left-2/3 w-52 h-52 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-10 right-10 w-40 h-40 bg-rose-400/20 dark:bg-rose-600/20 rounded-full blur-2xl animate-float-slow" />

      {/* Animated blogging icons */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-10 left-12 text-purple-500 dark:text-purple-400"
      >
        <FiBook size={28} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-12 right-16 text-blue-500 dark:text-blue-400"
      >
        <FiEdit size={26} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-1/3 left-6 text-pink-500 dark:text-pink-400"
      >
        <FiFileText size={24} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute bottom-20 left-1/2 text-green-500 dark:text-green-400"
      >
        <FiMessageSquare size={26} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-16 right-1/3 text-yellow-500 dark:text-yellow-400"
      >
        <FiStar size={24} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
        className="absolute bottom-24 left-1/4 text-indigo-500 dark:text-indigo-400"
      >
        <FiFeather size={24} />
      </motion.div>

      {/* Hero Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
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

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex justify-center lg:justify-start mb-6"
          >
            <Button variant="default" className="transition-transform duration-300">
              Start Learning
            </Button>
          </motion.div>

          <div className="hero-actions flex flex-col sm:flex-row sm:space-x-6 items-center lg:items-start mb-6 gap-y-3 sm:gap-y-0 justify-center lg:justify-start">
            <Link
              href=""
              className="flex text-sm sm:text-base items-center gap-x-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <FiEdit className="text-base sm:text-lg" /> Write
            </Link>
            <Link
              href=""
              className="flex text-sm sm:text-base items-center gap-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FiBook className="text-base sm:text-lg" /> Read
            </Link>
            <Link
              href=""
              className="flex text-sm sm:text-base items-center gap-x-2 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              <FiUsers className="text-base sm:text-lg" /> Connect
            </Link>
          </div>

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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-auto flex justify-center"
        >
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