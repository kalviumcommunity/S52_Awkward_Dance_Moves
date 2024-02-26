import React, { useState } from "react";
import Twitter from "../assets/Twitter.png";
import cancel from "../assets/Cancel.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Post({ email, getUserData }) {
  const [dance_gif, setGif] = useState("");
  const [comments, SetComments] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("https://api-rxwj.onrender.com/postEntities", {
        email,
        dance_gif,
        comments,
      })
      .then((res) => {
        getUserData();
      })
      .catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <div className="flex  min-h-screen justify-around items-center">
      <div className="bg-black px-5 min-w-96 rounded-lg flex flex-col border border-gray-300">
        <div className="flex justify-between items-start">
          <div className="flex w-full mt-4 justify-center items-center">
            <img className="w-12" src={Twitter} alt="Twitter Logo" />
          </div>
        </div>
        <div className="mt-7 text-white mb-4 flex flex-col items-center">
          <form
            onSubmit={submit}
            className=" flex flex-col justify-center items-center"
          >
            <div className="mt-5 mb-5 text-left text-2xl">Create an Post</div>
            <div>
              <img src={dance_gif} alt="" />
            </div>

            <div>
              <input
                type="text"
                placeholder="Gif"
                className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
                value={dance_gif}
                onChange={(e) => setGif(e.target.value)}
              />
            </div>
            <div className=" w-full">
              <input
                type="text"
                placeholder="Comments"
                className="border mt-7 bg-black border-gray-400 w-full rounded-md py-2 px-4 mb-4"
                value={comments}
                onChange={(e) => SetComments(e.target.value)}
              />
            </div>

            <button
              onClick={submit}
              className="mt-7 mb-7 bg-[rgb(28,155,239)] transition duration-300 hover:bg-[rgb(24,140,216)] text-white w-72 rounded-md py-2 px-4"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Post;
