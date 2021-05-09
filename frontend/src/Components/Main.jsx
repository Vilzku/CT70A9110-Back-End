import React, { useState } from "react";

import Upload from "./Upload";
import Display from "./Display";
import Profile from "./Profile";

function Main(props) {
  const [screen, setScreen] = useState(1);
  const [filename, setFileName] = useState(null);

  function loadMeme(filename) {
    setFileName(filename);
    setScreen(1);
  }

  return (
    <div className="Main flex-center absolute-center">
      {screen === 1 ? (
        <Display
          user={props.user}
          filename={filename}
          setFileName={setFileName}
        />
      ) : (
        ""
      )}
      {screen === 2 ? <Upload user={props.user} /> : ""}
      {screen === 3 ? (
        <Profile
          user={props.user}
          loadMeme={loadMeme}
          setUser={props.setUser}
        />
      ) : (
        ""
      )}
      <footer>
        <p onClick={() => setScreen(1)}>Look at memes</p>
        <p onClick={() => setScreen(2)}>Upload a meme</p>
        <p onClick={() => setScreen(3)}>Profile</p>
        <p
          onClick={() =>
            props.setUser({
              username: "",
              token: "",
            })
          }
        >
          Logout
        </p>
      </footer>
    </div>
  );
}

export default Main;
