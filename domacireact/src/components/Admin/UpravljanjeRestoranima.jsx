import React, { useState } from "react";
import DataTable from "react-data-table-component";
import useRestaurants from "../../hooks/useRestaurants";
import axios from "axios";
 

const UpravljanjeRestoranima = () => {
  const { restaurants, loading, error } = useRestaurants();
  const [showModal, setShowModal] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    naziv: "",
    adresa: "",
    telefon: "",
    tip_hrane: "",
    opis: "",
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

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

  const handleAddRestaurant = async () => {
    setAdding(true);
    setAddError(null);
    const token = sessionStorage.getItem("token");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/restaurants",
        newRestaurant,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowModal(false);
      window.location.reload(); // Osvježavanje nakon dodavanja
    } catch (err) {
      setAddError(err.response?.data?.message || "Došlo je do greške.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p>Učitavanje podataka...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="restaurants-management">
      <h1>Restorani</h1>
      <button className="add-restaurant-btn" onClick={() => setShowModal(true)}>
        Dodaj Restoran
      </button>
      <DataTable
        columns={columns}
        data={restaurants}
        pagination
        highlightOnHover
        responsive
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Dodaj novi restoran</h2>
            {addError && <p className="error-message">{addError}</p>}
            <div className="modal-form">
              <label>Naziv</label>
              <input
                type="text"
                value={newRestaurant.naziv}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, naziv: e.target.value })
                }
              />
              <label>Adresa</label>
              <input
                type="text"
                value={newRestaurant.adresa}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, adresa: e.target.value })
                }
              />
              <label>Telefon</label>
              <input
                type="text"
                value={newRestaurant.telefon}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, telefon: e.target.value })
                }
              />
              <label>Tip hrane</label>
              <input
                type="text"
                value={newRestaurant.tip_hrane}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, tip_hrane: e.target.value })
                }
              />
              <label>Opis</label>
              <textarea
                value={newRestaurant.opis}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, opis: e.target.value })
                }
              />
              <button
                className="submit-btn"
                onClick={handleAddRestaurant}
                disabled={adding}
              >
                {adding ? "Dodavanje..." : "Dodaj"}
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Odustani
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpravljanjeRestoranima;
