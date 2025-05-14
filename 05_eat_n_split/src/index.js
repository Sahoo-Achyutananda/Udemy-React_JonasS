// This has to be called "index.js" . The src folder had a lot of files which i deleted

import React from "react";
import ReactDom from "react-dom/client";

import { useState } from "react";

import "./index.css";
import "./index_right.css";

const bestFriends = [
  {
    id: 1,
    name: "Clarke",
    image_url: `https://avatar.iran.liara.run/public/1`,
    amount: 0,
  },
  {
    id: 2,
    name: "Sarah",
    image_url: `https://avatar.iran.liara.run/public/2`,
    amount: -1,
  },
  {
    id: 3,
    name: "Anthony",
    image_url: `https://avatar.iran.liara.run/public/3`,
    amount: 20,
  },
];

function App() {
  return (
    <>
      <Logo title="Eat  n  Split" />
      <Container />
      {/* <Footer /> */}
    </>
  );
}

function Logo({ title }) {
  return <div className="logo">{title}</div>;
}

function Footer() {
  return <div className="footer"></div>;
}

function Container() {
  const [items, setItems] = useState(bestFriends);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [select, setSelect] = useState("user");

  function resetAll() {
    setBill("");
    setFriendExpense("");
    setUserExpense("");
    setSelect("user");
  }

  // const [selected, setSelected] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const [toggle, setToggle] = useState(true);

  function handleName(value) {
    setName(value);
  }

  const [formOpen, setFormOpen] = useState(false);

  function handleSelectedItem(item) {
    resetAll();
    if (selectedItem.id === item.id) setSelectedItem({});
    else setSelectedItem(item);
  }

  function handleAddNew() {
    const avatarId = Math.floor(Math.random() * 100);
    const newAvatar = `https://avatar.iran.liara.run/public/${avatarId}`;

    setToggle(!toggle);
    setId(Date.now());
    setAvatar(newAvatar);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newFriend = {
      id: id,
      name: name,
      image_url: avatar,
      amount: 0,
    };

    const updatedList = [...items, newFriend];

    setItems(updatedList);

    setName("");
    setAvatar("");

    setToggle(!toggle);
  }

  return (
    <div className="container">
      <div className="left-container">
        {items.map((x) => {
          return (
            <Friend
              item={x}
              selectedItem={selectedItem}
              formOpen={formOpen}
              setFormOpen={setFormOpen}
              onSelectedItem={handleSelectedItem}
            />
          );
        })}
        <div className={toggle ? "add-friend-div" : "div-close"}>
          <button className="add-friend" onClick={() => handleAddNew()}>
            Add Friend
          </button>
        </div>
        <div className={!toggle ? "new-friend-form" : "div-close"}>
          <form id="new-friend-form">
            <div className="label_inp">
              <label htmlFor="friend-input">👀Enter Name : </label>
              <input
                id="friend-input"
                type="text"
                value={name}
                onChange={(e) => handleName(e.target.value)}
              ></input>
            </div>
            <div className="label_inp">
              <label htmlFor="image-input">🔗Avatar URL :</label>
              <input id="image-input" type="text" value={avatar}></input>
            </div>
            <button onClick={(e) => handleSubmit(e)}>Add</button>
          </form>
          <button className="close_btn" onClick={() => setToggle(!toggle)}>
            Close
          </button>
        </div>
      </div>
      <div className="right-container">
        <MainForm
          item={selectedItem}
          items={items}
          setItems={setItems}
          bill={bill}
          select={select}
          userExpense={userExpense}
          friendExpense={friendExpense}
          setBill={setBill}
          setFriendExpense={setFriendExpense}
          setUserExpense={setUserExpense}
          setSelect={setSelect}
          resetAll={resetAll}
          setSelectedItem={setSelectedItem}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
        />
      </div>
    </div>
  );
}

function Friend({ item, selectedItem, onSelectedItem, formOpen, setFormOpen }) {
  // const [amt, setAmt] = useState(0);

  return (
    <div className={selectedItem.id === item.id ? "friend-selected" : "friend"}>
      <img src={item.image_url} alt="Avatar" />
      <div className="details">
        <span style={{ fontWeight: "bolder" }}>{item.name}</span>
        <span
          style={
            item.amount === 0
              ? { color: "grey" }
              : item.amount > 0
              ? { color: "green" }
              : { color: "red" }
          }
        >
          {item.amount === 0
            ? `You and ${item.name} are even`
            : item.amount > 0
            ? `${item.name} owes you ${item.amount}$`
            : `You owe ${item.name} ${item.amount * -1}$`}
        </span>
      </div>
      <button className="select-btn" onClick={() => onSelectedItem(item)}>
        {selectedItem.id === item.id ? "Close" : "Select"}
      </button>
    </div>
  );
}

function MainForm({
  item,
  items,
  setItems,
  bill,
  setBill,
  userExpense,
  setUserExpense,
  friendExpense,
  setFriendExpense,
  select,
  setSelect,
  resetAll,
  setSelectedItem,
  formOpen,
  setFormOpen,
}) {
  function autoCalculateandFillFriend(value) {
    setUserExpense(value);
    if (bill !== "") {
      const b = Number(bill);
      const userVal = Number(value);
      const friendVal = b - userVal;
      setFriendExpense(
        userVal <= b ? (friendVal >= 0 ? friendVal : "") : resetAll()
      );
    }
  }

  function handleSplitBill(e) {
    e.preventDefault();

    let updatedAmount;
    if (select === "user") {
      updatedAmount = item.amount + Number(friendExpense);
    } else if (select === "friend") {
      updatedAmount = item.amount - Number(userExpense);
    }

    const updatedList = [...items].slice().map((x) => {
      if (x.id === item.id) {
        x.amount = updatedAmount;
      }
      return x;
    });

    // console.log(updatedList);
    setItems(updatedList);
    resetAll();
  }

  return (
    <div className={item.id ? "main-form" : "div-close"}>
      <h2>SPLIT A BILL WITH {item.name}</h2>
      <form id="main-form" onSubmit={(e) => handleSplitBill(e)}>
        <div>
          <label>💰 Bill Value</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
        </div>
        <div>
          <label>🕴️ Your Expense</label>
          <input
            type="number"
            value={userExpense}
            onChange={(e) => autoCalculateandFillFriend(e.target.value)}
          />
        </div>
        <div>
          <label>🧑‍🤝‍🧑 Friend's Expense</label>
          <input
            type="number"
            value={friendExpense}
            disabled="true"
            // onChange={(e) => autoCalculateandFillUser(e.target.value)
            // }
          />
        </div>
        <div>
          <label>🤑 Who is paying the bill</label>
          <select value={select} onChange={(e) => setSelect(e.target.value)}>
            <option value="user" key="user">
              You
            </option>
            <option value="friend" key="friend">
              {item.name}
            </option>
          </select>
        </div>
        <div className="split-btn">
          <button>Split Bill</button>
        </div>
      </form>
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
