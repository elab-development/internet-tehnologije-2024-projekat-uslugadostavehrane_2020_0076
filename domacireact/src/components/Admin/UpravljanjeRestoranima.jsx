import React, { useState } from "react";
import DataTable from "react-data-table-component";
import useRestaurants from "../../hooks/useRestaurants";
import axios from "axios";
 

const UpravljanjeRestoranima = () => {
  const { restaurants, loading, error } = useRestaurants();
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(null);
  const [restaurantData, setRestaurantData] = useState({
    naziv: "",
    adresa: "",
    telefon: "",
    tip_hrane: "",
    opis: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

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
    {
      name: "Akcije",
      cell: (row) => (
        <div className="actions-cell">
          <button
            className="edit-btn"
            onClick={() => handleEditRestaurant(row.id, row)}
          >
            Izmeni
          </button>
          <button
            className="delete-btn"
            onClick={() => handleDeleteRestaurant(row.id)}
          >
            Obriši
          </button>
        </div>
      ),
    },
  ];

  const handleSaveRestaurant = async () => {
    setSaving(true);
    setSaveError(null);
    const token = sessionStorage.getItem("token");
    try {
      if (isEditMode) {
        await axios.put(
          `http://127.0.0.1:8000/api/restaurants/${currentRestaurantId}`,
          restaurantData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/restaurants",
          restaurantData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setShowModal(false);
      window.location.reload(); // Osvježavanje nakon čuvanja
    } catch (err) {
      setSaveError(err.response?.data?.message || "Došlo je do greške.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditRestaurant = (id, data) => {
    setCurrentRestaurantId(id);
    setRestaurantData(data);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteRestaurant = async (id) => {
    setDeleteError(null);
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/restaurants/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload(); // Osvježavanje nakon brisanja
    } catch (err) {
      setDeleteError(err.response?.data?.message || "Došlo je do greške prilikom brisanja.");
    }
  };

  if (loading) return <p>Učitavanje podataka...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="restaurants-management">
      <h1>Restorani</h1>
      {deleteError && <p className="error-message">{deleteError}</p>}
      <button
        className="add-restaurant-btn"
        onClick={() => {
          setRestaurantData({
            naziv: "",
            adresa: "",
            telefon: "",
            tip_hrane: "",
            opis: "",
          });
          setIsEditMode(false);
          setShowModal(true);
        }}
      >
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
            <h2>{isEditMode ? "Izmeni restoran" : "Dodaj novi restoran"}</h2>
            {saveError && <p className="error-message">{saveError}</p>}
            <div className="modal-form">
              <label>Naziv</label>
              <input
                type="text"
                value={restaurantData.naziv}
                onChange={(e) =>
                  setRestaurantData({ ...restaurantData, naziv: e.target.value })
                }
              />
              <label>Adresa</label>
              <input
                type="text"
                value={restaurantData.adresa}
                onChange={(e) =>
                  setRestaurantData({ ...restaurantData, adresa: e.target.value })
                }
              />
              <label>Telefon</label>
              <input
                type="text"
                value={restaurantData.telefon}
                onChange={(e) =>
                  setRestaurantData({ ...restaurantData, telefon: e.target.value })
                }
              />
              <label>Tip hrane</label>
              <input
                type="text"
                value={restaurantData.tip_hrane}
                onChange={(e) =>
                  setRestaurantData({ ...restaurantData, tip_hrane: e.target.value })
                }
              />
              <label>Opis</label>
              <textarea
                value={restaurantData.opis}
                onChange={(e) =>
                  setRestaurantData({ ...restaurantData, opis: e.target.value })
                }
              />
              <button
                className="submit-btn"
                onClick={handleSaveRestaurant}
                disabled={saving}
              >
                {saving ? "Čuvanje..." : isEditMode ? "Sačuvaj" : "Dodaj"}
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
