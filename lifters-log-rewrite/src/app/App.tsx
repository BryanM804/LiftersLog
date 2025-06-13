import { Route, Routes } from 'react-router-dom'
import '../styles/index.css'
import Navbar from '../features/navbar/Navbar'
import Logging from './routes/Logging'
import History from './routes/History'
import Profile from './routes/Profile'
import Social from './routes/Social'
import Login from './routes/Login'
import Welcome from './routes/Welcome'
import AuthProtector from '../components/AuthProtector'

function App() {

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
          <Route path="/welcome" element={
            <AuthProtector>
              <Welcome />
            </AuthProtector>
          }></Route>
          <Route path="/logging" element={
            <AuthProtector>
              <Logging />
            </AuthProtector>
          }></Route>
          <Route path="/history" element={
            <AuthProtector>
              <History />
            </AuthProtector>
          }></Route>
          <Route path="/social" element={
            <AuthProtector>
              <Social />
            </AuthProtector>
          }></Route>
          <Route path="/profile" element={
            <AuthProtector>
              <Profile />
            </AuthProtector>
          }></Route>
      </Routes>
    </>
  )
}

export default App
