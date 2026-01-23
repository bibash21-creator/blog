"use client";

import { FiEdit, FiBook, FiUsers } from "react-icons/fi";
// import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

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
    <section className="hero-padding bg-[#fafafa] dark:bg-[#121212] relative px-4 sm:px-6 lg:px-12 py-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wide mb-4 text-center md:text-left">
        Ideas that lift you <br /> Through highs and lows
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 text-center md:text-left max-w-2xl mx-auto md:mx-0">
        Explore thoughts, stories, and connections that inspire growth.
      </p>

      {/* Button */}
      <div className="flex justify-center md:justify-start mb-8">
        <Button variant="default" className="hover:scale-105 cursor-pointer">
          Start Learning
        </Button>
      </div>

      {/* Links */}
      <div className="hero-actions flex flex-col sm:flex-row sm:space-x-8 items-center md:items-start mb-8 gap-y-4 sm:gap-y-0 justify-center md:justify-start">
        <Link href="" className="flex text-sm sm:text-base md:text-lg items-center gap-x-2">
          <FiEdit className="text-lg sm:text-xl" /> Write
        </Link>
        <Link href="" className="flex text-sm sm:text-base md:text-lg items-center gap-x-2">
          <FiBook className="text-lg sm:text-xl" /> Read
        </Link>
        <Link href="" className="flex text-sm sm:text-base md:text-lg items-center gap-x-2">
          <FiUsers className="text-lg sm:text-xl" /> Connect
        </Link>
      </div>

      {/* Quote Section
      <div className="relative shadow-xl p-6 sm:p-8 rounded-lg bg-white dark:bg-gray-800 max-w-xl mx-auto">
        <Quote className="absolute top-4 left-4 text-3xl text-gray-400 dark:text-gray-500" />
        {/* Decorative Blur Circle */}
        {/* <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div> */} 
        {/* Quote Text */}
        {/* <p className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-center transition-opacity duration-700 ease-in-out text-gray-700 dark:text-gray-200">
          "{quotes[quoteIndex]}"
        </p> */}
      {/* </div> */}
    </section>
  );
}