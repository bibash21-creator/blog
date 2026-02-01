"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/feed/components/Navbar";
import Sidebar from "@/app/feed/components/newsfeed_comp/Sidebar";
import MainSec from "@/app/feed/components/newsfeed_comp/MainSec";

interface Story {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

interface NewsFeedProps {
    stories: Story[];  // Add stories prop
}

export default function NewsFeed({ stories }: NewsFeedProps) {  // Accept stories prop
    const [isOpen, setIsOpen] = useState(true);

    // ✅ Hide sidebar initially on mobile, show on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsOpen(false); // mobile → sidebar hidden
            } else {
                setIsOpen(true); // desktop → sidebar visible
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Content Area */}
            <div
                className={`grid flex-1 ${isOpen ? "md:grid-cols-[220px_1fr]" : "grid-cols-1"}`}
            >
                {/* Left Sidebar */}
                {isOpen && (
                    <aside
                        className={`
                            border-r border-gray-300 dark:border-gray-700 p-4 
                            bg-white dark:bg-[#121212] 
                            md:sticky md:top-0 md:h-screen
                            ${isOpen ? "fixed md:static top-0 left-0 h-full z-50 w-[220px]" : "hidden"}
                        `}
                    >
                        <Sidebar />
                    </aside>
                )}

                {/* Right Section (MainSec scrollable) */}
                <div className="p-4 overflow-y-auto h-screen">
                    <MainSec/>  {/* Pass stories to MainSec */}
                </div>
            </div>

            {/* Overlay background for mobile when sidebar is open */}
            {isOpen && window.innerWidth < 768 && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setIsOpen(false)} // click overlay to close
                />
            )}
        </div>
    );
}