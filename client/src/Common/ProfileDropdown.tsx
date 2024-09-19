import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DropdownContainer, DropdownItem } from './styles';
import { useCustomToast } from '../hooks/useCustomToast';

type ProfileDropdownProps = {
    dropdownRef: React.RefObject<HTMLDivElement>
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function ProfileDropdown({dropdownRef, setIsLoggedIn}: ProfileDropdownProps): React.ReactElement {
    const navigate = useNavigate();
    const { showToast } = useCustomToast();

    const handleLogout = async () => {
        const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token
    
        if (!accessToken) {
          alert('No user is currently logged in');
          return;
        }
    
        try {
          // Make a POST request to the backend to sign out the user
          await axios.post('http://localhost:5000/signout', { accessToken });
    
          // Clear tokens from local storage
          localStorage.removeItem('idToken');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
    
          showToast("Signed out successfully.", { type: 'success', autoClose: 2000 });
          setIsLoggedIn(false)
          // Navigate to login page or home page after sign-out
          navigate('/login');
        } catch (error) {
          console.error('Error signing out:', error);
          showToast("Error signing out. Please try again.", { type: 'error', autoClose: 2000 });
        }
      };

    return (
        <div ref={dropdownRef}>
            <DropdownContainer>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownContainer>
        </div>
    );
};

export default ProfileDropdown;
