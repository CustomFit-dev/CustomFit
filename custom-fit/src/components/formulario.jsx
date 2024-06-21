import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Form = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost/custom-back/api.php');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                console.log('Datos obtenidos:', data);
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id='oscure'>
            <form>
                <div className="form-row">
                    <Link className='fa-solid fa-x btn btn-outline-primaryX' to="/"></Link>
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
                            <input type="text" name="" id="" placeholder="Nombre De Asuario" />
                            <input type="text" name="" id="" placeholder="Direccion" />
                        </div>
                        <div className="form-group col-md-6" id='input1'>
                            <input type="email" name="" id="" placeholder="Numero De Celular" />
                            <input type="password" name="" id="" placeholder="Avater" />
                        </div>
                        <div className="form-group col-md-6" id='input1'>
                            <input type="email" name="" id="" placeholder="Correo Electronico" />
                            <input type="password" name="" id="" placeholder="Contraseña" />
                        </div>

                        <div className='redes'>
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
