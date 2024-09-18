import { useNavigate, Link } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { useUser } from '../../context/UserContext';
import { useEffect, useRef, useState } from 'react';

import ProfileDropdown from './ProfileDropdown';
import { AuthLinks, LinkContainer, Logo, NavbarContainer, NavLinks } from './styles';
import useClickOutside from '../hooks/useClickOutside';



interface SiteNavProps {
    isAuthenticated: boolean;
}

// function SiteNav({isAuthenticated}: SiteNavProps): React.ReactElement {
//     const navigate = useNavigate();
//     const [showLogout, setShowLogout] = useState(false);
//     // const { user, setUser } = useContext(UserContext);?
//     const { logout } = useUser();
    
//     const handleLogout = async () => {

//         try {
//             await logout();
//             navigate('/');
//         } catch (err) { console.log(err) }
       
//     }

//     useEffect(() => {
//         if (isAuthenticated)
//             setShowLogout(true)
//     }, []);

//     return (
//         <header>
//             <Navbar bg="dark" expand="lg" variant="dark">
//                 <Container>
//                     <Navbar.Brand><Nav.Link href="/">Paradigm Financial Services</Nav.Link></Navbar.Brand>
//                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                     <Nav className="me-auto">
//                         <Nav.Link href="/">Home</Nav.Link>
//                         <Nav.Link href="/dashboard">Dashboard</Nav.Link>
//                         <Nav.Link href="/about">About</Nav.Link>
//                         <Nav.Link href="/">Contact</Nav.Link>
//                         <Nav.Link href="/">Help</Nav.Link>
//                     </Nav>
//                         <Navbar.Collapse id="basic-navbar-nav">
//                         { showLogout ? (
//                                 <Nav className="ms-md-auto">
//                                     <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//                                 </Nav>
//                             ) : (
//                                 <Nav className="ms-md-auto">
//                                     <Nav.Link href="/login">Login</Nav.Link>
//                                     <Nav.Link href="/register">Register</Nav.Link>
//                                 </Nav>
//                             )
//                         }            
//                         </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//         </header>
//     )
// }

// export default SiteNav;

function SiteNav({isAuthenticated}: SiteNavProps): React.ReactElement {
    const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));


    useEffect(() => {
        const savedData = localStorage.getItem('userId');
        if (savedData) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])

  return (
    
    <NavbarContainer>
      <Logo onClick={() => navigate('/')}>Paradigm Financial</Logo>
      <NavLinks>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/help">Help</Link>
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
            <LinkContainer to="/register">Register</LinkContainer>
          </>
        )}
      </AuthLinks>
    </NavbarContainer>
  );
};

export default SiteNav;
