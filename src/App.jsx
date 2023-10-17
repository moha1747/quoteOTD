import Quote from "./components/quote.jsx";
import Home from "./components/user.jsx";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./styles/app.css"

function App() {
  return (
    <Router>
      <div className="nav__container">
        <nav className="nav">
          <ul className="nav__">
            <li className="nav__link">
              <Link className="header" to="/login">
                Sign Up
              </Link>
            </li>
            <li className="nav__link">
              <Link to="/quote">View Quote</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route path="/quote" element={<Quote />} />
          <Route
            path="/"
            element={<div>Welcome! Please navigate using the links above.</div>}
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
