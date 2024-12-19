import { useState } from 'react';
import axios from 'axios';

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', userData);

      const { token, user } = response.data;

      // Čuvanje tokena i podataka o korisniku u localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (err) {
      setError(err.response?.data?.errors || 'Došlo je do greške pri registraciji.');
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};

export default useRegister;
