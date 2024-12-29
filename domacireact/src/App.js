import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import AuthPage from './components/Login/AuthPage';
import { UserProvider } from './components/globalne/UserContext';
import Navbar from './components/reusable/Navbar';
import RestaurantsList from './components/Restaurants/RestaurantsList';
import MenuItemsList from './components/Restaurants/MenuItemsList';
import CartPage from './components/Korpa/CartPage';
import UpravljanjeRestoranima from './components/Admin/UpravljanjeRestoranima';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/ponuda" element={<RestaurantsList />} />
            <Route path="/restaurants/:id/menu" element={<MenuItemsList />} />
            <Route path="/korpa" element={<CartPage />} />
            <Route path="/admin" element={<UpravljanjeRestoranima />} />

          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
