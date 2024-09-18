import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { useUser } from '../context/UserContext';
import { DropdownContainer, DropdownItem } from './styles';

type ProfileDropdownProps = {
    dropdownRef: React.RefObject<HTMLDivElement>
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

function ProfileDropdown({dropdownRef, setIsLoggedIn}: ProfileDropdownProps): React.ReactElement {
    const navigate = useNavigate();
    // const { logout } = useUser();
    const handleLogout = async () => {

        // try {
        //     await logout();
        //     setIsLoggedIn(false);
        //     navigate('/');
        // } catch (err) { console.log(err) }
        
    }

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
