import { useEffect, useState } from 'react'
import Navbar from './navbar'
import axios from 'axios';

const Saved = () => {
  const [quotes, setQuotes] = useState<string[]>([]);

    const userId = localStorage.getItem('userId');
    const sessionToken = localStorage.getItem('sessionToken')


    useEffect(() => {
        const fetchSavedQuotes = async () => {
            try{
        const response = await axios.get(`http://localhost:8080/api/quotes/${userId}`, {
            headers: {
                Authorization: sessionToken, 
              }
            })
            setQuotes(response.data);
            console.log(response.data)
            } catch(error) {
                console.error("Error fetching saved quotes:", error);
            }
        }
        if (userId) {
            fetchSavedQuotes();
          }
    }, [userId, sessionToken])

    const deleteQuote = async (quoteToDelete: string) => {
      try {
        await axios.delete(`http://localhost:8080/api/quotes/${userId}`, {
          headers: {
            Authorization: sessionToken, 
            'Content-Type': 'application/json'
          },

          data: { quote: quoteToDelete }
        });
        const updatedQuotes = quotes.filter(quote => quote !== quoteToDelete);
        setQuotes(updatedQuotes);
      } catch (error) {
        console.error("Error deleting the quote:", error);
      }
    };
    




    

  return (
          <>
          <Navbar />
            <div className="border-2 shadow mx-4 my-4">
              {quotes.map((quote, index) => (
                <div key={index} className="flex justify-between items-center p-4 font-serif tracking-wide leading-relaxed border-2 shadow-lg">
                  <span className="flex-1">{quote}</span>
                  <button className="font-serif ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteQuote(quote)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>


    </>
  )
}

export default Saved