const jwt = require('jsonwebtoken');
require('dotenv').config(); // If you're using an environment variable for the secret key

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Get the token from the Authorization header
  
  // Check if token is missing
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach decoded user data to request object
    req.user = decoded;
    next();
  });
}

// Middleware to check if the user has the required role
function authorizeRole(roles) {
  return (req, res, next) => {
    // Check if the user has a valid role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
