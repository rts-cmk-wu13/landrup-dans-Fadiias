import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { getAllActivities } from '../services/api';
import './ActivitiesPage.css';

function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const data = await getAllActivities();
        setActivities(data);
        setFilteredActivities(data);
        setError(null);
      } catch (err) {
        setError('Kunne ikke hente aktiviteter. Prøv igen senere.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter((activity) =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredActivities(filtered);
    }
  }, [searchQuery, activities]);

  const handleActivityClick = (id) => {
    navigate(`/aktiviteter/${id}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="activities-page">
      <section className="activities-hero">
        <h1 className="activities-title">Aktiviteter</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Søg..." 
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IoSearch className="search-icon" />
        </div>
      </section>

      <div className="activities-container">{loading && (
          <div className="loading-message">
            <p>Henter aktiviteter...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredActivities.length === 0 && (
          <div className="no-activities">
            <p>{searchQuery ? 'Ingen aktiviteter matcher din søgning.' : 'Der er ingen aktiviteter tilgængelige i øjeblikket.'}</p>
          </div>
        )}

        {!loading && !error && filteredActivities.length > 0 && (
          <div className="activities-grid">
            {filteredActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="activity-card"
                onClick={() => handleActivityClick(activity.id)}
              >
                <div className="activity-image-container">
                  {activity.asset?.url ? (
                    <img 
                      src={activity.asset.url} 
                      alt={activity.name}
                      className="activity-image"
                    />
                  ) : (
                    <div className="activity-image-placeholder">
                      <span>Intet billede</span>
                    </div>
                  )}
                </div>
                <div className="activity-info">
                  <h3 className="activity-name">{activity.name}</h3>
                  {activity.minAge && activity.maxAge && (
                    <p className="activity-age">
                      {activity.minAge}-{activity.maxAge} år
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivitiesPage;
