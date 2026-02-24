import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createActivity } from '../services/api';
import './OpretHoldPage.css';

function OpretHoldPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    weekday: '',
    time: '',
    maxParticipants: '',
    minAge: '',
    maxAge: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if not instructor
  if (role !== 'instructor') {
    navigate('/profil');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Vælg venligst et billede til holdet');
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('weekday', formData.weekday);
      data.append('time', formData.time);
      data.append('maxParticipants', formData.maxParticipants);
      data.append('minAge', formData.minAge);
      data.append('maxAge', formData.maxAge);
      data.append('file', file);

      await createActivity(data, token);
      navigate('/profil');
    } catch (err) {
      setError('Kunne ikke oprette hold. Prøv igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="opret-hold-page">
      <header className="opret-hold-header">
        <button onClick={() => navigate('/profil')} className="opret-hold-back">←</button>
        <h1 className="opret-hold-title">Opret hold</h1>
      </header>

      <form className="opret-hold-form" onSubmit={handleSubmit}>
        {error && <p className="opret-hold-error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Hold navn"
          className="opret-hold-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Beskrivelse"
          className="opret-hold-input opret-hold-textarea"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <select
          name="weekday"
          className="opret-hold-input opret-hold-select"
          value={formData.weekday}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Ugedag</option>
          <option value="Mandag">Mandag</option>
          <option value="Tirsdag">Tirsdag</option>
          <option value="Onsdag">Onsdag</option>
          <option value="Torsdag">Torsdag</option>
          <option value="Fredag">Fredag</option>
          <option value="Lørdag">Lørdag</option>
          <option value="Søndag">Søndag</option>
        </select>
        <input
          type="text"
          name="time"
          placeholder="Tidspunkt (fx 17:00)"
          className="opret-hold-input"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="maxParticipants"
          placeholder="Max. deltagere"
          className="opret-hold-input"
          value={formData.maxParticipants}
          onChange={handleChange}
          required
          min="1"
        />
        <input
          type="number"
          name="minAge"
          placeholder="Min. alder"
          className="opret-hold-input"
          value={formData.minAge}
          onChange={handleChange}
          required
          min="0"
        />
        <input
          type="number"
          name="maxAge"
          placeholder="Max. alder"
          className="opret-hold-input"
          value={formData.maxAge}
          onChange={handleChange}
          required
          min="0"
        />
        <label className="opret-hold-file-label">
          {file ? file.name : 'Vælg billede'}
          <input
            type="file"
            accept="image/*"
            className="opret-hold-file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button type="submit" className="opret-hold-submit" disabled={loading}>
          {loading ? 'Opretter...' : 'Opret hold'}
        </button>
      </form>
    </div>
  );
}

export default OpretHoldPage;
