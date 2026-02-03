"use client";
import {useState} from "react";
import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Button} from "@/components/ui/button";
import {publishStory} from "@/lib/utils";


export default function WritePage(){
    const [title,setTitle] = useState("");
    const [loading, setLoading] =  useState(false);


    const editor= useEditor({
        extensions: [StarterKit],
        content: "<p>Tell your story... </p>",
    });

    const handleSubmit = async() => {
        if(!editor) return;
        const token = localStorage.getItem("token");
        if(!token)
        {
            alert("Please login first");
            return;
        }

        try{
            setLoading(true);
            await publishStory(title, editor.getHTML(), token);
            alert("Post published!");
            setTitle("");
            editor.commands.clearContent();
        }catch(err:any){
            alert(err.message);

        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="max-w-3xl mx-auto">
            <input placeholder="Title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)} type="text" className="mb-4 w-full border-b p-2 text-2xl font-semibold" />

            <EditorContent className="border p-4 rounded min-h-[300px]" editor={editor} />

            <Button onClick={handleSubmit} 
            className="bg-blue-500 text-white mt-4">
                {loading ? "Publishing..." :"Publish"}
            </Button>

        

        
        
        
        
        </div>
    );
}