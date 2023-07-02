import { useState, useEffect } from "react";
import { BsSpotify } from "react-icons/bs";

function Login() {
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      window.location.href = "/";
    }
  }, []);

  function generateRandomString(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  useEffect(() => {
    if (randomString !== "") {
        let args = new URLSearchParams({
          response_type: "token",
          client_id: "326cbabf1f9e456faf31fc5d4c5bc59e",
          redirect_uri: "http://localhost:5173/",
          state: generateRandomString(16),
          scope: "",
        });

        window.location.href = `https://accounts.spotify.com/authorize?${args}`;
    }
    return () => {};
  }, [randomString]);
  

  return (
    <div className="flex flex-row justify-center items-center w-screen p-4">
      <button
        className="
       text-2xl font-sans py-2 h-14 px-4 rounded-lg border-2 border-neutral-300 flex w-1/3 items-center relative
       "
        onClick={() => {
          setRandomString(generateRandomString(127));
        }}
      >
        <span
          className="
            w-full text-neutral-800 text-center
         "
        >
          Login
        </span>
        <BsSpotify className="w-1/6 h-9 text-green-600 absolute right-0" />
      </button>
    </div>
  );
}

export default Login;
