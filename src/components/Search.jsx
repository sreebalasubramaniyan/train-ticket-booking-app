import { trains } from '../../data/data'
import { useLocation, Link, useNavigate } from 'react-router-dom';
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

function parseDuration(duration) {
  const match = duration.match(/(\d+)h\s*(\d+)?m?/);
  if (match) {
    const hours = parseInt(match[1]);
    const mins = match[2] ? parseInt(match[2]) : 0;
    return hours * 60 + mins;
  }
  return 0;
}

export default function Search() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [sortOptions, setSortOptions] = useState({
    price: { enabled: false, ascending: true },
    duration: { enabled: false, ascending: true },
  });

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

  const handleBook = (train) => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/book', { state: { train, search: state } });
  };

  const toggleSort = (key) => {
    setSortOptions(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  const toggleDirection = (key) => {
    setSortOptions(prev => ({
      ...prev,
      [key]: { ...prev[key], ascending: !prev[key].ascending }
    }));
  };

  const sortedResults = [...results].sort((a, b) => {
    let comparisons = [];

    if (sortOptions.price.enabled) {
      const minPriceA = Math.min(...a.classes.map(c => c.price));
      const minPriceB = Math.min(...b.classes.map(c => c.price));
      const dir = sortOptions.price.ascending ? 1 : -1;
      comparisons.push((minPriceA - minPriceB) * dir);
    }

    if (sortOptions.duration.enabled) {
      const dir = sortOptions.duration.ascending ? 1 : -1;
      comparisons.push((parseDuration(a.duration) - parseDuration(b.duration)) * dir);
    }

    for (let cmp of comparisons) {
      if (cmp !== 0) return cmp;
    }
    return 0;
  });

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
      <div className="search-top">
        <h2>Available Trains</h2>
        <div className="sort-options">
          <span>Sort by:</span>
          <div className="sort-checks">
            <label className="sort-check">
              <input
                type="checkbox"
                checked={sortOptions.price.enabled}
                onChange={() => toggleSort('price')}
              />
              Price
              {sortOptions.price.enabled && (
                <button
                  className="dir-btn"
                  onClick={() => toggleDirection('price')}
                >
                  {sortOptions.price.ascending ? '↑' : '↓'}
                </button>
              )}
            </label>
            <label className="sort-check">
              <input
                type="checkbox"
                checked={sortOptions.duration.enabled}
                onChange={() => toggleSort('duration')}
              />
              Duration
              {sortOptions.duration.enabled && (
                <button
                  className="dir-btn"
                  onClick={() => toggleDirection('duration')}
                >
                  {sortOptions.duration.ascending ? '↑' : '↓'}
                </button>
              )}
            </label>
          </div>
        </div>
      </div>
      <div className="train-list">
        {sortedResults.map((train, index) => (
          <div key={index} className="train-card">
            <div className="train-route-bg">
              <div className="route-from">
                <span className="station-code">{train.from.split(' ').map(w => w[0]).join('')}</span>
                <span className="station-name">{train.from}</span>
              </div>
              <div className="route-arrow">→</div>
              <div className="route-to">
                <span className="station-code">{train.to.split(' ').map(w => w[0]).join('')}</span>
                <span className="station-name">{train.to}</span>
              </div>
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
                  <span className="class-price">
                    {cls.price > 0 ? `₹${cls.price}` : '-'}
                  </span>
                </div>
              ))}
            </div>
            <button onClick={() => handleBook(train)} className="book-btn">
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
