import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between p-3 bg-blue-50">
        <div className="px-4 py-2 pl-2">Life Planner</div>

        <div className="flex gap-4 pr-5">
          <div>
            <Link to="/">
              <li className="list-none px-4 py-2 ">Home</li>
            </Link>
          </div>

          <button
            onClick={() => setMode("girly")}
            className="px-4 py-2 rounded-xl bg-pink-400 text-white hover:bg-pink-500">
            Girly
          </button>

          <button
            onClick={() => setMode("dark")}
            className="px-4 py-2 rounded-xl bg-gray-800 text-white hover:bg-black">
            Dark
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
