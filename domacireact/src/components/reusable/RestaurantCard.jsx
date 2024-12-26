import React from 'react';

const RestaurantCard = ({ naziv, adresa, telefon, opis, latitude, longitude, tip_hrane }) => {
  const handleMapClick = () => {
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapUrl, '_blank'); // Otvara Google Maps sa koordinatama
  };

  return (
    <div className="restaurant-card">
      <h3 className="restaurant-card__title">{naziv}</h3>
      <span className="restaurant-card__type">{tip_hrane}</span>
      <p className="restaurant-card__address">{adresa}</p>
      <p className="restaurant-card__phone">{telefon}</p>
      {opis && <p className="restaurant-card__description">{opis}</p>}
      <button onClick={handleMapClick} className="restaurant-card__map-btn">Pogledaj na mapi</button>
    </div>
  );
};

export default RestaurantCard;
