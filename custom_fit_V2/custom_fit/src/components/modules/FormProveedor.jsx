import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../scss/ProveedorForm.scss";
import { useAuth } from "../modules/authcontext";

const FormularioProveedor = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nit_cedula: "",
    direccion: "",
    nombre_empresa: "",
    descripcion_empresa: "",
    anios_experiencia: "",
    aceptarTerminos: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nit_cedula) newErrors.nit_cedula = true;
    if (!formData.direccion) newErrors.direccion = true;
    if (!formData.nombre_empresa) newErrors.nombre_empresa = true;
    if (!formData.descripcion_empresa) newErrors.descripcion_empresa = true;

    if (!formData.anios_experiencia) {
      newErrors.anios_experiencia = true;
    } else if (
      isNaN(formData.anios_experiencia) ||
      formData.anios_experiencia < 0
    ) {
      newErrors.anios_experiencia = true;
    }

    if (!formData.aceptarTerminos) {
      newErrors.aceptarTerminos = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => setErrors({}), 5000);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post(
          "http://localhost:8000/api/proveedorsolicitudes/",
          {
            nit_cedula: formData.nit_cedula,
            direccion: formData.direccion,
            nombre_empresa: formData.nombre_empresa,
            descripcion_empresa: formData.descripcion_empresa,
            anios_experiencia: formData.anios_experiencia,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        alert("Solicitud enviada correctamente");
        setFormData({
          nit_cedula: "",
          direccion: "",
          nombre_empresa: "",
          descripcion_empresa: "",
          anios_experiencia: "",
          aceptarTerminos: false,
        });
        setErrors({});
      } catch (error) {
        console.error("Error al enviar solicitud:", error);
        alert("Error al enviar la solicitud");
      }
    }
  };

  return (
    <div className="proveedor-container">
      <div className="form-wrapper">
        <button
          className="exit-x"
          onClick={() => navigate("/home_l")}
          aria-label="Salir"
          type="button"
        >
          &times;
        </button>
        <h1 className="form-title">Solicitud de Proveedor</h1>

        <form className="proveedor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>NIT o Cédula:</label>
            <input
              type="text"
              name="nit_cedula"
              value={formData.nit_cedula}
              onChange={handleChange}
              className={errors.nit_cedula ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={errors.direccion ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label>Nombre de Empresa:</label>
            <input
              type="text"
              name="nombre_empresa"
              value={formData.nombre_empresa}
              onChange={handleChange}
              className={errors.nombre_empresa ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label>Descripción de la Empresa:</label>
            <textarea
              name="descripcion_empresa"
              value={formData.descripcion_empresa}
              onChange={handleChange}
              className={errors.descripcion_empresa ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label>Años de Experiencia:</label>
            <input
              type="number"
              name="anios_experiencia"
              value={formData.anios_experiencia}
              onChange={handleChange}
              className={errors.anios_experiencia ? "input-error" : ""}
            />
          </div>

          <div
            className={`checkbox-group ${
              errors.aceptarTerminos ? "checkbox-error" : ""
            }`}
          >
            <input
              type="checkbox"
              name="aceptarTerminos"
              checked={formData.aceptarTerminos}
              onChange={handleChange}
            />
            <label>
              Acepto los <a href="#">términos y condiciones</a>
            </label>
          </div>

          <button type="submit" className="submit-button">
            Enviar Solicitud
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioProveedor;
