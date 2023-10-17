import { useState } from "react";
import axios from "axios";
import "../styles/user.css";

const Home = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/register", {
        firstName,
        lastName,
        email,
        password,
      });
      alert("Registered successfully!");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      if (response.data.message === "Logged in!") {
        alert("Logged in successfully!");
      } else {
        alert("Login failed.");
      }
    } catch (error) {
      alert("Login failed.");
    }
  };

  return (
    <body>
      <div className="form">
        <ul className="tab-group">
          <li
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            <a href="#signup">Sign Up</a>
          </li>
          <li
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            <a href="#login">Log In</a>
          </li>
        </ul>

        <div className="tabs-and-content">
          {activeTab === "signup" && (
            <div id="signup" className="tab-content active-content">
              <h1>Sign Up for Free</h1>
              <form onSubmit={registerUser}>
                <div className="top-row">
                  <div className="field-wrap">
                    <label>
                      First Name<span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="field-wrap">
                    <label>
                      Last Name<span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field-wrap">
                  <label>
                    Email Address<span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="field-wrap">
                  <label>
                    Set A Password<span className="req">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="button button-block">
                  Get Started
                </button>
              </form>
            </div>
          )}

          {activeTab === "login" && (
            <div id="login" className="tab-content active-content">
              <h1>Welcome Back!</h1>
              <form onSubmit={loginUser}>
                <div className="field-wrap">
                  <label>
                    Email Address<span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="field-wrap">
                  <label>
                    Password<span className="req">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <p className="forgot">
                  <a href="#">Forgot Password?</a>
                </p>

                <button className="button button-block">Log In</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </body>
  );
};

export default Home;
