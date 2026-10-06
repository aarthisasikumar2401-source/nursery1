import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const changeQuantity = (item, amount) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + amount }));
  };

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-cart">
          <h1>Shopping Cart</h1>
          <p>Your cart is empty.</p>
          <button className="continue-button" onClick={onContinueShopping}>Continue Shopping</button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-top">
        <button className="nav-link dark" onClick={onContinueShopping}>← Continue Shopping</button>
        <h1>Shopping Cart</h1>
        <span>{totalItems} item(s)</span>
      </div>

      <div className="cart-layout">
        <div className="cart-products">
          {cart.map((item) => (
            <article className="cart-product" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-product-details">
                <h2>{item.name}</h2>
                <p className="unit-price">₹{item.price} each</p>
                <div className="quantity-row">
                  <span>Quantity:</span>
                  <button className="quantity-button" onClick={() => changeQuantity(item, -1)}>-</button>
                  <strong>{item.quantity}</strong>
                  <button className="quantity-button" onClick={() => changeQuantity(item, 1)}>+</button>
                </div>
                <p className="subtotal">Subtotal: ₹{item.price * item.quantity}</p>
                <button className="delete-button" onClick={() => dispatch(removeItem(item.id))}>Delete</button>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Cart Summary</h2>
          <p>Total Plants: {totalItems}</p>
          <h3>Total Amount: ₹{totalAmount}</h3>
          <button className="checkout-button" onClick={() => alert("Checkout functionality coming soon!")}>Checkout</button>
          <button className="continue-button" onClick={onContinueShopping}>Continue Shopping</button>
        </aside>
      </div>
    </section>
  );
}
export default CartItem;
