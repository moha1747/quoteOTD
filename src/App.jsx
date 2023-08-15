import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState("");
  const getQuote = () => {
    axios
      .get("https://api.quotable.io/random")
      .then((response) => {
        console.log(response.data.content);
        setQuote(response.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div class="quote">{quote && <p>{quote}</p>}</div>
      <button className="btn" onClick={getQuote}>
        
        Get Quote
      </button>
    </div>
  );
}

export default App;
