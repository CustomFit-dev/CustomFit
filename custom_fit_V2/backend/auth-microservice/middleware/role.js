const authorizeRole = (requiredRoleId) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    if (req.user.rol_id !== requiredRoleId) {
      return res.status(403).json({ error: 'No tienes permisos para acceder a este recurso' });
    }

    next();
  };
};

module.exports = authorizeRole;
