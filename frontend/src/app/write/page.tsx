"use client";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: "<p>Tell your story... </p>",
  });

  // 🎤 Voice input for title
  const handleVoiceTitle = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTitle(transcript);
    };
  };

  // 🎤 Voice input for content
  const handleVoiceContent = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (editor) {
        editor.commands.setContent(`<p>${transcript}</p>`);
      }
    };
  };

  // 📁 File upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    if (!editor) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", editor.getHTML());
      files.forEach((file) => formData.append("files", file));

      const res = await fetch("http://localhost:8000/posts-with-media", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to publish");
      alert("Post published!");
      setTitle("");
      editor.commands.clearContent();
      setFiles([]);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="mb-4 w-full border-b p-2 text-2xl font-semibold"
      />
      <div className="flex gap-2 mb-4">
        <Button onClick={handleVoiceTitle} className="bg-gray-200">
          🎤 Record Title
        </Button>
        <Button onClick={handleVoiceContent} className="bg-gray-200">
          🎤 Record Content
        </Button>
      </div>

      <EditorContent className="border p-4 rounded min-h-[300px]" editor={editor} />

      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="mt-4"
      />

      <Button onClick={handleSubmit} className="bg-blue-500 text-white mt-4">
        {loading ? "Publishing..." : "Publish"}
      </Button>
    </div>
  );
}