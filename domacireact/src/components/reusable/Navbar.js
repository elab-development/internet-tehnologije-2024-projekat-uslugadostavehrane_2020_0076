import React, { useContext } from 'react';
import { UserContext } from '../globalne/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Pošalji zahtev za odjavu
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Prosleđujemo token u zaglavlju
        },
      });

      // Očisti globalno stanje i sessionStorage
      clearUser();

      // Redirekcija na početnu stranicu
      navigate('/');
    } catch (error) {
      console.error('Greška prilikom odjave:', error.response?.data || error.message);
    }
  };

  return (
    <nav>
      <ul>
        <li><a href="/">Početna</a></li>
        {user ? (
          <>
            <li><a href="/ponuda">Ponuda</a></li>
            <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Odjava</li>
          </>
        ) : (
          <li><a href="/auth">Prijava / Registracija</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
