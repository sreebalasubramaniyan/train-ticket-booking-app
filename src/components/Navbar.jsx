import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Train Booking</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/">Mybooks</Link>
        <Link to="/">Login</Link>
      </div>
    </nav>
  );
}
