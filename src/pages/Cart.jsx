import React, { useState, useEffect } from 'react'
import CartCard from '../components/CartCard'
import Client from '../services/api'
const Cart = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false) // Track loading state
  const [error, setError] = useState(null) // Track any errors
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true) // Set loading state to true
      setError(null) // Clear any previous errors
      try {
        const response = await Client.get(`/orders/${user?.id}`) // Use optional chaining
        setOrders(response.data)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setError(error) // Store error for potential display
      } finally {
        setIsLoading(false) // Set loading state to false after fetching (success or error)
      }
    }
    if (user) {
      fetchOrders()
    }
  }, [user])
  return (
    <div>
      {isLoading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p>Error fetching cart: {error.message}</p>
      ) : (
        <CartCard orders={orders} />
      )}
    </div>
  )
}
export default Cart
