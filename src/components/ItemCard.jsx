import React from 'react'

const ItemCard = ({ item }) => {
console.log("item"+JSON.stringify(item,null,2))
  return (
    <div className="item-card">
      <img src={item.imgs[0]} />
      <p className="card-title">{item.name}</p>
      <p className="card price">Price: {item.price} BD</p>
      
    </div>
  )
}

export default ItemCard
