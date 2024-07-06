import React, { useState, useEffect } from 'react'
import CartCard from '../components/CartCard'
import Client from '../services/api'

const Cart = ({ user }) => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await Client.get(`/orders/${user?.id}`)
        setOrders(response.data)
        calculateTotal(response.data)
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

  const calculateTotal = (orders) => {
    const total = orders.reduce((acc, order) => {
      return (
        acc +
        order.items.reduce((itemAcc, item) => {
          const itemPrice = typeof item.price === 'number' ? item.price : 0
          const itemQuantity =
            typeof item.quantity === 'number' ? item.quantity : 1
          return itemAcc + itemPrice * itemQuantity
        },0)
      )
    }, 0)
    setTotal(total.toFixed(2))
  }

  const handleUpdateQuantity = async (orderId, itemId, quantity) => {
    try {
      await Client.put(`/orders/${orderId}/items/${itemId}`, { quantity })
      calculateTotal(orders)
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const handleRemoveItem = async (orderId, itemId) => {
    try {
      await Client.delete(`/orders/${orderId}/items/${itemId}`)
      calculateTotal(orders)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p>Error fetching cart: {error.message}</p>
      ) : (
        <div>
          <CartCard
            orders={orders}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
          <p>Total: {total} BD</p>
        </div>
      )}
    </div>
  )
}

export default Cart
