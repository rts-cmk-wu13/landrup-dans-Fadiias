import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserWithActivities, deleteActivity } from '../services/api';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // holds activity to delete

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        navigate('/login');
        return;
      }

      try {
        const userData = await getUserWithActivities(userId, token);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.clear();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/home');
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await deleteActivity(deleteConfirm.id, token);
      setUser(prev => ({
        ...prev,
        Activities: prev.Activities.filter(a => a.id !== deleteConfirm.id)
      }));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Fejl ved sletning:', error);
    }
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
        <div className="tilmeldte-header">
          <h2 className="tilmeldte-title">
            {user.role === 'instructor' ? 'Mine hold' : 'Tilmeldte hold'}
          </h2>
          {user.role === 'instructor' && (
            <button className="opret-hold-btn" onClick={() => navigate('/opret-hold')}>
              + Opret hold
            </button>
          )}
        </div>

        {user.Activities && user.Activities.length > 0 ? (
          <div className="kalender-list">
            {user.Activities.map((activity) => (
              <div key={activity.id} className="kalender-kort">
                <h3 className="kalender-kort-titel">{activity.name}</h3>
                <p className="kalender-kort-tid">{activity.weekday} kl. {activity.time}</p>
                <div className="kalender-knapper">
                  {user.role === 'instructor' ? (
                    <button
                      className="kalender-vis-knap"
                      onClick={() => navigate(`/deltagerliste/${activity.id}`)}
                    >
                      Deltagerliste
                    </button>
                  ) : (
                    <button
                      className="kalender-vis-knap"
                      onClick={() => navigate(`/aktiviteter/${activity.id}`)}
                    >
                      Vis hold
                    </button>
                  )}
                  {user.role === 'instructor' && (
                    <>
                      <button
                        className="kalender-rediger-knap"
                        onClick={() => navigate(`/rediger-hold/${activity.id}`)}
                      >
                        Rediger
                      </button>
                      <button
                        className="kalender-slet-knap"
                        onClick={() => setDeleteConfirm(activity)}
                      >
                        Slet
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="ingen-tilmeldinger">
            {user.role === 'instructor'
              ? 'Du har ikke oprettet nogen hold endnu.'
              : 'Du er ikke tilmeldt nogen hold endnu.'}
          </p>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Log ud
      </button>

      {/* Slet bekræftelse modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Er du sikker?</h3>
            <p className="modal-text">
              Vil du slette <strong>{deleteConfirm.name}</strong>? Dette kan ikke fortrydes.
            </p>
            <div className="modal-knapper">
              <button className="modal-annuller" onClick={() => setDeleteConfirm(null)}>
                Annuller
              </button>
              <button className="modal-slet" onClick={handleDelete}>
                Slet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
