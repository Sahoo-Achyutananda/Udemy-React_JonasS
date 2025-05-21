// This has to be called "index.js" . The src folder had a lot of files which i deleted

import React, { useEffect, useReducer, useState } from "react";
import ReactDom from "react-dom/client";

import "./index.css";

// creating a component
function App() {
  function reducer(state, action) {
    // console.log(state, action);
    switch (action.type) {
      case "INCREMENT-COUNT":
        return { ...state, count: state.count + 1 };
      case "DECREMENT-COUNT":
        return { ...state, count: state.count - 1 };
      case "CHANGE-OFFSET":
        return { ...state, offset: parseInt(action.value) };
      case "RESET":
        return { ...state, count: 1, offset: 1 };
      default:
        return state;
    }
  }

  const [date, setDate] = useState(new Date());
  const [state, dispatch] = useReducer(reducer, { count: 1, offset: 1 });

  useEffect(() => {
    function updateDate() {
      const updateDate = new Date();
      updateDate.setDate(updateDate.getDate() + state.count * state.offset);
      setDate(updateDate);
    }
    updateDate();
  }, [state]);

  return (
    <div className="card">
      <InputSlider
        min={1}
        max={100}
        value={state.offset}
        onChange={(e) =>
          dispatch({ type: "CHANGE-OFFSET", value: e.target.value })
        } //it is recommended to not pass events directly
      />
      <div className="counter">
        <Button
          text={"+"}
          onClick={() => dispatch({ type: "INCREMENT-COUNT" })}
        />
        <InputText value={state.count} />
        <Button
          text={"-"}
          onClick={() => dispatch({ type: "DECREMENT-COUNT" })}
        />
      </div>
      <DateOutput value={date.toDateString()} />
      <button onClick={() => dispatch({ type: "RESET" })}>RESET</button>
      {/* <div>{date.toDateString()}</div> */}
    </div>
  );
}

function InputSlider({ min, max, value, onChange }) {
  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="cystom-slider"
      ></input>
    </>
  );
}

function Button({ text, onClick }) {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
}

function InputText({ value, handleInputValue }) {
  return (
    <>
      <input type="number" value={value} onChange={handleInputValue}></input>
    </>
  );
}

function DateOutput({ value }) {
  return <>{value}</>;
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
