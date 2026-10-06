import { useState } from "react";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUs";
import ProductList from "./ProductList";
import CartItem from "./CartItem";

function App() {
  const [view, setView] = useState("landing");
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      {view === "landing" && (
        <>
          <main className="landing-page">
            <div className="landing-overlay">
              <div className="landing-content">
                <p className="welcome-text">WELCOME TO</p>
                <h1>Paradise Nursery</h1>
                <div className="divider"></div>
                <p className="tagline">Where Green Meets Serenity</p>
                <button className="get-started-button" onClick={() => setView("products")}>Get Started</button>
              </div>
            </div>
          </main>
          <AboutUs />
        </>
      )}

      {view === "products" && (
        <ProductList onHomeClick={() => setView("landing")} onCartClick={() => setView("cart")} totalItems={totalCartItems} />
      )}

      {view === "cart" && <CartItem onContinueShopping={() => setView("products")} />}

      <footer><p>© 2026 Paradise Nursery Shopping Application</p></footer>
    </div>
  );
}
export default App;
