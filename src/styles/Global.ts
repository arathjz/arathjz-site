import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-margin-after: 0;
    -webkit-margin-before: 0;
  }

  body {
    min-height: 100vh;
    width: 100vw;
  }
`;

export { GlobalStyle };
