import React, { useState } from "react";

import "./index.css";
import Login from "./Components/Login";
import Main from "./Components/Main";

import Container from "@material-ui/core/Container";

function App() {
  const [user, setUser] = useState({
    username: "",
    token: "",
  });

  // Load login page if user is not logged in
  if (!user.token) {
    return (
      <Container>
        <Login setUser={setUser} />
      </Container>
    );
  } else {
    return (
      <Container>
        <Main user={user} />
      </Container>
    );
  }
}

export default App;
