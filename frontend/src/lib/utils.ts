import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const BASE_URL = "http://localhost:8000";

export async function signup(username:string, email:string,password:string){
  const res = await fetch(`${BASE_URL}/users/`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, email, password}),
  });

  if(!res.ok) throw new Error("Signup failed");
  return res.json();
}


export async function signin(email:string, password:string){
  const res= await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password}),
  });

  if(!res.ok) throw new Error("Signin Failed");
  return res.json();
}

export async function publishStory(title:string, content:string,token:string){
  const res = await fetch(`${BASE_URL}/posts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({title, content}),
  });

  if(!res.ok) throw new Error("Publish failed!");
  return res.json();
}


export async function fetchStories(){
  const res = await fetch(`${BASE_URL}/posts/`);
  if(!res.ok) throw new Error("Failed to fetch stories");
  return res.json();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
