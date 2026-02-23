import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserWithActivities } from '../services/api';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        // Not logged in, redirect to login
        navigate('/login');
        return;
      }

      try {
        const userData = await getUserWithActivities(userId, token);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If token is invalid, redirect to login
        localStorage.clear();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    
    // Redirect to home
    navigate('/home');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const fullName = `${user.firstname || ''} ${user.lastname || ''}`.trim();
  const roleText = user.role === 'member' ? 'Medlem' : user.role === 'instructor' ? 'Instruktør' : user.role;

  return (
    <div className="profile-page">
      <h1 className="profile-title">Min profil</h1>

      <div className="profile-info">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user.firstname?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
        <h2 className="profile-name">{fullName || 'Bruger'}</h2>
        <p className="profile-role">{roleText}</p>
      </div>

      <div className="activities-section">
        <h2 className="section-title">Tilmeldte hold</h2>
        
        {user.Activities && user.Activities.length > 0 ? (
          <div className="activities-list">
            {user.Activities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <h3 className="activity-name">{activity.name}</h3>
                <p className="activity-time">{activity.weekday} kl. {activity.time}</p>
                <button 
                  className="show-activity-btn"
                  onClick={() => navigate(`/aktiviteter/${activity.id}`)}
                >
                  Vis hold
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-activities">Du er ikke tilmeldt nogen hold endnu.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
