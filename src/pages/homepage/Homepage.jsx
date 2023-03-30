import Login from '../../components/Login';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import './style.scss';
const Homepage = () => {
  const [loggedInToSpotify, setLoggedInToSpotify] = useState(false);

  useEffect(() => {
    console.log(window.location.href);
  }, []);

  const requestSpotifyLogin = () => {
    //SPOTIFY API KEY
    const client_id = '69f2651f537c4e5681a1b568df57b973';
    //brings back to this page after spotify login
    const redirect_uri = 'http://localhost:8000/api/callback';
    //what we want to recieve from spotify
    var scope = 'user-read-email user-top-read user-follow-modify user-follow-read';

    //localStorage.setItem('client_id', client_id);
    //localStorage.setItem('client_secret', client_secret);

    let queryString =
      'https://accounts.spotify.com/en/authorize?' +
      `client_id=${client_id}` +
      `&response_type=code` +
      `&scope=${scope}` +
      `&redirect_uri=${redirect_uri}` +
      `&show_dialog=true`;

    window.location.href = queryString;
  };

  return (
    <div class='centered-page'>
      <div className='homepage-container feed-stripe'>
        <div id='listen-box'>
          <h1 className='logo'>Listen</h1>
          <Login />
          <div id='new-member-container'>
            <p>
              <strong>Not yet a member? </strong>
              <br />
              Connect Spotify to get started!
            </p>
            <button onClick={requestSpotifyLogin}>Spotify Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
