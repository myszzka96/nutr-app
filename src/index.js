import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Enter UM ID (C#):</h1>
      <form name="student" target="index2.html">
        <input type="text" placeholder="ex. C12345678" />
        <br />
        <br />
        <a href="index2.html">
          <input type="button" value="Start check-out" />
        </a>
      </form>
      <br />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
