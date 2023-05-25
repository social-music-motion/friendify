import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import App from '../src/App';
// import * as axios from 'axios';
import Login from '../Login.jsx';
import '@testing-library/jest-dom';

// import config from '../jest.config.js'

// jest.mock('axios'); 
// describe('Unit testing React components', () => {
  
// })
test('login page email label', async () => {
  // ARRANGE
  render(<Login />)
  // ACT
  //  screen.getByLabelText('Email:')
  // ASSERT
  expect(screen.getByLabelText('Email:')).toBeInTheDocument()
})

test('login page password label', async () => {
  // ARRANGE 
  render(<Login />)
  // ACT
  // const emailLabel = await screen.findByLabelText('Password:')
  // ASSERT
  expect(screen.getByLabelText('Password:')).toBeInTheDocument()
  // expect(emailLabel).toBeInTheDocument();
}) 

test('check for email text input box', async () => {
  render(<Login />)
  const foundInputBox = await screen.findByRole('textbox', { name: /email/i });
  expect(foundInputBox).toBeInTheDocument();
})


test('check for password text input box', async () => {
  render(<Login />)
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
})


// describe('buttons', () => {
//   let page;
//   const loginMock = jest.fn();
//   let props = {
//     login: loginMock
//   }

//   test('the functions passed down to login-button should be invoked on click',  () => {
//     page = render(<Login {...props} />)
//     const loginButton =  screen.getByRole('button', {name: 'Login'} )
//     fireEvent.click(loginButton);
//     expect(loginMock).toBeCalledTimes(1);
    
//   })
// })



