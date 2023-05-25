import { useEffect, useState } from 'react';
import MatchBox from '../../components/MatchBox';
import Navbar from '../../components/Navbar';
import './style.scss';
const UserDashboard = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    console.log('get em');
    try {
      fetch('http://localhost:8000/api/getMatches', {
        credentials: 'include',
      })
        .then((result) => result.json())
        .then((data) => {
          console.log('dataaaaaa: ', data)
          if(Array.isArray(data)) setMatches(data)
        })
        .then(() => console.log(matches));
    } catch (err) {
      console.log(err);
    }
  }, []);

  // matchElements seems redundant???
  const matchElements = [];
  for (let i = 0; i < matches.length; i++) {
    console.log('match', matches[i]);
    // creating a matchbox for each match in the matches array
    // each match box has a property user set to matches[i]
    matchElements.push(<MatchBox user={matches[i]} />);
  }

  return (
    <div id='dashboard-page'>
      <div id='dashboard-feed'>
        <Navbar />
        <div id='feed'>
          {matches.map((el, index) => {
            return <MatchBox user={el} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
