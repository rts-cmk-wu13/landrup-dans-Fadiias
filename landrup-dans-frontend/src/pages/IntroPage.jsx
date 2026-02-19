import { useNavigate } from 'react-router-dom';
import './IntroPage.css';

function IntroPage() {
  const navigate = useNavigate();

  return (
    <div className="intro-page">
      <p className="velkommen-text">Velkommen</p>
      
      <div className="intro-content">
        <img 
          src="/Group 8.png" 
          alt="LD Logo" 
          className="intro-logo-circle"
        />
        <img 
          src="/Group 4.png" 
          alt="Landrup Dans" 
          className="intro-logo-text"
        />
      </div>
      
      <button className="intro-login-btn" onClick={() => navigate('/home')}>
        Log ind her
      </button>
    </div>
  );
}

export default IntroPage;
