import { NotebookIcon } from "lucide-react";
import React from "react";

const NotesNotFound = () => {
  return <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center"> 
    <div className="bg-[rgba(59,113,202,0.7)]  rounded-full p-8">
        <NotebookIcon className="size-10  text-primary" />
    </div>
    <h3 className="text-2xl font-bold">No notes yet </h3>
    <p className="text-base-content/70">
        Ready to organize your daily task and thoughts? lets start by creating your own Notes.
    </p>
  </div>;
};

export default NotesNotFound;
