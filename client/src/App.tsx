import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/auth/Register';
import { AppContainer, MainContent } from './styles';
import { UserProvider } from './context/UserContext';
import Login from './components/auth/Login';
import Validate from './components/auth/Validate';
import SiteNav from './Common/SiteNav';
import SiteFooter from './Common/SiteFooter';
import About from './About/About';
import HomePage from './Home/HomePage';
import TransactionForm from './Transactions/TransactionForm';
import TransactionDetails from './Transactions/TransactionDetails';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './Dashboard/Dashboard';
import Step1 from './components/auth/Step1';
import Step2 from './components/auth/Step2';
import Step3 from './components/auth/Step3';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  const updateAuthStatus = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
  }


  return (
    <UserProvider>
      <BrowserRouter>
        <AppContainer>
          <SiteNav isAuthenticated={isAuthenticated}/>
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About isAuthenticated={isAuthenticated}/>} />
              {/* all need to be protected routes go here */}
              <Route path="/transaction-form" element={<TransactionForm isAuthenticated={isAuthenticated} />} />
              <Route path="/transactionDetails" element={<TransactionDetails />} />
              <Route path="/step1" element={<Step1 />} />
              <Route path="/step2" element={<Step2 />} />
              <Route path="/step3" element={<Step3 />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login updateAuthStatus={updateAuthStatus} />} />
              <Route path="/validate" element={<Validate />} />
            </Routes>
            <ToastContainer autoClose={3000} closeOnClick hideProgressBar={true} />
          </MainContent>
          <SiteFooter />
        </AppContainer>
        </BrowserRouter>
    </UserProvider>
  );
}

export default App;
