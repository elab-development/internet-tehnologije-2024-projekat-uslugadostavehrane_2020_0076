import { useState, useEffect } from 'react';
import axios from 'axios';

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true); // Obezbeđujemo da se stanje učitavanja pravilno resetuje
      const token = sessionStorage.getItem('token'); // Dohvati token iz session storage-a

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/restaurants', {
          headers: {
            Authorization: `Bearer ${token}`, // Dodajemo token u zaglavlje
          },
        });
        setRestaurants(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Došlo je do greške.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
};

export default useRestaurants;
