import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

export default function Display(props) {
  const [meme, setMeme] = useState(null);
  const [src, setSrc] = useState(null);

  async function getMeme(random) {
    let url = "/memes/random";
    if (props.filename && !random) url = "/memes/" + props.filename;

    // Fetch meme info
    let memeInfo;
    try {
      const infoRes = await fetch(url, {
        method: "GET",
      });
      memeInfo = await infoRes.json();
      if (memeInfo.message) {
        throw memeInfo.message;
      }
    } catch (err) {
      setMeme();
      setSrc();
      return console.log(err);
    }

    // Fetch file
    try {
      const fileRes = await fetch("/memes/file/" + memeInfo.filename, {
        method: "GET",
      });
      const blob = await fileRes.blob();
      await setSrc(URL.createObjectURL(blob));
      setMeme(memeInfo);
    } catch (err) {
      setMeme();
      setSrc();
      console.log(err);
    }
  }

  async function getRandomMeme() {
    getMeme(true);
    props.setFileName(null);
  }

  async function deleteMeme() {
    if (
      !window.confirm(
        "Are you sure you want to delete this meme? This cannot be undone."
      )
    )
      return;

    try {
      const res = await fetch("/memes/delete/" + meme.filename, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.user),
      });
    } catch (err) {
      return console.log(err);
    }
    console.log("Meme removed");
    getRandomMeme();
  }

  useEffect(() => {
    getMeme();
  }, []);

  return (
    <div class="Display">
      <div className="meme-container">
        <h1>{meme ? meme.title : ""}</h1>
        <p>
          {meme
            ? "Uploaded on " +
              meme.uploadDate.substring(0, 10) +
              " by " +
              meme.username
            : ""}
        </p>
        <div class="img-container">
          <img class="meme" src={src} alt=" " />
        </div>
        <div className="toolbar flex-center">
          {props.user.username === meme?.username ? (
            <Button
              className="delete-button"
              variant="contained"
              color="primary"
              onClick={deleteMeme}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
          <Button
            className="random-button"
            variant="contained"
            color="primary"
            onClick={getRandomMeme}
          >
            Random Meme
          </Button>
        </div>
      </div>
    </div>
  );
}
