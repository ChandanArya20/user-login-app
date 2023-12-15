import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserLoginPage from './pages/UserLoginPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLoginPage/>} />
        <Route path='registration-success' element={<RegistrationSuccessPage/>} />
        <Route path='forget-password' element={<ForgotPasswordPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
