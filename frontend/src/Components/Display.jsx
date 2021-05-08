import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

export default function Display() {
  const [meme, setMeme] = useState(null);
  const [src, setSrc] = useState(null);

  async function getRandomMeme() {
    // Fetch meme info
    let memeInfo;
    try {
      const infoRes = await fetch("/memes/random", {
        method: "GET",
      });
      memeInfo = await infoRes.json();
      if (memeInfo.message) {
        throw memeInfo.message;
      }
    } catch (err) {
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
      console.log(err);
      setMeme(null);
    }
  }

  useEffect(() => {
    getRandomMeme();
  }, []);

  return (
    <div class="Display">
      <div className="meme-container">
        <h1>{meme ? meme.title : "Failed to load meme - Try again"}</h1>
        <p>
          {meme
            ? "Uploaded on " +
              meme.uploadDate.substring(0, 10) +
              " by " +
              meme.username
            : ""}
        </p>
        <div class="img-container">
          <img class="meme" src={src} alt="" />
        </div>
        <div className="toolbar flex-center">
          <Button
            className="random-button"
            variant="contained"
            color="primary"
            onClick={getRandomMeme}
          >
            Next Meme
          </Button>
        </div>
      </div>
    </div>
  );
}
