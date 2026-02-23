import { useNavigate, useLocation } from 'react-router-dom';
import { IoHome, IoGrid, IoPerson } from 'react-icons/io5';
import './Footer.css';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show footer on home page
  if (location.pathname === '/home' || location.pathname === '/') {
    return null;
  }

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <footer className="footer-nav">
      <button 
        className={`nav-btn ${isActive('/home') ? 'active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <IoHome className="nav-icon" />
        <span className="nav-label">Home</span>
      </button>
      
      <button 
        className={`nav-btn ${isActive('/aktiviteter') ? 'active' : ''}`}
        onClick={() => navigate('/aktiviteter')}
      >
        <IoGrid className="nav-icon" />
        <span className="nav-label">Aktiviteter</span>
      </button>
      
      <button 
        className={`nav-btn ${isActive('/profil') ? 'active' : ''}`}
        onClick={() => navigate('/profil')}
      >
        <IoPerson className="nav-icon" />
        <span className="nav-label">Profil</span>
      </button>
    </footer>
  );
}

export default Footer;
