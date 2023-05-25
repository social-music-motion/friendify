import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";

const SignupForm = () => {
  const [topTen, setTopTen] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPreference, setMatchPreference] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  // const client_id = "paste your client_id here";
  // const client_secret = "paste your client_secret here";
  // const redirect_uri = "http://localhost:3000/signupform";

  useEffect(() => {
    console.log('signupform useEffect fired off')
    fetch("http://localhost:8000/api/topartists")
      .then((response) => response.json())
      .then((data) => {
        console.log("FETCH DATA: ", data);
        const justNames = data.topArtists.map((obj) => obj.name).slice(0, 10);
        setTopTen(justNames);
        setUsername(data.userData.id)
        console.log("JUST NAMES: ", justNames);
      });
    }, []);

  const createUser = () => {
    const body = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      topSongs: topTen,
      matchPreference: matchPreference,
      profilePicUrl: profilePicUrl,
      biography: bio,
      username: username,
    };

    axios
      .post("http://localhost:8000/api/signup", body, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/userDashboard");
        }
      })
      .catch((e) => console.log(e));
  };
  const getData = () => {
    console.log("TOP TEN HERE ",topTen);
  };

  return (
    <div className="centered-page">
      <div className="feed-stripe">
        <div id="signup-container">
          {/* <button onClick={getData}>TEST FETCH</button> */}
          <h1>friendify</h1>
          {/* <form
            onSubmit={(e) => {
              e.preventDefault();
              createUser(e);
            }}
          > */}
          <div id="form-data">
            <label htmlFor="fName" style={{ display: "none" }}>
              First Name
            </label>
            <input
              type="text"
              id="fName"
              required={true}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <label htmlFor="lName" style={{ display: "none" }}>
              Last Name
            </label>
            <input
              type="text"
              id="lName"
              required={true}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <label htmlFor="email" style={{ display: "none" }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              required={true}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password" style={{ display: "none" }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              required={true}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label htmlFor="matchPref" style={{ display: "none" }}>
              How picky are you?
            </label>
            <input
              type="number"
              id="matchPref"
              required={true}
              placeholder="How picky are you: 1-10"
              min="1"
              max="10"
              onChange={(e) => setMatchPreference(e.target.value)}
            />
            <br />
            <label htmlFor="profilePic" style={{ display: "none" }}>
              Enter a profile picture URL:
            </label>
            <input
              type="url"
              id="profilePic"
              placeholder="Profile picture URL"
              onChange={(e) => setProfilePicUrl(e.target.value)}
            />
            {/* <p>What gender are you?</p> */}

            {/* <div className="radio-flex">
              <input
                type="radio"
                id="male"
                name="gender"
                onChange={(e) => setGender("male")}
              />
              <label htmlFor="male">Male</label>

              <input
                type="radio"
                id="female"
                name="gender"
                onChange={(e) => setGender("female")}
              />
              <label htmlFor="female">Female</label>

              <input
                type="radio"
                id="nonBinary"
                name="gender"
                onChange={(e) => setGender("nonbinary")}
              />
              <label htmlFor="nonBinary">Non-binary</label>
            </div>
            <hr />
            <p>What gender are you interested in?</p>
            <div className="radio-flex">
              <input
                type="radio"
                id="malePref"
                name="genderPref"
                onChange={(e) => setGenderPreference("male")}
              />
              <label htmlFor="malePref">Male</label>

              <input
                type="radio"
                id="femalePref"
                name="genderPref"
                onChange={() => setGenderPreference("female")}
              />
              <label htmlFor="femalePref">Female</label>

              <input
                type="radio"
                id="nonBinaryPref"
                name="genderPref"
                onChange={(e) => setGenderPreference("nonbinary")}
              />
              <label htmlFor="nonBinaryPref">Non-binary</label>
            </div> */}

            <br />
            <label htmlFor="bio" style={{ display: "none" }}>
              About me: 
            </label>
            <input
              type="text"
              id="bio"
              placeholder="Write something about yourself"
              onChange={(e) => setBio(e.target.value)}
            />
            <br />
            <button onClick={createUser}> Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;

/*
if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      // console.log('fired');
      const apiCode = window.location.href.slice(
        window.location.href.indexOf('=') + 1
      );
      // setCode(apiCode);
      let newBody =
        'grant_type=authorization_code' +
        `&code=${apiCode}` +
        `&redirect_uri=${redirect_uri}`;
      try {
        fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(client_id + ':' + client_secret),
          },
          body: newBody,
          json: true,
        }).then((data) => {
          data.json().then((data) => {
            // setAccessToken(data.access_token);
            // setRefreshToken(data.refresh_token);
            // setExpiryTime(data.expires_in);
            try {
              fetch(`https://api.spotify.com/v1/me/top/artists`, {
                headers: {
                  Authorization: `Bearer ${data.access_token}`,
                },
              })
                .then((data) => data.json())
                .then((data) => {
                  console.log(data);
                  const justNames = data.items
                    .map((obj) => obj.name)
                    .slice(0, 10);
                  setTopTen(justNames);
                  console.log('JUST NAMES: ', justNames);
                });
            } catch (err) {
              console.log(err);
            }
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
*/
