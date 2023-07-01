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

  useEffect(() => {
    if (
      localStorage.getItem("code_verifier") != null &&
      localStorage.getItem("access_token") === null
    ) {
      let codeVerifier = localStorage.getItem("code_verifier");
      const urlParams = new URLSearchParams(window.location.search);
      window.history.replaceState({}, document.title, "/home");
      let body = new URLSearchParams({
        grant_type: "authorization_code",
        code: urlParams.get("code"),
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        code_verifier: codeVerifier,
        client_id: import.meta.env.VITE_CLIENT_ID,
      });

      console.log(body.toString());

      if (urlParams.get("code") === null) return;
      (async function(body) {
        await getAccessToken(body);
      })(body);
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
        <h1 className="text-2xl">Spotify Artist Search</h1>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home accessToken={accessToken} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Searchbar />} />
          <Route path="/artist/:id" element={<Artist />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
