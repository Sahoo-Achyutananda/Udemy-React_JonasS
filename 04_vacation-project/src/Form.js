import React, { useState } from "react";

export function Form({ items, onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleClick(e) {
    e.preventDefault();

    if (!description) return; // if description == "", it'll return !
    const newItem = {
      id: items.length + 1, // temporary id value
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItems(newItem);
    // console.log(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <div>
      <form className="form" onSubmit={(e) => handleClick(e)}>
        <select
          id="select-quant"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, index) => {
            index = index + 1;
            return (
              <option key={index} value={index}>
                {index}
              </option>
            );
          })}
        </select>
        <input
          id="item-text"
          type="text"
          placeholder="your item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button id="add-btn">ADD ITEM</button>
      </form>
    </div>
  );
}
