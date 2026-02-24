import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getActivityById, updateActivity } from '../services/api';
import './RedigerHoldPage.css';

function RedigerHoldPage() {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (role !== 'instructor') {
      navigate('/profil');
      return;
    }

    const fetchActivity = async () => {
      try {
        const activity = await getActivityById(id);
        setFormData({
          name: activity.name || '',
          description: activity.description || '',
          weekday: activity.weekday || '',
          time: activity.time || '',
          maxParticipants: activity.maxParticipants || '',
          minAge: activity.minAge || '',
          maxAge: activity.maxAge || '',
        });
      } catch (err) {
        setError('Kunne ikke hente hold data');
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id, role, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.weekday || !formData.time || !formData.maxParticipants) {
      setError('Udfyld venligst alle påkrævede felter');
      return;
    }

    setSaving(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('weekday', formData.weekday);
      data.append('time', formData.time);
      data.append('maxParticipants', formData.maxParticipants);
      data.append('minAge', formData.minAge);
      data.append('maxAge', formData.maxAge);
      if (file) {
        data.append('file', file);
      }

      await updateActivity(id, data, token);
      navigate('/profil');
    } catch (err) {
      setError('Kunne ikke opdatere hold. Prøv igen.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Henter hold...</div>;
  }

  return (
    <div className="rediger-hold-page">
      <header className="rediger-hold-header">
        <button onClick={() => navigate('/profil')} className="rediger-hold-back">←</button>
        <h1 className="rediger-hold-title">Rediger hold</h1>
      </header>

      <form className="rediger-hold-form" onSubmit={handleSubmit}>
        {error && <p className="rediger-hold-error">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Hold navn"
          className="rediger-hold-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Beskrivelse"
          className="rediger-hold-input rediger-hold-textarea"
          value={formData.description}
          onChange={handleChange}
        />
        <select
          name="weekday"
          className="rediger-hold-input rediger-hold-select"
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
          className="rediger-hold-input"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="maxParticipants"
          placeholder="Max. deltagere"
          className="rediger-hold-input"
          value={formData.maxParticipants}
          onChange={handleChange}
          required
          min="1"
        />
        <input
          type="number"
          name="minAge"
          placeholder="Min. alder"
          className="rediger-hold-input"
          value={formData.minAge}
          onChange={handleChange}
          min="0"
        />
        <input
          type="number"
          name="maxAge"
          placeholder="Max. alder"
          className="rediger-hold-input"
          value={formData.maxAge}
          onChange={handleChange}
          min="0"
        />
        <label className="rediger-hold-file-label">
          {file ? file.name : 'Skift billede (valgfrit)'}
          <input
            type="file"
            accept="image/*"
            className="rediger-hold-file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <button type="submit" className="rediger-hold-submit" disabled={saving}>
          {saving ? 'Gemmer...' : 'Gem ændringer'}
        </button>
      </form>
    </div>
  );
}

export default RedigerHoldPage;
