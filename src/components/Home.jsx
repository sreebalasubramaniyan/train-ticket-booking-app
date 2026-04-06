import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Home() {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search",{state:data});
  };

  const [data, setData] = useState({
  from: "",
  to: "",
  date: "",
  class: "All class(EA)",   
  type: "GENERAL",          
  others: "Person with Disability"
});

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
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
            <select name="type" className="Type"required onChange={handleChange}>
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
            <select className ="Others" name="others" required onChange={handleChange}>
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
    </>
  );
}
