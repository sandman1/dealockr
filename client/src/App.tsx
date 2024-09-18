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
              {/* <Route path="/" element={<HomePage />} /> */}
              {/* <Route path="/transaction-form" element={<TransactionForm isAuthenticated={isAuthenticated} />} /> */}
              {/* <Route path="/about" element={<About isAuthenticated={isAuthenticated}/>} /> */}
              
              {/* <Route path="/transactionDetails" element={<TransactionDetails />} /> */}
              {/* <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              /> */}
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
