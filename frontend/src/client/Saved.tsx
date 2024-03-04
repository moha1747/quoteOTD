import { useEffect, useState } from 'react'
import Navbar from './navbar'
import axios from 'axios';


const Saved = () => {
  interface Quote {
    content: string;
    author: string;
  }
  
  


  const [quotes, setQuotes] = useState<Quote[]>([]);

    const userId = localStorage.getItem('userId');
    const sessionToken = localStorage.getItem('sessionToken')


    useEffect(() => {
      const fetchSavedQuotes = async () => {
          try{
      const response = await axios.get(`https://quoteotd-1.onrender.com/api/quotes/${userId}`, {
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

  const deleteQuote = async (quoteToDelete: Quote) => {
    try {
      await axios.delete(`https://quoteotd-1.onrender.com/api/quotes/${userId}`, {
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
      <body>
      <Navbar />
      
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="text-center pb-12 md:pb-16">
                    <h1 className="text-5xl md:pb-16 font-[poppins] leading-tight traacking-relaxed mb-4">
                        Heres what you saved

                    </h1>

        </div>
        <div className="border-2 shadow mx-4 my-4">
          {quotes.map((quote, index) => (
            <div key={index} className="flex justify-between items-center p-4 font-serif tracking-wide leading-relaxed border-2 shadow-lg">
              {quote.content}
              <br />
              ~ {quote.author}

              <button className="font-serif ml-4 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => deleteQuote(quote)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        </div>
      
        


</body>
)
  
}

export default Saved