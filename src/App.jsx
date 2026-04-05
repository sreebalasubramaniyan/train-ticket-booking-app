import Home from "./components/Home"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path ="/" element={<Home />} />
          <Route path ="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
