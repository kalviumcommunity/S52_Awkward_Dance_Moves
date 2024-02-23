import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Twitter from "../assets/Twitter.png";
import Home1 from "../assets/Home1.png";
import ProfileIcon from "../assets/Profile.png";
import Vector from "../assets/Vector.png";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

  return (
    <div className="sm:flex flex-col hidden sm:block h-full items-start w-2/12 border-gray-400 rounded-l">
      <div className="ml-3 flex">
        <img className="w-12" src={Twitter} alt="" />
      </div>
      <Link
        to="/"
        className="transition duration-300 cursor-pointer flex py-2 px-4 justify-center h-10 rounded-2xl hover:bg-gray-800 mt-5 items-center"
      >
        <img className="w-8 mr-3" src={Home1} alt="" />
        <h1 className=" hidden md:block text-1xl font-semibold">Home</h1>
      </Link>
      <Link
        to="/profile"
        className="transition duration-300 flex cursor-pointer py-2 px-4 justify-center h-10 rounded-2xl hover:bg-gray-800 mt-5 items-center"
      >
        <img className="w-8 mr-3" src={ProfileIcon} alt="" />
        <h1 className="hidden md:block text-1xl font-semibold">Profile</h1>
      </Link>
      <Link
        to="/post"
        className="hidden md:block w-32 transition duration-300 flex cursor-pointer auto bg-[rgb(28,155,239)]  py-2 px-4 justify-center h-10 rounded-2xl  hover:bg-[rgb(24,140,216)] mt-5 items-center"
      >
        <h1 className=" text-1xl font-semibold text-center">Post</h1>
      </Link>
      <div
        onClick={handleLogOut}
        className="absolute bottom-0 mb-10 transition duration-300 cursor-pointer flex py-2 px-4 justify-center h-10 rounded-2xl hover:bg-gray-800 mt-5 items-center"
      >
        <img className="w-8 mr-3" src={Vector} alt="" />
        <h1 className="text-1xl hidden md:block font-semibold">Log Out</h1>
      </div>
    </div>


  );
}

export default Sidebar;
