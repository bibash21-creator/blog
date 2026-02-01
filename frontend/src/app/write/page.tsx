"use client";

import {useState} from "react";
import {Button} from "@/components/ui/button"
export default function Write(){

    const[content, setContent] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async(e:React.FormEvent)=> {
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            const response = await fetch("https://localhost:8000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({content}),
            });

            if(!response.ok) throw new Error("Failed to post");
            alert("Post created!");
            setContent("");
        } catch(err){
            setError("Error posting:" + err.message);
        } finally{
            setLoading(false);
        }
    }


    return(
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Write a Post</h1>
            <p className="text-gray-500 mb-8">Share your thoughts with the world.</p>
        
            <form onSubmit = {handleSubmit} className="space-y-4">
                <textarea
                    value={content}
                    onChange={(e)=> setContent(e.target.value)}
                    placeholder="Write anything..."
                    className="w-full p-4 border rounded-md"
                    rows={6}
                    maxLength={280}
                />


                <Button 
                    type="submit"
                    disabled={loading|| !content.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
                        {loading ? "Posting...": "Post"}
                </Button>


                {error && <p className="text-red-500">{error}</p>}


            </form>
        
        
        
        
        </div>
    );
}