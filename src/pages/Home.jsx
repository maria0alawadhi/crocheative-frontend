import React, { useEffect, useState } from 'react'
import '../App.css'
import CategoryCard from '../components/CategoryCard'
import Items from '../pages/Items'
import { Link } from 'react-router-dom'

const Home = ({ categories }) => {
  return (
    <div>
      <div className="img-container"></div>
      <div className="category-container">
        <h1 className="title">Categories</h1>

        {categories.map((category) => (
          <Link to={`/${category}/items`} key={category}>
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>
      <div className="about-us-container"></div>
      <div className="contact-us-container"></div>
    </div>
  )
}

export default Home
