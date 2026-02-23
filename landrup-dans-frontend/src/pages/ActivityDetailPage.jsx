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
      
      console.log('Checking enrollment - token:', !!token, 'userId:', userId);
      
      if (token && userId) {
        try {
          const userData = await getUserWithActivities(userId, token);
          console.log('User activities:', userData.Activities);
          const enrolled = userData.Activities?.some(act => act.id === parseInt(id));
          console.log('Is enrolled:', enrolled);
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

    console.log('Handle enrollment - token:', !!token, 'userId:', userId, 'activityId:', id);

    if (!token || !userId) {
      // Redirect til login hvis ikke logget ind
      console.log('Not logged in, redirecting to login');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      if (isEnrolled) {
        console.log('Unenrolling from activity');
        await unenrollFromActivity(id, userId, token);
        setIsEnrolled(false);
        // Redirect to profile after unenrolling
        navigate('/profil');
      } else {
        console.log('Enrolling in activity');
        const result = await enrollInActivity(id, userId, token);
        console.log('Enrollment result:', result);
        setIsEnrolled(true);
        
        // Redirect to profile page after successful enrollment
        navigate('/profil');
      }
    } catch (error) {
      console.error('Error enrolling/unenrolling:', error);
      alert('Der opstod en fejl. Prøv igen senere.');
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
        <button 
          className="detail-button"
          onClick={handleEnrollment}
          disabled={loading}
        >
          {loading ? 'Vent...' : isEnrolled ? 'Frameld' : 'Tilmeld'}
        </button>
      </div>

      <div className="detail-content">
        <h1 className="detail-heading">{activity.name}</h1>
        {activity.minAge && activity.maxAge && (
          <p className="detail-age-tag">{activity.minAge}-{activity.maxAge} år</p>
        )}
        <p className="detail-text">
          {activity.description || 'Ingen beskrivelse tilgængelig.'}
        </p>

        {/* Class Schedule */}
        {activity.weekday && activity.time && (
          <div className="class-schedule">
            <h3 className="schedule-heading">Tidspunkt</h3>
            <p className="schedule-text">{activity.weekday} kl. {activity.time}</p>
          </div>
        )}

        {/* Participants Section */}
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
