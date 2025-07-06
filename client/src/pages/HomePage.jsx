import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/rateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import axios_API from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimit, setIsRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios_API.get("/notes");
        setNotes(res.data);
        console.log(res.data);
        setIsRateLimit(false);
      } catch (error) {
        console.log("error", error);
        if (error.response.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimit && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10"> Loading.....</div>
        )}
        {notes.length === 0 && !isRateLimit &&  <NotesNotFound /> }
          {notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note._id}>
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
          )}
      </div>

      
    </div>
  );
};

export default HomePage;
