import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import './App.css'
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
          <Route path="/" element={<Home />} />
          <Route path="/:categoryName/items" element={<Items />} />
          <Route path="/:categoryName/items/:itemId" element={<ItemDetails user={user} />} />
          <Route path="/AddItemForm" element={<AddItemForm />} />
          <Route path="/EditItemForm" element={<EditItemForm />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/cart" element={<Cart user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
