import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import AuthPage from './components/Login/AuthPage';
import { UserProvider } from './components/globalne/UserContext';
import Navbar from './components/reusable/Navbar';
 

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar></Navbar>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/ponuda" element={<div>Ponuda</div>} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
