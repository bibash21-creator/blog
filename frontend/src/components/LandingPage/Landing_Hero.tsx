import Link from "next/link"

import {FiEdit, FiBook, FiUsers} from "react-icons/fi"

import {Button} from "@/components/ui/button"

export default function Hero(){
    return (
        <>
            <section className="hero-padding bg-[#fafafa] dark:bg-[#121212]">
                {/* Heading */}
                <h1 className="text-5xl md:text-7xl font-bold leading-20 tracking-wide mb-5">Ideas that lift you<br/> Through highs and lows 
                </h1>
                
                {/* Descriptioon */}
                <p className="text-xl md:text-3xl mb-7">

                </p>


                {/* Button for reading */}
                <Button variant="default" className="mb-7">Start Learning</Button>

                {/* Links too show things */}
                <div className="hero-actions flex space-x-10 items-center">
                    <Link href="" className="flex text-md md:text-xl items-center gap-x-3">
                    <FiEdit /> Write</Link>
                    <Link href="" className="flex text-md md:text-xl items-center gap-x-3">
                    <FiBook /> Read
                    </Link>
                    <Link href="" className="flex text-md md:text-xl items-center gap-x-3">
                    <FiUsers /> Connect
                    </Link>

                </div>


                {/* Quotes */}
            </section>
        </>
    )
}