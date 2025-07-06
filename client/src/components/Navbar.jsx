import React from "react";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
const Navbar = () => {
  return (
    <header className="bg-base-300 border-b">
      <div className="mx-auto max-w-7xl p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            MyNotes
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" /> Create Note
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
