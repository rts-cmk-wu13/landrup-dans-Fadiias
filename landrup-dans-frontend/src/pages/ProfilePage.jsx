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

      console.log('ProfilePage - token:', !!token, 'userId:', userId);

      if (!token || !userId) {
        // Not logged in, redirect to login
        navigate('/login');
        return;
      }

      try {
        const userData = await getUserWithActivities(userId, token);
        console.log('ProfilePage - User data:', userData);
        console.log('ProfilePage - Activities:', userData.Activities);
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

      <div className="tilmeldte-section">
        <h2 className="tilmeldte-title">Tilmeldte hold</h2>
        
        {user.Activities && user.Activities.length > 0 ? (
          <div className="kalender-list">
            {user.Activities.map((activity) => (
              <div key={activity.id} className="kalender-kort">
                <h3 className="kalender-kort-titel">{activity.name}</h3>
                <p className="kalender-kort-tid">{activity.weekday} kl. {activity.time}</p>
                <button 
                  className="kalender-vis-knap"
                  onClick={() => navigate(`/aktiviteter/${activity.id}`)}
                >
                  Vis hold
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="ingen-tilmeldinger">Du er ikke tilmeldt nogen hold endnu.</p>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Log ud
      </button>
    </div>
  );
}

export default ProfilePage;
