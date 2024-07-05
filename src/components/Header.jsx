import '../App.css'
import { Link } from 'react-router-dom'

const Header = ({ user, handleLogOut }) => {
  let userOptions
  if (user && user.role === 'client') {
    userOptions = (
      <nav>
        <div className="head">
          <Link to="/">Home</Link>
          <Link to="/">Category</Link>
          <Link to="/AboutUs">About Us</Link>
          <Link to="/orders">My Cart</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        </div>
        <div>
          <h3 className="greeting">Welcome, {user.email}!</h3>
        </div>
      </nav>
    )
  } else if (user && user.role === 'admin') {
    userOptions = (
      <nav>
        <div className="head">
          <Link to="/">Home</Link>
          <Link to="/">Category</Link>
          <Link to="/addItem">Add Item</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        </div>
        <div>
          <h3 className="greeting">Welcome, {user.email}!</h3>
        </div>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/">Category</Link>
      <Link to="/AboutUs">About Us</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  )

  return <header>{user ? userOptions : publicOptions}</header>
}

export default Header
