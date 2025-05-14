import React from "react";

export function Item({ item, onDeleteItems, onToggleItems, key }) {
  return (
    <li className="item">
      <input
        id="checkbox"
        type="checkbox"
        onClick={() => onToggleItems(item)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item)}>❌</button>
    </li>
  );
}
