import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Cookies from 'js-cookie';
import PostEnteties from "./Components/PostEnteties";
import Update from "./Components/Update";
import Signin from "./Components/Signup";
import Login from "./Components/Login";
import MainPage from "./Components/mainStack";
import Twitter from "./assets/Twitter.png";
import "./App.css";
import axios from "axios";
import Content from "./Components/Content";
import Profile from "./Components/Profile";

function App() {
  const [dance, setDanceData] = useState([]);
  const [data, setProfileData] = useState();
  const [login, setlogin] = useState(false);
  const [loader, setLoader] = useState(true);
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log( Cookies.get('tokenn') || "")
    axios
    .post("https://api-rxwj.onrender.com/dance/getUserDetails", {
      token: Cookies.get('tokenn') || "",
    })  
      .then((res) => {
        setLoader(false);
        setProfileData(res.data);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });

    getUserData();
  }, [login]);

  const getUserData = () => {
    axios
      .get("https://api-rxwj.onrender.com/dance/getEntities")
      .then((response) => {
        setDanceData(response.data);
      })
      .catch((err) => console.log(err.message));
  };

  const Loading = () => {
    return (
      <div className=" w-full h-screen flex flex-col justify-center items-center text-white">
        <img className=" w-20 h-20" src={Twitter} alt="" />
        <h1>Loading....😁😁😁</h1>
      </div>
    );
  };

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={<Login setlogin={setlogin} setLoader={setLoader} />}
        />
        <Route
          path="/signup"
          element={<Signin setlogin={setlogin} setLoader={setLoader} />}
        />
        <Route
          path="/update/:id"
          element={<Update getUserData={getUserData} />}
        />
        <Route
          path="/post"
          element={<PostEnteties email={email} getUserData={getUserData} />}
        />
        {data ? (
          <Route path="/" element={<Home />}>
            <Route index element={<Content data={data} dance={dance} />} />
            <Route
              path="profile"
              element={
                <Profile data={data} dance={dance} getUserData={getUserData} />
              }
            />
          </Route>
        ) : (
          <>
            {loader ? (
              <Route path="/" element={<Loading />} />
            ) : (
              <Route path="/" element={<MainPage data={data} />} />
            )}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
