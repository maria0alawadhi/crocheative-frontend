const CartCard = ({ orders }) => {
  console.log('orders:::' + JSON.stringify(orders, null, 2)) // Optional logging
  return (
    <div>
      {orders.map((order) => (
        <div key={order._id}>
          {order.items.map((item, index) => (
            <div key={index} className="cart-card">
              <img src={item.imgs[0]} />
              <span>{item.name}</span>
              <span>price:{item.price}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
export default CartCard
