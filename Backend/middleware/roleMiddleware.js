// middleware/roleMiddleware.js

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // Check if user is authenticated and role is present
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: 'Unauthorized: No user role found' });
    }

    // Check if the user's role is in the allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }

    // If allowed, continue to next middleware/controller
    next();
  };
};
