import React from "react";
import { Link } from "react-router-dom";
import { useState , useContext } from "react";
import { ThemeContext } from '../context/ThemeContext'

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const {setMode} = useContext(ThemeContext)

  return (
    <div>
      <nav className="flex justify-between p-3 bg-blue-50">
        <div className="px-4 py-2 pl-2">Life Planner</div>

        <div className="hidden md:flex gap-4 pr-5">
          <div className="flex">
            <Link to="/" className="">
              <li className="list-none px-4 py-2 ">Home</li>
            </Link>
            <Link to="/Sign_in" className="">
              <li className="list-none px-4 py-2 ">Sign_in</li>
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-2xl pr-4"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      {/* Mobile Slide Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "translate-x-full"}`}>


        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-2xl">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="flex flex-col items-center gap-6 mt-20 px-6 text-lg">
          <Link to="/" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-house"></i> Home
          </Link>

          <Link to="/Sign_in" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-user"></i> Sign in
          </Link>

          <button onClick={() => { setMode("girly"); setOpen(false); }}>
            <i className="fa-solid fa-heart text-pink-500"></i> Girly Mode
          </button>

          <button onClick={() => { setMode("dark"); setOpen(false); }}>
            <i className="fa-solid fa-moon"></i> Dark Mode
          </button>
        </div>

      {/* </nav> */}
      </div>
    </div>
  );
};

export default Navbar;
