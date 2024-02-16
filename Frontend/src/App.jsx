import MainPage from "./Components/mainStack";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signin from "./Components/Signup";
import PostEnteties from "./Components/PostEnteties";
import Update from "./Components/Update";
import Login from "./Components/Login";
import "./App.css";

function App() {
  return (
    <div className="bg-black w-full h-screen">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Signin />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/post" element={<PostEnteties />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
    </div>
  );
}

export default App;
