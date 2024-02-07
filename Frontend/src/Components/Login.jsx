import React from "react";
import Twitter from "../assets/Twitter.png";
import cancel from "../assets/Cancel.svg";

function Login() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="bg-black rounded-lg flex flex-col border border-gray-300">
        <div className="flex justify-between items-start">
          <div className=" flex  w-full mt-4 justify-center items-center">
            <img className="w-12 " src={Twitter} alt="Twitter Logo" />
          </div>
        </div>
        <div className="mt-7 text-white mb-4 flex flex-col items-center">
          <div className=" mt-5text-left text-2xl">Create an Account</div>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="border mt-7 bg-black border-gray-400 w-72 mx-16 rounded-md py-2 px-4 mb-4"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
            />
          </div>
          <button className="mt-7 mb-7 bg-blue-500 text-white w-72 rounded-md py-2 px-4">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
