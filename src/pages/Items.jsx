import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import ItemCard from '../components/ItemCard'
import { useParams } from 'react-router'

const Items = () => {
  const [items, setItems] = useState([])
  const { categoryName } = useParams()

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${categoryName}/items`)
        setItems(response.data)
      } catch (error) {
        throw error
      }
    }
    fetchItems()
  }, [])
  return (
    <div>
      <h2 className="title">{categoryName}</h2>

      {items.map((item, index) => (
        <div key={index}>
          <ItemCard item={item} />
        </div>
      ))}
    </div>
  )
}
export default Items
