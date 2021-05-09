import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Register(props) {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  function onUsernameChange(e) {
    setLoginDetails({
      username: e.target.value,
      password: loginDetails.password,
      password2: loginDetails.password2,
    });
  }

  function onPasswordChange(e) {
    setLoginDetails({
      username: loginDetails.username,
      password: e.target.value,
      password2: loginDetails.password2,
    });
  }

  function onPassword2Change(e) {
    setLoginDetails({
      username: loginDetails.username,
      password: loginDetails.password,
      password2: e.target.value,
    });
  }

  // TODO: Something breaks when inserting incorrect data when registering
  // If data is valid everything works fine
  // TODO: Indications of incorrect data do not work

  async function registerUser() {
    if (
      loginDetails.password !== loginDetails.password2 ||
      loginDetails.password === "" ||
      loginDetails.username === ""
    )
      return;

    try {
      const res = await fetch("/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      });
    } catch (err) {
      setError(err.message);
      return console.log(err);
    }
    props.setUser({ username: "", token: "" });
  }

  function onCancelClick() {
    props.setUser({
      username: "",
      token: "",
    });
  }

  return (
    <div class="Login flex-center absolute-center">
      <form class="input-box">
        <p>{error}</p>
        <TextField
          id="outlined-basic"
          name="username"
          label="Username"
          value={loginDetails.username}
          onChange={onUsernameChange}
        />
        <TextField
          id="outlined-basic"
          name="password"
          label="Password"
          type="password"
          value={loginDetails.password}
          onChange={onPasswordChange}
        />
        <TextField
          id="outlined-basic"
          name="password2"
          label="Password again"
          type="password"
          value={loginDetails.password2}
          onChange={onPassword2Change}
        />

        <Button
          className="login-button"
          variant="contained"
          color="primary"
          onClick={registerUser}
        >
          Register
        </Button>
        <p className="cancel-text">
          <span className="text-link" onClick={onCancelClick}>
            Cancel
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
