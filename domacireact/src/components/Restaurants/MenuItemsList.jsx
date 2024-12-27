import React from 'react';
import { useParams } from 'react-router-dom';
import useMenuItems from '../../hooks/useMenuItems';
import MenuItemCard from '../reusable/MenuItemCard';

const MenuItemsList = () => {
  const { id: restaurantId } = useParams();
  const { menuItems, loading, error } = useMenuItems(restaurantId);

  if (loading) return <p>Učitavanje stavki menija...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="menu-items-list">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item.id}
          id={item.id}
          naziv={item.naziv}
          opis={item.opis}
          cena={item.cena}
          alergeni={item.alergeni}
          sastojci={item.sastojci}
          slika={item.slika}
        />
      ))}
    </div>
  );
};

export default MenuItemsList;
