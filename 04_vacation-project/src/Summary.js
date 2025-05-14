import React from "react";

export function Summary({ items }) {
  const packedItems = items.filter((i) => {
    return i.packed === true;
  }).length;

  const percentage = Math.round((packedItems / items.length) * 100);

  return (
    <div className="summary">
      {items.length
        ? `💼 You have ${items.length} items on your list, and you already packed ${packedItems} (${percentage}%)`
        : "Start adding some items to your packing list 🚀"}
    </div>
  );
}
