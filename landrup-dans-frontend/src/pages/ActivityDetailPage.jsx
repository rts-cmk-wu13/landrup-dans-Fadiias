import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getActivityById } from '../services/api';
import './ActivityDetailPage.css';

function ActivityDetailPage() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getActivityById(id);
        setActivity(data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

  if (!activity) {
    return <div className="detail-container">Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-hero-image">
        <img src={activity.asset?.url || '/detsigerkunderne.jpg'} alt={activity.name} />
        <button className="detail-button">Tilmeld</button>
      </div>

      <div className="detail-content">
        <h1 className="detail-heading">{activity.name}</h1>
        {activity.minAge && activity.maxAge && (
          <p className="detail-age-tag">{activity.minAge}-{activity.maxAge} år</p>
        )}
        <p className="detail-text">
          {activity.description || 'Ingen beskrivelse tilgængelig.'}
        </p>
      </div>
    </div>
  );
}

export default ActivityDetailPage;
