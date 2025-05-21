import { useState } from "react";
import PropTypes from "prop-types";

StarComponent.propTypes = {
  num: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.array,
};

export default function StarComponent({
  num = 10,
  size = 32,
  color = "#ffcc00",
  type = "num", // num or text
  text = ["Very Poor", "Poor", "Average", "Good", "Very Good"],
  ratingVariable,
  ratingFunction,
}) {
  const [count, setCount] = useState(0);
  const [registerCount, setRegisterCount] = useState(0);

  function handleOnMouseEnter(num) {
    setCount(num);
  }

  function handleMouseCLick(num) {
    if (ratingFunction) ratingFunction(num); // passing the rating to the outside world
    setRegisterCount(num);
  }

  return (
    <div
      style={{ ...styleStarComponent, color: color }}
      onMouseLeave={() => setCount()}
    >
      {Array.from({ length: num }, (_, i) => {
        return (
          <Star
            i={i + 1}
            size={size}
            key={i + 1}
            count={count}
            registerCount={registerCount}
            onMouseEnter={handleOnMouseEnter}
            onMouseClick={handleMouseCLick}
            color={color}
          />
        );
      })}
      {type === "num"
        ? count || registerCount
        : text[count - 1] || text[registerCount - 1]}
    </div>
  );
}

function Star({
  i,
  size,
  count,
  registerCount,
  onMouseEnter,
  onMouseClick,
  color,
}) {
  const priority = count || registerCount;
  return (
    <span
      role="button"
      alt={i}
      style={{ height: `${size}px`, width: `${size}px` }}
      onMouseEnter={() => onMouseEnter(i)}
      onClick={() => onMouseClick(i)}
    >
      {i <= priority ? returnStarFill(color) : returnStarEmpty(color)}
    </span>
  );
}

function returnStarFill(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="currentColor"
      className="bi bi-star-fill"
      viewBox="0 0 16 16"
      color={color}
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
}

function returnStarEmpty(color) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="currentColor"
      className="bi bi-star"
      viewBox="0 0 16 16"
      color={color}
    >
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
    </svg>
  );
}

const styleStarComponent = {
  display: "flex",
  flexDirection: "row",
  gap: "4px",
  alignItems: "center",
  font: "700 20px 'Roboto',sans-serif",
  cursor: "pointer",
};
