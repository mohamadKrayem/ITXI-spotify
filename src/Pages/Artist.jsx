import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Album from "../Components/AlbumCardComponent";
import axios from "axios";
import Sprint from "../Components/SprintComponent";

function Artist({ name }) {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [waiting, setWaiting] = useState(true);

  async function getArtist(signal) {
    await axios
      .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        cancelToken: signal,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((data) => {
        console.log(data);
        setAlbums(data.data.items);
        setWaiting(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    getArtist(source.token);

    return () => {
      source.cancel("Request cancelled");
    };
  }, [id]);

  return (
    <div className="sm:px-16 px-8">
      <div
        className="
          py-3 text-black font-medium
         "
      >
        <h1 className="sm:text-4xl sm2:text-2xl text-xl">
          {(function () {
            for (const album of albums) {
              if (album.artists.length == 1) {
                return album.artists[0].name;
              }
            }
          })()}
        </h1>
        <h1 className="text-gray-500 sm:text-2xl sm2:text-xl text-lg mt-2">
          Albums
        </h1>
      </div>
      <div className="container mx-0 sm2:mx-auto py-5 flex flex-col justify-center items-between gap-4">
        {waiting ? (
          <Sprint />
        ) : (
          <div className="grid xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2  grid-cols-1 lg:gap-x-20 sm:gap-x-6 gap-y-10">
            {albums.length &&
              albums.map((album) => {
                return (
                  <Album
                    key={album.id}
                    name={album.name}
                    artist={(function () {
                      let artists = [];
                      album.artists.forEach((artist) => {
                        artists.push(artist.name);
                      });
                      return artists.join(", ");
                    })()}
                    image={album.images[0].url}
                    tracks={album.total_tracks}
                    date={album.release_date}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Artist;
