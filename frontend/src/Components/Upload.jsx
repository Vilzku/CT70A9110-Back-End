import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Upload(props) {
  const [meme, setMeme] = useState();
  const [memeTitle, setMemeTitle] = useState();
  const [status, setStatus] = useState(0);

  function onMemeChange(e) {
    setMeme(e.target.files[0]);
  }

  function onMemeTitleChange(e) {
    setMemeTitle(e.target.value);
  }

  async function uploadMeme() {
    const data = new FormData();
    data.append("title", memeTitle);
    data.append("meme", meme);
    data.append("username", props.user.username);
    data.append("token", props.user.token);

    const res = await fetch("/memes/upload", {
      method: "POST",
      body: data,
    });
    const success = await res.json();
    console.log(success);
    if (res.status !== 200) return setStatus(-1);
    setStatus(1);
  }

  return (
    <div className="Upload">
      <h2>Upload meme</h2>
      <TextField
        id="outlined-basic"
        name="meme_title"
        label="Title (max 20 characters)"
        value={memeTitle}
        autoComplete="off"
        inputProps={{ maxLength: 20 }}
        onChange={onMemeTitleChange}
      />
      <input type="file" name="meme" onChange={onMemeChange} />
      <Button
        id="uploadButton"
        variant="contained"
        color="primary"
        onClick={uploadMeme}
      >
        Upload
      </Button>
    </div>
  );
}

export default Upload;
