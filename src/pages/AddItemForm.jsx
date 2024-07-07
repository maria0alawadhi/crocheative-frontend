import React, { useState } from 'react'

const AddItemForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    price: '',
    countInStock: '',
    imgs: []
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleImgChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: [...prevFormData[name], value]
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newItem = {
      category: formData.category,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      countInStock: parseInt(formData.countInStock),
      imgs: formData.imgs
    }

    onAddItem(newItem)

    setFormData({
      category: '',
      name: '',
      description: '',
      price: '',
      countInStock: '',
      imgs: []
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="countInStock">Count In Stock:</label>
        <input
          type="number"
          id="countInStock"
          name="countInStock"
          value={formData.countInStock}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="imgs">Images:</label>
        <input
          type="text"
          id="imgs"
          name="imgs"
          value={formData.imgs[formData.imgs.length - 1] || ''}
          onChange={handleImgChange}
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  )
}

export default AddItemForm
