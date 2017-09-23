import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  body {
    font-family: 'Helvetica', 'Arial', 'PingFang TC', 'Heiti TC', 'Microsoft Jhenghei', sans-serif;
    font-size: 14px;
  }

  #app {
    height: 100%;
    display: flex;
  }

  body,
  input {
    background-color: #FAFAFA;
  }

  a {
    text-decoration: none;
  }
`;

