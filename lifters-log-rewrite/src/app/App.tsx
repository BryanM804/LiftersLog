import { Route, Routes } from 'react-router-dom'
import '../styles/index.css'
import Navbar from '../features/navbar/Navbar'
import Logging from './routes/Logging'
import History from './routes/History'
import Profile from './routes/Profile'
import Social from './routes/Social'
import Login from './routes/Login'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from 'react-auth-kit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import createStore from 'react-auth-kit/createStore'
import UserData from '../types/UserData'
import Welcome from './routes/Welcome'

const queryClient = new QueryClient();

const store = createStore<UserData>({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false
});

function App() {

  return (
    <>
      <AuthProvider store={store} >
        <QueryClientProvider client={queryClient}>
          <Navbar />
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/welcome" element={<Welcome />}></Route>
              <Route path="/logging" element={<Logging />}></Route>
              <Route path="/history" element={<History />}></Route>
              <Route path="/social" element={<Social />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </>
  )
}

export default App
