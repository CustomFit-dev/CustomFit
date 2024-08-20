import React, { useState } from 'react';
import Form_R from './Registrar';
import Form_I from './Iniciar';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  const handleNavigate = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="mydict">
      <div>
        <label>
          <input
            type="radio"
            name="radio"
            checked={activeSection === 'inicio'}
            onChange={() => handleNavigate('inicio')}
          />
          <span>
            <a href="#inicio" onClick={() => handleNavigate('inicio')}>
              Inicio
            </a>
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
            <a href="#registro" onClick={() => handleNavigate('registro')}>
              Registro
            </a>
          </span>
        </label>
      </div>
      <div className="form-container">
        {activeSection === 'inicio' && <Form_I />}
        {activeSection === 'registro' && <Form_R />}
      </div>
    </div>
  );
};

export default Navigation;
