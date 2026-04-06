import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function TrackTrain() {
  const { state } = useLocation();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!state || !state.booking) return;

    const booking = state.booking;
    const now = new Date();
    const departureDate = new Date(`${booking.date}T${booking.departure}:00`);
    const arrivalDate = new Date(`${booking.date}T${booking.arrival}:00`);

    const diffFromDeparture = departureDate - now;
    const diffDays = diffFromDeparture / (1000 * 60 * 60 * 24);

    if (diffDays > 1) {
      setStatus('Train not yet started');
      setProgress(0);
    } else if (now > arrivalDate) {
      setStatus('Journey completed');
      setProgress(100);
    } else {
      const totalDuration = arrivalDate - departureDate;
      const elapsed = now - departureDate;
      const progressPercent = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(progressPercent);
      setStatus('Train is on the way');
    }
  }, [state]);

  if (!state || !state.booking) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No booking found</h2>
        <Link to="/mybooks" style={{ color: '#0066ff' }}>Go to My Bookings</Link>
      </div>
    );
  }

  const booking = state.booking;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/mybooks" style={{ color: '#0066ff', textDecoration: 'none' }}>← Back to My Bookings</Link>

      <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', marginTop: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>{booking.trainName}</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.9rem' }}>{booking.from} → {booking.to} • {booking.date}</p>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#333' }}>{status}</p>

          <div style={{ position: 'relative', height: '40px', background: '#e0e0e0', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${progress}%`,
              background: '#0066ff',
              borderRadius: '20px',
              transition: 'width 0.3s ease'
            }} />
            <div style={{
              position: 'absolute',
              left: `${progress}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '1.2rem'
            }}>
              🚂
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#666' }}>{booking.departure}</span>
            <span style={{ fontSize: '0.85rem', color: '#666' }}>{booking.arrival}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
