"use client";

import { FiEdit, FiBook, FiUsers } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

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
      {/* Background animated objects */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-400/30 dark:bg-purple-600/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-1/2 -right-24 w-72 h-72 bg-blue-400/30 dark:bg-blue-600/30 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-pink-400/30 dark:bg-pink-600/30 rounded-full blur-2xl animate-float"></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Text Content */}
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-snug tracking-wide mb-3 text-center lg:text-left">
            Ideas that lift you <br /> Through highs and lows
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            Explore thoughts, stories, and connections that inspire growth.
          </p>

          <div className="flex justify-center lg:justify-start mb-6">
            <Button variant="default" className="hover:scale-105 transition-transform duration-300">
              Start Learning
            </Button>
          </div>

          <div className="hero-actions flex flex-col sm:flex-row sm:space-x-6 items-center lg:items-start mb-6 gap-y-3 sm:gap-y-0 justify-center lg:justify-start">
            <Link href="" className="flex text-sm sm:text-base items-center gap-x-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              <FiEdit className="text-base sm:text-lg" /> Write
            </Link>
            <Link href="" className="flex text-sm sm:text-base items-center gap-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <FiBook className="text-base sm:text-lg" /> Read
            </Link>
            <Link href="" className="flex text-sm sm:text-base items-center gap-x-2 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
              <FiUsers className="text-base sm:text-lg" /> Connect
            </Link>
          </div>

          {/* Rotating Quote */}
          <p className="mt-6 italic text-center lg:text-left text-base sm:text-lg text-gray-600 dark:text-gray-400 transition-opacity duration-700 ease-in-out">
            "{quotes[quoteIndex]}"
          </p>
        </div>

        {/* Right: Smaller Responsive Image */}
        <div className="w-full h-auto flex justify-center">
          <Image
            src="/person.jpg"
            alt="Creative blogging illustration"
            width={280}
            height={280}
            className="w-full max-w-xs sm:max-w-sm h-auto object-contain rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
      </div>
    </section>
  );
}