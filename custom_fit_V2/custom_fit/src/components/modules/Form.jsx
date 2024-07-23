import React from 'react';
import { Link } from 'react-router-dom';

const Form = ({ onClose }) => {
    return (
        <div id='oscure'>
            <form>
                <div className="form-row">
                    <button type="button" className='fa-solid fa-x btn btn-outline-primaryX' onClick={onClose}></button>
                    <div className="mydict">
                        <div>
                            <label>
                                <input type="radio" name="radio" />
                                <span>Inicio</span>
                            </label>
                            <label>
                                <input type="radio" name="radio" />
                                <span>Registro</span>
                            </label>
                        </div>
                    </div>
                    <h1>Registrate</h1>
                    <div className='form-con'>
                        <div className="form-group col-md-6" id='input1'>
                            <input type="text" name="" id="" placeholder="Primer Nombre" />
                            <input type="text" name="" id="" placeholder="Segundo Nombre" />
                        </div>
                        <div className="form-group col-md-6" id='input1'>
                            <input type="text" name="" id="" placeholder="Primer Apellido" />
                            <input type="text" name="" id="" placeholder="Segundo Apellido" />
                        </div>
                        <div className="form-group col-md-6" id='input2'>
                            <input type="text" name="" id="" placeholder="Nombre De Usuario" />
                            <input type="text" name="" id="" placeholder="Direccion" />
                        </div>
                        <div className="form-group col-md-6" id='input1'>
                            <input type="email" name="" id="" placeholder="Numero De Celular" />
                            <input type="password" name="" id="" placeholder="Avatar" />
                        </div>
                        <div className="form-group col-md-6" id='input1'>
                            <input type="email" name="" id="" placeholder="Correo Electronico" />
                            <input type="password" name="" id="" placeholder="Contraseña" />
                        </div>
                        <button type='submit' className='btn btn-outline-primary1'>Registrar</button>
                        <div className="fondo">
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Form;
