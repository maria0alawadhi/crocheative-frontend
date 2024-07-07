import React, { useState } from 'react'
import Client from '../services/api'
import { Link } from 'react-router-dom'


const ItemInfo = ({ item, user }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [orders, setOrders] = useState([])

  if (!item || !item.imgs || item.imgs.length === 0) {
    return <div>No image available.</div>
  }

  const handleAddToCart = async () => {
    if (!user || user.role !== 'client') {
      return
    }

    try {
      const response = await Client.post('/orders', {
        user: user.id,
        items: [item._id]
      })
      setOrders([...orders, response.data])
    } catch (error) {
      throw error
    }
  }
  return (
    <div className="item-info">
      <div className="img-container">
        <div className="main-image">
          <img src={item.imgs[selectedImage]} alt="main" />
        </div>
        <div className="small-images">
          {item.imgs.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${index}`}
              className={selectedImage === index ? 'active' : ''}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>
      <div className="item-details">
        <p className="item-name">{item.name}</p>
        <p>Price: {item.price} BD</p>
        <p className="description">{item.description}</p>
        {user && user.role === 'client' && (
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}

        {user && user.role === 'admin' && (
          <Link to="/AllItems">
          <button>
            Back to All items
          </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ItemInfo
