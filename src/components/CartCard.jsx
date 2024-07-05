import React from 'react'
import Client from '../services/api'

const CartCard = ({ order, onRemoveItem }) => {
  return (
    <div className="cart-card">
      {order.items.map((item) => (
        <div key={item._id} className="cart-item-container">
          <div className="cart-item-image">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: {item.price.toFixed(2)} BD</p>
            <button
              className="remove-button"
              onClick={() => onRemoveItem(order._id, item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartCard
