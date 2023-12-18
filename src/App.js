import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import UserLoginPage from './pages/UserLoginPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import CreateNewPasswordPage from './pages/CreateNewPasswordPage';
import CookieTestPage from './pages/CookieTestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLoginPage/>} />
        <Route path='registration-success' element={<RegistrationSuccessPage/>} />
        <Route path='forget-password' element={<ForgotPasswordPage/>} />
        <Route path='verify-otp' element={<OTPVerificationPage/>} />
        <Route path='create-new-password' element={<CreateNewPasswordPage/>} />
        <Route path='test-cookie' element={<CookieTestPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
