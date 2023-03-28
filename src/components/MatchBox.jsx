const MatchBox = ({ user }) => {
  let songs = user.topSongs.replaceAll(';', ', ');
  return (
    <div className={'match-box'}>
      <div className={'picky-factor'}>{user?.matchPreference}</div>
      <img src={user?.profilePicUrl} alt={'Profile Pic'} />
      <h4>
        {user?.firstName} {user?.lastName}
      </h4>
      <div className={'bio'}>
        <p>
          <strong>About Me</strong>
          <hr />
          {user?.biography}
        </p>
      </div>
      <div className={'artists'}>
        <p>
          <strong>Top Artists</strong>
        </p>
        <hr />
        {songs}
      </div>
    </div>
  );
};

export default MatchBox;
