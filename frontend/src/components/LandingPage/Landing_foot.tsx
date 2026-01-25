"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/status", label: "Status" },
  { href: "/careers", label: "Careers" },
  { href: "/privacy", label: "Privacy" },
];

const MotionShape = ({ className, animate, transition }: any) => (
  <motion.div
    className={className}
    animate={animate}
    transition={{ repeat: Infinity, ease: "easeInOut", ...transition }}
  />
);

export default function Footer() {
  return (
    <footer className="relative foot-padding border-t border-gray-200 dark:border-gray-700 bg-gradient-to-br from-[#fafafa] to-[#eaeaea] dark:from-[#121212] dark:to-[#1a1a1a] overflow-hidden">
      {/* Animated background shapes */}
      <MotionShape
        className="absolute top-10 left-10 w-12 h-12 rounded-full bg-purple-400/40 dark:bg-purple-600/40"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6 }}
      />
      <MotionShape
        className="absolute bottom-16 right-20 w-16 h-16 bg-blue-400/40 dark:bg-blue-600/40 rotate-45"
        animate={{ y: [0, 15, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 8 }}
      />

      {/* Footer links */}
      <div className="relative z-10 foot-actions grid grid-cols-2 sm:grid-cols-3 gap-4 text-center md:flex md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-0">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}