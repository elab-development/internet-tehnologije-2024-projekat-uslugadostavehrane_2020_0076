import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Učitaj podatke iz session storage
    const savedUser = sessionStorage.getItem('user');
    const savedToken = sessionStorage.getItem('token');
    if (savedUser && savedToken) {
      return { ...JSON.parse(savedUser), token: savedToken };
    }
    return null;
  });

  const saveUser = (userData, token) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('token', token);
    setUser({ ...userData, token });
  };

  const clearUser = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
