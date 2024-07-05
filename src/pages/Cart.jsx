import React, { useState, useEffect } from 'react'
import CartCard from '../components/CartCard'
import Client from '../services/api'
const Cart = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null) 
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true) 
      setError(null) 
      try {
        const response = await Client.get(`/orders/${user?.id}`) 
        setOrders(response.data)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setError(error) 
      } finally {
        setIsLoading(false) 
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
