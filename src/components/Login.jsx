import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      setEmail(user.email || '');
      setPassword(user.password || '');
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existing = users.find(u => u.email === email);
    if (existing) {
      setError('Email already registered');
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ username, email }));
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setError('Invalid email or password');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={isRegistering ? handleRegister : handleLogin}>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {error && <p className="error">{error}</p>}

        {isRegistering && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-btn">{isRegistering ? 'Register' : 'Login'}</button>

        <p className="switch-mode">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={switchMode} className="link">
            {isRegistering ? 'Login' : 'Register'}
          </span>
        </p>
      </form>
    </div>
  );
}
