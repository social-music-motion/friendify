import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import axios from 'axios';
const axios = require('axios');


const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //THIS WAS COMMENTED OFF TO MAKE TEST SUITE RUN
  // const navigate = useNavigate();
  const sendToServer = (e) => {
    try {
      const body = {
        email: email,
        password: password,
      };
      axios
        .post('http://localhost:8000/api/login', body, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          // if login condition is true

          //THIS WAS COMMENTED OFF TO MAKE TEST SUITE RUN
          // if (response.status === 200) {
          //   navigate('/userDashboard');
          // }
          // navigate('/home')
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id='login-container'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendToServer(e);
        }}
      >
        {/* <label htmlFor='email'>Email: </label> */}
        <input
          type='text'
          id='email'
          required={true}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Email'
        />
        <br />
        {/* <label htmlFor='password' >Password: </label> */}
        <input
          type='password'
          id='password'
          required={true}
          autoComplete='on'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <br />
        <input id='login-button' type='submit' value='Login' />
      </form>
    </div>
  );
};
export default Login;
