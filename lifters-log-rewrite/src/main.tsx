import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'
import MovementContextProvider from './features/logging/contexts/MovementContextProvider.tsx';
import DateContextProvider from './features/history/contexts/DateContextProvider.tsx';

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <MovementContextProvider>
    <DateContextProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </DateContextProvider>
    </MovementContextProvider>
  </StrictMode>,
)
