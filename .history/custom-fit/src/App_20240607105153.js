import React,{ Fragment } from "react";
import Header from "./components/header.jsx"

function App() {
  return (
    <Fragment>

    <Header />
    <Fragment>
      <Header />
      <section className='split-section'>
        <div className='left-color'></div>
        <div className='right-color'>
          <div className='container'>
            <h1>Hola</h1>
          </div>
        </div>
      </section>
    </Fragment>
    
    </Fragment>

  );
}

export default App;
