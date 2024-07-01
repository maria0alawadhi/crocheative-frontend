import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import './App.css'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import Header from './components/Header'

const App = () => {
  const [user, setUser] = useState(null)
  const role = localStorage.getItem('role')
  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Header user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home role={role} />} />
          <Route
            path="/signin"
            element={<SignIn setUser={setUser}  />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
