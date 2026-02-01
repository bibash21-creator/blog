

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
 import NewsFeed from "@/app/feed/components/NewsFeed"


 

export default function NewsFeedPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Loading feed...</p>;
  }

  return (
  
    <NewsFeed/>

  );
}