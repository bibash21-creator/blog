"use client";

import { FiEdit, FiBook, FiUsers} from "react-icons/fi";
import {Quote} from "lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

const quotes: string[] = [
  "The journey of a thousand miles begins with a single step.",
  "What you think, you become.",
  "Do what you can, with what you have, where you are.",
  // ... add up to 20
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
    <section className="hero-padding bg-[#fafafa] dark:bg-[#121212] relative">
      {/* Heading */}
      <h1 className="text-5xl md:text-7xl font-bold leading-20 tracking-wide mb-5">
        Ideas that lift you <br /> Through highs and lows
      </h1>

      {/* Description */}
      <p className="text-xl md:text-3xl mb-7">
        Explore thoughts, stories, and connections that inspire growth.
      </p>

      {/* Button */}
      <Button variant="default" className="mb-7">
        Start Learning
      </Button>

      {/* Links */}
      <div className="hero-actions flex space-x-10 items-center mb-5">
        <Link href="" className="flex text-md md:text-xl items-center gap-x-3">
          <FiEdit /> Write
        </Link>
        <Link href="" className="flex text-md md:text-xl items-center gap-x-3">
          <FiBook /> Read
        </Link>
        <Link href="" className="flex text-md md:text-xl items-center gap-x-3">
          <FiUsers /> Connect
        </Link>
      </div>

     
      

       

        {/* Quote Text */}
        <p className="text-2xl md:text-2xl italic text-center transition-opacity duration-700 ease-in-out">
          "{quotes[quoteIndex]}"
        </p>
      
    </section>
  );
}