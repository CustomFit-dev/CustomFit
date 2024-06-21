import React from 'react';
import Sec1 from './sec1';
import {BrowserRouter,Routes ,Route ,Link} from 'react-router-dom';
const form = () => {
        return(
        <form>     
        <div className="form-row">
        <Link className='fa-solid fa-x btn btn-outline-primaryX' to="/cerrar"></Link>
        <div class="mydict">
	<div>
		<label>
			<input type="radio" name="radio"/>
			<span>Inicio</span>
		</label>
		<label>
			<input type="radio" name="radio"/>
			<span>Registro</span>
		</label>
		
	</div>
</div>
        <h1>Registrate</h1>
        <div className="form-group col-md-6" id='input1'>
                <input type="text" name="" id="" placeholder="Primer Nombre"/>
                <input type="text" name="" id="" placeholder="Segundo Nombre"/>
        </div>
        <div className="form-group col-md-6" id='input1'>
                <input type="text" name="" id="" placeholder="Primer Apellido"/>
                <input type="text" name="" id="" placeholder="Segundo Apellido"/>
        </div>
        <div className="form-group col-md-6" id='input2'>
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
        <div className='redes'>
        </div>
        
        <button type='submit' className='btn btn-outline-primary1'>Registrar</button>
        <div className="fondo">
        </div>
        
        </div>

        
        </form>
)




}

export default form;