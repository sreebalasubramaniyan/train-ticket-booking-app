import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function TrackTrain() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [position, setPosition] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!state || !state.booking) {
      navigate('/mybooks');
      return;
    }

    const booking = state.booking;
    const now = new Date();
    const departureDate = new Date(`${booking.date}T${booking.departure}:00`);
    const arrivalDate = new Date(`${booking.date}T${booking.arrival}:00`);

    // Parse duration
    const durationMatch = booking.duration.match(/(\d+)h\s*(\d+)?m?/);
    let totalMinutes = 0;
    if (durationMatch) {
      totalMinutes = parseInt(durationMatch[1]) * 60 + (parseInt(durationMatch[2]) || 0);
    }

    // Calculate status
    if (now < departureDate) {
      const diffMs = departureDate - now;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      setStatus(`Train not yet started. Departure in ${diffDays} day${diffDays > 1 ? 's' : ''}`);
      setPosition(0);
    } else if (now > arrivalDate) {
      setStatus('Journey completed');
      setPosition(100);
    } else {
      const elapsedMs = now - departureDate;
      const elapsedMinutes = elapsedMs / (1000 * 60);
      const progress = Math.min((elapsedMinutes / totalMinutes) * 100, 100);
      setPosition(progress);
      setStatus('Train is on the way');
    }
  }, [state, navigate]);

  if (!state || !state.booking) {
    return (
      <div className="track-page">
        <p>No booking data available</p>
        <Link to="/mybooks" className="back-btn">Back to My Books</Link>
      </div>
    );
  }

  const booking = state.booking;

  return (
    <div className="track-page">
      <div className="track-card">
        <div className="track-header">
          <Link to="/mybooks" className="back-link">← Back</Link>
          <h2>Track Train</h2>
        </div>

        <div className="train-info">
          <h3>{booking.trainName}</h3>
          <p className="route">{booking.from} → {booking.to}</p>
          <p className="date">{booking.date} • {booking.class}</p>
        </div>

        <div className="status-text">{status}</div>

        {position > 0 && position < 100 && (
          <div className="progress-section">
            <div className="progress-track">
              <div className="progress-line">
                <div className="progress-fill" style={{ width: `${position}%` }}></div>
              </div>
              <div className="train-marker" style={{ left: `${position}%` }}>
                <span className="train-icon">🚂</span>
              </div>
            </div>
            <div className="station-labels">
              <span>{booking.from}</span>
              <span>{booking.to}</span>
            </div>
          </div>
        )}

        <div className="timing-info">
          <div className="timing-item">
            <span className="label">Departure</span>
            <span className="value">{booking.departure}</span>
          </div>
          <div className="timing-item">
            <span className="label">Arrival</span>
            <span className="value">{booking.arrival}</span>
          </div>
          <div className="timing-item">
            <span className="label">Duration</span>
            <span className="value">{booking.duration}</span>
          </div>
        </div>

        <div className="booking-ref">
          <span>PNR: {booking.id}</span>
        </div>
      </div>
    </div>
  );
}
