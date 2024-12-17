import React, { useEffect, useState } from 'react';
import { FaMotorcycle, FaClock, FaStar, FaLeaf, FaUtensils } from 'react-icons/fa';

const LandingPage = () => {
  const [users, setUsers] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const videos = ['1.mp4','2.mp4','3.mp4']; // Pretpostavka da se nalaze u public ili src/assets folderu

  // Dohvat random usera za testimonial
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=3')
      .then(res => res.json())
      .then(data => setUsers(data.results))
      .catch(err => console.error(err));
  }, []);

  // Slider za hero background video
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo(prevIndex => (prevIndex + 1) % videos.length);
    }, 5000);  
    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <header className="landing-page__header">
        <div className="landing-page__hero">
          <video
            className="landing-page__video-bg"
            autoPlay
            loop
            muted
            src={videos[currentVideo]}
          ></video>
          <div className="landing-page__hero-content">
            <h1 className="landing-page__title">Brza Dostava, Svježe Namirnice</h1>
            <p className="landing-page__subtitle">Najbolja hrana na Vašim vratima, u rekordnom roku!</p>
            <a href="#ponuda" className="landing-page__cta-btn">Poruči odmah</a>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="ponuda" className="landing-page__services">
        <h2 className="landing-page__section-title">Naša Ponuda</h2>
        <div className="landing-page__cards">
          <div className="landing-page__card">
            <FaMotorcycle className="landing-page__card-icon"/>
            <h3>Brza Dostava</h3>
            <p>Ekspresna dostava do vaših vrata u roku od 30 minuta.</p>
          </div>
          <div className="landing-page__card">
            <FaClock className="landing-page__card-icon"/>
            <h3>Uvijek Sveže</h3>
            <p>Korištenje samo najkvalitetnijih i svježih namirnica.</p>
          </div>
          <div className="landing-page__card">
            <FaStar className="landing-page__card-icon"/>
            <h3>Top Kvalitet</h3>
            <p>Proizvodi vrhunskog kvaliteta i provjerenih dobavljača.</p>
          </div>
          <div className="landing-page__card">
            <FaLeaf className="landing-page__card-icon"/>
            <h3>Zdrava Opcija</h3>
            <p>Nudimo i širok izbor zdravih i veganskih obroka.</p>
          </div>
          <div className="landing-page__card">
            <FaUtensils className="landing-page__card-icon"/>
            <h3>Raznovrsna Kuhinja</h3>
            <p>Od domaćih specijaliteta do internacionalnih jela.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="onama" className="landing-page__about">
        <div className="landing-page__about-text">
          <h2>O Nama</h2>
          <p>
            Mi smo tim entuzijasta koji vjeruje u kvalitetnu hranu, brzu dostavu i osmijeh na licu svakog kupca.
            Naša misija je da vam olakšamo svakodnevicu i obogatimo ishranu najboljim mogućim jelima.
          </p>
          <p>
            Odlučili smo spojiti najbolje kuhinje svijeta s naprednom tehnologijom dostave, tako da dobijete najbolje
            iskustvo uz minimalan trud. Jednostavno, brzo, kvalitetno.
          </p>
        </div>
        <div className="landing-page__about-images">
          <img src="https://via.placeholder.com/350x250" alt="hrana" className="landing-page__img"/>
          <img src="https://via.placeholder.com/250x250" alt="narudžba" className="landing-page__img landing-page__img--small"/>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="landing-page__testimonials">
        <h2>Naši Zadovoljni Kupci</h2>
        <div className="landing-page__testimonials-grid">
          {users.map((user, index) => (
            <div className="landing-page__testimonial" key={index}>
              <img
                src={user.picture.large}
                alt={`${user.name.title} ${user.name.first} ${user.name.last}`}
                style={{borderRadius: '50%', width: '80px', height: '80px', objectFit: 'cover', marginBottom: '1rem'}}
              />
              {/* Ovo je primjer statičkog komentara, možete ga zamijeniti sa dinamičkim sadržajem */}
              <p>"Odlična usluga, hrana stigla toplija nego što sam očekivao!"</p>
              <span>
                - {`${user.name.title} ${user.name.first} ${user.name.last}, ${user.location.country}, ${user.dob.age} god`}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-page__cta-section">
        <h2>Isprobajte Nas Odmah!</h2>
        <p>Naručite iz udobnosti svog doma i uvjerite se u naš kvalitet i uslugu.</p>
        <a href="#ponuda" className="landing-page__cta-btn landing-page__cta-btn--dark">Pogledaj Menije</a>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="landing-page__footer">
        <div className="landing-page__footer-content">
          <div>
            <h3>Kontakt</h3>
            <p>Email: info@dostava-hrane.com</p>
            <p>Telefon: +387 33 123 456</p>
          </div>
          <div>
            <h3>Adresa</h3>
            <p>Ulica X br. Y, Sarajevo, BiH</p>
          </div>
          <div>
            <h3>Radno Vrijeme</h3>
            <p>Pon - Ned: 08:00 - 23:00</p>
          </div>
        </div>
        <p className="landing-page__footer-note">© 2024 App Za Dostavu Hrane - Sva prava zadržana.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
