import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import axios from 'axios'
import './App.css'
import { BASE_URL } from './services/api'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Items from './pages/Items'
import AboutUs from './pages/AboutUs'
import ItemDetails from './pages/ItemDetails'
import AddItemForm from './pages/AddItemForm'
import EditItemForm from './pages/EditItemForm'
import Cart from './pages/Cart'
import Header from './components/Header'

const App = () => {
  const [user, setUser] = useState(null)
  const role = localStorage.getItem('role')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`)
        setCategories(response.data)
      } catch (error) {
        throw error
      }
    }
    fetchCategories()
  }, [])

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
          <Route
            path="/"
            element={<Home categories={categories} role={role} />}
          />
          <Route path="/:categoryName/items" element={<Items />} />
          <Route path="/itemDetails" element={<ItemDetails />} />
          <Route path="/AddItemForm" element={<AddItemForm />} />
          <Route path="/EditItemForm" element={<EditItemForm />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
