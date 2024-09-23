// GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  button {
    border-radius: ${(props) => props.theme.borderRadius};
    padding: 10px;
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
    border: none;
    cursor: pointer;
  }

  input {
    padding: 8px;
    border-radius: ${(props) => props.theme.borderRadius};
    border: 1px solid ${(props) => props.theme.colors.gray};
  }
`;
