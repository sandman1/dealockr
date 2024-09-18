import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d3748;
  padding: 1rem;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  right: 1rem;
  top: 60px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 150px;
  z-index: 1000;
`;

export const DropdownItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const LinkContainer = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;