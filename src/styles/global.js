import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin:0;
  padding:0;
  outline:0;
  box-sizing:0;
}

html, body, #root {
  background: #7159c1;
  -webkit-font-smoothing: antialiased !important;
}

body, input, button {
  color: #000;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

button {
  cursor: pointer;
}
`;