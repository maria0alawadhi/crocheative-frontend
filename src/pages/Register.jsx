import '../App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

const Register = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser(formValues)
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    })
    navigate('/signin')
  }

  return (
    <>
      <div className="login-form">
        <h1 className="title">Register</h1>
        <div className="register-card centered">
          <form onSubmit={handleSubmit} className="reg">
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input id="inputs"
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="John Smith"
                value={formValues.name}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input id="inputs"
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formValues.email}
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input  id="inputs"
                onChange={handleChange}
                type="password"
                name="password"
                value={formValues.password}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input  id="inputs"
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                onChange={handleChange}
                name="role"
                value={formValues.role}
                required
              >
                <option>Select Role</option>
                <option id="role" value="admin">
                  Admin
                </option>
                <option id="role" value="client">
                  Client
                </option>
              </select>
            </div>
            <button
              className="login-btn"
              disabled={
                !formValues.email ||
                (!formValues.password &&
                  formValues.confirmPassword === formValues.password) ||
                !formValues.role
              }
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
