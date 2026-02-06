"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewsFeed from "./components/NewsFeed";

export default function FeedPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/users/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch {
        localStorage.removeItem("token");
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return <p>Loading feed...</p>;
  }

  // You can pass user info down if needed
  return <NewsFeed />;
}