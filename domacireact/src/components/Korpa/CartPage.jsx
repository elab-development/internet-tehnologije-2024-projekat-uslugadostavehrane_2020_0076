import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Učitavamo korpu iz localStorage prilikom mount-a
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (user && user.id) {
      const cartKey = `cart_${user.id}`;
      const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(existingCart);
    }
  }, []);

  const handleRemoveFromCart = (itemId) => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (user && user.id) {
      const cartKey = `cart_${user.id}`;

      // Filtriramo iz local state-a
      const updatedCart = cart.filter((item) => item.id !== itemId);

      // Ažuriramo localStorage
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));

      // Postavljamo novi state da bismo odmah ažurirali prikaz
      setCart(updatedCart);
    }
  };

  return (
    <div className="cart-page">
      <h2>Vaša korpa</h2>
      {cart.length === 0 ? (
        <p>Korpa je prazna.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.slika} alt={item.naziv} className="cart-item__image" />
              <div className="cart-item__details">
                <h4>{item.naziv}</h4>
                <p>{item.cena} RSD</p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="cart-item__remove-btn"
                >
                  Ukloni
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
