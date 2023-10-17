import { useState } from "react";
import axios from "axios";
import "../styles/quote.css"

const Quote = () => { 
function addComponent() { }
  const [quote, setQuote] = useState("")
  const [isClicked, setIsClicked] = useState(false) 

  const getQuote = () => {
    setIsClicked(true) 

    axios
      .get("https://api.quotable.io/random")
      .then((response) => {
        console.log(response.data.content)
        setQuote(response.data.content)
      })
      .catch((err) => {
        console.error("Error fetching the quote: ", err)
      })
  }

  return (
    <div className="container">
      {isClicked && (
        <div className="quote">
          {quote ? <p>{quote}</p> : <p>Loading...</p>}
        </div>
      )}
      <button className="btn" onClick={getQuote}>
        Get Quote
      </button>
    </div>
  )
}

export default Quote

