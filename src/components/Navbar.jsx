import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/src/assets/image.png" alt="Rail Nova Logo" />
        </div>
        <span className="brand-name">Rail Nova</span>
      </div>
      <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/book" onClick={closeMenu}>Book</Link>
        <Link to="/mybooks" onClick={closeMenu}>My Books</Link>
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
          <Link to="/login" onClick={closeMenu}>Login</Link>
        )}
      </div>
      <button
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
