import { trains } from '../../data/data'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function isValidDate(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 30);
  return date >= today && date <= maxDate;
}

function findTrains(data) {
  const fromLower = data.from.toLowerCase().trim();
  const toLower = data.to.toLowerCase().trim();

  return trains.filter(train => {
    const fromMatch = train.from.toLowerCase().includes(fromLower) ||
                      fromLower.includes(train.from.toLowerCase());
    const toMatch = train.to.toLowerCase().includes(toLower) ||
                    toLower.includes(train.to.toLowerCase());
    return fromMatch && toMatch;
  });
}

export default function Search() {
  const { state } = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (state) {
      if (!isValidDate(state.date)) {
        setResults([]);
        return;
      }
      const found = findTrains(state);
      setResults(found);
    }
  }, [state]);

  if (!state || !state.date) {
    return (
      <div className="search-results">
        <p className="no-results">No search date provided.</p>
      </div>
    );
  }

  if (!isValidDate(state.date)) {
    return (
      <div className="search-results">
        <p className="no-results">No trains available. Please select a date within the next 30 days.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-results">
        <p className="no-results">No trains found for the selected route.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h2>Available Trains</h2>
      <div className="train-list">
        {results.map((train, index) => (
          <div key={index} className="train-card">
            <div className="train-route-header">
              <span className="route-tag">{train.from} - {train.to}</span>
            </div>
            <div className="train-name-row">
              <h3>{train.name}</h3>
              <span className="train-number">{train.number}</span>
            </div>
            <div className="train-time-row">
              <div className="time-info">
                <span className="time">{train.departure}</span>
                <span className="station">{train.from}</span>
              </div>
              <div className="duration-info">
                <span className="via">
                  {train.via.length > 0 ? `via ${train.via.join(', ')}` : 'Direct'}
                </span>
                <span className="duration">{train.duration}</span>
              </div>
              <div className="time-info">
                <span className="time">{train.arrival}</span>
                <span className="station">{train.to}</span>
              </div>
            </div>
            <div className="train-run-days">
              {train.days.map((day, i) => (
                <span key={i} className="day">{day}</span>
              ))}
            </div>
            <div className="train-classes">
              {train.classes.map((cls, i) => (
                <div key={i} className={`class-item ${cls.available === 0 ? 'unavailable' : ''}`}>
                  <span className="class-code">{cls.class}</span>
                  <span className="class-avail">
                    {cls.available > 0 ? cls.available : 'NA'}
                  </span>
                </div>
              ))}
            </div>
            <button className="check-avail-btn">Check Availability</button>
          </div>
        ))}
      </div>
    </div>
  );
}
