// This has to be called "index.js" . The src folder had a lot of files which i deleted

import React from "react";
import ReactDom from "react-dom/client";
import { useState } from "react";

import "./index.css";
import { Form } from "./Form";
import { Logo } from "./Logo";
import { Items } from "./Items";
import { Summary } from "./Summary";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Shirts", quantity: 6, packed: true },
//   { id: 4, description: "Pants", quantity: 6, packed: false },
// ];

function App() {
  const [items, setItems] = useState([]); // when we open the App for the first time, there wont be any items

  function handleAddItems(item) {
    // 🔴🔴 setItems(items => items.push(item)) // WE ALWAYS WANT IMMUTABILITY - THEREFORE WE CANNOT USE PUSH .. WE USE IMMUTABLE ARRAYS - WE DO IT ALL THE TIME
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(item) {
    // setItems(
    //   items.filter((i) => {
    //     return i.id === item.id ? null : i; // WRONG :::: BECAUSE FILTER EXPECTS A BOOLEAN
    //   })
    // );
    setItems((items) => items.filter((i) => i.id !== item.id));
  }

  function handleToggleItem(item) {
    // setItems();
    // items.filter((i) => {
    //   return i.id === item.id ? { ...item, packed: true } : i; // WRONG : YOU HAVE TO USE MAP - YOU'RE MISUSING FILTER - YOU'LL LEARN WITH TIME, DONT WORRY
    // })
    setItems((items) =>
      items.map((i) => (i.id === item.id ? { ...i, packed: !i.packed } : i))
    );
  }

  function handleClearItems() {
    const approve = window.confirm("Are you sure to Clear all Items");
    if (approve) {
      setItems([]);
    }
  }

  return (
    <div className="container">
      <div className="header"></div>
      <Logo name={"🏝️TRAVEL LIST🎒"} />
      <Form items={items} onAddItems={handleAddItems} />
      <Items
        items={items}
        onDeleteItems={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Summary items={items} />
      <div className="footer"></div>
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
