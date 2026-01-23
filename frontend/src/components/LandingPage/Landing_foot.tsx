import Link from "next/link";

export default function Footer() {
  return (
    <footer className="foot-padding border-t border-[#121212] dark:border-[#fafafa] bg-[#fafafa] dark:bg-[#121212]">
      <div className="foot-actions grid grid-cols-2 sm:grid-cols-3 gap-4 text-center md:flex md:flex-wrap md:justify-center md:gap-x-10 md:gap-y-0">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/status">Status</Link>
        <Link href="/careers">Careers</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
}