import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HoldtypeCard from '../components/HoldtypeCard';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const holdtyper = [
    {
      title: "Børnehold",
      image: "/boernedans.jpg",
      description: "På børneholdene leger vi os ind i dansens verden gennem musik, bevægelse og fantasi. Undervisningen styrker motorik, rytme og kropsbevidsthed i trygge rammer. Fokus er på danseglæde, fællesskab og aktiv bevægelse, hvor alle kan være med."
    },
    {
      title: "Selskabs- og seniordans",
      image: "/seniordans.jpg",
      description: "Selskabs- og seniordans kombinerer hyggeligt samvær med skånsom motion. Vi danser klassiske pardanse i et tempo, hvor alle kan følge med. Undervisningen styrker balance, koordination og kondition, samtidig med at fællesskabet og danseglæden er i centrum."
    },
    {
      title: "Moderne dans og ballet",
      image: "/modernedans.JPG",
      description: "Moderne dans og ballet forener teknik, kropskontrol og musikalsk udtryk. Træningen forbedrer styrke, smidighed og holdning gennem varierede øvelser. Undervisningen foregår i en positiv atmosfære, hvor bevægelsesglæde og koncentration skaber både fordybelse og effektiv motion."
    },
    {
      title: "Streetdance og hiphop",
      image: "/streethiphop.jpg",
      description: "Streetdance og hiphop er energifyldt træning med fokus på rytme, attitude og fællesskab. Vi arbejder med grooves, koreografier og grundtrin, der styrker kondition og koordination. Stemningen er uformel og motiverende, så motion og danseglæde går hånd i hånd."
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <Header />
        <button className="login-btn" onClick={() => navigate('/login')}>
          Log ind her
        </button>
      </section>

      {/* Holdtyper Section */}
      <section className="holdtyper-section">
        <h2 className="section-title">Vores holdtyper</h2>
        {holdtyper.map((holdtype, index) => (
          <HoldtypeCard 
            key={index}
            title={holdtype.title}
            image={holdtype.image}
            description={holdtype.description}
          />
        ))}
        <div className="activities-link-section">
          <button className="view-activities-btn" onClick={() => navigate('/aktiviteter')}>
            Se alle aktiviteter
          </button>
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

      <Footer />
    </div>
  );
}

export default HomePage;
