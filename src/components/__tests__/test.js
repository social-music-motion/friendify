import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import App from '../src/App';
// import * as axios from 'axios';
import Login from '../Login.jsx';
// import config from '../jest.config.js'

// jest.mock('axios'); 

test('login page email label', async () => {
  // axios.post.mockResolvedValueOnce({ status: 200 });
  // const { getByLabelText } = render(<Login/>);
  // const emailInput = getByLabelText('Email')
  // ARRANGE
  render(<Login />)
  // ACT
  // await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('label')
// sorry just gonna comment this out to see what wasnt working!
  //expect(screen.getByRole('label', (name): 'Email'), is in document);
  // ASSERT
  expect(screen.getByRole('label')).toHaveTextContent('Email:')
  // expect(screen.getByRole('button')).toBeDisabled()
})

//<script type="module" src="your-script.js"></script>
