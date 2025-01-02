import React from "react";
import { useParams } from "react-router-dom";
import useMenuItems from "../../hooks/useMenuItems";
import DataTable from "react-data-table-component";

const MenuItems = () => {
  const { id: restaurantId } = useParams(); // Dohvatamo ID restorana iz URL-a
  const { menuItems, loading, error } = useMenuItems(restaurantId);

  const columns = [
    {
      name: "Naziv jela",
      selector: (row) => row.naziv,
      sortable: true,
    },
    {
      name: "Cena",
      selector: (row) => `${row.cena} RSD`,
    },
    {
      name: "Opis",
      selector: (row) => row.opis || "N/A",
    },
  ];

  if (loading) return <p>Učitavanje stavki menija...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="menu-items">
      <h1>Stavke menija za restoran ID: {restaurantId}</h1>
      <DataTable
        columns={columns}
        data={menuItems}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default MenuItems;
