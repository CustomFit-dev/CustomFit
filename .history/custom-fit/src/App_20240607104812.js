import React,{ Fragment } from "react";
import Header from "./components/header.jsx"

function App() {
  return (
    <Fragment>

    <Header />
    <Fragment>
      <Header />
      <section className='sec1'>
      <div className='left-color'></div>
      <div className='right-color'></div>
        <div className='container'>
          <h1>Hola</h1>
        </div>
      </section>
    </Fragment>
    
    </Fragment>

  );
}

export default App;
