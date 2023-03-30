import { useEffect } from "react";
import { useState } from "react";

const MatchBox = ({ user }) => {
  const [followText, setFollowText] = useState('Follow on Spotify')
  let songs = user.topSongs.replaceAll(';', ', ');
  
  
  
  const followUser = (username) => {
    setFollowText('Followed!')
    // console.log('USERNAME IN FOLLOW 1', JSON.stringify(username))
    try {
      fetch('http://localhost:8000/api/follow', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"},
        body: JSON.stringify({username: username}),

      })
      .then(data => console.log(data))
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className={'match-box'}>
      <div className={'picky-factor'}>{user?.matchPreference}</div>
      <img src={user?.profilePicUrl} alt={'Profile Pic'} />
      <h4>
        {user?.firstName} {user?.lastName}
      </h4>
      <h5>{user?.username}</h5>
      <div className={'bio'}>
        <p>
          <strong>About Me</strong>
        </p>
          <hr />
          {user?.biography}
      </div>
      <div className={'artists'}>
        <p>
          <strong>Top Artists</strong>
        </p>
        <hr />
        {songs}
      </div>
      <div className={'follow-button'} onClick={() => {
        followUser(user.username)}}>
          {followText}
        </div>

    </div>
    
  );
};

export default MatchBox;
