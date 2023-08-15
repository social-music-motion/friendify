// const scope = encodeURIComponent(
//   'user-read-private user-read-email user-follow-modify user-follow-read'
// );
const querystring = require('querystring');

// const authUrl =`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
const dotenv = require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

const apiController = {};
// sets credentials
const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

apiController.getAccessToken = async (req, res, next) => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-follow-modify',
    'user-follow-read',
  ];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.locals.authorizeURL = authorizeURL + '&show_dialog=true';
  console.log('AUTHORIZE URL: ', authorizeURL + '&show_dialog=true');
  return next();
};

apiController.accessAccount = async (req, res, next) => {
  try {
    const data = await spotifyApi.authorizationCodeGrant(req.query.code);
    // console.log('The token expires in ' + data.body['expires_in']);
    // console.log('The access token is ' + data.body['access_token']);
    // console.log('The refresh token is ' + data.body['refresh_token']);

    // set the access token on the API object
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    // console.log('SPOTIFY API OBJECT HERE ', spotifyApi);
    return next();
  } catch (err) {
    return next({
      log: `error accessing account in apiController.accessAccount, ${err}`,
      message: { err: 'middleware error in login/ ' },
    });
  }
};

apiController.getTopTenArtists = async (req, res, next) => {
  try {
    console.log('req.body in getTopTen... ', req.body);
    const data = await spotifyApi.getMyTopArtists();
    console.log('DATA: ', data);
    let topArtists = data.body.items;
    console.log(topArtists[0].name);
    res.locals.topArtists = topArtists;
    return next();
  } catch (err) {
    return next({
      log: `error accessing account in apiController.getTopTenArtists, ${err}`,
      message: { err: 'middleware error in apicontroller top ten ' },
    });
  }
};

apiController.getUserData = async (req, res, next) => {
  try {
    console.log('req.body in getUserData... ', req.body);
    const data = await spotifyApi.getMe();
    let userData = data.body;
    res.locals.userData = userData;
    console.log('USER DATA OBJECT', userData);
    return next();
  } catch (err) {
    return next({
      log: `error accessing account in apiController.getUserData, ${err}`,
      message: { err: 'middleware error in apicontroller get user data ' },
    });
  }
};
// spotifyApi.getMe()
//   .then(function(data) {
//     console.log('Some information about the authenticated user', data.body);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });

apiController.accessRefresh = async (req, res, next) => {
  console.log('BODY IN ACCESSREFRESH', req.body);
  try {
    spotifyApi.refreshAccessToken().then(
      function (data) {
        console.log('The access token has been refreshed!');

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
      },
      function (err) {
        console.log('Could not refresh access token', err);
      }
    );
    return next();
  } catch (err) {
    return next({
      log: `error accessing account in apiController.accessRefresh, ${err}`,
      message: { err: 'middleware error in accessRefresh' },
    });
  }
};

apiController.followUser = async (req, res, next) => {
  const username = req.body.username;
  console.log('REQ BODYYY ', req.body.username);
  try {
    let data = await spotifyApi.followUsers([username]);
    console.log('data from followUsers is', data);
    return next();
  } catch (err) {
    return next({
      log: `error accessing account in apiController.followUser, ${err}`,
      message: { err: 'middleware error in followUser' },
    });
  }
};

//     // setCode(apiCode);
//     let newBody =
//       'grant_type=authorization_code' +
//       `&code=${apiCode}` +
//       `&redirect_uri=${redirect_uri}`;
//     try {
//       fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
//         },
//         body: newBody,
//         json: true,
//       }).then((data) => {
//         data.json().then((data) => {
//           // setAccessToken(data.access_token);
//           // setRefreshToken(data.refresh_token);
//           // setExpiryTime(data.expires_in);
//           try {
//             fetch(`https://api.spotify.com/v1/me/top/artists`, {
//               headers: {
//                 Authorization: `Bearer ${data.access_token}`,
//               },
//             })
//               .then((data) => data.json())
//               .then((data) => {
//                 console.log(data);
//                 const justNames = data.items
//                   .map((obj) => obj.name)
//                   .slice(0, 10);
//                 setTopTen(justNames);
//                 console.log('JUST NAMES: ', justNames);
//               });
//           } catch (err) {
//             console.log(err);
//           }
//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }, []);

module.exports = apiController;
