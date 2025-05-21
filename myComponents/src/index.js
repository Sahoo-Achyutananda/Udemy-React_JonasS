import ReactDom from "react-dom/client";
import React, { useEffect } from "react";

import { useRef } from "react";

import "./index.css";

// creating a component
function App() {
  return (
    <>
      {/* <ScrollToComponent /> */}
      <BasicStructure />
    </>
  );
}

function BasicStructure() {
  // i want to jump from section to section but i dont want to re render the entire page
  // i used useRef to select the DOM elements
  const section_1 = useRef(null);
  const section_2 = useRef(null);
  const section_3 = useRef(null);

  const sections = [section_1, section_2, section_3];

  return (
    <>
      <Nav
        items={["About", "Details", "More Info", "Contact", "Location"]}
        refs={sections}
      />
      <Section
        height={500}
        backgroundColor={"rebeccapurple"}
        color={"white"}
        reference={section_1}
      >
        This is Section 1 : About
      </Section>
      <Section
        height={500}
        backgroundColor={"darkgreen"}
        color={"white"}
        reference={section_2}
      >
        This is Section 2 : Details
      </Section>
      <Section
        height={500}
        backgroundColor={"maroon"}
        color={"white"}
        reference={section_3}
      >
        This is Section 3 : More Info
      </Section>
    </>
  );
}

function Nav({ items, refs }) {
  return (
    <div className="nav">
      {items.map((item, i) => (
        <NavItem
          onClick={() =>
            refs[i].current?.scrollIntoView({ behaviour: "smooth" })
          }
        >
          {item}
        </NavItem>
      ))}
    </div>
  );
}
function NavItem({ children, onClick }) {
  return (
    <div className="nav-item" onClick={onClick}>
      {children}
    </div>
  );
}

function Section({ height, backgroundColor, color, reference, children }) {
  return (
    <section
      ref={reference}
      className="section"
      style={{
        height: `${height}px`,
        backgroundColor: backgroundColor,
        color: color,
      }}
    >
      {children}
    </section>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
