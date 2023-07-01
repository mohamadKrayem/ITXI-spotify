import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Card from "../Components/CardComponent";
import Sprint from "../Components/SprintComponent";

function Home({ accessToken }) {
  const [artists, setArtists] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();

  const [queryStrings, setQueryStrings] = useState({
    q: "",
    type: "artist",
    //  limit: 10,
    //  offset: 0,
  });

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
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
    const timer = setTimeout(() => {
      if (queryStrings.q !== "") {
        setWaiting(true);
        setQueryParams(queryStrings);
      }
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [queryStrings.q]);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    if (queryParams.get("q") === "null") {
      console.log("nulll");
      return setArtists([]);
    }
    const data = {
      q: queryParams.get("q"),
      type: queryParams.get("type"),
    };
    if (queryParams.get("q") !== "") {
      setWaiting(true);
      searchArtists(data, source.token);
    }
    return () => {
      source.cancel();
    };
  }, [queryParams]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center p-2 w-full">
        <input
          className="m-2 mb-4 p-2 border-2 border-gray-300 rounded-lg text-center focus:outline-none focus:border-gray-700
          lg:w-2/4 sm:w-2/3 sm2:w-1/2 text-lg font-semibold text-gray-600 placeholder-gray-400 focus:text-gray-700 focus:shadow-md focus:ring-offset-2
        transition-all duration-500 ease-in-out
      "
          placeholder="Search for an artist..."
          type="search"
          name="search"
          id="search"
          value={queryStrings.q}
          onChange={(e) => {
            setQueryStrings({ type: "artist", q: e.target.value });
          }}
        />
      </div>

      {waiting ? (
        <Sprint />
      ) : (
        //   <div className="grid grid-cols-1 w-10/12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 justify-center items-center">
        <div className="container mx-0 sm2:mx-auto py-8 sm2:px-8 flex flex-col justify-center items-between gap-4">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-x-6 gap-y-10">
            {artists.map((artist) => (
              <>
                {artist.images.length === 0 ? (
                  <Card
                    name={artist.name}
                    key={artist.id}
                    followers={
                      artist.followers.total ? artist.followers.total : 0
                    }
                    id={artist.id}
                    popularity={artist.popularity ? artist.popularity / 20 : 0}
                  />
                ) : (
                  <Card
                    imageSrc={artist.images[1].url}
                    followers={
                      artist.followers.total ? artist.followers.total : 0
                    }
                    name={artist.name}
                    key={artist.id}
                    id={artist.id}
                    popularity={artist.popularity ? artist.popularity / 20 : 0}
                  />
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
