import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './IntroPage.css';

function IntroPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect til home page efter 3 sekunder
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="intro-page">
      <div className="intro-content">
        <h1 className="intro-title">LANDRUP DANS</h1>
        
        <div className="intro-logos">
          <img 
            src="/Group 4.png" 
            alt="Landrup Dans Logo" 
            className="intro-logo-small"
          />
          <img 
            src="/Group 8.png" 
            alt="LD Logo Circle" 
            className="intro-logo-circle"
          />
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
