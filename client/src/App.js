import React, { useState } from 'react';

import Login from './Components/Login'
import Main from './Components/Main'

function App() {
  const [user, setUser] = useState({
    username: '',
    token: ''
  });

  // Load login page if user is not logged in
  if(!user.token) {
    return (
      <Login setUser={setUser} />
    );
  } else {
    return (
      <Main user={user}/>
    );
  }
  
}

export default App;