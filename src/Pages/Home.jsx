import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Card from "../Components/CardComponent";
import Sprint from "../Components/SprintComponent";

function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [artists, setArtists] = useState([]);
  const [waiting, setWaiting] = useState(false);

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
      if (urlParams.get("code") === null) return;
      (async function (body) {
        await getAccessToken(body);
      })(body);
    }
    return () => {};
  }, [accessToken]);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      (async function () {
        await getProfile();
      })();
    } else console.log("no access token");

    return () => {};
  }, [accessToken]);

  const [queryStrings, setQueryStrings] = useState({
    q: "",
    type: "artist",
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    if (
      localStorage.getItem("access_token") === null &&
      localStorage.getItem("code_verifier") === null
    ) {
      window.location.href = "/login";
    }
  }, []);

  async function searchArtists(data, signal) {
    await axios
      .get("https://api.spotify.com/v1/search", {
        params: data,
        cancelToken: signal,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setArtists(response.data.artists.items);
        if (
          localStorage.getItem("previous-search") === null ||
          localStorage.getItem("previous-search") !== response.data.artists.href
        ) {
          localStorage.setItem("previous-search", window.location.search);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setWaiting(false);
  }

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const timer = setTimeout(() => {
      if (queryStrings.q !== "") {
        setWaiting(true);
        searchArtists(queryStrings, source.token);
      }
    }, 300);
    return () => {
      clearTimeout(timer);
      source.cancel();
    };
  }, [queryStrings.q, queryStrings.offset]);

  useEffect(() => {
    if (localStorage.getItem("previous-search") !== null) {
      const query = new URLSearchParams(
        localStorage.getItem("previous-search")
      );
      setQueryStrings({
        q: query.get("q"),
        type: query.get("type"),
        limit: query.get("limit"),
        offset: query.get("offset"),
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center items-center p-4">
        <input
          className="m-2 p-2 border-2 border-gray-300 rounded-lg lg:w-1/4 sm:2/4 text-center focus:outline-none 
        focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-500 ease-in-out
         hover:border-green-600 hover:ring-2 hover:ring-green-600 hover:border-transparent 
         h-10 text-lg font-semibold text-gray-600 placeholder-gray-400 focus:w-1/3 
         focus:text-gray-700 focus:shadow-md focus:ring-offset-2
         focus:ring-opacity-50 focus:h-13
        "
          placeholder="Search for an artist..."
          type="search"
          name="search"
          id="search"
          value={queryStrings.q}
          onChange={(e) => {
            setQueryStrings({ ...queryStrings, q: e.target.value });
          }}
        />
      </div>

      {waiting ? (
        <Sprint />
      ) : (
        <div
          className="
        container w-screen grid smm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 pt-6 
        xl:gap-5 gap-4 sm:ml-auto smm:mx-auto
        "
        >
          {artists.map((artist) => {
            return (
              <>
                {artist.images.length === 0 ? (
                  <Card
                    name={artist.name}
                    key={artist.id}
                    followers={
                      artist.followers.total ? artist.followers.total : 0
                    }
                  />
                ) : (
                  <Card
                    imageSrc={artist.images[1].url}
                    followers={
                      artist.followers.total ? artist.followers.total : 0
                    }
                    name={artist.name}
                    key={artist.id}
                  />
                )}
              </>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Home;
