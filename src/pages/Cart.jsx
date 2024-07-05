import React, { useState, useEffect } from 'react'
import Client from '../services/api'
import { useParams } from 'react-router'
import CartCard from './CartCard'

const CartPage = () => {
  const [orders, setOrders] = useState([])
  const { userId, orderId, itemId } = useParams()

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await Client.get(`/orders/${userId}`)
        setOrders(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserOrders()
  }, [userId])

  const handleRemoveItem = async () => {
    try {
      await Client.delete(`/orders/${orderId}/items/${itemId}`)
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return {
            ...order,
            items: order.items.filter((item) => item._id !== itemId)
          }
        }
        return order
      })
      setOrders(updatedOrders)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {orders.map((order) => (
        <CartCard
          key={order._id}
          order={order}
          onRemoveItem={handleRemoveItem}
        />
      ))}
    </div>
  )
}

export default CartPage
