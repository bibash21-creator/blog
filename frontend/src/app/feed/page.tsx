"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewsFeed from "@/app/feed/components/NewsFeed";

interface Story {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function NewsFeedPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);

  // Check JWT and load user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    fetch("http://localhost:8000/users/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/signin");
      });
  }, [router]);

  useEffect(() => {
  if (!loading) {
    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((data) => {
        // Ensure it's an array
        if (Array.isArray(data)) {
          setStories(data);
        } else {
          console.error("Expected array, got:", data);
          setStories([]);
        }
      })
      .catch((err) => alert(err.message));
  }
}, [loading]);

  if (loading) {
    return <p>Loading feed...</p>;
  }

  return <NewsFeed stories={stories} />;
}