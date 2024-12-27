import React, { useState } from 'react';

const MenuItemCard = ({ id, naziv, opis, cena, alergeni, sastojci, slika }) => {
  // Lokalni state za količinu
  const [kolicina, setKolicina] = useState(1);

  const handleAddToCart = () => {
    // Uzimamo trenutno ulogovanog korisnika iz localStorage
    const user = JSON.parse(localStorage.getItem("user")) || {};

    if (!user || !user.id) {
      alert("Morate biti ulogovani kako biste dodali proizvod u korpu!");
      return;
    }

    // Ključ za korpu zasnovan na ID-u korisnika
    const cartKey = `cart_${user.id}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Kreiramo stavku za dodavanje
    const newItem = { 
      id, 
      naziv, 
      cena, 
      slika, 
      kolicina 
    };

    // Provera da li već postoji ova stavka u korpi
    const index = existingCart.findIndex(item => item.id === id);
    if (index !== -1) {
      // Ako već postoji, samo uvećavamo količinu
      existingCart[index].kolicina += kolicina;
    } else {
      // Ako ne postoji, dodajemo kao novu stavku
      existingCart.push(newItem);
    }

    // Snimamo nazad u localStorage
    localStorage.setItem(cartKey, JSON.stringify(existingCart));

    alert(`Dodali ste ${kolicina} x "${naziv}" u korpu!`);
    // Resetujemo polje za količinu na 1 (po želji)
    setKolicina(1);
  };

  // Povećavamo ili smanjujemo vrednost količine 
  const handleDecrease = () => {
    if (kolicina > 1) {
      setKolicina(kolicina - 1);
    }
  };

  const handleIncrease = () => {
    setKolicina(kolicina + 1);
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

        {/* Kontrolisanje količine */}
        <div className="quantity-controls">
          <button onClick={handleDecrease}>-</button>
          <input 
            type="number" 
            value={kolicina} 
            min="1" 
            onChange={(e) => setKolicina(Number(e.target.value))} 
          />
          <button onClick={handleIncrease}>+</button>
        </div>

        {/* Dodavanje u korpu */}
        <button onClick={handleAddToCart} className="menu-item-card__add-btn">
          Dodaj u korpu
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;
