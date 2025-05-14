import "./styles.css";
import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <StepInput step={step} funx={setStep} />
      <CountInput count={count} funx={setCount} />
      <Text step={step} count={count} />
    </div>
  );
}

function StepInput({ step, funx }) {
  return (
    <div>
      <button onClick={() => funx(step - 1)}>➖</button>
      <span>Step : {step}</span>
      <button onClick={() => funx(step + 1)}>➕</button>
    </div>
  );
}

function CountInput({ count, funx }) {
  return (
    <div>
      <button onClick={() => funx(count - 5)}>➖</button>
      <span>Count : {count}</span>
      <button onClick={() => funx(count + 5)}>➕</button>
    </div>
  );
}

function Text({ step, count }) {
  const offset = step * count;
  const date = new Date();
  date.setDate(date.getDate() + offset);

  return (
    <div>
      <p>
        {offset > 0 ? offset + " Days from" : ""} Today is {date}
      </p>
    </div>
  );
}
