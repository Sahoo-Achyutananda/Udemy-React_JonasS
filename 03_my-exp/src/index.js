// This has to be called "index.js" . The src folder had a lot of files which i deleted

import React, { useState } from "react";
import ReactDom from "react-dom/client";
import * as util from "./utils.js";

import "./index.css";

// creating a component
function App() {
  return (
    <>
      <Card />;
    </>
  );
}

function Card() {
  const [phase, setPhase] = useState(0);
  // a common state variale for the card components ... Every child component can inherit the component uvia props
  function increment() {
    setPhase((phase) => (phase < 2 ? phase + 1 : phase));
  }

  function decrement() {
    setPhase((phase) => (phase > 0 ? phase - 1 : phase));
  }
  return (
    <div className="card">
      <Phase phase={phase} />
      <Text phase={phase} />
      <Button phase={phase} inc={increment} dec={decrement} />
    </div>
  );
}

function Phase({ phase }) {
  const phase_no = phase;

  return (
    <div className="phases">
      <div className={phase_no >= 0 ? "active" : "normal"}>1</div>
      <div className={phase_no >= 1 ? "active" : "normal"}>2</div>
      <div className={phase_no >= 2 ? "active" : "normal"}>3</div>
    </div>
  );
}

function Text({ phase }) {
  const statements = [
    "Learn REACT 📔",
    "Give Mock Interviews 🗣️",
    "Earn a lot of Money 🤑",
  ];
  const current_statement = phase;
  return (
    <div className="para">
      <p>{statements[current_statement]}</p>
    </div>
  );
}

function Button({ phase, inc, dec }) {
  return (
    <div className="buttons">
      <button className="btn" onClick={() => dec()}>
        Prev
      </button>
      <button className="btn" onClick={() => inc()}>
        Next
      </button>
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
