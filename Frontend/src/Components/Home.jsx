import React, { useEffect, useState } from "react";
import Twitter from "../assets/Twitter.png";
import Home1 from "../assets/Home1.png";
import Profile from "../assets/Profile.png";
import axios from "axios";
import Post from "./PostEnteties";
function Home() {
  const [dance, setDance] = useState([]);
  const [scrolling, setScrolling] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    axios
      .get("http://localhost:3000/dance/getEntites")
      .then((response) => {
        setDance(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const postthink = () => {
    setLoggedIn(true)
  }

  if(loggedIn){
    return <Post />
  }

  return (
    <div className="flex justify-center items-center h-screen w-full text-white">
      <div className="flex justify-center w-10/12 h-full">
        <div className="flex flex-col items-start w-2/12 border-gray-400 rounded-l">
          <div className=" ml-3 flex ">
            <img className="w-12" src={Twitter} alt="" />
          </div>
          <div  className="transition duration-300 cursor-pointer flex py-2 px-4 justify-center h-10 rounded-2xl  hover:bg-gray-800 mt-5 items-center">
            <img className="w-8 mr-3" src={Home1} alt="" />
            <h1 className="text-1xl font-semibold">Home</h1>
          </div>
          <div to="/profile" className="transition duration-300 flex cursor-pointer py-2 px-4 justify-center h-10 rounded-2xl  hover:bg-gray-800 mt-5 items-center">
            <img className="w-8 mr-3" src={Profile} alt="" />
            <h1 className="text-1xl font-semibold">Profile</h1>
          </div>
          <div onClick={postthink} className="transition duration-300 flex cursor-pointer w-32 bg-[rgb(28,155,239)]  py-2 px-4 justify-center h-10 rounded-2xl  hover:bg-[rgb(24,140,216)] mt-5 items-center">
            <h1 className="text-1xl font-semibold text-center">Post</h1>
          </div>
        </div>

        <div
          className={`w-6/12 border-l border-r border-gray-400 overflow-y-auto ${
            scrolling ? "scrolling" : ""
          }`}
          
        >
          <div className="w-full pt-2 pb-2 bg-black bg-opacity-70 backdrop-blur-sm sticky top-0 flex justify-center items-center">
            <h1>For You</h1>
          </div>

          <div className="flex flex-col items-center bg-scroll">
            {dance.map((data, id) => (
              <div
                className="p-3 flex min-h-96 border-gray-500 border-b w-full"
                key={id}
              >
                <div>
                  <img
                    className="w-14 h-12 rounded-full"
                    src={data.profile}
                    alt=""
                  />
                </div>

                <div className="flex flex-col ml-3">
                  <h1 className="font-semibold">{data.Username}</h1>
                  <h1 className="mb-2"> {data.comments}</h1>
                  <img
                    className="mb-4 rounded-md w-4/5"
                    src={data.dance_gif}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-3/12 border-r border-gray-500 rounded-r"></div>
      </div>
    </div>
  );
}

export default Home;