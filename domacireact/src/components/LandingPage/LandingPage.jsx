import React, { useEffect, useState } from 'react';
import { FaMotorcycle, FaClock, FaStar, FaLeaf, FaUtensils } from 'react-icons/fa';

const LandingPage = () => {
  const [users, setUsers] = useState([]);

  // Putanja za video snimak iz public foldera
  const video = '/3.mp4';

  // Dohvat korisnika za testimonial
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=3')
      .then((res) => res.json())
      .then((data) => setUsers(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="landing-page">
      {/* Hero sekcija */}
      <header className="landing-page__header">
        <div className="landing-page__hero">
          <video
            className="landing-page__video-bg"
            autoPlay
            loop
            muted
            src={video}
          ></video>
          <div className="landing-page__hero-content">
            <h1 className="landing-page__title">brza dostava, sveze namirnice</h1>
            <p className="landing-page__subtitle">najbolja hrana na vasim vratima, u rekordnom roku!</p>
            <a href="#ponuda" className="landing-page__cta-btn">
              poruci odmah
            </a>
          </div>
        </div>
      </header>

      {/* Ponuda sekcija */}
      <section id="ponuda" className="landing-page__services">
        <h2 className="landing-page__section-title">nasa ponuda</h2>
        <div className="landing-page__cards">
          <div className="landing-page__card">
            <FaMotorcycle className="landing-page__card-icon" />
            <h3>brza dostava</h3>
            <p>ekspresna dostava do vasih vrata u roku od 30 minuta.</p>
          </div>
          <div className="landing-page__card">
            <FaClock className="landing-page__card-icon" />
            <h3>uvek sveze</h3>
            <p>koriscenje samo najkvalitetnijih i svezih namirnica.</p>
          </div>
          <div className="landing-page__card">
            <FaStar className="landing-page__card-icon" />
            <h3>top kvalitet</h3>
            <p>proizvodi vrhunskog kvaliteta i proverenih dobavljaca.</p>
          </div>
          <div className="landing-page__card">
            <FaLeaf className="landing-page__card-icon" />
            <h3>zdrava opcija</h3>
            <p>nudimo i sirok izbor zdravih i veganskih obroka.</p>
          </div>
          <div className="landing-page__card">
            <FaUtensils className="landing-page__card-icon" />
            <h3>raznovrsna kuhinja</h3>
            <p>od domacih specijaliteta do internacionalnih jela.</p>
          </div>
        </div>
      </section>

      {/* O nama */}
      <section id="onama" className="landing-page__about">
        <div className="landing-page__about-text">
          <h2>o nama</h2>
          <p>
            mi smo tim entuzijasta koji veruje u kvalitetnu hranu, brzu dostavu i osmeh na licu svakog kupca. nasa
            misija je da vam olaksamo svakodnevicu i obogatimo ishranu najboljim mogucim jelima.
          </p>
          <p>
            odlucili smo spojiti najbolje kuhinje sveta sa naprednom tehnologijom dostave, tako da dobijete najbolje
            iskustvo uz minimalan trud. jednostavno, brzo, kvalitetno.
          </p>
        </div>
        <div className="landing-page__about-images">
          <img src="https://images.squarespace-cdn.com/content/v1/611b3a86fb6a226aadffcf79/6873585e-8c0e-4485-a8e0-0c42bdc9cf78/food+and+grocery+delivery+service.png" alt="hrana" className="landing-page__img" />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQANeevsaGoUDxjcPxzrznTiNRjfEh9PiSxrXrmXVtLS4nLuKRz-8qAxpluuRUhU5o26uQ&usqp=CAU"
            alt="narudzba"
            className="landing-page__img landing-page__img--small"
          />
        </div>
      </section>

      {/* Testimonial sekcija */}
      <section className="landing-page__testimonials">
        <h2>nasi zadovoljni kupci</h2>
        <div className="landing-page__testimonials-grid">
          {users.map((user, index) => (
            <div className="landing-page__testimonial" key={index}>
              <img
                src={user.picture.large}
                alt={`${user.name.title} ${user.name.first} ${user.name.last}`}
                style={{
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  marginBottom: '1rem',
                }}
              />
              <p>"odlicna usluga, hrana stigla toplija nego sto sam ocekivao!"</p>
              <span>
                - {`${user.name.title} ${user.name.first} ${user.name.last}, ${user.location.country}, ${user.dob.age} god`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA sekcija */}
      <section className="landing-page__cta-section">
        <h2>isprobajte nas odmah!</h2>
        <p>narucite iz udobnosti svog doma i uverite se u nas kvalitet i uslugu.</p>
        <a href="#ponuda" className="landing-page__cta-btn landing-page__cta-btn--dark">
          pogledaj menije
        </a>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="landing-page__footer">
        <div className="landing-page__footer-content">
          <div>
            <h3>kontakt</h3>
            <p>email: info@dostava-hrane.com</p>
            <p>telefon: +387 33 123 456</p>
          </div>
          <div>
            <h3>adresa</h3>
            <p>ulica x br. y, sarajevo, bih</p>
          </div>
          <div>
            <h3>radno vreme</h3>
            <p>pon - ned: 08:00 - 23:00</p>
          </div>
        </div>
        <p className="landing-page__footer-note">&copy; 2024 app za dostavu hrane - sva prava zadrzana.</p>
      </footer>
    </div>
  );
};

export default LandingPage;