import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

export default function Display() {
  const [meme, setMeme] = useState(null);
  const [src, setSrc] = useState(null);

  async function getRandomMeme() {
    const infoRes = await fetch("/memes/random", {
      method: "GET",
    });
    setMeme(await infoRes.json());

    try {
      const fileRes = await fetch("/memes/file/" + meme.filename, {
        method: "GET",
      });
      const blob = await fileRes.blob();
      setSrc(URL.createObjectURL(blob));
    } catch (err) {
      console.log("Failed to load image");
    }
  }

  useEffect(() => {
    getRandomMeme();
  }, []);

  return (
    <div class="Display">
      <div className="meme-container">
        <h1>Title here</h1>
        <div class="img-container">
          <img class="meme" src={src} />
        </div>
        <Button class="random-button" onClick={getRandomMeme}>
          Random Meme
        </Button>
      </div>
    </div>
  );
}
