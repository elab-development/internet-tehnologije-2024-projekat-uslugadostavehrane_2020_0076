import { useState } from 'react';
import axios from 'axios';

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');

      // Poziv API-ja za odjavu
      await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Brisanje tokena i korisničkih podataka iz localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (err) {
      setError(err.response?.data?.message || 'Došlo je do greške pri odjavi.');
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};

export default useLogout;
