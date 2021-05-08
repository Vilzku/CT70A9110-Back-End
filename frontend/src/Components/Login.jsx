import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Login(props) {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [loginState, setLoginState] = useState(0);
  // 0 = Nothing; 1 = Logging in;
  // -1 = Wrong pass; -2 = Wrong user;s

  function onUsernameChange(e) {
    setLoginDetails({
      username: e.target.value,
      password: loginDetails.password,
    });
  }

  function onPasswordChange(e) {
    setLoginDetails({
      username: loginDetails.username,
      password: e.target.value,
    });
  }

  async function loginUser() {
    const res = await fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    });
    if (res.status === 401) return setLoginState(-1);
    if (res.status === 400) return setLoginState(-2);
    if (res.status !== 200) return setLoginState(-3);
    const user = await res.json();
    props.setUser(user);
  }

  return (
    <div class="Login flex-center absolute-center">
      <form class="input-box">
        {loginState === 0 ? (
          <TextField
            id="outlined-basic"
            name="username"
            label="Username"
            value={loginDetails.username}
            onChange={onUsernameChange}
          />
        ) : (
          <TextField
            id="outlined-basic"
            name="username"
            label="Username"
            value={loginDetails.username}
            onChange={onUsernameChange}
            error
          />
        )}
        {loginState === 0 ? (
          <TextField
            id="outlined-basic"
            name="password"
            type="password"
            label="Password"
            value={loginDetails.password}
            onChange={onPasswordChange}
          />
        ) : (
          <TextField
            id="outlined-basic"
            name="password"
            type="password"
            label="Password"
            value={loginDetails.password}
            onChange={onPasswordChange}
            error
          />
        )}
        <Button
          className="login-button"
          variant="contained"
          color="primary"
          onClick={loginUser}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
