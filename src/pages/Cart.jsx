import React, { useState, useEffect } from 'react'
import CartCard from '../components/CartCard'
import Client from '../services/api'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import { useParams } from 'react-router'

const Cart = ({user}) => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const  userId  = user?.id

  useEffect(() => {
    const fetchOrders = async () => {
      try {
    const savedCart = await Client.get(`/orders/${userId}`)
    setCart(savedCart)
    calculateTotal(savedCart) } 
    catch (error) {
      throw error
    }}
    fetchOrders()

  }, [])
  console.log("userId"+userId);
  console.log(cart);


  const calculateTotal = (cartItems) => {
    const totalAmount = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity
    }, 0)
    setTotal(totalAmount.toFixed(2))
  }

  const handleRemoveItem = (orderId, itemId) => {
    const updatedCart = cart.map((order) => {
      if (order._id === orderId) {
        return {
          ...order,
          items: order.items.filter((item) => item._id !== itemId)
        }
      }
      return order
    })
    setCart(updatedCart)
    calculateTotal(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-container">
            {cart.map((cartt) => (
              <CartCard
                key={cartt._id}
                order={cart}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: {total} BD</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
