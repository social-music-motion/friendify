import Login from '../../components/Login';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import './style.scss';
const Homepage = () => {
  const [loggedInToSpotify, setLoggedInToSpotify] = useState(false);

  const requestSpotifyLogin = async () => {
    //SPOTIFY API KEY
    //brings back to this page after spotify login
    // const redirect_uri = 'http://localhost:8000/api/callback';
    //what we want to recieve from spotify
    //   var scope =
    //     'user-read-email user-top-read user-follow-modify user-follow-read';

    //   //localStorage.setItem('client_id', client_id);
    //   //localStorage.setItem('client_secret', client_secret);

    //   let queryString =
    //     'https://accounts.spotify.com/en/authorize?' +
    //     `client_id=${client_id}` +
    //     `&response_type=code` +
    //     `&scope=${scope}` +
    //     `&redirect_uri=${redirect_uri}` +
    //     `&show_dialog=true`;

    //   // window.location.href = queryString;
    // };}
    try {
      const res = await fetch(
        'http://localhost:8000/api/spotify/getAccessToken'
      );
      const data = await res.json();
      console.log(data);
      window.location.href = data;
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <div className='centered-page'>
      <div className='homepage-container feed-stripe'>
        <div id='listen-box'>
          <h1 className='logo'>friendify</h1>
          <Login />
          <div id='new-member-container'>
            <p>
              <strong>Not yet a member? </strong>
              <br />
              Connect Spotify to get started!
            </p>
            <button id='spot-btn' onClick={requestSpotifyLogin}>
              Spotify Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
