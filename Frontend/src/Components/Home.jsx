import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import axios from "axios";
import BottomBar from "./BottomBar";
function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-black w-full max-w-[1400px] m-auto h-screen">
      <div className="flex justify-center h-screen text-white">
        <Sidebar />
        <div className="md:w-6/12 w-full border-l border-r   border-gray-400 h-screen overflow-y-scroll">
          <Outlet />
        </div>
        {/* Right Sidebar */}
        <div className="w-3/12 hidden md:block border-r border-gray-500 rounded-r"></div>
      </div>
      <BottomBar />
    </div>
  );
}

export default Home;
