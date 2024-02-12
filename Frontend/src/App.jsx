import LoginHome from "./Components/LoginHome";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import PostEnteties from "./Components/PostEnteties";
import "./App.css";
function App() {
  return (
    <div className="bg-black w-full h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginHome />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Post" element={<PostEnteties />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
