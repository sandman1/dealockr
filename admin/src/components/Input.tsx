// Input.tsx
import styled from 'styled-components';

const Input = styled.input`
  padding: 8px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

export default Input;
