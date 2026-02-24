import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getActivityById, enrollInActivity, unenrollFromActivity, getUserWithActivities, getActivityParticipants } from '../services/api';
import './ActivityDetailPage.css';

function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrollError, setEnrollError] = useState('');
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getActivityById(id);
        setActivity(data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    const fetchParticipants = async () => {
      try {
        const data = await getActivityParticipants(id);
        setParticipants(data.Users || []);
      } catch (error) {
        console.error('Error fetching participants:', error);
      }
    };

    const checkEnrollment = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      if (token && userId) {
        try {
          const userData = await getUserWithActivities(userId, token);
          const enrolled = userData.Activities?.some(act => act.id === parseInt(id));
          setIsEnrolled(enrolled);
        } catch (error) {
          console.error('Error checking enrollment:', error);
        }
      }
    };

    if (id) {
      fetchActivity();
      fetchParticipants();
      checkEnrollment();
    }
  }, [id]);

  const handleEnrollment = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    setEnrollError('');

    setLoading(true);
    try {
      if (isEnrolled) {
        await unenrollFromActivity(id, userId, token);
        setIsEnrolled(false);
        navigate('/profil');
      } else {
        // Fetch user data for validation
        const userData = await getUserWithActivities(userId, token);

        // Aldersbegrænsning check
        if (activity.minAge && activity.maxAge) {
          const userAge = userData.age;
          if (userAge < activity.minAge || userAge > activity.maxAge) {
            setEnrollError(`Du skal være ${activity.minAge}-${activity.maxAge} år for at tilmelde dig.`);
            setLoading(false);
            return;
          }
        }

        // Samme ugedag check
        const sameWeekday = userData.Activities?.some(
          act => act.weekday === activity.weekday
        );
        if (sameWeekday) {
          setEnrollError(`Du er allerede tilmeldt en aktivitet på ${activity.weekday}.`);
          setLoading(false);
          return;
        }

        await enrollInActivity(id, userId, token);
        setIsEnrolled(true);
        navigate('/profil');
      }
    } catch (error) {
      console.error('Error enrolling/unenrolling:', error);
      setEnrollError('Der opstod en fejl. Prøv igen senere.');
    } finally {
      setLoading(false);
    }
  };

  if (!activity) {
    return <div className="detail-container">Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-hero-image">
        <img src={activity.asset?.url || '/detsigerkunderne.jpg'} alt={activity.name} />
        {isLoggedIn && (
          <button
            className="detail-button"
            onClick={handleEnrollment}
            disabled={loading}
          >
            {loading ? 'Vent...' : isEnrolled ? 'Forlad' : 'Tilmeld'}
          </button>
        )}
      </div>

      {enrollError && (
        <p className="detail-error">{enrollError}</p>
      )}

      <div className="detail-content">
        <h1 className="detail-heading">{activity.name}</h1>
        {activity.minAge && activity.maxAge && (
          <p className="detail-age-tag">{activity.minAge}-{activity.maxAge} år</p>
        )}
        <p className="detail-text">
          {activity.description || 'Ingen beskrivelse tilgængelig.'}
        </p>

        {activity.weekday && activity.time && (
          <div className="class-schedule">
            <h3 className="schedule-heading">Tidspunkt</h3>
            <p className="schedule-text">{activity.weekday} kl. {activity.time}</p>
          </div>
        )}

        {isEnrolled && (
          <div className="participants-section">
            <h3 className="participants-heading">
              Deltagere ({participants.length}{activity.maxParticipants ? `/${activity.maxParticipants}` : ''})
            </h3>
            {participants.length > 0 ? (
              <ul className="participants-list">
                {participants.map((participant) => (
                  <li key={participant.id} className="participant-item">
                    {participant.firstname} {participant.lastname}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-participants">Ingen deltagere endnu</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityDetailPage;
