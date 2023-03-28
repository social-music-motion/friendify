import Homepage from './pages/homepage/Homepage';
import SignupForm from './pages/signupform/SignupForm';
import { Routes, Route } from 'react-router-dom';
import UserDashboard from './pages/userdashboard/UserDashboard';
function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
      <Route path='/signupform' element={<SignupForm />} />
      <Route path='/userDashboard' element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
