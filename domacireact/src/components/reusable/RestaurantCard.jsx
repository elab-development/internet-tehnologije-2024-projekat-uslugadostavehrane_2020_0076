import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ id, naziv, adresa, telefon, opis, latitude, longitude, tip_hrane }) => {
  const navigate = useNavigate();

  const handleMapClick = () => {
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapUrl, '_blank'); // Otvara Google Maps sa koordinatama
  };

  const handleMenuClick = () => {
    navigate(`/restaurants/${id}/menu`); // Navigacija na stranicu sa menijem restorana
  };

  return (
    <div className="restaurant-card">
      <h3 className="restaurant-card__title">{naziv}</h3>
      <span className="restaurant-card__type">{tip_hrane}</span>
      <p className="restaurant-card__address">{adresa}</p>
      <p className="restaurant-card__phone">{telefon}</p>
      {opis && <p className="restaurant-card__description">{opis}</p>}
      <button onClick={handleMapClick} className="restaurant-card__map-btn">Pogledaj na mapi</button>
      <button onClick={handleMenuClick} className="restaurant-card__menu-btn">Pogledaj meni</button>
    </div>
  );
};

export default RestaurantCard;
