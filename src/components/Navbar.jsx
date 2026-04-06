import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleUserChange = () => {
      const stored = localStorage.getItem('currentUser');
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener('userChanged', handleUserChange);
    return () => window.removeEventListener('userChanged', handleUserChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setShowUserMenu(false);
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">Train Booking</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/mybooks">My Books</Link>
        {user ? (
          <div className="user-section">
            <span className="user-link" onClick={() => setShowUserMenu(!showUserMenu)}>
              User
            </span>
            {showUserMenu && (
              <div className="user-popup">
                <div className="user-info">
                  <p className="user-name">{user.username}</p>
                  <p className="user-email">{user.email}</p>
                </div>
                <div className="user-actions">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
