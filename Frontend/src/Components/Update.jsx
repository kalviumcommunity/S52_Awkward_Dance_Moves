import React, { useEffect, useState } from "react";
import Twitter from "../assets/Twitter.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Home from "./Home";
function Update({ getUserData }) {
  const { id } = useParams();
  const [dance_gif, setGif] = useState("");
  const [comments, setComments] = useState("");
  const [dance, setDance] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/dance/getEntities/${id}`)
      .then((response) => {
        setDance(response.data);
        setGif(response.data.dance_gif);
        setComments(response.data.comments);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/dance/deleteEntities/${id}`)
      .then((res) => {
        getUserData();

        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/dance/updateEntities/${id}`, {
        dance_gif,
        comments,
      })
      .catch((err) => console.log(err));
    getUserData();

    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="bg-black px-10 rounded-lg flex flex-col border border-gray-300">
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
            <div className="mt-5 text-left text-2xl">Update the Post</div>

            <div className=" flex flex-col justify-center mt-4">
              <img src={dance_gif} alt="" />
              <input
                type="text"
                placeholder="Gif"
                className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
                value={dance_gif}
                onChange={(e) => setGif(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Comments">Comments</label>
              <input
                type="text"
                placeholder="Comments"
                className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <button onClick={submit}>
              <Link className="mt-7 mb-7 bg-[rgb(28,155,239)] transition duration-300 hover:bg-[rgb(24,140,216)] text-white w-72 rounded-md py-2 px-4">
                Update
              </Link>
              <button
                onClick={() => handleDelete(id)}
                className=" bg-red-600 ml-5 rounded-md py-2 px-4"
              >
                delete
              </button>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
