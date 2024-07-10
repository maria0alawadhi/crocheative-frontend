import '../App.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  const [validity, setValidity] = useState('')
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    if (formValues.password.length < 7) {
      setValidity('Password Must Contain At Least 8 Charcters .')
    } else {
      setValidity('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { password, confirmPassword, email, name, role } = formValues

    if (!password || !confirmPassword || !email || !name || !role) {
      setValidity('Fill In Your Deatails Please.')
      return
    }

    if (password !== confirmPassword) {
      setValidity('Passwords Not Matching.')
      setFormValues((prevValues) => ({
        ...prevValues,
        password: '',
        confirmPassword: ''
      }))
      return
    }

    if (password.length < 8) {
      setValidity('Password Must Contain At Least 8 Charcters .')
      return
    }

    try {
      await RegisterUser({ name, email, password, role })
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      })
      navigate('/signin')
    } catch (error) {
      setValidity('Registration Failed')
      console.error('Registration failed:', error)
    }
  }
  return (
    <>
      <div className="login-form">
        <h1 className="title">Register</h1>
        <div className="register-card centered">
          <form onSubmit={handleSubmit} className="reg">
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input
                id="inputs"
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
              <input
                id="inputs"
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
              <input
                id="inputs"
                onChange={handleChange}
                type="password"
                name="password"
                value={formValues.password}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="inputs"
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
            <p className="validation-message">{validity}</p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
