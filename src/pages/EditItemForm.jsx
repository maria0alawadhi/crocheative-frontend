import React, { useState, useEffect } from 'react'
import Client from '../services/api'
import { useParams, useNavigate } from 'react-router-dom'

const EditItemForm = () => {
  const [item, setItem] = useState(null)
  const { itemId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await Client.get(`/items/${itemId}`)
        setItem({ ...response.data, imgs: response.data.imgs || [] })
      } catch (error) {
        console.error('Error fetching item:', error)
      }
    }
    fetchItem()
  }, [itemId])

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }

  const handleImgChange = (e) => {
    setItem({ ...item, imgs: [...item.imgs, e.target.value] })
  }

  const handleUpdateItem = async () => {
    try {
      await Client.put(`/items/${itemId}`, item)
      navigate('/AllItems')
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  if (!item) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="title">Edit Item</h2>
      <form className="form">
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={item.description}
            onChange={handleInputChange}
          ></textarea>
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Count in Stock:
          <input
            type="number"
            name="countInStock"
            value={item.countInStock}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Images:
          <input
            type="text"
            name="imgs"
            value={item.imgs[item.imgs.length - 1] || ''}
            onChange={handleImgChange}
          />
        </label>
        <button type="button" onClick={handleUpdateItem}>
          Update
        </button>
      </form>
    </div>
  )
}

export default EditItemForm
