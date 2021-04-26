import React, { useState } from 'react';


function Upload(props) {
  const [meme, setMeme] = useState();

  function onMemeChange(e) {
      setMeme(e.target.files[0]);
  }

  async function uploadMeme() {

    const data = new FormData();
    data.append('title', 'asdfasdfasdf');
    data.append('meme', meme);
    data.append('username', props.user.username)
    data.append('token', props.user.token)

    const res = await fetch("/memes/upload", {
      method: "POST",
      body: data
    });
    //const success = await res.json();
    //console.log(success)
  }

  return (
    <div className="Upload">
      <input
        type="file"
        name="meme"
        onChange={onMemeChange} />
      <button id="uploadButton" onClick={uploadMeme}>Upload</button>
    </div>
  );
}

export default Upload;