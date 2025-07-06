import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios_API from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios_API.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("failed to fetch the notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this Note?")) return;
    try {
      await axios_API.delete(`/notes/${id}`);
      toast.success("Note Deleted");
      navigate("/");
    } catch (error) {
      console.log("Note did not Deleted", error);
      toast.error("Note did not deleted");
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("please fill up the fields");
      return;
    }

    setSaving(true);
    try {
      await axios_API.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
    } catch (error) {
      setSaving(false);
    }
  };

  if (loading) {
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10" />
    </div>;
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to notes
            </Link>
            <button
              className="btn btn-error rounded-md btn-outline"
              onClick={(e) => handleDelete(e, id)}
            >
              <Trash2Icon className="size-4" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title: </span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  value={note.title}
                  className="input input-bordered w-full"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content: </span>
                </label>
                <textarea
                  type="text"
                  placeholder="Note content"
                  value={note.content}
                  className="textarea textarea-bordered w-full h-36"
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving...." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
