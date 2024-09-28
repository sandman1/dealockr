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
        console.log('Logging out...');
        
        const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token
        const refreshToken = localStorage.getItem('refreshToken'); // Retrieve the refresh token
        const idToken = localStorage.getItem('idToken'); // Retrieve the refresh token
    
        if (!accessToken) {
            alert('No user is currently logged in');
            return;
        }
    
        if (!refreshToken) {
            alert('No refresh token available. Please log in again.');
            return;
        }
    
        try {
            // Make a POST request to the backend to sign out the user
            await axios.post('http://localhost:5000/signout', { accessToken, refreshToken });
    
            // Clear tokens from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('idToken');
    
            // Show success message
            showToast("Signed out successfully.", { type: 'success', autoClose: 2000 });
            setIsLoggedIn(false);
    
            // Navigate to login page after sign-out
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
            showToast("Error signing out. Please try again.", { type: 'error', autoClose: 2000 });
        }
    };
    
    

    return (
        <div ref={dropdownRef}>
            <DropdownContainer>
                {/* <DropdownItem>Profile</DropdownItem> */}
                {/* <DropdownItem>Settings</DropdownItem> */}
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
            </DropdownContainer>
        </div>
    );
};

export default ProfileDropdown;
