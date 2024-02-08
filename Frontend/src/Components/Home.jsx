import React, { useEffect, useState } from "react";
import Twitter from "../assets/Twitter.png";
import Home1 from "../assets/Home1.png";
import Profile from "../assets/Profile.png";
import axios from 'axios';

function Home() {
  const [dance , setDance] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/dance/getEntites')
      .then(response => {
        setDance(response.data); 
        console.log(response.data); 
      })
      .catch(err => console.log(err.message));
  }, []); 



  return (
    <div className="flex justify-center items-center h-screen w-full text-white">
      <div className="flex justify-center w-10/12 h-full">
        {/* Left Sidebar */}
        <div className="flex flex-col items-start w-3/12  border-gray-400 rounded-l">
          <div className="flex">
            <img className="w-12" src={Twitter} alt="" />
          </div>
          <div className="flex mt-5 items-center">
            <img className="w-8 mr-3" src={Home1} alt="" />
            <h1 className="text-1xl font-semibold">Home</h1>
          </div>
          <div className="flex mt-5 items-center">
            <img className="w-8 mr-3" src={Profile} alt="" />
            <h1 className="text-1xl font-semibold">Profile</h1>
          </div>
        </div>

        {/* Center Div */}
        <div className="w-6/12 border-l border-r border-gray-400 overflow-y-auto">
          <div className="w-full pt-2 pb-2 bg-black bg-opacity-70 backdrop-blur-sm sticky top-0 flex justify-center items-center">
            <h1>For You</h1>
          </div>

          <div className="flex flex-col items-center ">
            {dance.map((data, id) => (
              <div
                className="  flex justify-center min-h-96 items-center border-b border-white w-full"
                key={id}>
                <img className=" rounded-md w-4/5" src={data.dance_gif} alt="" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-3/12 border-r  rounded-r"></div>
      </div>
    </div>
  );
}

export default Home;
