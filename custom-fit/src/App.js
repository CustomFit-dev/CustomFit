import React,{ Fragment } from "react";
import Header from "./components/header.jsx";
import Section from "./components/sec1.jsx";
import Section2 from "./components/sec2.jsx";
import Section3 from "./components/sec3.jsx";
import Foot from "./components/footer.jsx";
function App() {
  return (
    <Fragment>
      <header>
      <Header />
      </header>
      <div className="main-content">
      <Section />
      <Section2 />
      <Section3 />
      </div>
      <footer>
      <Foot /> 
      </footer>
    </Fragment>
  );
}

export default App;
