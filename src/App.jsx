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

function App() {
  
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
      if(localStorage.getItem("access_token") === null)
         useNavigate("/login");
  }, [])
  

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

  async function getProfile() {
    await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    if (
      localStorage.getItem("code_verifier") != null &&
      localStorage.getItem("access_token") === null 
    ) {
      let codeVerifier = localStorage.getItem("code_verifier");
      const urlParams = new URLSearchParams(window.location.search);
      let body = new URLSearchParams({
        grant_type: "authorization_code",
        code: urlParams.get("code"),
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        code_verifier: codeVerifier,
        client_id: import.meta.env.VITE_CLIENT_ID,
      });

      console.log(body.toString());

      window.history.replaceState({}, document.title, "/");
      if(urlParams.get("code") === null) return;
      (async function (body) {
        await getAccessToken(body);
      })(body);
    }
    return () => {};
  }, [accessToken]);

  useEffect(() => {
    if (
      localStorage.getItem("access_token")
    ) {
      (async function () {
        await getProfile();
      })();
    } else console.log("no access token");

    return () => {};
  }, [accessToken]);

  return (
    <>
      <div className="flex flex-row justify-center items-center p-4">
        <Router>
            <Routes>
               <Route path="/" element={<h1>Home</h1>} />
               <Route path="/login" element={<Login />} />
            </Routes>
         </Router>

        {/* <a
          onClick={() => {
            setRandomString(generateRandomString(127));
          }}
        >
          Login
        </a>

        <input
          className="m-2 p-2 border-2 border-gray-300 rounded-lg w-1/4 text-center focus:outline-none 
        focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-500 ease-in-out
         hover:border-green-600 hover:ring-2 hover:ring-green-600 hover:border-transparent 
         h-10 text-lg font-semibold text-gray-600 placeholder-gray-400 focus:w-1/3 
         focus:text-gray-700 focus:shadow-md focus:ring-2 focus:ring-offset-2
         focus:ring-opacity-50 focus:h-13
        "
          placeholder="Search for an artist"
          type="search"
          name="search"
          id="search"
        /> */}
      </div>
    </>
  );
}

export default App;
