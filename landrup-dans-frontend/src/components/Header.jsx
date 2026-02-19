import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-logos">
        <img src="/Group 8.png" alt="LD Logo" className="header-logo" />
        <img src="/Group 4.png" alt="Landrup Dans" className="header-text-logo" />
      </div>
      <button className="login-btn" onClick={() => navigate('/login')}>
        Log ind her
      </button>
    </header>
  );
}

export default Header;
