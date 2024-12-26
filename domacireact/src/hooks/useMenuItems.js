import { useState, useEffect } from 'react';
import axios from 'axios';

const useMenuItems = (restaurantId) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem('authToken'); // Preuzimanje tokena iz session storage-a
        const response = await axios.get(`http://127.0.0.1:8000/api/restaurants/${restaurantId}/menu-items`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setMenuItems(response.data.data); // Postavljanje stavki menija
      } catch (err) {
        setError(err.response?.data?.message || 'Došlo je do greške prilikom preuzimanja stavki menija.');
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  return { menuItems, loading, error };
};

export default useMenuItems;
