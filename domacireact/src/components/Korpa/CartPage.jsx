import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // za tabele

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Ovde čuvamo dodatne podatke koje korisnik može uneti (adresa, napomena...)
  const [adresa, setAdresa] = useState("");
  const [napomena, setNapomena] = useState("");

  // PDV i slični podaci
  const [pdvStopa] = useState(20);
  const [ukupnaCena, setUkupnaCena] = useState(0);
  const [ukupanPDV, setUkupanPDV] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (user && user.id) {
      const cartKey = `cart_${user.id}`;
      const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(existingCart);
    }
  }, []);

  useEffect(() => {
    let sum = 0;
    cart.forEach(item => {
      sum += item.cena * item.kolicina;
    });
    setUkupnaCena(sum);
    setUkupanPDV((sum * pdvStopa) / 100);
  }, [cart, pdvStopa]);

  const handleRemoveFromCart = (itemId) => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (user && user.id) {
      const cartKey = `cart_${user.id}`;
      const updatedCart = cart.filter((item) => item.id !== itemId);
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const handleIncreaseQty = (itemId) => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (!user.id) return;
    const cartKey = `cart_${user.id}`;
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        return { ...item, kolicina: item.kolicina + 1 };
      }
      return item;
    });
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleDecreaseQty = (itemId) => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    if (!user.id) return;
    const cartKey = `cart_${user.id}`;
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const novaKolicina = item.kolicina > 1 ? item.kolicina - 1 : 1;
        return { ...item, kolicina: novaKolicina };
      }
      return item;
    });
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  /**
   * Generisanje PDF fakture na frontend-u pomoću jsPDF
   */
  const generisiPdfFakturu = () => {
    // Kreiramo instancu jsPDF
    const doc = new jsPDF();

    // Naslov
    doc.setFontSize(18);
    doc.text('Faktura', 14, 20);

    // Dodatni podaci (adresa, napomena, datum)
    doc.setFontSize(12);
    doc.text(`Adresa isporuke: ${adresa}`, 14, 30);
    doc.text(`Napomena: ${napomena}`, 14, 35);
    doc.text(`Datum: ${new Date().toLocaleString()}`, 14, 40);

    // Generišemo tabelu (naziv, količina, cena)
    const tableColumn = ["Naziv", "Količina", "Cena (RSD)"];
    const tableRows = [];

    cart.forEach(item => {
      const rowData = [
        item.naziv,
        item.kolicina,
        item.cena
      ];
      tableRows.push(rowData);
    });

    // Dodajemo tabelu u PDF
    doc.autoTable({
      startY: 45,
      head: [tableColumn],
      body: tableRows
    });

    // Na kraju tabele ispisujemo obračun PDV-a i ukupnu cenu
    let finalY = doc.lastAutoTable.finalY; // Y pozicija gde se tabela završila
    doc.text(`Bez PDV-a: ${ukupnaCena.toFixed(2)} RSD`, 14, finalY + 10);
    doc.text(`PDV (${pdvStopa}%): ${ukupanPDV.toFixed(2)} RSD`, 14, finalY + 16);
    doc.text(`Ukupno: ${(ukupnaCena + ukupanPDV).toFixed(2)} RSD`, 14, finalY + 22);

    // Na kraju - snimamo PDF fajl
    doc.save('faktura.pdf');
  };

  /**
   * Kreiranje porudžbine (axios) pa generisanje PDF-a
   */
  const handleCreateOrderAndDownload = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      if (!user.id) {
        alert("Niste ulogovani!");
        return;
      }
      // Uzimamo token iz sessionStorage
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("Autorizacioni token nije pronađen. Prijavite se ponovo.");
        return;
      }

      const restaurantId = 1;
      // Format datuma: npr. "YYYY-MM-DD HH:MM:SS"
      const datumString = new Date().toISOString().slice(0, 19).replace('T', ' ');

      const orderData = {
        user_id: user.id,
        restaurant_id: restaurantId,
        ukupna_cena: ukupnaCena + ukupanPDV,
        status: "kreirano",
        datum: datumString, 
        order_items: cart.map(item => ({
          menu_item_id: item.id,
          kolicina: item.kolicina,
          cena: item.cena
        })),
      };

      await axios.post(
        'http://127.0.0.1:8000/api/orders',
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Ako je sve uspešno, generišemo PDF
      generisiPdfFakturu();

      // Ispraznimo korpu (i localStorage) nakon uspešnog snimanja
      setCart([]);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify([]));

      // Obavestimo korisnika
      alert("Vaša porudžbina je uspešno kreirana! Faktura je preuzeta u PDF formatu.");

    } catch (error) {
      console.error("Greška prilikom kreiranja porudžbine:", error);
      alert("Greška prilikom kreiranja porudžbine!");
    }
  };

  return (
    <div className="cart-page">
      <h2>Vaša korpa</h2>

      <div style={{ marginTop: '20px' }}>
        <label>Adresa isporuke:</label><br />
        <input
          type="text"
          value={adresa}
          onChange={(e) => setAdresa(e.target.value)}
          style={{ width: '300px', marginBottom: '10px' }}
        /><br />
        <label>Napomena:</label><br />
        <textarea
          value={napomena}
          onChange={(e) => setNapomena(e.target.value)}
          rows={3}
          style={{ width: '300px' }}
        />
      </div>

      {cart.length === 0 ? (
        <p>Korpa je prazna.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="cart-item" 
                style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
              >
                <img
                  src={item.slika}
                  alt={item.naziv}
                  className="cart-item__image"
                  style={{ maxWidth: '80px', marginRight: '20px' }}
                />
                <div className="cart-item__details">
                  <h4>{item.naziv}</h4>
                  <p>Cena: {item.cena} RSD</p>
                  <div className="cart-item__quantity">
                    <button onClick={() => handleDecreaseQty(item.id)}>-</button>
                    <span style={{ margin: '0 10px' }}>{item.kolicina}</span>
                    <button onClick={() => handleIncreaseQty(item.id)}>+</button>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '10px'
                    }}
                  >
                    Ukloni
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="invoice-info" style={{ marginTop: '20px' }}>
            <p><strong>Bez PDV-a:</strong> {ukupnaCena.toFixed(2)} RSD</p>
            <p><strong>PDV ({pdvStopa}%):</strong> {ukupanPDV.toFixed(2)} RSD</p>
            <p><strong>Ukupno za naplatu:</strong> {(ukupnaCena + ukupanPDV).toFixed(2)} RSD</p>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleCreateOrderAndDownload}
              style={{
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Sačuvaj porudžbinu i preuzmi račun (PDF)
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
