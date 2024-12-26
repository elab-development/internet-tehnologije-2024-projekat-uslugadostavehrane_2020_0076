import React from 'react';
 
 
import useRestaurants from '../../hooks/useRestaurants';
import RestaurantCard from '../reusable/RestaurantCard';

const RestaurantsList = () => {
  const { restaurants, loading, error } = useRestaurants();

  if (loading) return <p>Učitavanje restorana...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="restaurants-list">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          naziv={restaurant.naziv}
          adresa={restaurant.adresa}
          telefon={restaurant.telefon}
          opis={restaurant.opis}
          latitude={restaurant.latitude}
          longitude={restaurant.longitude}
          tip_hrane={restaurant.tip_hrane}
        />
      ))}
    </div>
  );
};

export default RestaurantsList;
