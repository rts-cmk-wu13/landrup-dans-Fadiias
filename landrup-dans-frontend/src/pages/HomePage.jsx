import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HoldtypeCard from '../components/HoldtypeCard';
import { getAllTestimonials, subscribeNewsletter, sendMessage } from '../services/api';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactMsg, setContactMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    getAllTestimonials()
      .then(data => setTestimonials(data))
      .catch(() => {});
  }, []);

  const holdtyper = [
    { title: "Børnehold", image: "/boernedans.jpg", description: "På børneholdene leger vi os ind i dansens verden gennem musik, bevægelse og fantasi. Undervisningen styrker motorik, rytme og kropsbevidsthed i trygge rammer. Fokus er på danseglæde, fællesskab og aktiv bevægelse, hvor alle kan være med." },
    { title: "Selskabs- og seniordans", image: "/seniordans.jpg", description: "Selskabs- og seniordans kombinerer hyggeligt samvær med skånsom motion. Vi danser klassiske pardanse i et tempo, hvor alle kan følge med. Undervisningen styrker balance, koordination og kondition, samtidig med at fællesskabet og danseglæden er i centrum." },
    { title: "Moderne dans og ballet", image: "/modernedans.JPG", description: "Moderne dans og ballet forener teknik, kropskontrol og musikalsk udtryk. Træningen forbedrer styrke, smidighed og holdning gennem varierede øvelser. Undervisningen foregår i en positiv atmosfære, hvor bevægelsesglæde og koncentration skaber både fordybelse og effektiv motion." },
    { title: "Streetdance og hiphop", image: "/streethiphop.jpg", description: "Streetdance og hiphop er energifyldt træning med fokus på rytme, attitude og fællesskab. Vi arbejder med grooves, koreografier og grundtrin, der styrker kondition og koordination. Stemningen er uformel og motiverende, så motion og danseglæde går hånd i hånd." }
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setNewsletterMsg('Indtast en gyldig e-mail.');
      return;
    }
    try {
      await subscribeNewsletter(newsletterEmail);
      setNewsletterMsg('Du er nu tilmeldt nyhedsbrevet!');
      setNewsletterEmail('');
    } catch {
      setNewsletterMsg('Noget gik galt. Prøv igen.');
    }
  };

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactMsg('Udfyld venligst alle felter.');
      return;
    }
    try {
      await sendMessage(contactForm.name, contactForm.email, contactForm.message);
      setContactMsg('Din besked er sendt!');
      setContactForm({ name: '', email: '', message: '' });
    } catch {
      setContactMsg('Noget gik galt. Prøv igen.');
    }
  };

  const prevTestimonial = () => {
    setTestimonialIndex(i => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const nextTestimonial = () => {
    setTestimonialIndex(i => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <Header />
        <button
          className="login-btn"
          onClick={() => navigate(isLoggedIn ? '/profil' : '/login')}
        >
          {isLoggedIn ? 'Min Profil' : 'Log ind her'}
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
        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            placeholder="Din e-mail"
            className="contact-input"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
          />
          <button type="submit" className="newsletter-btn">Tilmeld</button>
        </form>
        {newsletterMsg && <p className="form-feedback">{newsletterMsg}</p>}
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2 className="section-title">Det siger vores kunder om os</h2>
        {currentTestimonial ? (
          <div className="testimonial-card">
            <img src="/detsigerkunderne.jpg" alt="Kunde" className="testimonial-image" />
            <p className="testimonial-text">"{currentTestimonial.content}"</p>
            <p className="testimonial-author">- {currentTestimonial.name}</p>
            {currentTestimonial.occupation && (
              <p className="testimonial-occupation">{currentTestimonial.occupation}</p>
            )}
            {testimonials.length > 1 && (
              <div className="testimonial-nav">
                <button className="testimonial-nav-btn" onClick={prevTestimonial}>←</button>
                <button className="testimonial-nav-btn" onClick={nextTestimonial}>→</button>
              </div>
            )}
          </div>
        ) : (
          <p className="testimonial-text">Ingen anmeldelser endnu.</p>
        )}
      </section>

      {/* Kontakt os */}
      <section className="contact-section">
        <h2 className="section-title">Kontakt os</h2>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <input type="text" name="name" placeholder="Navn" className="contact-input" value={contactForm.name} onChange={handleContactChange} required />
          <input type="email" name="email" placeholder="Email" className="contact-input" value={contactForm.email} onChange={handleContactChange} required />
          <textarea name="message" placeholder="Din besked" className="contact-textarea" value={contactForm.message} onChange={handleContactChange} required></textarea>
          <button type="submit" className="contact-submit">Send besked</button>
        </form>
        {contactMsg && <p className="form-feedback">{contactMsg}</p>}
      </section>

      {/* Footer */}
      <footer className="footer">
        <img src="/Group 8.png" alt="LD Logo" className="footer-logo" />
        <div className="footer-text">
          <p>Landrup Dans</p>
          <p>Fjællen 2 - 4000 Roskilde</p>
          <p>Tlf: 7098 4312</p>
        </div>
      </footer>

      <Footer />
    </div>
  );
}

export default HomePage;
