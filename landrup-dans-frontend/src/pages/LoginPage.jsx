import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <header className="login-header">
        <button onClick={() => navigate('/home')} className="back-btn">←</button>
        <h1 className="login-title">Log ind</h1>
      </header>

      <form className="login-form">
        <input type="text" placeholder="Brugernavn" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button type="submit" className="login-submit">Log ind</button>
      </form>

      <p className="signup-link">
        Har du ikke en konto? <span onClick={() => navigate('/signup')}>Opret en her</span>
      </p>
    </div>
  );
}

export default LoginPage;
