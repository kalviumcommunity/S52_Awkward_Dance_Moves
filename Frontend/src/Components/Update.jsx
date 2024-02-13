import React, { useEffect, useState } from "react";
import Twitter from "../assets/Twitter.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Home from "./Home";
function Update() {
  const { id } = useParams();
  const [Username, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [dance_gif, setGif] = useState("");
  const [comments, setComments] = useState("");
  const [dance, setDance] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/dance/getEntites/${id}`)
      .then((response) => {
        setDance(response.data);
        setName(response.data.Username);
        setProfile(response.data.profile);
        setGif(response.data.dance_gif);
        setComments(response.data.comments);
        console.log(response.data);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const submit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/dance/updateEntities/${id}`, {
        Username,
        dance_gif,
        profile,
        comments,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="bg-black rounded-lg flex flex-col border border-gray-300">
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
            <div className="mt-5 text-left text-2xl">Create an Post</div>
            <div>
              <input
                type="text"
                placeholder="Username"
                className="border mt-7 bg-black border-gray-400 w-72 mx-16 rounded-md py-2 px-4 mb-4"
                value={Username}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Profile"
                className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              />
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
            <div>
              <input
                type="text"
                placeholder="Comments"
                className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <button onClick={submit}>
              <Link
                className="mt-7 mb-7 bg-[rgb(28,155,239)] transition duration-300 hover:bg-[rgb(24,140,216)] text-white w-72 rounded-md py-2 px-4"
                to="/home"
              >
                Post
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
