import React, { useState, useRef, useEffect } from "react"; // Importing useRef
import Twitter from "../assets/Twitter.png";
import Google from "../assets/Google.png";
import Apple from "../assets/apple.png";
import Login from "./Signup"; // Importing the Login component
import { Link, useNavigate } from "react-router-dom";

function LoginHome({ data }) {

  // const handlerefresh = () => {
  //   window.location.reload()
  // }
  // useEffect(() => {

  //   handlerefresh()
  // }, [])

  return (
    <div className="flex flex-col h-screen text-white md:flex-row">
      <div className="flex items-center justify-center w-full md:w-3/6">
        <img className="w-20 md:w-full" src={Twitter} alt="Twitter Logo" />
      </div>

      <div className="flex flex-col justify-center w-full md:w-3/6">
        <div className="text-left pl-8">
          <h1 className="font-bold text-center text-4xl md:text-6xl mb-14">
            Happening now
          </h1>
        </div>

        <div className="flex flex-col justify-center md:items-left items-center w-full">
          <div className="w-72">
            <h1 className="font-bold text-3xl text-center md:text-3xl">
              Join today.
            </h1>{" "}
            <button className="mt-8 w-64 bg-white rounded-full py-1 px-4 flex items-center justify-center ml-8 border border-white">
              <img className="w-6 mr-2" src={Google} alt="Google Logo" />
              <span className="text-black text-xs">Sign in with Google</span>
            </button>
            <button className="mt-3  w-64 bg-white rounded-full py-1 px-4 flex items-center justify-center ml-8 border border-white">
              <img className="w-5 mr-2" src={Apple} alt="Apple Logo" />
              <span className="text-black text-xs">Sign in with Apple</span>
            </button>
            <div className="ml-9 flex justify-center items-center w-64 mt-9">
              <hr className="w-1/3 border border-white" />
              <h1 className="mx-4 text-white">or</h1>
              <hr className="w-1/3 border border-white" />
            </div>
            <Link
              to="/signup"
              className="mt-9 w-64 bg-blue-400 rounded-full py-2 px-4 flex items-center justify-center ml-8"
            >
              <span className="text-white text-xs">Create an Account</span>
            </Link>
            <h4 className="text-xs font-thin pl-9 w-full mt-2">
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </h4>
            <h1 className="pl-9 text-xs mt-10">Already have an account?</h1>
            <Link
              to="/login"
              className="mt-5 w-64 bg-black rounded-full py-2 px-4 flex items-center justify-center ml-8 border border-white"
            >
              <span className="text-white text-xs">Login in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginHome;
