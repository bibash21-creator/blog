"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function UserProfilePage() {
  const { id } = useParams(); // dynamic user id from URL
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [user, setUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("token");

    // Fetch profile user
    fetch(`http://localhost:8000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));

    // Fetch profile user's posts
    fetch(`http://localhost:8000/users/${id}/posts`)
      .then((res) => res.json())
      .then((data) => setStories(data));

    // Fetch logged‑in user
    if (token) {
      fetch("http://localhost:8000/users/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setCurrentUser(data));
    }
  }, [id]);

  const handleDelete = async (storyId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    const res = await fetch(`http://localhost:8000/posts/${storyId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setStories(stories.filter((s) => s.id !== storyId));
    } else {
      alert("Failed to delete");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{user.username}'s Posts</h2>
      {stories.length > 0 ? (
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

            {/* Media */}
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

            {/* Edit/Delete only if current user owns this profile */}
            {currentUser?.id === user.id && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => router.push(`/edit/${story.id}`)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(story.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts yet.</p>
      )}
    </div>
  );
}