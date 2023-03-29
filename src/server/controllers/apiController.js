
const redirectUri = 'http://localhost:8000/api/callback';
const scope = encodeURIComponent('user-read-private user-read-email');
const querystring = require('querystring');
const clientId = '69f2651f537c4e5681a1b568df57b973'; // Your client id
const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
const dotenv = require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');

const apiController = {};
// sets credentials 
let spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: process.env.CLIENT_SECRET
});

apiController.getTopTenArtists = async (req, res, next) => {
  try {
    spotifyApi.getMyTopArtists()
    .then(function(data) {
      let topArtists = data.body.items;
      console.log(topArtists);
      res.locals.topArtists = topArtists;
      return next();

    }, function(err) {
      console.log('Something went wrong! with spotifyApi.getMyTopArtists', err);
    }
    );

  } catch (err) {
    return next({
      log: `error accessing account in apiController.getTopTenArtists, ${err}`,
      message: { err: 'middleware error in apicontroller top ten '},
    })
  }
}


apiController.accessAccount = async (req, res, next) => {
  try {
    console.log('inside accessAccounts...')
    // res.redirect('https://accounts.spotify.com/authorize?' +
    // querystring.stringify({
    //   response_type: 'code',
    //   client_id: clientId,
    //   scope: scope,
    //   redirect_uri: redirectUri,
    // }));
    const code = req.query.code;
    spotifyApi.authorizationCodeGrant(code).then(
      function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // set the access token on the API object
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        return next();
      },
      function(err) {
        console.log('Something went wrong', err);
        return next(err);
      }
    )
    
  }
  catch (err)  {
    return next({
      log: `error accessing account in apiController.accessAccount, ${err}`,
      message: { err: 'middleware error in login/ '},
    })
  }
  
    
}

 



















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