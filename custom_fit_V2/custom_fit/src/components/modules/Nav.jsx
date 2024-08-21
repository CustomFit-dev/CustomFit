import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Form_R from './Registrar';
import Form_I from './Iniciar';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="mydict">
      <label>
        <input
          type="radio"
          name="radio"
          checked={activeSection === 'inicio'}
          onChange={() => handleNavigate('inicio')}
        />
        <span>
          <Link to="/Iniciar" onClick={() => handleNavigate('inicio')}>
            Inicio
          </Link>
        </span>
      </label>
      <label>
        <input
          type="radio"
          name="radio"
          checked={activeSection === 'registro'}
          onChange={() => handleNavigate('registro')}
        />
        <span>
          <Link to="/Registro" onClick={() => handleNavigate('registro')}>
            Registro
          </Link>
        </span>
      </label>
    </div>
  );
};

export default Navigation;
