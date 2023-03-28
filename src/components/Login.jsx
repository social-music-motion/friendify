import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
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
          if (response.status === 200) {
            navigate('/userDashboard');
          }
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
        <label htmlFor='email'>Email: </label>
        <input
          type='text'
          id='username'
          required={true}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor='password'>Password: </label>
        <input
          type='password'
          id='password'
          required={true}
          autoComplete='on'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input id='login-button' type='submit' value='Login' />
      </form>
    </div>
  );
};
export default Login;
