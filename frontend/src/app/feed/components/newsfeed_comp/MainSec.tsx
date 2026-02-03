"use client";

import MiddleHero from "@/app/feed/components/newsfeed_comp/MiddleHero";
import StaffPicks from "@/app/feed/components/newsfeed_comp/StaffPicksComp";
import Recommendation from "@/app/feed/components/newsfeed_comp/Recommendation";
import FollowList from "@/app/feed/components/newsfeed_comp/FollowList";
import ReadList from "@/app/feed/components/newsfeed_comp/ReadList";

interface Media {
  id: number;
  file_path: string;
  file_type: string;
}

interface Story {
  id: number;
  title: string;
  content: string;
  created_at: string;
  media?: Media[];
}



interface MainSecProps {
  stories: Story[];
}

export default function MainSec({ stories }: MainSecProps) {
  return (
    <div className="flex flex-1">
      {/* Middle Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <MiddleHero />

        <h2 className="text-2xl font-bold mb-4">Latest Stories</h2>
       {Array.isArray(stories) && stories.length > 0 ? (
  stories.map((story) => (
    <div key={story.id} className="border-b mb-6 pb-4">
      <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
      <div
        className="prose dark:prose-invert mb-2"
        dangerouslySetInnerHTML={{ __html: story.content }}
      />
      <p className="text-sm text-gray-500">
        Published: {new Date(story.created_at).toLocaleDateString()}
      </p>

      {/* 👇 Render media */}
      {story.media && story.media.length > 0 && (
        <div className="mt-2 flex gap-4 flex-wrap">
          {story.media.map((m) =>
            m.file_type === "image" ? (
              <img
                key={m.id}
                src={`http://localhost:8000/${m.file_path}`}
                className="w-48 rounded"
              />
            ) : (
              <video key={m.id} controls className="w-64 rounded">
                <source
                  src={`http://localhost:8000/${m.file_path}`}
                  type="video/mp4"
                />
              </video>
            )
          )}
        </div>
      )}
    </div>
  ))
) : (
  <p className="text-gray-500">No stories yet. Write something!</p>
)}
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