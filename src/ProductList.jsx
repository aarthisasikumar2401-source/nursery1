import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  [1,"Snake Plant","Air Purifying Plants",499,"https://images.unsplash.com/photo-1593482892290-f54927ae2a0e?auto=format&fit=crop&w=700&q=80","A hardy indoor plant that helps freshen indoor spaces."],
  [2,"Peace Lily","Air Purifying Plants",599,"https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=700&q=80","An elegant plant with beautiful white flowers."],
  [3,"Spider Plant","Air Purifying Plants",379,"https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=700&q=80","A beginner-friendly plant with attractive leaves."],
  [4,"ZZ Plant","Air Purifying Plants",699,"https://images.unsplash.com/photo-1632207691144-0f4f4e5e6b84?auto=format&fit=crop&w=700&q=80","A low-maintenance plant that works well in low light."],
  [5,"Money Plant","Air Purifying Plants",299,"https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=700&q=80","A popular decorative indoor plant for homes and offices."],
  [6,"Areca Palm","Air Purifying Plants",799,"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80","A tropical-looking plant that adds freshness indoors."],
  [7,"Rose Plant","Flowering Plants",399,"https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=700&q=80","A colourful flowering plant for gardens."],
  [8,"Orchid","Flowering Plants",749,"https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?auto=format&fit=crop&w=700&q=80","An elegant flowering plant with long-lasting blooms."],
  [9,"Anthurium","Flowering Plants",649,"https://images.unsplash.com/photo-1614594895303-fe7116ac3b58?auto=format&fit=crop&w=700&q=80","A striking plant with glossy leaves and bright flowers."],
  [10,"Jasmine","Flowering Plants",449,"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=700&q=80","A fragrant flowering plant for sunny spaces."],
  [11,"Hibiscus","Flowering Plants",429,"https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=700&q=80","A vibrant plant with large colourful blooms."],
  [12,"Lavender","Flowering Plants",529,"https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=700&q=80","A fragrant plant with beautiful purple flowers."],
  [13,"Aloe Vera","Medicinal Plants",349,"https://images.unsplash.com/photo-1596547609652-9cf5d8c6c6a5?auto=format&fit=crop&w=700&q=80","A useful succulent that is easy to grow indoors."],
  [14,"Aloe Aristata","Medicinal Plants",399,"https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80","A compact succulent suited to bright spaces."],
  [15,"Neem Plant","Medicinal Plants",299,"https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=700&q=80","A traditional plant valued for natural uses."],
  [16,"Tulsi","Medicinal Plants",199,"https://images.unsplash.com/photo-1596547609652-9cf5d8c6c6a5?auto=format&fit=crop&w=700&q=80","A fragrant herb traditionally grown in Indian homes."],
  [17,"Mint Plant","Medicinal Plants",179,"https://images.unsplash.com/photo-1591298483975-9f4f8f3d8e45?auto=format&fit=crop&w=700&q=80","A fresh aromatic herb that grows well in containers."],
  [18,"Lemongrass","Medicinal Plants",249,"https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=700&q=80","An aromatic grass commonly used in cooking and wellness."]
].map(([id,name,category,price,image,description]) => ({id,name,category,price,image,description}));

function ProductList({ onHomeClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const categories = [...new Set(plants.map((plant) => plant.category))];

  const getQuantity = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section className="product-page">
      <div className="product-navbar">
        <button className="nav-link" onClick={onHomeClick}>Home</button>
        <h2>Paradise Nursery</h2>
        <button className="cart-link" onClick={onCartClick}>🛒 Cart ({totalCartItems})</button>
      </div>

      <div className="product-header">
        <h1>Our Plants</h1>
        <p>Choose from our collection of healthy and beautiful plants.</p>
      </div>

      {categories.map((category) => (
        <section className="category-section" key={category}>
          <h2 className="category-name">{category}</h2>
          <div className="product-grid">
            {plants.filter((plant) => plant.category === category).map((plant) => {
              const quantity = getQuantity(plant.id);
              return (
                <article className="product-card" key={plant.id}>
                  <img src={plant.image} alt={plant.name} />
                  <div className="product-card-content">
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <div className="price">₹{plant.price}</div>
                    <button
                      className={quantity > 0 ? "product-button disabled" : "product-button"}
                      disabled={quantity > 0}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {quantity > 0 ? `Added to Cart (${quantity})` : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
export default ProductList;
