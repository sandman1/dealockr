import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { AuthLinks, LinkContainer, Logo, NavbarContainer, NavLinks } from './styles';
import useClickOutside from '../hooks/useClickOutside';

interface SiteNavProps {
    isAuthenticated: boolean;
}

function SiteNav({isAuthenticated}: SiteNavProps): React.ReactElement {
    const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));


    useEffect(() => {
        const savedData = localStorage.getItem('accessToken');
        
        if (savedData) {
          setIsLoggedIn(true);
        }
        
    }, [isLoggedIn, isAuthenticated])

  return (
    
    <NavbarContainer>
      <Logo onClick={() => navigate('/')}>Dealockr</Logo>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
      </NavLinks>
      <AuthLinks>
        {isLoggedIn ? (
          <>
            <button onClick={toggleDropdown}>Profile</button>
            {isDropdownOpen && <ProfileDropdown setIsLoggedIn={setIsLoggedIn} dropdownRef={dropdownRef} />}
          </>
        ) : (
          <>
            <LinkContainer to="/login">Login</LinkContainer>
            {/* <LinkContainer to="/register">Register</LinkContainer> */}
            <LinkContainer to="/verificationForm">Register</LinkContainer>
          </>
        )}
      </AuthLinks>
    </NavbarContainer>
  );
};

export default SiteNav;
