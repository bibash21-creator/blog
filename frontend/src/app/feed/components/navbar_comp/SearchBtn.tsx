"use client";

import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function SearchBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Search button (always visible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Search"
        className="flex items-center gap-2 bg-white dark:bg-[#121212] text-gray-500 rounded-full px-4 py-2 w-[50px] md:w-[240px] border"
      >
        <FaSearch className="text-gray-400" />
        {/* Show text only on desktop */}
        <span className="hidden md:block text-sm">Search</span>
      </button>

      {/* Mobile input (appears below when toggled) */}
      {isOpen && (
        <input
          type="text"
          placeholder="Search..."
          className="block md:hidden mt-2 w-full border rounded-lg px-3 py-2 bg-white dark:bg-[#121212] text-gray-700 dark:text-gray-200"
        />
      )}

      {/* Desktop input (always visible inline) */}
      <input
        type="text"
        placeholder="Search..."
        className="hidden md:block absolute top-0 left-0 w-full h-full rounded-full border px-10 py-2 bg-white dark:bg-[#121212] text-gray-700 dark:text-gray-200 focus:outline-none"
      />
    </div>
  );
}