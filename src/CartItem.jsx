import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();


  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach(item => {
      let numericPrice = Number(item.cost.replace(/[^\d.-]/g, "")); //Convert item cost to number
      totalCost += numericPrice * item.quantity;
    });
    console.log("cart", cart);
    return totalCost;
  };

  const handleContinueShopping = (e) => {
    console.log('called continue desde carrito');
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    console.log("handleIncrement called");
    console.log("item: ", item);
    let newQuantity = item.quantity + 1;
    let name = item.name;
    //newQuantity ++;
    dispatch(updateQuantity({name, quantity: newQuantity}));
    console.log(newQuantity);
  };

  const handleDecrement = (item) => {
    let name = item.name;

    if (item.quantity > 1) {
      let newQuantity = item.quantity - 1;
      dispatch(updateQuantity({name, quantity: newQuantity}));
    } else {
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let numericPrice = Number(item.cost.replace(/[^\d.-]/g, "")); //Convert item cost to number
    let itemCost = numericPrice * item.quantity;
    return itemCost;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


