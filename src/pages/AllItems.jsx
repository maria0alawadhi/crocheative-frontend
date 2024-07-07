import React, { useState, useEffect } from 'react'
import AddItemForm from './AddItemForm'
import EditItemForm from './EditItemForm'
import Client from '../services/api'
import '../App.css'
import { useNavigate, Link } from 'react-router-dom'

const AllItems = () => {
  const [items, setItems] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showAddItemForm, setShowAddItemForm] = useState(false)

  const toggleAddItemForm = () => {
    setShowAddItemForm((prevState) => !prevState)
  }

  const navigate = useNavigate()

  const closeModal = () => {
    setShowModal(false)
    navigate('/AllItems')
  }

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await Client.get('/items')
        setItems(response.data)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }
    fetchItems()
  }, [])

  const handleAddItem = async (newItem) => {
    try {
      const response = await Client.post('/items', newItem)
      setItems([...items, response.data])
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const handleEditItem = (item) => {
    setIsEditing(true)
    setEditingItem(item)
    navigate(`/edit/${item._id}`)
  }

  const handleUpdateItem = async (updatedItem) => {
    try {
      const response = await Client.put(
        `/items/${updatedItem._id}`,
        updatedItem
      )
      setItems(
        items.map((item) =>
          item._id === updatedItem._id ? response.data : item
        )
      )
      setIsEditing(false)
      setEditingItem(null)
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  const handleDeleteItem = async (itemId) => {
    try {
      await Client.delete(`/items/${itemId}`)
      setItems((prevData) => prevData.filter((item) => item._id !== itemId))
      setShowModal(true)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <div className="items-page">
      <button className="add-item-btn" onClick={toggleAddItemForm}>
        {showAddItemForm ? 'Close Add Item - ' : 'Add Item + '}
      </button>
      {showAddItemForm && (
        <div className="add-item-form">
          <h2 className="title">Add Item</h2>
          <AddItemForm onAddItem={handleAddItem} />
        </div>
      )}
      <h2 className="title">All Items</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>
                {isEditing && editingItem?._id === item._id ? (
                  <EditItemForm
                    item={editingItem}
                    onUpdateItem={handleUpdateItem}
                  />
                ) : (
                  <Link to={`/${item.category}/items/${item._id}`}>
                    {item.name}
                  </Link>
                )}
              </td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>
                {isEditing && editingItem?._id === item._id ? null : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditItem(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    

      {showModal && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal">
            <h3>Success</h3>
            <p>Item deleted successfully!</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </>
      )}
    </div>
  )
}

export default AllItems
