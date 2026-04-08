import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Home.css";

const typewriterTexts = [
  "Book train tickets instantly",
  "Real-time train tracking",
  "Multiple class options",
  "Easy refund & cancellation",
  "Secure payment gateway",
  "24/7 customer support"
];

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = typewriterTexts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const achievements = [
    { number: "10M+", label: "Happy Customers" },
    { number: "5000+", label: "Stations Covered" },
    { number: "15000+", label: "Trains Daily" },
    { number: "99%", label: "On Time Delivery" }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "Best train booking experience ever! Quick, easy, and hassle-free. Highly recommended!"
    },
    {
      name: "Rahul Verma",
      location: "Delhi",
      text: "Love the real-time tracking feature. Always know exactly where my train is."
    },
    {
      name: "Anita Desai",
      location: "Bangalore",
      text: "Great customer support and easy refunds. Been using Rail Nova for 2 years now."
    }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Rail Nova</h1>
          <div className="typewriter">
            <span className="typewriter-text">{displayText}</span>
            <span className="cursor">|</span>
          </div>
          <div className="hero-buttons">
            <Link to="/book" className="btn-primary">Book Now</Link>
            <Link to="/login" className="btn-outline">Login</Link>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h2 className="section-title">Our Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((item, index) => (
            <div className="achievement-card" key={index}>
              <span className="achievement-number">{item.number}</span>
              <span className="achievement-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonials-section">
        <h2 className="section-title">What People Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-author">
                <span className="author-name">{item.name}</span>
                <span className="author-location">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
