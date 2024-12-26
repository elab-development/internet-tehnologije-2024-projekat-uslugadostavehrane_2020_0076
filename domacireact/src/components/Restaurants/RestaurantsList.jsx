import React, { useState, useMemo } from 'react';
import useRestaurants from '../../hooks/useRestaurants';
import RestaurantCard from '../reusable/RestaurantCard';

const RestaurantsList = () => {
  const { restaurants, loading, error } = useRestaurants();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Broj restorana po stranici
  const [filter, setFilter] = useState('');

  // Filtrirani restorani prema nazivu ili tipu hrane
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(
      (restaurant) =>
        restaurant.naziv.toLowerCase().includes(filter.toLowerCase()) ||
        restaurant.tip_hrane.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, restaurants]);

  // Paginisani restorani
  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRestaurants.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredRestaurants]);

  // Ukupan broj stranica
  const totalPages = Math.ceil(filteredRestaurants.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <p>Učitavanje restorana...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="restaurants-list-container">
      <input
        type="text"
        placeholder="Pretraži restorane..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="restaurants-list__filter"
      />

      <div className="restaurants-list">
        {paginatedRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
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

      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-controls__btn"
        >
          Prethodna
        </button>
        <span className="pagination-controls__info">
          Strana {currentPage} od {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-controls__btn"
        >
          Sledeća
        </button>
      </div>
    </div>
  );
};

export default RestaurantsList;
