import React, { useState } from "react";
import { Item } from "./Item";

export function Items({ items, onDeleteItems, onToggleItems, onClearItems }) {
  const [sortBy, setSortBy] = useState("items");

  let sortedItems;

  if (sortBy === "items") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) =>
        a.description.toLowerCase().localeCompare(b.description.toLowerCase())
      );
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div id="items-section">
      <ul id="main-list" style={{ marginTop: "30px" }}>
        {sortedItems.map((item) => {
          return (
            <Item
              item={item}
              onDeleteItems={onDeleteItems}
              onToggleItems={onToggleItems}
              key={item.id}
            />
          );
        })}
      </ul>
      <div style={{ marginTop: "30px" }}>
        <select
          class="sort-by"
          id="select-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="items">Sort by Items</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed</option>
        </select>
        <button id="clear-items" onClick={() => onClearItems()}>
          Clear List
        </button>
      </div>
    </div>
  );
}
