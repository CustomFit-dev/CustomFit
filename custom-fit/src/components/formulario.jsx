import React from 'react';
import Sec1 from './sec1';
import {BrowserRouter,Routes ,Route ,Link} from 'react-router-dom';
const form = () => {
    return(
       <div className='form'>
            <Link className='btn btn-outline-primary' to="/cerrar"></Link>

        <div className='container'>
        <h1>Desde </h1>
        </div>
    

        </div> 
    )




}

export default form;