import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        {/* Header */}
        <header className="header">
          <img src="/Group 8.png" alt="LD Logo" className="header-logo" />
          <img src="/Group 4.png" alt="Landrup Dans" className="header-text-logo" />
        </header>

        <button className="login-btn" onClick={() => navigate('/login')}>
          Log ind her
        </button>
      </section>

      {/* Holdtyper Section */}
      <section className="holdtyper-section">
        <h2 className="section-title">Vores holdtyper</h2>

        {/* Børnehold */}
        <div className="holdtype-card">
          <h3 className="holdtype-title">Børnehold</h3>
          <img src="/boernedans.jpg" alt="Børnehold" className="holdtype-image" />
          <p className="holdtype-description">
            På børneholdene leger vi os ind i dansens verden gennem musik, bevægelse og fantasi. 
            Undervisningen styrker motorik, rytme og kropsbevidsthed i trygge rammer. 
            Fokus er på danseglæde, fællesskab og aktiv bevægelse, hvor alle kan være med.
          </p>
        </div>

        {/* Selskabs- og seniordans */}
        <div className="holdtype-card">
          <h3 className="holdtype-title">Selskabs- og seniordans</h3>
          <img src="/seniordans.jpg" alt="Selskabs- og seniordans" className="holdtype-image" />
          <p className="holdtype-description">
            Selskabs- og seniordans kombinerer hyggeligt samvær med skånsom motion. 
            Vi danser klassiske pardanse i et tempo, hvor alle kan følge med. 
            Undervisningen styrker balance, koordination og kondition, samtidig med at 
            fællesskabet og danseglæden er i centrum.
          </p>
        </div>

        {/* Moderne dans og ballet */}
        <div className="holdtype-card">
          <h3 className="holdtype-title">Moderne dans og ballet</h3>
          <img src="/modernedans.JPG" alt="Moderne dans og ballet" className="holdtype-image" />
          <p className="holdtype-description">
            Moderne dans og ballet forener teknik, kropskontrol og musikalsk udtryk. 
            Træningen forbedrer styrke, smidighed og holdning gennem varierede øvelser. 
            Undervisningen foregår i en positiv atmosfære, hvor bevægelsesglæde og 
            koncentration skaber både fordybelse og effektiv motion.
          </p>
        </div>

        {/* Streetdance og hiphop */}
        <div className="holdtype-card">
          <h3 className="holdtype-title">Streetdance og hiphop</h3>
          <img src="/streethiphop.jpg" alt="Streetdance og hiphop" className="holdtype-image" />
          <p className="holdtype-description">
            Streetdance og hiphop er energifyldt træning med fokus på rytme, attitude og fællesskab. 
            Vi arbejder med grooves, koreografier og grundtrin, der styrker kondition og koordination. 
            Stemningen er uformel og motiverende, så motion og danseglæde går hånd i hånd.
          </p>
        </div>
      </section>

      {/* Nyhedsbrev */}
      <section className="newsletter-section">
        <h2 className="section-title">Nyhedsbrev</h2>
        <p className="newsletter-description">
          Få besked når der sker nye og spændende ting hos Landrup Dans
        </p>
        <button className="newsletter-btn">Tilmeld</button>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">Det siger vores kunder om os</h2>
        <div className="testimonial-card">
          <img src="/detsigerkunderne.jpg" alt="Kunde" className="testimonial-image" />
          <p className="testimonial-text">
            "Dans er mit bedste! Landrup Dans har været min hjemmebase i flere år nu, 
            og det er ligesom min familie. Instruktørerne er alle venlige og super dygtige, 
            derudover er alle elever søde og imødekommende."
          </p>
          <p className="testimonial-author">- Cecilie Caspersen</p>
          <div className="testimonial-nav">
            <button className="nav-btn">←</button>
            <button className="nav-btn">→</button>
          </div>
        </div>
      </section>

      {/* Kontakt os */}
      <section className="contact-section">
        <h2 className="section-title">Kontakt os</h2>
        <form className="contact-form">
          <input type="text" placeholder="Navn" className="contact-input" />
          <input type="email" placeholder="Email" className="contact-input" />
          <textarea placeholder="Din besked" className="contact-textarea"></textarea>
          <button type="submit" className="contact-submit">Send besked</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src="/Group 8.png" alt="LD Logo" className="footer-logo" />
        <div className="footer-text">
          <p>Landrup Dans</p>
          <p>Rønnebærvej 1, 9000 Roskilde</p>
          <p>Tlf. 3560-4370</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
