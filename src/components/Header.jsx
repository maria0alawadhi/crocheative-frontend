import '../App.css'
import { Link } from 'react-router-dom'

const Header = ({ user, handleLogOut }) => {
  const ClientNavigation = () => (
    <nav>
      <div className="head">
        <Link to="/">Home</Link>
        <Link to="/">Categories</Link>
        <Link to="/AboutUs">About Us</Link>
        <Link to="/cart">My Cart</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </div>
      <div>
        <h3 className="greeting">Welcome, {user.email}!</h3>
      </div>
    </nav>
  )

  const AdminNavigation = () => (
    <nav>
      <div className="head">
        <Link to="/">Home</Link>
        <Link to="/">Categories</Link>
        <Link to="/AllItems">Manage Items</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </div>
      <div>
        <h3 className="greeting">Welcome, {user.email}!</h3>
      </div>
    </nav>
  )

  const PublicNavigation = () => (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/">Categories</Link>
      <Link to="/AboutUs">About Us</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  )

  return (
    <header>
      <Link to="/">
        <img
          className="logo-img"
          alt="logo"
          src="https://i.imgur.com/zXkBiD1.png"
        />
      </Link>
      {user
        ? user.role === 'client'
          ? ClientNavigation()
          : AdminNavigation()
        : PublicNavigation()}
    </header>
  )
}

export default Header
