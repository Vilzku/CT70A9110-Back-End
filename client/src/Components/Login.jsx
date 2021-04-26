import React, { useState } from 'react';

function Login(props) {

  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: ''
  });

  function onUsernameChange(e) {
    setLoginDetails({
      username: e.target.value,
      password: loginDetails.password
    })
  }

  function onPasswordChange(e) {
    setLoginDetails({
      username: loginDetails.username,
      password: e.target.value
    })
  }
  
  async function loginUser() {
    const res = await fetch("/users/login",{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginDetails)
    });
    const user = await res.json();
    props.setUser(user);
  }

  return (
    <div className="App">
      <form>
        <div>
          Username
          <input
            type="text"
            name="username"
            value={loginDetails.username}
            onChange={onUsernameChange}
          />
        </div>
        <div>
          Password
          <input
            type="text"
            name="password"
            value={loginDetails.password}
            onChange={onPasswordChange}
          />
        </div>
      </form>
      <button id="loginButton" onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;