import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/User.css";

export default function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', email: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setEditForm({ username: userData.username, email: userData.email });

    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
  }, [navigate]);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => {
      if (u.email === user.email) {
        return { ...u, username: editForm.username, email: editForm.email };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(editForm));
    setUser(editForm);
    setIsEditing(false);
    window.dispatchEvent(new Event('userChanged'));
  };

  const handleCancel = () => {
    setEditForm({ username: user.username, email: user.email });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  if (!user) return null;

  const totalSpent = bookings.reduce((sum, b) => sum + (b.price || 0), 0);
  const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
  const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;

  return (
    <div className="user-page">
      <div className="user-container">
        <div className="user-header">
          <div className="user-avatar">
            {user.username?.charAt(0).toUpperCase()}
          </div>
          <div className="user-header-info">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="user-stats">
          <div className="stat-card">
            <span className="stat-number">{bookings.length}</span>
            <span className="stat-label">Total Bookings</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{confirmedBookings}</span>
            <span className="stat-label">Confirmed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{cancelledBookings}</span>
            <span className="stat-label">Cancelled</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">₹{totalSpent.toLocaleString()}</span>
            <span className="stat-label">Total Spent</span>
          </div>
        </div>

        <div className="user-details">
          <div className="section-header">
            <h3>Profile Details</h3>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-label">Username</span>
                <span className="detail-value">{user.username}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Member Since</span>
                <span className="detail-value">2026</span>
              </div>
            </div>
          )}
        </div>

        <div className="user-actions">
          <Link to="/mybooks" className="action-link">My Bookings</Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
