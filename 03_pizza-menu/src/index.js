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
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <Pizza
        name="Pizza Spinaci"
        incredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/funghi.jpg"
        price={10} // recommned to use it as a number - {10}
      />
      <Pizza
        name="Pizza Funghi"
        incredients="Tomato, mozarella, mushrooms, and onion"
        photoName="pizzas/spinaci.jpg"
        price={12}
      />
      <Pizza />
      <Pizza />
    </div>
  );
}

function Pizza(props) {
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.incredients}</p>
    </div>
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
  const openHour = 12;
  const closeHour = 22;

  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);

  //   if (hour >= openHour && hour <= closeHour) alert("We're cyrrently open!");
  //   else alert("Sorry.. We're closed");

  return (
    <footer>{new Date().toLocaleTimeString()}. We are currently open</footer>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
