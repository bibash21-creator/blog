import Link from "next/link";

export default function ReadingList() {
  return (
    <aside className="p-4 rounded-lg bg-white  dark:bg-[#121212] space-y-4">
      {/* Heading */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        Reading list
      </h2>

      {/* Instructions */}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Click the <span className="inline-block">📑➕</span> on any story to
        easily add it to your reading list or a custom list that you can share.
      </p>

      {/* Footer Navigation */}
      <footer className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 dark:text-gray-400">
        <Link href="/help" className="hover:underline">
          Help
        </Link>
        <Link href="/status" className="hover:underline">
          Status
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/careers" className="hover:underline">
          Careers
        </Link>
        <Link href="/press" className="hover:underline">
          Press
        </Link>
        <Link href="/blog" className="hover:underline">
          Blog
        </Link>
        <Link href="/privacy" className="hover:underline">
          Privacy
        </Link>
        <Link href="/rules" className="hover:underline">
          Rules
        </Link>
        <Link href="/terms" className="hover:underline">
          Terms
        </Link>
        <Link href="/text-to-speech" className="hover:underline">
          Text to speech
        </Link>
      </footer>
    </aside>
  );
}