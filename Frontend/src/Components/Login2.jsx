import React, { useState } from "react";
import Twitter from "../assets/Twitter.png";
import cancel from "../assets/Cancel.svg";
import axios from "axios";
import Home from "./Home"; // Import Home component

function Login2() {
  const [UserName, setName] = useState("");
  const [EmailId, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/dance/createUser", { UserName, EmailId, Password })
      .then((res) => {
        console.log(res);
        setLoggedIn(true); // Set loggedIn to true on successful login
      })
      .catch((err) => console.log(err));
  };

  if (loggedIn) {
    return <Home login = {loggedIn} />;
  }

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
            className="flex flex-col justify-center items-center"
          >
            <div className="mt-5 text-left text-2xl">Create an Account</div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
                value={EmailId}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="border mt-7 bg-black border-gray-400 w-72 rounded-md py-2 px-4 mb-4"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit" // Change to button type submit
              className="mt-7 mb-7 bg-blue-500 text-white w-72 rounded-md py-2 px-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login2;
