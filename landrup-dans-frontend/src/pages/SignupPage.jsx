import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../services/api';
import './SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    age: '',
    password: '',
    confirmPassword: ''
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

    // Validering
    if (formData.password !== formData.confirmPassword) {
      setError('Adgangskoderne matcher ikke');
      return;
    }

    if (formData.password.length < 4) {
      setError('Adgangskode skal være mindst 4 tegn');
      return;
    }

    if (!formData.firstname || !formData.lastname || !formData.username || !formData.age) {
      setError('Alle felter skal udfyldes');
      return;
    }

    setLoading(true);

    try {
      // Opret bruger
      const userData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        username: formData.username,
        age: parseInt(formData.age),
        password: formData.password,
        role: 'member'
      };
      
      await createUser(userData);
      
      // Log automatisk ind efter oprettelse
      const loginData = await loginUser({
        username: formData.username,
        password: formData.password
      });
      
      // Gem token og bruger info
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('userId', loginData.userId);
      localStorage.setItem('role', loginData.role);
      
      // Naviger til home
      navigate('/home');
    } catch (err) {
      setError('Kunne ikke oprette bruger. Brugernavn kan være optaget.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-logo-section">
        <img 
          src="/Group 8.png" 
          alt="LD Logo" 
          className="signup-logo-circle"
        />
        <img 
          src="/Group 4.png" 
          alt="Landrup Dans" 
          className="signup-logo-text"
        />
      </div>

      <h1 className="signup-title">Opret bruger</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        
        <input 
          type="text" 
          name="firstname"
          placeholder="Fornavn" 
          className="signup-input"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          name="lastname"
          placeholder="Efternavn" 
          className="signup-input"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
        <input 
          type="text" 
          name="username"
          placeholder="Brugernavn" 
          className="signup-input"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input 
          type="number" 
          name="age"
          placeholder="Alder" 
          className="signup-input"
          value={formData.age}
          onChange={handleChange}
          required
          min="1"
        />
        <input 
          type="password" 
          name="password"
          placeholder="Adgangskode" 
          className="signup-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input 
          type="password" 
          name="confirmPassword"
          placeholder="Gentag adgangskode" 
          className="signup-input"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-submit" disabled={loading}>
          {loading ? 'Opretter...' : 'Opret bruger'}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
