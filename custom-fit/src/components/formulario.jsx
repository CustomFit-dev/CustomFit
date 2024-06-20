import React from 'react';
import Sec1 from './sec1';
import {BrowserRouter,Routes ,Route ,Link} from 'react-router-dom';
const form = () => {
    return(
        <form>
        <div className="form-row">
        
        <Link className='btn btn-outline-primary' to="/cerrar"></Link>
        <div className="form-group col-md-6" id='input1'>
                <input type="text" name="" id="" placeholder="Primer Nombre"/>
                <input type="text" name="" id="" placeholder="Segundo Nombre"/>
        </div>
        <div className="form-group col-md-6" id='input1'>
                <input type="text" name="" id="" placeholder="Primer Apellido"/>
                <input type="text" name="" id="" placeholder="Segundo Apellido"/>
        </div>
        <div className="form-group col-md-6" id='input1'>
                <input type="text" name="" id="" placeholder="Nombre De Asuario"/>
                <input type="text" name="" id="" placeholder="Direccion"/>
        </div>
        <div className="form-group col-md-6" id='input1'>
                <input type="email" name="" id="" placeholder="Numero De Celular"/>
                <input type="password" name="" id="" placeholder="Avater"/>
        </div>
        <div className="form-group col-md-6" id='input1'>
                <input type="email" name="" id="" placeholder="Correo Electronico"/>
                <input type="password" name="" id="" placeholder="Contraseña"/>
        </div>

    </div>
    

    <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
    )




}

export default form;