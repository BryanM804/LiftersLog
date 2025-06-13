import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'
import MovementContextProvider from './features/logging/contexts/MovementContextProvider.tsx';
import DateContextProvider from './features/history/contexts/DateContextProvider.tsx';
import createStore from 'react-auth-kit/createStore';
import UserData from './types/UserData.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from 'react-auth-kit';

const queryClient = new QueryClient();

const store = createStore<UserData>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false
});

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider store={store} >
      <QueryClientProvider client={queryClient}>
        <MovementContextProvider>
        <DateContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DateContextProvider>
        </MovementContextProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
