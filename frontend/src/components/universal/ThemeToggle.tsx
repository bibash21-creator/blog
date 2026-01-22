"use client";

import {useTheme} from "next-themes"

import {Button} from "@/components/ui/button"

import {FiSun, FiMoon} from "react-icons/fi"


export default function ThemeToggle(){
        const {resolvedTheme, setTheme} = useTheme();

    return(
        <>

        <Button className="hover:scale-105 cursor-pointer" onClick = {()=> setTheme(resolvedTheme==="light"? "dark":"light")}>
            {resolvedTheme==="light"?<FiMoon />: <FiSun />}
        </Button>
        </>
    )
}