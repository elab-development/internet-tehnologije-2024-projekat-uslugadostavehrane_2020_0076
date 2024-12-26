import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../globalne/UserContext';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {

    const { saveUser } = useContext(UserContext); // Pristup globalnom stanju
    const navigate = useNavigate(); // Navigacija za redirekciju
  // Stanje za mod prikaza (login ili register)
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Stanje za korake registracije
  const [step, setStep] = useState(1);

  // Država za greške i poruke
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login polja
  const [loginEmail, setLoginEmail] = useState('filip_vukovic@outlook.com');
  const [loginPassword, setLoginPassword] = useState('filipvukovic');

  // Register polja
  const [ime, setIme] = useState('Proba');
  const [prezime, setPrezime] = useState('Proba');
  const [regEmail, setRegEmail] = useState('proba@gmail.com');
  const [regPassword, setRegPassword] = useState('proba123');
  const [regPasswordConf, setRegPasswordConf] = useState('proba123');
  const [adresa, setAdresa] = useState('Adresa 12');
  const [telefon, setTelefon] = useState('0612854554');
  const [latitude, setLatitude] = useState('55');
  const [longitude, setLongitude] = useState('66');
  const [uloga, setUloga] = useState('korisnik');

  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  /**
   *  Funkcija za login logiku
   */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: loginEmail,
        password: loginPassword,
      });

      const { token, message, user } = response.data;

      // Sačuvaj token u localStorage
      localStorage.setItem('authToken', token);

      // Prikaži poruku o uspešnoj prijavi
      setSuccessMessage(message || 'Prijava uspešna!');

 

      saveUser(user, token); // Sačuvaj korisnika u globalnom stanju
      setSuccessMessage(message || 'Prijava uspešna!');
      navigate('/ponuda'); // Redirekcija na stranicu ponuda
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Greška prilikom prijave.');
      } else {
        setErrorMessage('Došlo je do greške. Pokušaj ponovo.');
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        ime,
        prezime,
        email: regEmail,
        password: regPassword,
        password_confirmation: regPasswordConf,
        adresa,
        telefon,
        latitude: latitude ? Number(latitude) : null,
        longitude: longitude ? Number(longitude) : null,
        uloga,
      });
      const { token, message, user } = response.data;

      saveUser(user, token); // Sačuvaj korisnika u globalnom stanju
      setSuccessMessage(message || 'Uspešna registracija!');
      navigate('/ponuda'); // Redirekcija na stranicu ponuda
      setSuccessMessage(response.data.message || 'Uspešna registracija!');
      setStep(1); // Resetuj korake
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Greška prilikom registracije.');
      } else {
        setErrorMessage('Došlo je do greške. Pokušaj ponovo.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">{isLoginMode ? 'Prijava' : 'Registracija'}</h1>

        {errorMessage && <div className="auth-error">{errorMessage}</div>}
        {successMessage && <div className="auth-success">{successMessage}</div>}

        {isLoginMode ? (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="loginEmail">Email:</label>
              <input
                type="email"
                id="loginEmail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="loginPassword">Lozinka:</label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">Prijavi se</button>
          </form>
        ) : (
          <>
            <div className="progress-bar">
              <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
            </div>
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="auth-form">
                <div className="auth-form-group">
                  <label htmlFor="ime">Ime:</label>
                  <input
                    type="text"
                    id="ime"
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="prezime">Prezime:</label>
                  <input
                    type="text"
                    id="prezime"
                    value={prezime}
                    onChange={(e) => setPrezime(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="regEmail">Email:</label>
                  <input
                    type="email"
                    id="regEmail"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="regPassword">Lozinka:</label>
                  <input
                    type="password"
                    id="regPassword"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="regPasswordConf">Potvrda lozinke:</label>
                  <input
                    type="password"
                    id="regPasswordConf"
                    value={regPasswordConf}
                    onChange={(e) => setRegPasswordConf(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="auth-submit-btn">Sledeći korak</button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleRegisterSubmit} className="auth-form">
                <div className="auth-form-group">
                  <label htmlFor="adresa">Adresa:</label>
                  <input
                    type="text"
                    id="adresa"
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="telefon">Telefon:</label>
                  <input
                    type="text"
                    id="telefon"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="latitude">Latitude:</label>
                  <input
                    type="number"
                    step="any"
                    id="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="longitude">Longitude:</label>
                  <input
                    type="number"
                    step="any"
                    id="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>

                <div className="auth-form-group">
                  <label htmlFor="uloga">Uloga:</label>
                  <select
                    id="uloga"
                    value={uloga}
                    onChange={(e) => setUloga(e.target.value)}
                  >
                    <option value="korisnik">Korisnik</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button type="button" onClick={handlePreviousStep} className="auth-submit-btn">Nazad</button>
                <button type="submit" className="auth-submit-btn">Registruj se</button>
              </form>
            )}
          </>
        )}

        <button
          type="button"
          className="auth-toggle-btn"
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode
            ? 'Nemate nalog? Registrujte se ovde.'
            : 'Već imate nalog? Prijavite se ovde.'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
