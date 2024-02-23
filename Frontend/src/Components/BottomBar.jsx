import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Twitter from "../assets/Twitter.png";
import Home1 from "../assets/Home1.png";
import ProfileIcon from "../assets/Profile.png";
import Vector from "../assets/Vector.png";

export default function BottomBar() {
  return (
    <div className=" bg-red-400 w-full block sm:hidden ">
      <div className=" bg-black bg-opacity-70 px-2 py-3 backdrop-blur-sm text-white w-full fixed bottom-0 flex justify-between items-center">
        <Link
          to="/"
          className="transition duration-300 cursor-pointer flex  justify-center  rounded-2xl hover:bg-gray-800  items-center"
        >
          <img className="w-8 mr-3" src={Home1} alt="" />
          <h1 className=" hidden md:block text-1xl font-semibold">Home</h1>
        </Link>
        <Link
          to="/profile"
          className="transition duration-300 flex cursor-pointer  justify-center  rounded-2xl hover:bg-gray-800  items-center"
        >
          <img className="w-8 mr-3" src={ProfileIcon} alt="" />
          <h1 className="hidden md:block text-1xl font-semibold">Profile</h1>
        </Link>
        <Link
          to="/post"
          className=" md:block  transition duration-300 flex cursor-pointer auto bg-[rgb(28,155,239)]  py-2 px-4 justify-center h-10 rounded-2xl  hover:bg-[rgb(24,140,216)]  items-center"
        >
          <h1 className=" text-1xl font-semibold text-center">Post</h1>
        </Link>
      </div>
    </div>
  );
}
