import Link from "next/link";

export default function Recommendation() {
  const data = [
    { label: "Self Improvement", href: "/topics/self-improvement" },
    { label: "Cryptocurrency", href: "/topics/cryptocurrency" },
    { label: "Writing", href: "/topics/writing" },
    { label: "Relationships", href: "/topics/relationships" },
    { label: "Politics", href: "/topics/politics" },
    { label: "Productivity", href: "/topics/productivity" },
    { label: "Money", href: "/topics/money" },
  ];

  return (
    <aside className="rounded-lg bg-white dark:bg-[#121212] space-y-4">
      {/* Heading */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        Recommended topics
      </h2>

      {/* List Wrapper */}
      <ul className="flex flex-wrap gap-2 mt-2">
        {data.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer Link */}
      <footer>
        <Link
          href="/topics"
          className="block mt-4 text-sm font-medium hover:underline"
        >
          See more topics
        </Link>
      </footer>
    </aside>
  );
}