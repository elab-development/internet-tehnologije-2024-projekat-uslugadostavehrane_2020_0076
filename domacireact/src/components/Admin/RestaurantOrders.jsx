import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const RestaurantOrders = () => {
  const { id: restaurantId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/restaurants/${restaurantId}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.data);
      } catch (err) {
        setError("Greška prilikom preuzimanja porudžbina.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  const calculateStatistics = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.ukupna_cena), 0);
    const orderStatuses = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return { totalOrders, totalRevenue, orderStatuses };
  };

  const { totalOrders, totalRevenue, orderStatuses } = calculateStatistics();

  const columns = [
    {
      name: "ID porudžbine",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Korisnik",
      selector: (row) => `${row.user.ime} ${row.user.prezime}`,
      sortable: true,
    },
    {
      name: "Ukupna cena",
      selector: (row) => `${row.ukupna_cena} RSD`,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Datum",
      selector: (row) => new Date(row.datum).toLocaleDateString(),
    },
    {
      name: "Stavke",
      cell: (row) =>
        row.order_items && row.order_items.length > 0
          ? row.order_items.map((item) => (
              <div key={item.id}>
                {item.menu_item?.naziv || "Nepoznato jelo"} x {item.kolicina} ({item.cena} RSD)
              </div>
            ))
          : "Nema stavki",
    },
  ];

  if (loading) return <p>Učitavanje porudžbina...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="restaurant-orders">
      <h1>Porudžbine za restoran ID: {restaurantId}</h1>
      <DataTable columns={columns} data={orders} pagination highlightOnHover responsive />
      <div className="order-statistics">
        <h2>Statistike</h2>
        <p>Ukupan broj porudžbina: {totalOrders}</p>
        <p>Ukupan prihod: {totalRevenue.toFixed(2)} RSD</p>
        <h3>Status porudžbina:</h3>
        <ul>
          {Object.entries(orderStatuses).map(([status, count]) => (
            <li key={status}>
              {status}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantOrders;
