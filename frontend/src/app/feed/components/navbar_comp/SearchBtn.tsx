"use client";

import { FaSearch } from "react-icons/fa";

export default function SearchBtn() {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-[#121212] text-gray-500 rounded-full px-4 py-2 w-[240px] border">
      <FaSearch className="text-gray-400" />
      <span className="text-sm">Search</span>
    </div>
  );
}