import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../styles/book.css";

export default function Book() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(null);
  const [seats, setSeats] = useState(1);
  const [booked, setBooked] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    class: "All class(EA)",
    type: "GENERAL",
    others: "Person with Disability"
  });

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  // Show booking form when train is NOT selected
  if (!state || !state.train) {
    const handleSearch = (e) => {
      e.preventDefault();
      navigate("/search", { state: searchData });
    };

    const handleChange = (e) => {
      setSearchData({
        ...searchData,
        [e.target.name]: e.target.value,
      });
    };

    return (
      <div className="book-page">
        <form className="book-form" onSubmit={handleSearch}>
          <div className="title">
            <p>Book Ticket</p>
          </div>

          <div className="box">
            <div>
              <p>From</p>
              <input name="from" required onChange={handleChange} />
            </div>
            <div>
              <p>To</p>
              <input name="to" required onChange={handleChange} />
            </div>
          </div>

          <div className="box">
            <div>
              <p>Date</p>
              <input type="date" name="date" required onChange={handleChange} />
            </div>
            <div>
              <p>Class</p>
              <select name="class" className="Class" required onChange={handleChange}>
                <option>All class(EA)</option>
                <option>AC First class(1A)</option>
                <option>Vistome AC(EV)</option>
                <option>Exec. Chair Car(EC)</option>
                <option>AC 2 Tier(2A)</option>
                <option>Sleeper(SL)</option>
              </select>
            </div>
          </div>

          <div className="box">
            <div>
              <p>Type</p>
              <select name="type" className="Type" required onChange={handleChange}>
                <option>GENERAL</option>
                <option>LADIES</option>
                <option>LOWER BERTH/SR.CITIZEN</option>
                <option>PERSON WITH DISABILITY</option>
                <option>DUTY PASS</option>
                <option>TAKAL</option>
                <option>PREMIUM TAKAL</option>
              </select>
            </div>
            <div>
              <p>Others</p>
              <select className="Others" name="others" required onChange={handleChange}>
                <option>Person with Disability</option>
                <option>Railway Pass Concession</option>
              </select>
            </div>
          </div>

          <div className="search-btn">
            <button className="search" type="submit">
              Search Trains
            </button>
          </div>
        </form>
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
