import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <Link to="/Iniciar">
        <span
          className={activeSection === 'inicio' ? 'active' : ''}
          onClick={() => handleNavigate('inicio')}
        >Inicio</span>
          </Link>
 
      </label>
      <label>
        <input
          type="radio"
          name="radio"
          checked={activeSection === 'registro'}
          onChange={() => handleNavigate('registro')}
        />
          <Link to="/Registro">
          <span
          className={activeSection === 'registro' ? 'active' : ''}
          onClick={() => handleNavigate('registro')}
        >Registro</span>
          </Link>

      </label>
    </div>
  );
};

export default Navigation;
