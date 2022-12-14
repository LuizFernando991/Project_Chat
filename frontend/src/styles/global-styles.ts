import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }
  body {
    font-family: '\'Segoe UI\', Roboto, sans-serif';
    background-color: '#FAFAFA';
  }
  a {
      text-decoration: none;
  }
  a:visited {
      color: black;
      text-decoration: none;
  }
  ul {
      list-style: none;
  }
  input {
    border: none;
    outline: none;
  }
`