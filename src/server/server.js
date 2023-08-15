const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const accountController = require('./controllers/accountController');
const cookieController = require('./controllers/cookieController');
const apiController = require('./controllers/apiController');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv').config();
// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'spotify-dating-app',
    });
    console.log('MongoDB connected!');
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error);
  }
};
connectDB();

// Set up CORS options to allow passing through cookies to the client server
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//TEST
app.get('/testingroutes', (req, res) => {
  res.status(200).json('success');
});

// get all matches for particular user
app.get('/api/getMatches', accountController.getMatches, (req, res) => {
  res.status(200).json(res.locals.allMatches);
});

// Spotify API
app.get('/api/callback', apiController.accessAccount, (req, res) => {
  res.status(200).redirect('http://localhost:3000/signupform');
});

app.get(
  '/api/spotify/getAccessToken',
  apiController.getAccessToken,
  (req, res) => {
    res.status(200).json(res.locals.authorizeURL);
  }
);

app.get(
  '/api/topartists',
  apiController.getTopTenArtists,
  apiController.accessRefresh,
  apiController.getUserData,
  (req, res) => {
    res.status(200).json({
      topArtists: res.locals.topArtists,
      userData: res.locals.userData,
    });
  }
);

app.post(
  '/api/follow',
  apiController.accessRefresh,
  apiController.followUser,
  (req, res) => {
    res.status(200).json('followed heyianhey');
  }
);

// route and handler of sign up
app.post(
  '/api/signup',
  accountController.createAccount,
  accountController.verifyUser,
  cookieController.setCookies,
  (req, res) => {
    res
      .status(200)
      .json({ created_status: res.locals.account_creation, login: 'did it' });
  }
);

// aroute and handler of logging in
app.post(
  '/api/login',
  accountController.verifyUser,
  cookieController.setCookies,
  (req, res) => {
    res.status(200).json('logged in');
  }
);

// Global error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server on port 8000

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server has started on ${process.env.SERVER_PORT}`);
});

module.exports = app;
