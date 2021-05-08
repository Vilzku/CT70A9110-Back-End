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

  function uploadMore() {
    setStatus(0);
  }

  async function uploadMeme() {
    if (!meme || !memeTitle) return setStatus(-2);

    const data = new FormData();
    data.append("title", memeTitle);
    data.append("meme", meme);
    data.append("username", props.user.username);
    data.append("token", props.user.token);

    try {
      const res = await fetch("/memes/upload", {
        method: "POST",
        body: data,
      });
      if (res.status !== 200) return setStatus(-1);
      console.log(await res.json());
      setStatus(1);
    } catch (err) {
      console.log(err);
      setStatus(-1);
    }

    setMeme();
    setMemeTitle();
  }

  // Normal
  if (status === 0) {
    return (
      <div className="Upload">
        <h2>Upload a meme</h2>
        <div className="container">
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
        </div>
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

    // Success
  } else if (status === 1) {
    return (
      <div className="Upload">
        <h2>Upload a meme</h2>
        <div className="container">
          <p>Success</p>
        </div>
        <Button
          id="upload-more-button"
          variant="contained"
          onClick={uploadMore}
        >
          Upload more
        </Button>
      </div>
    );
  } else if (status === -2) {
    return (
      <div className="Upload">
        <h2>Upload a meme</h2>
        <div className="container">
          <p>You need to upload a file and include a title! Try again!</p>
        </div>
        <Button
          id="upload-more-button"
          variant="contained"
          onClick={uploadMore}
        >
          Upload more
        </Button>
      </div>
    );

    // Failure
  } else {
    return (
      <div className="Upload">
        <h2>Upload a meme</h2>
        <div className="container">
          <p>Failure, try again</p>
        </div>
        <Button
          id="upload-more-button"
          variant="contained"
          onClick={uploadMore}
        >
          Upload more
        </Button>
      </div>
    );
  }
}

export default Upload;
