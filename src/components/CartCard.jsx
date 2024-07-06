import React from 'react'

const CartCard = ({ orders, onUpdateQuantity, onRemoveItem }) => {
  const handleUpdateQuantity = async (orderId, itemId, quantity) => {
    try {
      const orderIndex = orders.findIndex((o) => o._id === orderId)
      const itemIndex = orders[orderIndex]?.items.findIndex(
        (i) => i._id === itemId
      )

      if (itemIndex !== undefined) {
        orders[orderIndex].items[itemIndex].quantity = quantity
        onUpdateQuantity([...orders])
      } else {
        const updatedOrder = await Client.post(`/orders/${orderId}/items`, {
          itemId,
          quantity
        })
        const updatedCart = [...orders, updatedOrder.data]
        onUpdateQuantity(updatedCart)
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  const handleRemoveItem = (orderId, itemId) => {
    onRemoveItem(orderId, itemId)
  }

  const handleQuantityChange = (orderId, itemId, quantity) => {
    handleUpdateQuantity(orderId, itemId, quantity)
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}>
          {order.items.map((item) => (
            <div key={item._id} className="cart-card">
              <img src={item.imgs[0]} alt={item.name} />
              <span>{item.name} </span>
              <span> Price: {item.price} BD</span>
              <span> Quantity: {item.quantity} </span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(order._id, item._id, e.target.value)
                }
              />
              <button onClick={() => handleRemoveItem(order._id, item._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CartCard
