import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

const Payment = ({ user }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    cardholderName: ''
  })
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      const deleteOrders = async () => {
        try {
          const response = await Client.get(`/orders/${user?.id}`)
          const orders = response.data

          for (const order of orders) {
            for (const item of order.items) {
              await Client.delete(`/orders/${order._id}/items/${item._id}`)
            }
          }
        } catch (error) {
          console.error('Error deleting orders:', error)
        }
      }

      deleteOrders()
    }
  }, [isSuccess, user?.id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateInput()) {
      setMessage('Please fill in all the required fields correctly.')
      setIsSuccess(false)
      setShowModal(true)
      return
    }

    try {
      setIsSuccess(true)
      setShowModal(true)
    } catch (error) {
      setMessage(
        'An error occurred while processing the payment. Please try again.'
      )
      setIsSuccess(false)
      setShowModal(true)
    }
  }

  const validateInput = () => {
    const { cardNumber, expirationDate, securityCode, cardholderName } =
      formData
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      return false
    }
    const [month, year] = expirationDate.split('/')
    if (
      month.length !== 2 ||
      year.length !== 2 ||
      isNaN(month) ||
      isNaN(year) ||
      parseInt(month) < 1 ||
      parseInt(month) > 12 ||
      parseInt(year) < 23
    ) {
      return false
    }
    if (securityCode.length !== 3 || isNaN(securityCode)) {
      return false
    }
    if (cardholderName.trim() === '') {
      return false
    }
    return true
  }

  const handleCloseModal = () => {
    setShowModal(false)
    if (isSuccess) {
      navigate('/cart')
    }
  }

  const setFormValue = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value
    }))
  }

  return (
    <div className="payment-form">
      <h2>Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-details">
          <label>Card Number</label>
          <input
            type="text"
             id="cardholderName"
            value={formData.cardNumber}
            onChange={(e) => setFormValue('cardNumber', e.target.value)}
            placeholder="**** **** **** ****"
            required
          />
        </div>
        <div className="expiry-cvc">
          <div>
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              type="text"
               id="cardholderName"
              value={formData.expirationDate}
              onChange={(e) => setFormValue('expirationDate', e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="sec-code">
            <label htmlFor="securityCode">Security Code</label>
            <input
              type="text"
             id="cardholderName"
              value={formData.securityCode}
              onChange={(e) => setFormValue('securityCode', e.target.value)}
              placeholder="CVV"
              required
            />
          </div>
        </div>
        <div className="cardholder-name">
          <label htmlFor="cardholderName">Cardholder Name</label>
          <input
            type="text"
            id="cardholderName"
            value={formData.cardholderName}
            onChange={(e) => setFormValue('cardholderName', e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>
        <button className="pay-btn" type="submit">
          Pay
        </button>
      </form>
      {message && <div className="message">{message}</div>}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              X
            </span>
            {isSuccess ? (
              <p>
                Payment successful! You will be redirected to the cart page.
              </p>
            ) : (
              <p>Payment failed. Please try again.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Payment
