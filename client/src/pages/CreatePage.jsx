import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import axios_API from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios_API.post("/notes", {
        title,
        content,
      });
      toast.success("Note created Successfully");
      navigate("/");
    } catch (error) {
      console.log("error in creating note", error);

      if (error.response.status === 429) {
        toast.error("Slow down! You are creating notes too fast", {
          duration: 4000,
          icon: "WTF",
        });
      } else {
        toast.error("Failed to Create note");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl text-primary mb-4">
                Create New Note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title..."
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content:</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Note Content...."
                    className="textarea textarea-bordered w-full h-32"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating...." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
