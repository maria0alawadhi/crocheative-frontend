import React, { useState, useEffect } from 'react'
import CartCard from '../components/CartCard'
import Client, { BASE_URL } from '../services/api'
import { loadStripe } from '@stripe/stripe-js'

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
        }, 0)
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
      calculateTotal(updatedOrders)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const makePayment = async () => {
    const stripe = await loadStripe(
      'pk_test_51PZnn0RxRknvYHwQD93s1k5Fc583fxOC8yGzGJqhPynJ1Cpfh8ZhzPTvPZTcaom0E3yrchbz5uRAlsZBEQ2R7c7800DUoHtt3F'
    )
    const body = {
      items: orders
    }
    const headers = {
      'Content-Type': 'application/json'
    }
    const response = await fetch(`${BASE_URL}/create-checkout-session`, {
      mthod: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    })
    const session = await response.json()
    const result = stripe.redirectToCheckout({ sessionId: session.id })

    if (result.error) {
      console.log(result.error)
    }
  }
  console.log(orders)
  return (
    <div>
      {isLoading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p>Error fetching cart: {error.message}</p>
      ) : (
        <div>
          {orders?.length > 0 ? (
            <>
              <CartCard
                orders={orders}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
              <div class="payment-card">
                <p>Total: {total} BD</p>
                <button onClick={makePayment}>Pay</button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
    </div>
  )
}
export default Cart
