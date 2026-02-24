import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getActivityById, getActivityParticipants } from '../services/api';
import './DeltagerlistePage.css';

function DeltagerlistePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const [activity, setActivity] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 'instructor') {
      navigate('/profil');
      return;
    }

    const fetchData = async () => {
      try {
        const [activityData, participantData] = await Promise.all([
          getActivityById(id),
          getActivityParticipants(id)
        ]);
        setActivity(activityData);
        setParticipants(participantData.Users || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, role, navigate]);

  if (loading) {
    return <div className="deltagerliste-page"><p className="deltagerliste-loading">Henter...</p></div>;
  }

  return (
    <div className="deltagerliste-page">
      <header className="deltagerliste-header">
        <button onClick={() => navigate('/profil')} className="deltagerliste-back">←</button>
        <h1 className="deltagerliste-title">Deltagerliste</h1>
      </header>

      {activity && (
        <h2 className="deltagerliste-aktivitet">{activity.name}</h2>
      )}

      <div className="deltagerliste-container">
        {participants.length > 0 ? (
          <ul className="deltagerliste-liste">
            {participants.map((p) => (
              <li key={p.id} className="deltagerliste-item">
                <span className="deltager-navn">{p.firstname} {p.lastname}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="deltagerliste-tom">Ingen tilmeldte deltagere endnu.</p>
        )}
      </div>

      <p className="deltagerliste-antal">
        {participants.length}{activity?.maxParticipants ? `/${activity.maxParticipants}` : ''} deltagere
      </p>
    </div>
  );
}

export default DeltagerlistePage;
