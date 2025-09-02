import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nit_cedula) newErrors.nit_cedula = "Este campo es obligatorio.";
    if (!formData.direccion) newErrors.direccion = "Este campo es obligatorio.";
    if (!formData.nombre_empresa) newErrors.nombre_empresa = "Este campo es obligatorio.";
    if (!formData.descripcion_empresa) newErrors.descripcion_empresa = "Este campo es obligatorio.";

    if (!formData.anios_experiencia) {
      newErrors.anios_experiencia = "Este campo es obligatorio.";
    } else if (
      isNaN(formData.anios_experiencia) ||
      Number(formData.anios_experiencia) < 0
    ) {
      newErrors.anios_experiencia = "Debe ser un número válido mayor o igual a 0.";
    }

    if (!formData.aceptarTerminos) {
      newErrors.aceptarTerminos = "Debes aceptar los términos y condiciones.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Formulario incompleto",
        text: "Por favor, completa todos los campos requeridos correctamente.",
        confirmButtonColor: "#d33",
      });

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

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await axios.post(
        "http://localhost:8000/api/proveedorsolicitudes/",
        {
          nit_cedula: formData.nit_cedula,
          direccion: formData.direccion,
          nombre_empresa: formData.nombre_empresa,
          descripcion_empresa: formData.descripcion_empresa,
          anios_experiencia: Number(formData.anios_experiencia),
        },
        {
          headers: {
            Authorization: `Token ${authToken}`, // Aquí cambié Bearer por Token
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Solicitud enviada",
        text: "Tu solicitud fue enviada correctamente.",
        confirmButtonColor: "#3085d6",
      });

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

      if (error.response && error.response.data) {
        // Mostrar errores específicos de backend si los hay
        const backendErrors = error.response.data;
        const newErrors = {};

        for (const key in backendErrors) {
          newErrors[key] = backendErrors[key].join(" ");
        }

        setErrors(newErrors);

        Swal.fire({
          icon: "error",
          title: "Error de validación",
          text: "Revisa los campos del formulario.",
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error de envío",
          text: "No se pudo enviar la solicitud. Inténtalo más tarde.",
          confirmButtonColor: "#d33",
        });
      }
    } finally {
      setIsSubmitting(false);
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

        <form className="proveedor-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nit_cedula">NIT o Cédula:</label>
            <input
              id="nit_cedula"
              type="text"
              name="nit_cedula"
              value={formData.nit_cedula}
              onChange={handleChange}
              className={errors.nit_cedula ? "input-error" : ""}
            />
            {errors.nit_cedula && <small className="error-text">{errors.nit_cedula}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input
              id="direccion"
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={errors.direccion ? "input-error" : ""}
            />
            {errors.direccion && <small className="error-text">{errors.direccion}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="nombre_empresa">Nombre de Empresa:</label>
            <input
              id="nombre_empresa"
              type="text"
              name="nombre_empresa"
              value={formData.nombre_empresa}
              onChange={handleChange}
              className={errors.nombre_empresa ? "input-error" : ""}
            />
            {errors.nombre_empresa && <small className="error-text">{errors.nombre_empresa}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion_empresa">Descripción de la Empresa:</label>
            <textarea
              id="descripcion_empresa"
              name="descripcion_empresa"
              value={formData.descripcion_empresa}
              onChange={handleChange}
              className={errors.descripcion_empresa ? "input-error" : ""}
            />
            {errors.descripcion_empresa && <small className="error-text">{errors.descripcion_empresa}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="anios_experiencia">Años de Experiencia:</label>
            <input
              id="anios_experiencia"
              type="number"
              name="anios_experiencia"
              value={formData.anios_experiencia}
              onChange={handleChange}
              className={errors.anios_experiencia ? "input-error" : ""}
              min="0"
            />
            {errors.anios_experiencia && <small className="error-text">{errors.anios_experiencia}</small>}
          </div>

          <div
            className={`checkbox-group ${
              errors.aceptarTerminos ? "checkbox-error" : ""
            }`}
          >
            <input
              type="checkbox"
              id="aceptarTerminos"
              name="aceptarTerminos"
              checked={formData.aceptarTerminos}
              onChange={handleChange}
            />
            <label htmlFor="aceptarTerminos">
              Acepto los <a href="#">términos y condiciones</a>
            </label>
            {errors.aceptarTerminos && <small className="error-text">{errors.aceptarTerminos}</small>}
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioProveedor;
