import Link from "next/link"


export default function Footer(){
    return(
        <>

            <footer className="foot-padding border-t border-[#121212] dark:border-[#fafafa] bg-[#fafafa] dark:bg-[#121212]">
                <div className="foot-actions flex items-center justify-center gap-x-3 md:gap-x-10">
                    <Link href="">Home</Link>
                    <Link href="">Blog</Link>
                    <Link href="">Categories</Link>
                    <Link href="">About</Link>
                    <Link href="">Contact</Link>
                    <Link href=""></Link>
                    <Link href=""></Link>
                    
                </div>
            </footer>
        
        
        </>
    )
}