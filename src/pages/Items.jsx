import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const Items = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`)
        setItems(response.data)
      } catch (error) {
        throw error
      }
    }
    fetchItems()
  }, [])
  return <>

  </>
}
export default Items
