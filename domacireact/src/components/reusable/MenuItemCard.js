import React from 'react';

const MenuItemCard = ({ naziv, opis, cena, alergeni, sastojci, slika }) => {
  return (
    <div className="menu-item-card">
      <img src={slika} alt={naziv} className="menu-item-card__image" />
      <div className="menu-item-card__content">
        <h4 className="menu-item-card__title">{naziv}</h4>
        <p className="menu-item-card__description">{opis}</p>
        <p className="menu-item-card__price"><strong>Cena:</strong> {cena} RSD</p>
        {alergeni && <p className="menu-item-card__allergens"><strong>Alergeni:</strong> {alergeni}</p>}
        {sastojci && <p className="menu-item-card__ingredients"><strong>Sastojci:</strong> {sastojci}</p>}
      </div>
    </div>
  );
};

export default MenuItemCard;
