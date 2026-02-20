import { useNavigate, useLocation } from 'react-router-dom';
import './NavigationFooter.css';

function NavigationFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="navigation-footer">
      <div className="nav-item" onClick={() => navigate('/home')}>
        <div className={`nav-icon ${location.pathname === '/home' ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={location.pathname === '/home' ? '#000000' : '#6F6F6F'} strokeWidth="2"/>
            <path d="M9 22V12h6v10" stroke={location.pathname === '/home' ? '#000000' : '#6F6F6F'} strokeWidth="2"/>
          </svg>
        </div>
        <span className={location.pathname === '/home' ? 'active' : ''}>Home</span>
      </div>

      <div className="nav-item" onClick={() => navigate('/aktiviteter')}>
        <div className={`nav-icon ${location.pathname.includes('/aktiviteter') ? 'active' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="8" fill={location.pathname.includes('/aktiviteter') ? '#000000' : '#6F6F6F'}/>
          </svg>
        </div>
        <span className={location.pathname.includes('/aktiviteter') ? 'active' : ''}>Aktiviteter</span>
      </div>

      <div className="nav-item" onClick={() => navigate('/profil')}>
        <div className={`nav-icon ${location.pathname === '/profil' ? 'active' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="8" fill={location.pathname === '/profil' ? '#000000' : '#6F6F6F'}/>
          </svg>
        </div>
        <span className={location.pathname === '/profil' ? 'active' : ''}>Profil</span>
      </div>
    </footer>
  );
}

export default NavigationFooter;
