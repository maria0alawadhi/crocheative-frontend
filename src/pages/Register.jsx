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
      <div className="container3">
        <h1 className="register">Register</h1>
        <div className="register-card centered">
          <form onSubmit={handleSubmit} className="reg">
            <div className="input-wrapper">
              <label htmlFor="name">Name</label>
              <input
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
                onChange={handleChange}
                name="role"
                value={formValues.role}
                required
              >
                <option>Select Role</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
              </select>
            </div>
            <button
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
