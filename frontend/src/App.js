import React, { useState } from "react";

import "./index.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Main from "./Components/Main";

function App() {
  const [user, setUser] = useState({
    username: "",
    token: "",
  });

  // Load login page if user is not logged in
  if (!user?.token) {
    return <Login setUser={setUser} />;
  } else if (user?.token === "register") {
    console.log(user);
    return <Register setUser={setUser} />;
  } else {
    return <Main user={user} setUser={setUser} />;
  }
}

export default App;
