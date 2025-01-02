import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useMenuItems from "../../hooks/useMenuItems";
import DataTable from "react-data-table-component";
import axios from "axios";

const MenuItems = () => {
  const { id: restaurantId } = useParams();
  const { menuItems, loading, error } = useMenuItems(restaurantId);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMenuItemId, setCurrentMenuItemId] = useState(null);
  const [menuItemData, setMenuItemData] = useState({
    naziv: "",
    opis: "",
    cena: "",
    alergeni: "",
    sastojci: "",
    slika: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const columns = [
    { name: "Naziv jela", selector: (row) => row.naziv, sortable: true },
    { name: "Cena", selector: (row) => `${row.cena} RSD` },
    { name: "Opis", selector: (row) => row.opis || "N/A" },
    {
      name: "Akcije",
      cell: (row) => (
        <div className="actions-cell">
          <button className="edit-btn" onClick={() => handleEditMenuItem(row)}>
            Izmeni
          </button>
          <button className="delete-btn" onClick={() => handleDeleteMenuItem(row.id)}>
            Obriši
          </button>
        </div>
      ),
    },
  ];

  const handleSaveMenuItem = async () => {
    setSaving(true);
    setSaveError(null);
    const token = sessionStorage.getItem("token");

    try {
      if (isEditMode) {
        await axios.put(
          `http://127.0.0.1:8000/api/menu-items/${currentMenuItemId}`,
          { ...menuItemData, restaurant_id: restaurantId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/menu-items",
          { ...menuItemData, restaurant_id: restaurantId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      setSaveError(err.response?.data?.message || "Došlo je do greške.");
    } finally {
      setSaving(false);
    }
  };

  const handleEditMenuItem = (menuItem) => {
    setCurrentMenuItemId(menuItem.id);
    setMenuItemData(menuItem);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteMenuItem = async (id) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/menu-items/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (err) {
      console.error("Došlo je do greške prilikom brisanja:", err);
    }
  };

  if (loading) return <p>Učitavanje stavki menija...</p>;
  if (error) return <p>Greška: {error}</p>;

  return (
    <div className="menu-items">
      <h1>Stavke menija</h1>
      <button
        className="add-menu-item-btn"
        onClick={() => {
          setMenuItemData({
            naziv: "",
            opis: "",
            cena: "",
            alergeni: "",
            sastojci: "",
            slika: "",
          });
          setIsEditMode(false);
          setShowModal(true);
        }}
      >
        Dodaj stavku menija
      </button>
      <DataTable columns={columns} data={menuItems} pagination highlightOnHover responsive />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isEditMode ? "Izmeni stavku" : "Dodaj novu stavku"}</h2>
            {saveError && <p className="error-message">{saveError}</p>}
            <div className="modal-form">
              <label>Naziv</label>
              <input
                type="text"
                value={menuItemData.naziv}
                onChange={(e) => setMenuItemData({ ...menuItemData, naziv: e.target.value })}
              />
              <label>Opis</label>
              <textarea
                value={menuItemData.opis}
                onChange={(e) => setMenuItemData({ ...menuItemData, opis: e.target.value })}
              />
              <label>Cena</label>
              <input
                type="number"
                value={menuItemData.cena}
                onChange={(e) => setMenuItemData({ ...menuItemData, cena: e.target.value })}
              />
              <label>Alergeni</label>
              <input
                type="text"
                value={menuItemData.alergeni}
                onChange={(e) => setMenuItemData({ ...menuItemData, alergeni: e.target.value })}
              />
              <label>Sastojci</label>
              <textarea
                value={menuItemData.sastojci}
                onChange={(e) => setMenuItemData({ ...menuItemData, sastojci: e.target.value })}
              />
              <label>Slika (URL)</label>
              <input
                type="text"
                value={menuItemData.slika}
                onChange={(e) => setMenuItemData({ ...menuItemData, slika: e.target.value })}
              />
              <button className="submit-btn" onClick={handleSaveMenuItem} disabled={saving}>
                {saving ? "Čuvanje..." : isEditMode ? "Sačuvaj" : "Dodaj"}
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Odustani
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems;
