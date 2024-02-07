import React from "react";
import Twitter from "../assets/Twitter.png";
import Home1 from "../assets/Home1.png";
import Profile from "../assets/Profile.png";
function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-full text-white">
      <div className="flex justify-center  w-full h-full ">
        <div className=" flex flex-col items-center w-3/12 border-l border-gray-400 rounded-l">
          <div className="flex">
            <img className=" w-12" src={Twitter} alt="" />
          </div>
          <div className="flex mt-5  items-center">
            <img className=" w-8 mr-2" src={Home1} alt="" />
            <h1 className=" text-1xl font-semibold">Home</h1>
          </div>
          <div className="flex mt-5 items-center">
            <img className=" w-8 mr-2" src={Profile} alt="" />
            <h1 className=" text-1xl font-semibold">Profile</h1>
          </div>
        </div>
        <div className=" w-5/12 border-l border-r border-gray-400 w-96"></div>
        <div className=" w-3/12 border-r rounded-r"></div>
      </div>
    </div>
  );
}

export default Home;
