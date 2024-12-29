import React from "react";
import DataTable from "react-data-table-component";
import useRestaurants from "../../hooks/useRestaurants";
 

const UpravljanjeRestoranima = () => {
  const { restaurants, loading, error } = useRestaurants();

  const columns = [
    {
      name: "Naziv",
      selector: (row) => row.naziv,
      sortable: true,
    },
    {
      name: "Adresa",
      selector: (row) => row.adresa,
    },
    {
      name: "Telefon",
      selector: (row) => row.telefon,
    },
    {
      name: "Tip hrane",
      selector: (row) => row.tip_hrane || "N/A",
    },
    {
      name: "Opis",
      selector: (row) => row.opis || "N/A",
    },
  ];

  if (loading) return <p>Učitavanje podataka...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div>
      <h1>Restorani</h1>
      <DataTable
        columns={columns}
        data={restaurants}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
};

export default UpravljanjeRestoranima;
