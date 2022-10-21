import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { GlobalStyles } from './styles/global-styles'
import { theme } from './styles/theme'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
        <GlobalStyles />
    </ThemeProvider>
  </React.StrictMode>
)

