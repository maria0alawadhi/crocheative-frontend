import React, { useState } from 'react'

const CartCard = ({ orders, onRemoveItem, onAddItem }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [updatedOrders, setUpdatedOrders] = useState(orders)

  const groupByProduct = (orders) => {
    const groupedProducts = {}

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const key = `${item._id}-${item.name}`
        if (!groupedProducts[key]) {
          groupedProducts[key] = {
            _id: item._id,
            name: item.name,
            price: item.price,
            imgs: item.imgs,
            quantity: 0,
            orderId: order._id
          }
        }
        groupedProducts[key].quantity +=
          typeof item.quantity === 'number' ? item.quantity : 1
      })
    })

    return Object.values(groupedProducts)
  }

  const groupedProducts = groupByProduct(updatedOrders)

  const handleAddItem = (orderId, item) => {
    onAddItem(orderId, item)
  }
  const handleRemoveItem = (orderId, itemId) => {
    setItemToRemove({ orderId, itemId })
    setShowConfirmation(true)
  }

  const confirmRemove = () => {
    const updatedOrderItems = updatedOrders.map((order) => {
      if (order._id === itemToRemove.orderId) {
        return {
          ...order,
          items: order.items.filter((item) => item._id !== itemToRemove.itemId)
        }
      }
      return order
    })
    setUpdatedOrders(updatedOrderItems)
    onRemoveItem(itemToRemove.orderId, itemToRemove.itemId)
    setShowConfirmation(false)
    setItemToRemove(null)
  }

  const cancelRemove = () => {
    setShowConfirmation(false)
    setItemToRemove(null)
  }
  return (
    <div>
      {groupedProducts.map((product) => (
        <div key={product._id} className="cart-card">
          <img src={product.imgs[0]} alt={product.name} />
          <span>{product.name}</span>
          <span> - Price: {product.price} BD</span>
          <span> - Quantity: {product.quantity} </span>
          <button
            className="cartBtn"
            onClick={() => handleRemoveItem(product.orderId, product._id)}
          >
            Remove
          </button>
        </div>
      ))}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <h3>Are you sure you want to remove this item?</h3>
            <div>
              <button onClick={confirmRemove}>Yes, remove it</button>
              <button onClick={cancelRemove}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartCard
