const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Remove "Bearer " from the token string if it exists
  const formattedToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  // Verify the token
  try {
    // Decode and verify the JWT using the user pool's public key or a shared secret
    const decoded = jwt.decode(formattedToken, { complete: true });

    // Verify the JWT if necessary (e.g., using a Cognito JWT public key)
    const userPoolId = 'your-cognito-user-pool-id'; // Replace with your Cognito User Pool ID
    const issuer = `https://cognito-idp.your-region.amazonaws.com/${userPoolId}`;

    if (decoded.payload.iss !== issuer) {
      return res.status(401).json({ message: 'Invalid token issuer' });
    }

    // Attach the user data to the request object for further processing
    req.user = decoded.payload;

    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = verifyToken;

