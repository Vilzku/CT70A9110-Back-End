import React, { useState, useEffect } from "react";

import PasswordChange from "./PasswordChange";
import DeleteUser from "./DeleteUser";

export default function Profile(props) {
  const [memes, setMemes] = useState([]);

  async function loadMemes() {
    const res = await fetch("/memes/user/" + props.user.username, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(props.user),
    });
    if (res.status !== 200) return;
    const data = await res.json();
    setMemes(data);
  }

  useEffect(() => {
    loadMemes();
  }, []);

  return (
    <div class="Profile">
      <div className="profile-container">
        <h1>Memes you have uploaded</h1>
        <div className="memes">
          {memes.map((meme) => {
            return (
              <p
                className="meme-item"
                key={meme.filename}
                onClick={() => props.loadMeme(meme.filename)}
              >
                {meme.uploadDate.substring(0, 10) + " " + meme.title}
              </p>
            );
          })}
        </div>

        <PasswordChange user={props.user} />
        <DeleteUser user={props.user} setUser={props.setUser} />
      </div>
    </div>
  );
}
