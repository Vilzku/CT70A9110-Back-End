import React, { useState } from "react";

import Upload from "./Upload";
import Display from "./Display";

function Main(props) {
  return (
    <div className="Main flex-center">
      <Display />
      <Upload user={props.user} />
    </div>
  );
}

export default Main;
