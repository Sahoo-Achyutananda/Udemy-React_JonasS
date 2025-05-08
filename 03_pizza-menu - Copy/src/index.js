// This has to be called "index.js" . The src folder had a lot of files which i deleted

import React from "react";
import ReactDom from "react-dom/client";

import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

// creating a component
function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
function Menu() {
  const pizzas = pizzaData;
  const pizzaLength = pizzas.length;

  //   return (
  //     pizzaLength && (
  //       <ul className="menu">
  //         {pizzaData.map((pizza) => {
  //           return <Pizza data={pizza} key={pizza.name} />;
  //         })}
  //       </ul>
  //     )
  //   );

  return pizzaLength > 0 ? (
    <ul className="menu">
      {pizzaData.map((pizza) => {
        return <Pizza data={pizza} key={pizza.name} />;
      })}
    </ul>
  ) : (
    <div>
      <h2>We do not have any pizza today !</h2>
    </div>
  );
}

function Pizza(props) {
  return (
    <li className={`pizza ${props.data.soldOut ? "sold-out" : ""}`}>
      <img src={props.data.photoName} alt={props.data.name} />
      <div>
        <h3>{props.data.name}</h3>
        <p>{props.data.ingredients}</p>
        <span>{props.data.soldOut ? "SOLD OUT" : props.data.price}</span>
      </div>
    </li>
  );
}

function Header() {
  const style = {};
  //   const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  return (
    <header className="header footer">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Footer() {
  //   return React.createElement("footer", null, "we're a great company");

  const hour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;

  const isOpen = hour >= openHour && hour <= closeHour;

  //   if (hour >= openHour && hour <= closeHour) alert("We're cyrrently open!");
  //   else alert("Sorry.. We're closed");

  //   return isOpen ? (
  //     <footer>We are currently open</footer>
  //   ) : (
  //     <footer>We are currently closed</footer>
  //   );

  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>{`We are open. Come visit us or Order Online`}</p>
          <button className="btn">Order Now</button>
        </div>
      ) : (
        <p>
          `We're currently closed. We open between {openHour}:00 and {closeHour}
          :00`
        </p>
      )}
    </footer>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
