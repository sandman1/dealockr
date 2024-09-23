// Button.tsx
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: white;
  border: none;
  cursor: pointer;
`;

export default Button;
