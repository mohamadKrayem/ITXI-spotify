import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Searchbar from "./Components/Searchbar";
import Artist from "./Pages/Artist";

function App() {
  const [accessToken, setAccessToken] = useState("");
  async function getAccessToken(body) {
    if (accessToken !== "") return;
    await axios
      .post("https://accounts.spotify.com/api/token", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((data) => {
        console.log(data);
        setAccessToken(data.data.access_token);
        localStorage.setItem("access_token", data.data.access_token);
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  }

  async function getAccessTokenFromTheUrl(hash) {
    let token = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];
    setAccessToken(token);
    window.history.replaceState({}, document.title, "/");
    window.localStorage.setItem("access_token", token);
    return token;
  }

  useEffect(() => {
    const hash = window.location.hash;
    if (localStorage.getItem("access_token") === null && hash) {
      getAccessTokenFromTheUrl(hash);
    }
    return () => { };
  }, [accessToken]);

  return (
    <>
      <div
        className="
            bg-gray-400 p-3 text-black font-medium sm:pl-16 pl-8
         "
      >
        <h1 className="text-2xl">Spotify artist search</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home accessToken={accessToken} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artist/:id" element={<Artist />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
