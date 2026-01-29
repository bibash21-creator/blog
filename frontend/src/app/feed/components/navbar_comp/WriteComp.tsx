import {FaEdit} from "react-icons/fa"
// Importing the useEditor and EditorCOntent from tiptap
import {useEditor, EditorContent} from "@tiptap/react";
// StarteKit may be something of starting 
import StarterKit from "@tiptap/starter-kit";

export default function Write(){
    return(
        <>
        
                        <div className="flex gap-x-3 items-center font-light text-2xl">
                            <FaEdit /> Write
        
                        </div>

        </>
    )
}