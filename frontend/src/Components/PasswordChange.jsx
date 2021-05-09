import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function PasswordChange(props) {
  const [loginDetails, setLoginDetails] = useState({
    password: "",
    newPassword: "",
    newPassword2: "",
  });

  function onOldPasswordChange(e) {
    setLoginDetails({
      password: e.target.value,
      newPassword: loginDetails.newPassword,
      newPassword2: loginDetails.newPassword2,
    });
  }

  function onPasswordChange(e) {
    setLoginDetails({
      password: loginDetails.password,
      newPassword: e.target.value,
      newPassword2: loginDetails.newPassword2,
    });
  }

  function onPassword2Change(e) {
    setLoginDetails({
      password: loginDetails.password,
      newPassword: loginDetails.newPassword,
      newPassword2: e.target.value,
    });
  }

  async function changePassword() {
    if (
      loginDetails.newPassword !== loginDetails.newPassword2 ||
      loginDetails.newPassword === "" ||
      loginDetails.password === ""
    )
      return;

    const data = {
      username: props.user.username,
      password: loginDetails.password,
      newPassword: loginDetails.newPassword,
    };

    try {
      const res = await fetch("/users/update/" + data.username, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      return console.log(err);
    }
    console.log("success updating pass");
  }

  function onCancelClick() {
    return;
  }

  return (
    <div class="PasswordChange">
      <h1>Change Password</h1>
      <p>Logged in as {props.user.username}</p>
      <TextField
        id="outlined-basic"
        name="current_password"
        type="password"
        label="Current password"
        value={loginDetails.password}
        onChange={onOldPasswordChange}
      />
      <TextField
        id="outlined-basic"
        name="password"
        label="New password"
        type="password"
        value={loginDetails.newPassword}
        onChange={onPasswordChange}
      />
      <TextField
        id="outlined-basic"
        name="password2"
        label="New password again"
        type="password"
        value={loginDetails.newPassword2}
        onChange={onPassword2Change}
      />
      <Button
        className="password-button"
        variant="contained"
        color="primary"
        onClick={changePassword}
      >
        Change password
      </Button>
      <p className="cancel-text">
        <span className="text-link" onClick={onCancelClick}>
          Cancel
        </span>
      </p>
    </div>
  );
}
