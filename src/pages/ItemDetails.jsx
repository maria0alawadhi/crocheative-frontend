
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { BASE_URL } from '../services/api'
import ItemInfo from '../components/ItemInfo'

const ItemDetails = ({ user }) => {
  const [item, setItem] = useState({ reviews: [] })
  const { itemId, categoryName } = useParams()

  useEffect(() => {
    const getItem = async () => {
      try {
        const itemResponse = await axios.get(
          `${BASE_URL}/${categoryName}/items/${itemId}`
        )
        setItem(itemResponse.data)

        const reviewsResponse = await axios.get(
          `${BASE_URL}/${categoryName}/items/${itemId}/reviews`
        )
        setItem((prevItem) => ({ ...prevItem, reviews: reviewsResponse.data }))
      } catch (error) {
        throw error
      }
    }
    getItem()
  }, [])

  return (
    <div>
      <ItemInfo item={item} user={user} itemId={itemId} />
    </div>
  )
}

export default ItemDetails