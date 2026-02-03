"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  username: string;
  email: string;
  profile_pic?: string; // optional field if you store profile pictures
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8000/users/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) {
    return (
      <div className="profile_pic border rounded-2xl w-10 h-10 border-green-500 flex items-center justify-center">
        <span className="text-xs text-gray-500">No user</span>
      </div>
    );
  }

  return (
    <div
      className="profile_pic border rounded-2xl w-10 h-10 border-green-500 overflow-hidden cursor-pointer"
      onClick={() => router.push(`/profile/${user.id}`)} // 👈 navigate to profile page
    >
      <img
        src={user.profile_pic || "/default-avatar.png"} // fallback image
        alt={user.username}
        className="profile_img w-full h-full object-cover"
      />
    </div>
  );
}