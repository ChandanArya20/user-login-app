import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserLoginPage from './pages/UserLoginPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLoginPage/>} />
        <Route path='registration-success' element={<RegistrationSuccessPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
