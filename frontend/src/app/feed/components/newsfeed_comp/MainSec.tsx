"use client";

import MiddleHero from "@/app/feed/components/newsfeed_comp/MiddleHero";
import StaffPicks from "@/app/feed/components/newsfeed_comp/StaffPicksComp";
import Recommendation from "@/app/feed/components/newsfeed_comp/Recommendation";
import FollowList from "@/app/feed/components/newsfeed_comp/FollowList";
import ReadList from "@/app/feed/components/newsfeed_comp/ReadList";

export default function MainSec() {
  return (
    <div className="flex flex-1">
      {/* Middle Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <MiddleHero />
      </main>

      {/* Right Sidebar (desktop only) */}
      <aside className="hidden lg:flex max-h-full flex-col gap-6 p-4 border-l border-gray-300 dark:border-gray-700 w-[300px]">
        <StaffPicks />
        <Recommendation />
        <FollowList />
        <ReadList />
      </aside>
    </div>
  );
}