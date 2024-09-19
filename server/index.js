// // Import the necessary modules
const express = require('express');
const cors = require('cors');
const { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, GlobalSignOutCommand } = require('@aws-sdk/client-cognito-identity-provider');
const bodyParser = require('body-parser');
const verifyToken = require('./middlewares/auth');


const app = express();

// Enable CORS
app.use(cors());

// Enable body parsing for JSON requests
app.use(bodyParser.json());

// Set up Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
  region: 'us-west-1', // Example: 'us-east-1'
});

const CLIENT_ID = '3l3so8gqj0bv1b02rl8shi0ghl'; // Replace with your Cognito App Client ID

// Register Route //////////////////////////////////////////////////////////////////////////
// This endpoint takes the user’s information and registers them in Cognito.
app.post('/register', async (req, res) => {
  // Ensure the incoming request has the correct body structure
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Missing username, password, or email' });
  }

  const params = {
    ClientId: CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
    ],
  };

  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    res.status(200).json({
      message: 'User registration successful',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// Confirmation Route //////////////////////////////////////////////////////////////////////////
const { ConfirmSignUpCommand } = require('@aws-sdk/client-cognito-identity-provider');

app.post('/confirm', async (req, res) => {
  const { username, code } = req.body;

  if (!username || !code) {
    return res.status(400).json({ message: 'Username and confirmation code are required' });
  }

  const params = {
    ClientId: CLIENT_ID, // Your Cognito App Client ID
    Username: username,
    ConfirmationCode: code,
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    const response = await cognitoClient.send(command);
    res.status(200).json({
      message: 'User confirmed successfully',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error confirming user',
      error: error.message,
    });
  }
});

// Login Route //////////////////////////////////////////////////////////////////////////
// This endpoint takes the user’s information and registers them in Cognito.
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH', // Cognito's authentication flow
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);

    res.status(200).json({
      message: 'Login successful',
      idToken: response.AuthenticationResult.IdToken,
      accessToken: response.AuthenticationResult.AccessToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

// Sign-out route //////////////////////////////////////////////////////////////////////////
app.post('/signout', async (req, res) => {
  const { accessToken } = req.body; // Access token passed from client

  if (!accessToken) {
    return res.status(400).json({ message: 'Access token is required' });
  }

  try {
    const command = new GlobalSignOutCommand({
      AccessToken: accessToken,
    });

    // Sign out user by invalidating the access token
    await cognitoClient.send(command);

    res.status(200).json({ message: 'Successfully signed out' });
  } catch (error) {
    res.status(500).json({
      message: 'Error signing out',
      error: error.message,
    });
  }
});

// Start the server //////////////////////////////////////////////////////////////////////////
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
