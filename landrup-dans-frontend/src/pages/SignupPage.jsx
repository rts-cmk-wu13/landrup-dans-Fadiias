import './SignupPage.css';

function SignupPage() {
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

      <form className="signup-form">
        <input 
          type="text" 
          name="firstname"
          placeholder="Fornavn" 
          className="signup-input"
        />
        <input 
          type="text" 
          name="lastname"
          placeholder="Efternavn" 
          className="signup-input"
        />
        <input 
          type="text" 
          name="username"
          placeholder="Brugernavn" 
          className="signup-input"
        />
        <input 
          type="number" 
          name="age"
          placeholder="Alder" 
          className="signup-input"
        />
        <input 
          type="password" 
          name="password"
          placeholder="Adgangskode" 
          className="signup-input"
        />
        <input 
          type="password" 
          name="confirmPassword"
          placeholder="Gentag adgangskode" 
          className="signup-input"
        />

        <button type="submit" className="signup-submit">Log ind</button>
      </form>
    </div>
  );
}

export default SignupPage;
