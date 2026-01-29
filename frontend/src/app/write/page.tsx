"use client";
import {useState} from "react";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Button} from "@/components/ui/button"


export default function Write(){

    const [loading, setLoading] = useState("");

    const [title, setTitle] = useState("");

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [StarterKit],
        content: "<p>Tell your story...</p>",
    });

    const handleSubmit = async ( )=> {


        if(!editor) return;
        const content = editor.getHTML();

        const token = localStorage.getItem("token");
        if(!token){
            alert("Please login firest");
            return;
        }

        if(!title.trim()){
            alert("Title is required");
            return;
        }


        if(!editor.getText().trim()){
            alert("Content is empty");
            return;
        }


        setLoading(true);

        try{
            const response= await fetch(
                "https://locahost://8000/posts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,


                    },
                    body: JSON.stringify({
                        title,
                        content: editor.getHTML(),
                    }),
                }
            );
            
            
            const data  = await response.json();


            if(!response.ok) throw new Error(data.message
            );

            alert("Post published");
            setTitle("");
            editor.commands.clearContent();

        }catch(err){
            alert(err.message || "Failed to publish");
        }finally{
            setLoading(false);
        }



       

        if(response.ok){
            alert("Post published!");
            setTitle("");
            editor.commands.clearContent();
        }else{
            alert("Error publishing post");
            
        }
    };
    return(
        <div className="max-w-3xl mx-auto">
            <input type="text"
            placeholder="Title"
            value={title}
            onChange= {(e)=> setTitle(e.target.value)} 
            className="w-full border-b p-2 text-2xl font-semibold mb-4" />       
            
        <EditorContent className="border p-4 rounded min-h-[300px]" editor={editor} />


        <Button onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
            Publish
        </Button>
            
            
             </div>

 
 
 
    )
}