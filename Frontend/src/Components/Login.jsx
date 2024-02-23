import React, { useState } from "react";
import Twitter from "../assets/Twitter.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login({ setlogin,setLoader }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    // Example of form validation
    if (!email || !password) {
      setErrors({ email: "Email and password are required" });
      return;
    }

    // Make API call to login endpoint
    axios
      .post("http://localhost:3000/dance/login", userData)
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("token", response.data);
          setlogin(true);
          setLoader(true)
        }
        // Handle successful login (e.g., save token, redirect to dashboard)
        console.log("Login successful");

        navigate("/");
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle login error (e.g., display error message)
        console.error("Login failed:", error);
        setErrors({ email: "Invalid email or password" });
      });
  };

  return (
    <div className="flex bg-[#16202A] min-h-screen justify-center items-center">
      <div className="bg-[#133653] rounded-lg flex flex-col py-5 px-14 justify-between border-gray-300 sm:w-full sm:max-w-md">
        <div className="flex justify-between items-start">
          <div className="flex w-full mt-4 justify-center items-center">
            <img className="w-12" src={Twitter} alt="Twitter Logo" />
          </div>
        </div>
        <div className="mt-7 text-white mb-4 flex flex-col items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="mt-3 text-left text-2xl">
              Sign in to your account
            </div>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email Id"
                value={email}
                onChange={handleChange}
                className="border mt-7 bg-black border-gray-400 w-full rounded-md py-2 px-4 mb-4 text-white"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                className="border mt-7 bg-black border-gray-400 w-full rounded-md py-2 px-4 mb-4 text-white"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              className="mt-7 mb-7 bg-blue-500 text-white w-full rounded-md py-2 px-4"
            >
              Login
            </button>
            <p className="mt-7 mb-7 text-center text-white rounded-md py-2 px-4">
              Create a new
              <Link
                to="/signup "
                className="ml-2 underline text-blue-500 font-semibold "
              >
                Account
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* Second div - Hidden on Small screens */}
      <div className="hidden sm:block w-3/6 h-screen">{/* 2nd div */}</div>
    </div>
  );
}

export default Login;
