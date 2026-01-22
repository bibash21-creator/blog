"use client";
import Link from "next/link"



import {Button} from "@/components/ui/button"

import ThemeToggle from "@/components/universal/ThemeToggle"



export default function Navbar(){
    return(
        <>


            <nav className="flex justify-between items-center bg-[#fafafa] dark:bg-[#121212] nav-padding">
                <div className="text-md md:text-xl cursor-pointer">
                    Hamro Club
                </div>

                <div className="flex items-center space-x-5">

                    {/* Sign In Button */}
                    <Link href="/login" className="">Sign in</Link>



                    {/* Get Started Button */}
                    <Button variant="default" className="cursor-pointer">Get started</Button>
                
                    
                    {/* Theme Toggle */}
                    <ThemeToggle/>
                </div>
            </nav>
        
        
        
        </>
    )
}