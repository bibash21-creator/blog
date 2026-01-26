import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FollowList() {
  // Data array: one object per suggested user
  const data = [
    {
      username: "Jane Doe",
      bio: "Writer · Tech Enthusiast",
      avatar: "/avatars/jane.jpg",
      profile: "/profile/jane-doe",
    },
    {
      username: "John Smith",
      bio: "Entrepreneur · Productivity Coach",
      avatar: "/avatars/john.jpg",
      profile: "/profile/john-smith",
    },
    {
      username: "Emily Carter",
      bio: "Crypto Analyst · Investor",
      avatar: "/avatars/emily.jpg",
      profile: "/profile/emily-carter",
    },
  ];

  return (
    <aside className="rounded-lg bg-white dark:bg-[#121212] space-y-4">
      {/* Heading */}
      <h2 className="text-lg font-bold text-gray-900 text-left dark:text-gray-100">
        Who to follow
      </h2>

      {/* List Wrapper */}
      <ul className="space-y-3 mt-2">
        {data.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between gap-x-3"
          >
            {/* Avatar */}
            <Image
              width={40}
              height={40}
              alt={`Avatar of ${item.username}`}
              src={item.avatar}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* User Info */}
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {item.username}
              </p>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {item.bio}
              </span>
            </div>

            {/* Follow Button */}
            <Button className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-medium hover:bg-green-700">
              Follow
            </Button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <footer>
        <Link
          href="/who-to-follow"
          className="block mt-4 text-sm font-medium  hover:underline text-center"
        >
          See more suggestions
        </Link>
      </footer>
    </aside>
  );
}