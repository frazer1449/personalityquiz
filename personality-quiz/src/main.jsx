import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </UserProvider>
  </BrowserRouter>
)
