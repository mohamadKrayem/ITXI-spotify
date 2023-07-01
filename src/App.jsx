import { Cookies, useCookies } from "react-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Searchbar from "./Components/Searchbar";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Searchbar/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
