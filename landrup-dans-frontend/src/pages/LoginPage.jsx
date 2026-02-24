import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import './LoginPage.css';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [huskMig, setHuskMig] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check for saved cookie on mount — skip login if remembered
  useEffect(() => {
    const token = getCookie('token');
    const userId = getCookie('userId');
    const role = getCookie('role');
    if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role || '');
      navigate('/profil');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(formData);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);

      if (huskMig) {
        setCookie('token', data.token, 30);
        setCookie('userId', data.userId, 30);
        setCookie('role', data.role, 30);
      } else {
        deleteCookie('token');
        deleteCookie('userId');
        deleteCookie('role');
      }

      navigate('/profil');
    } catch (err) {
      setError('Forkert brugernavn eller adgangskode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo-section">
        <img src="/Group 8.png" alt="LD Logo" className="login-logo-circle" />
        <img src="/Group 4.png" alt="Landrup Dans" className="login-logo-text" />
      </div>

      <div className="login-divider" />

      <h1 className="login-title">Log ind</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Brugernavn"
          className="login-input"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="husk-mig-label">
          <input
            type="checkbox"
            checked={huskMig}
            onChange={(e) => setHuskMig(e.target.checked)}
            className="husk-mig-checkbox"
          />
          Husk mig
        </label>

        <button type="submit" className="login-submit" disabled={loading}>
          {loading ? 'Logger ind...' : 'Log ind'}
        </button>
      </form>

      <p className="signup-link">
        Er du endnu ikke bruger? <span onClick={() => navigate('/signup')}>Opret dig her!</span>
      </p>
    </div>
  );
}

export default LoginPage;
