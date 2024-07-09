import React from 'react'

const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <div className="category-text">{category}</div>
      <img src="https://i.imgur.com/XB548KH.png" alt="category" />
    </div>
  )
}

export default CategoryCard
