import React from 'react';

const MenuItemCard = ({ id, naziv, opis, cena, alergeni, sastojci, slika }) => {
  const handleAddToCart = () => {
    // Preuzimamo trenutno ulogovanog korisnika
    const user = JSON.parse(localStorage.getItem("user")) || {};

    if (!user || !user.id) {
      alert("Morate biti ulogovani kako biste dodali proizvod u korpu!");
      return;
    }

    // Ključ za korpu zasnovan na ID-u korisnika
    const cartKey = `cart_${user.id}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Kreiramo stavku za dodavanje
    const newItem = { id, naziv, cena, slika };
    existingCart.push(newItem);

    // Snimamo nazad u localStorage
    localStorage.setItem(cartKey, JSON.stringify(existingCart));

    alert(`Dodali ste "${naziv}" u korpu!`);
  };

  return (
    <div className="menu-item-card">
      <img src={slika} alt={naziv} className="menu-item-card__image" />
      <div className="menu-item-card__content">
        <h4 className="menu-item-card__title">{naziv}</h4>
        <p className="menu-item-card__description">{opis}</p>
        <p className="menu-item-card__price">
          <strong>Cena:</strong> {cena} RSD
        </p>
        {alergeni && (
          <p className="menu-item-card__allergens">
            <strong>Alergeni:</strong> {alergeni}
          </p>
        )}
        {sastojci && (
          <p className="menu-item-card__ingredients">
            <strong>Sastojci:</strong> {sastojci}
          </p>
        )}
        <button onClick={handleAddToCart} className="menu-item-card__add-btn">
          Dodaj u korpu
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
