import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext';

/**
 * Componente de protección de rutas según autenticación y rol del usuario.
 * 
 * @param {Array} roles - Lista de roles permitidos (ej: ['administrador'])
 * @param {JSX.Element} children - Componente hijo protegido
 */
const ProtectedRoute = ({ roles = [], children }) => {
  const { user, isAuthenticated } = useAuth();

  // Si no hay usuario autenticado → redirigir al login
  if (!isAuthenticated || !user) {
    console.warn('🔒 Usuario no autenticado. Redirigiendo a /Iniciar');
    return <Navigate to="/Iniciar" replace />;
  }

  // Si el rol del usuario no está permitido → redirigir a su home correspondiente
  if (roles.length > 0 && !roles.includes(user.rol)) {
    console.warn(`🚫 Acceso denegado. Rol actual: ${user.rol}`);

    switch (user.rol) {
      case 'usuario':
        return <Navigate to="/Home_L" replace />;
      case 'proveedor':
        return <Navigate to="/Prove" replace />;
      case 'domiciliario':
        return <Navigate to="/home_domiciliario" replace />;
      case 'administrador':
        return <Navigate to="/Admin" replace />;
      default:
        return <Navigate to="/Home" replace />;
    }
  }

  // ✅ Si pasa todas las validaciones, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
