import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Book() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [seats, setSeats] = useState(1);
  const [booked, setBooked] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  if (!state || !state.train) {
    return (
      <div className="book-page">
        <p className="no-results">No train selected.</p>
      </div>
    );
  }

  const { train, search } = state;
  const availableClasses = train.classes.filter(cls => cls.available > 0);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
  };

  const handleConfirm = () => {
    const booking = {
      id: Date.now(),
      trainName: train.name,
      trainNumber: train.number,
      from: train.from,
      to: train.to,
      departure: train.departure,
      arrival: train.arrival,
      date: search.date,
      class: selectedClass.class,
      seats: seats,
      price: selectedClass.price * seats,
      status: 'Confirmed',
      bookingDate: new Date().toISOString(),
    };

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    setBookingData(booking);
    setBooked(true);
  };

  if (booked && bookingData) {
    return (
      <div className="book-page">
        <div className="success-card">
          <div className="success-header">
            <div className="success-icon">✓</div>
            <div className="success-title">
              <h2>Booking Confirmed!</h2>
              <p className="pnr">PNR: {bookingData.id}</p>
            </div>
          </div>
          <div className="success-body">
            <div className="info-row">
              <div className="info-item">
                <span className="label">Train</span>
                <span className="value">{bookingData.trainName}</span>
                <span className="sub">{bookingData.trainNumber}</span>
              </div>
              <div className="info-item">
                <span className="label">Route</span>
                <span className="value">{bookingData.from}</span>
                <span className="arrow">→</span>
                <span className="value">{bookingData.to}</span>
              </div>
              <div className="info-item">
                <span className="label">Date</span>
                <span className="value">{formatDate(bookingData.date)}</span>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="label">Class</span>
                <span className="value">{bookingData.class}</span>
              </div>
              <div className="info-item">
                <span className="label">Seats</span>
                <span className="value">{bookingData.seats}</span>
              </div>
              <div className="info-item">
                <span className="label">Total Price</span>
                <span className="value price">₹{bookingData.price}</span>
              </div>
            </div>
          </div>
          <div className="success-footer">
            <span className="status confirmed">{bookingData.status}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-page">
      <div className="book-card">
        <div className="book-header">
          <span className="route">{train.from} - {train.to}</span>
        </div>
        <div className="book-train-info">
          <h3>{train.name}</h3>
          <span className="number">{train.number}</span>
        </div>
        <div className="book-timing">
          <div className="point">
            <span className="time">{train.departure}</span>
            <span className="station">{train.from}</span>
            <span className="date">{formatDate(search.date)}</span>
          </div>
          <div className="line">
            <span>{train.duration}</span>
          </div>
          <div className="point">
            <span className="time">{train.arrival}</span>
            <span className="station">{train.to}</span>
            <span className="date">{formatDate(search.date)}</span>
          </div>
        </div>

        <div className="selection-section">
          <h4>Select Class</h4>
          <div className="class-options">
            {availableClasses.map((cls, i) => (
              <div
                key={i}
                className={`class-option ${selectedClass?.class === cls.class ? 'selected' : ''}`}
                onClick={() => setSelectedClass(cls)}
              >
                <span className="cls-name">{cls.class}</span>
                <span className="cls-price">₹{cls.price}</span>
                <span className="cls-avail">{cls.available} seats</span>
              </div>
            ))}
          </div>
        </div>

        {selectedClass && (
          <div className="selection-section">
            <h4>Select Seats</h4>
            <div className="seats-input">
              <button onClick={() => setSeats(s => Math.max(1, s - 1))}>-</button>
              <span>{seats}</span>
              <button onClick={() => setSeats(s => Math.min(selectedClass.available, s + 1))}>+</button>
            </div>
          </div>
        )}

        {selectedClass && (
          <div className="price-summary">
            <span>Total:</span>
            <span className="total">₹{selectedClass.price * seats}</span>
          </div>
        )}

        <button
          className="confirm-btn"
          disabled={!selectedClass}
          onClick={handleConfirm}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
