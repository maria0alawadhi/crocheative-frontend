import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { BASE_URL } from '../services/api'
import ItemInfo from '../components/ItemInfo'
import axios from 'axios'

const ItemDetails = ({ user }) => {
  const [item, setItem] = useState(null)
  const { itemId, categoryName } = useParams()

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/${categoryName}/items/${itemId}`
        )
        setItem(response.data)
      } catch (error) {
        throw error
      }
    }
    getItem()
  }, [])

  return (
    <div>
      <ItemInfo item={item} user={user} />
    </div>
  )
}

export default ItemDetails