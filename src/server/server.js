const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const accountController = require('./controllers/accountController');
const cookieController = require('./controllers/cookieController');
const apiController = require('./controllers/apiController')
// Connect to MongoDB
mongoose.connect(
    //paste your mongoDB Atlas key here- CHANGE THIS
  'mongodb+srv://matthew0505:u3F0swd1EWxpmonV@yeti-music.wpwzonm.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'spotify-dating-app',
  }
);

// Set up CORS options to allow passing through cookies to the client server
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// get all matches for particular user
app.get('/api/getMatches', accountController.getMatches, (req, res) => {
  res.status(200).json(res.locals.allMatches);
});

// change gender
app.patch('/api/changeGender', accountController.changeGender, (req, res) => {
  res.status(200).json('success');
});

// change gender preference
app.patch(
  '/api/changeGenderPreferences',
  accountController.changeGenderPreferences,
  (req, res) => {
    res.status(200).json('success');
  }
);

// Spotify API
app.get('/api/login', 
  apiController.accessAccount,
  (req, res) => {
    res.status(200).json('logged in');
  })
// route and handler of sign up
app.post('/api/signup', accountController.createAccount, (req, res) => {
  res.status(200).json({ created_status: res.locals.account_creation });
});

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
const port = 8000;
app.listen(port, () => {
  console.log(`Server has started on ${port}`);
});
