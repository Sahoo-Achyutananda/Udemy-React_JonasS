import { useState } from "react";

export default function TextExpander({
  children,
  charLimit = 50,
  showMoreText = "Show More",
  showLessText = "Show Less",
  showMoreColor = "blue",
  showLessColor = "red",
}) {
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }
  const string = children;

  return (
    <div>
      {toggle ? string : string.slice(0, charLimit) + " ....."}
      <span
        onClick={() => handleToggle()}
        style={toggle ? spanStyle(showLessColor) : spanStyle(showMoreColor)}
      >
        {toggle ? showLessText : showMoreText}
      </span>
    </div>
  );
}

function spanStyle(color) {
  return { color: color, cursor: "pointer" };
}
