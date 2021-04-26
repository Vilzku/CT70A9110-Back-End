import React, { useState } from 'react';

import Upload from './Upload'

function Main(props) {


  return (
    <div className="Main">
      <Upload user={props.user}/>
    </div>
  );
}

export default Main;