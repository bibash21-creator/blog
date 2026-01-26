import Link from "next/link";

export default function StaffPicks() {
  // Data array: one object per article
  const data = [
    {
      title: "A Wake-Up Call for Every American",
      author: "Barack Obama",
      time: "20h ago",
      dateTime: "2026-01-25",
      link: "/articles/wake-up-call",
    },
    {
      title: "115 Favorite Albums Of 2025 (This Time, With A Short Essay About Brian Wilson.)",
      author: "Hanif Abdurraqib",
      time: "Dec 30, 2025",
      dateTime: "2025-12-30",
      link: "/articles/favorite-albums",
    },
    {
      title: "Why Winter Fatigue Is Not the Right Problem To Solve",
      author: "Katie Jagielnicka in The Noösphere",
      time: "Jan 16",
      dateTime: "2026-01-16",
      link: "/articles/winter-fatigue",
    },
  ];

  return (
    <aside className="rounded-lg bg-white dark:bg-[#121212] space-y-4">
      {/* Heading */}
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Staff Picks</h2>

      {/* List Wrapper */}
      <ul className="space-y-3">
        {data.map((item, index) => (
          <li key={index} className="flex flex-col gap-1">
            {/* Article Title */}
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
              <Link href={item.link}>{item.title}</Link>
            </h3>

            {/* Author / Publication */}
            <p className="text-xs text-gray-600 dark:text-gray-400">{item.author}</p>

            {/* Metadata (date/time) */}
            <time dateTime={item.dateTime} className="text-xs text-gray-500 dark:text-gray-400">
              {item.time}
            </time>
          </li>
        ))}
      </ul>

      {/* Footer Link */}
      <footer>
        <Link
          href="/staff-picks"
          className="block mt-4 text-sm font-medium  hover:underline"
        >
          See the full list
        </Link>
      </footer>
    </aside>
  );
}