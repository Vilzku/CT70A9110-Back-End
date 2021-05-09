import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function DeleteUser(props) {
  const [password, setPassword] = useState("");

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  async function deleteUser() {
    if (password === "") return;
    if (
      !window.confirm(
        "Are you sure you want to delete your account? All memes will remain in the database."
      )
    )
      return;

    const data = {
      username: props.user.username,
      password: password,
    };

    try {
      const res = await fetch("/users/delete/" + data.username, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status !== 200) throw await res.json();
    } catch (err) {
      setPassword("");
      return console.log(err.message);
    }

    console.log("Account removed");
    props.setUser({
      username: "",
      token: "",
    });
  }

  return (
    <div className="DeleteUser">
      <h1>Delete user</h1>
      <TextField
        id="outlined-basic"
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={onPasswordChange}
      />
      <Button
        className="delete-user-button"
        variant="contained"
        color="primary"
        onClick={deleteUser}
      >
        Delete account
      </Button>
    </div>
  );
}
