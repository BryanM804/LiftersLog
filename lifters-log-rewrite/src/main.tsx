import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'
import MovementContextProvider from './features/logging/contexts/MovementContextProvider.tsx';

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <MovementContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </MovementContextProvider>
  </StrictMode>,
)
