import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(formData);
      
      // Gem token og bruger info i localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);
      
      // Naviger til home
      navigate('/home');
    } catch (err) {
      setError('Forkert brugernavn eller adgangskode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <button onClick={() => navigate('/home')} className="back-btn">←</button>
        <h1 className="login-title">Log ind</h1>
      </header>

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
        <button type="submit" className="login-submit" disabled={loading}>
          {loading ? 'Logger ind...' : 'Log ind'}
        </button>
      </form>

      <p className="signup-link">
        Har du ikke en konto? <span onClick={() => navigate('/signup')}>Opret en her</span>
      </p>
    </div>
  );
}

export default LoginPage;
