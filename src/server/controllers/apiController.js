
const redirectUri = 'http://localhost:3000/home';
const scope = encodeURIComponent('user-read-private user-read-email');
const querystring = require('querystring');
const state = 'WinJB947VKUbmrRn';
const clientId = '9b043db2fbd74c34b38d6eb3bdf4678e'; // Your client id
const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
const client_secret = 'f2e39fc5c6544c8087a3761caeea182b';


const apiController = {};

apiController.accessAccount = async (req, res, next) => {
  try {
    console.log('inside accessAccounts...')
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state
    }));
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