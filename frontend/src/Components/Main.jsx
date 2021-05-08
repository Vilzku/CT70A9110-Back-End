import React, { useState } from "react";

import Upload from "./Upload";
import Display from "./Display";

function Main(props) {
  const [screen, setScreen] = useState(1);

  function setDisplay() {
    setScreen(1);
  }
  function setUpload() {
    setScreen(2);
  }
  function setSettings() {
    setScreen(3);
  }
  function logOut() {
    props.setUser(null);
  }

  return (
    <div className="Main flex-center absolute-center">
      {screen === 1 ? <Display user={props.user} /> : ""}
      {screen === 2 ? <Upload user={props.user} /> : ""}
      {screen === 3 ? "settings" : ""}
      <footer>
        <p onClick={setDisplay}>Look at memes</p>
        <p onClick={setUpload}>Upload a meme</p>
        <p onClick={setSettings}>Profile</p>
        <p onClick={logOut}>Logout</p>
      </footer>
    </div>
  );
}

export default Main;
