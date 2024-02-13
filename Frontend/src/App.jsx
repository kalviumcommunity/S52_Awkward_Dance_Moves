import LoginHome from "./Components/LoginHome";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import PostEnteties from "./Components/PostEnteties";
import Update from "./Components/Update";
import "./App.css";
function App() {
  return (
    <div className="bg-black w-full h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<PostEnteties />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
