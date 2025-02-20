import { Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import Navbar from './features/navbar/Navbar'
import Logging from './routes/Logging'
import History from './routes/History'
import Profile from './routes/Profile'
import Social from './routes/Social'
import Login from './routes/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {

  const location = useLocation();
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar visible={location.pathname != "/"}/>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/logging" element={<Logging />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="/social" element={<Social />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </>
  )
}

export default App
