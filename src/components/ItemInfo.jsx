import React, { useState } from 'react'
import { useParams } from 'react-router'
import Client from '../services/api'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'

const ItemInfo = ({ item, user }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  let navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [reviews, setReviews] = useState([])
  const { itemId } = useParams()
  const userid = user?.id
  const [review, setReview] = useState({
    review: '',
    user: userid,
    item: itemId
  })

  const closeModal = () => {
    setShowModal(false)
    navigate('/')
  }

  const handleChange = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    const reviewItem = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${itemId}/reviews`)
        setReviews(response.data)
      } catch (error) {
        console.error('Error Data Fetching:', error)
      }
    }
    reviewItem()
  }, [itemId])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await Client.post(`${itemId}/reviews`, review)
      setReview({ review: '', user: user?.id, item: itemId })
      console.log(review)
      setShowModal(true)
    } catch (err) {
      console.error(err)
    }
  }

  if (!item || !item.imgs || item.imgs.length === 0) {
    return <div>No image available.</div>
  }

  const handleAddToCart = async () => {
    if (!user || user.role !== 'client') {
      return
    }

    try {
      const response = await Client.post('/orders', {
        user: user?.id,
        items: [item._id]
      })
      setOrders([...orders, response.data])
    } catch (error) {
      throw error
    }
  }
  return (
    <div className="items">
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
          </div>
          </div>

        <div className="review-info">
          
          <form onSubmit={handleSubmit}>
            <input id='review' type="hidden" name="item" value={review.item} disabled />
            <input id='review' type="hidden" name="user" value={review.user} disabled />
            <label htmlFor="review">
              <h1>Review</h1>
            </label>
            <textarea id='review'
              name="review"
              value={review.review}
              onChange={handleChange}
            />
            <button type="submit">Submit Review</button>
          </form>


          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-title">{review.user.name}</p>
              <p>{review.review}</p>
            </div>
          ))}

          {showModal && (
            <>
              <div className="modal-overlay" onClick={closeModal}></div>
              <div className="modal">
                <h3>Success</h3>
                <p>Review Submitted successfully!</p>
                <button onClick={closeModal}>OK</button>
              </div>
            </>
          )}
          {/* <h2>Reviews</h2>
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p>User: {review.user.username}</p>
              <p>{review.review}</p>
            </div>
          ))} */}
          <h2>Reviews</h2>
          {Array.isArray(item.reviews) && item.reviews.length > 0 ? (
            item.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p>User: {review.user?.username || 'Unknown'}</p>
                <p>{review.review}</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>

        {user && user.role === 'admin' && (
          <Link to="/AllItems">
            <button>Back to All items</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ItemInfo
