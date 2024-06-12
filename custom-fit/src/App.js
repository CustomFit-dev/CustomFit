import React,{ Fragment } from "react";
import Header from "./components/header.jsx";
import Section from "./components/sec1.jsx";
import Section2 from "./components/sec2.jsx";

function App() {
  return (
    <Fragment>
      <header>
      <Header />
      </header>
      <Section />
      <Section2 />
    </Fragment>
  );
}

export default App;
