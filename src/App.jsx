import Home from "./components/Home"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Search from "./components/Search";
import Book from "./components/Book";
import MyBooks from "./components/MyBooks";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import TrackTrain from "./components/TrackTrain";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path ="/" element={<Home />} />
          <Route path ="/search" element={<Search />} />
          <Route path ="/book" element={<Book />} />
          <Route path ="/mybooks" element={<MyBooks />} />
          <Route path ="/login" element={<Login />} />
          <Route path ="/track" element={<TrackTrain />} />
      </Routes>
    </BrowserRouter>
  );
}
