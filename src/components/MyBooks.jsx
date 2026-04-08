import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/MyBooks.css";

export default function MyBooks() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored.reverse());
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleTrack = (booking) => {
    navigate('/track', { state: { booking } });
  };

  const handleCancel = (id) => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updated = stored.filter(b => b.id !== id);
    localStorage.setItem('bookings', JSON.stringify(updated));
    setBookings(updated);
  };

  if (bookings.length === 0) {
    return (
      <div className="mybooks-page">
        <h2>My Bookings</h2>
        <div className="no-bookings">
          <p>No bookings yet.</p>
          <Link to="/book" className="book-now-btn">Book Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mybooks-page">
      <h2>My Bookings</h2>
      <div className="tickets-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="ticket">
            <div className="ticket-header">
              <div className="header-left">
                <span className="pnr">PNR: {booking.id}</span>
                <span className="train">{booking.trainName}</span>
              </div>
              <span className={`status ${booking.status.toLowerCase()}`}>{booking.status}</span>
            </div>
            <div className="ticket-body">
              <div className="route-section">
                <div className="station">
                  <span className="time">{booking.departure}</span>
                  <span className="name">{booking.from}</span>
                </div>
                <div className="route-line">
                  <span className="duration">{booking.duration}</span>
                </div>
                <div className="station">
                  <span className="time">{booking.arrival}</span>
                  <span className="name">{booking.to}</span>
                </div>
              </div>
              <div className="info-section">
                <div className="info">
                  <span className="label">Date</span>
                  <span className="value">{formatDate(booking.date)}</span>
                </div>
                <div className="info">
                  <span className="label">Class</span>
                  <span className="value">{booking.class}</span>
                </div>
                <div className="info">
                  <span className="label">Seats</span>
                  <span className="value">{booking.seats}</span>
                </div>
                <div className="info">
                  <span className="label">Price</span>
                  <span className="value price">₹{booking.price}</span>
                </div>
              </div>
            </div>
            <div className="ticket-actions">
              <button className="track-btn" onClick={() => handleTrack(booking)}>Track Train</button>
              <button className="cancel-btn" onClick={() => handleCancel(booking.id)}>Cancel Ticket</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
