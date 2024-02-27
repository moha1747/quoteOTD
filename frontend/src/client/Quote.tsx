import { useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("")

  const [isClicked, setIsClicked] = useState(false);


  const getQuote = () => {

    setIsClicked(true);

    axios
      .get("https://api.quotable.io/random")
      .then((response) => {
        console.log(response.data.content);
        setQuote(response.data.content);
        setAuthor(response.data.authorSlug);
      })
      .catch((err) => {
        console.error("Error fetching the quote: ", err);
      });
  };
  const saveQuote = async () => {
    const userId = localStorage.getItem('userId')
    const sessionToken = localStorage.getItem('sessionToken')
    axios
    .post(
      `http://localhost:8080/api/quotes`,
      { userId, quote, author },
      {
        headers: {
          Authorization: sessionToken,
        },
      }
    )
    .then((response) => {
      console.log("Quote saved successfully: ", response.data);
      setQuote('');
      setIsClicked(!isClicked)
    })
    .catch((err) => {
      console.error("Error saving the quote: ", err);
    });
};

  return (
    <div className="flex flex-col items-centerjustify-between text-center">
    {isClicked && (
      <div
        className="text-center w-full   font-serif relative text-3xl text-black border border-transparent rounded-md shadow-lg transition-all"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 10px 20px rgba(225, 29, 72, 0.5), 0 6px 6px rgba(255, 29, 72, 0.5), 0 0 100px -10px #e11d48',
        }}
      >
        {quote ? <p className="whitespace-pre-line">"{quote}<br></br>
        <p className="uppercase hyphens-none">~{author}</p></p> : <p>Loading...</p>}
      </div>
    )}
    <div className="flex flex-row justify-between py-3  mx-auto  ">
      <button
        className="text-center mr-4  font-serif font-semibold text-base no-underline leading-none bg-red-600 text-blue-50 py-5 px-4 border border-transparent cursor-pointer rounded-md transition-all"
        style={{
          boxShadow: '0 10px 20px rgba(225, 29, 72, 0.5), 0 6px 6px rgba(255, 29, 72, 0.5), 0 0 100px -10px #e11d48',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 14px 28px rgba(225, 29, 72, 0.25), 0 10px 10px rgba(255, 29, 72, 0.22), 0 0 120px -10px #e11d48';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(225, 29, 72, 0.5), 0 6px 6px rgba(255, 29, 72, 0.5), 0 0 100px -10px #e11d48';
        }}
        onClick={getQuote}
      >
        New Quote
    </button>
      {isClicked && (
        <button
        className="text-center ml-4  font-serif font-semibold text-base no-underline leading-none bg-blue-600 text-blue-50 py-5 px-4 border border-transparent cursor-pointer rounded-md transition-all"
        style={{
          boxShadow: '0 10px 20px rgba(225, 29, 72, 0.5), 0 6px 6px rgba(255, 29, 72, 0.5), 0 0 100px -10px #1d4ee1',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 14px 28px rgba(72, 29, 255, 0.25), 0 10px 10px rgba(72, 29, 255, 0.22), 0 0 120px -10px #006fb9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(72, 29, 255, 0.5), 0 6px 6px rgba(72, 29, 255, 0.5), 0 0 100px -10px #006fb9';
        }}
        onClick={saveQuote}
      >
        Save Quote
      </button>
      )}
      </div>
    </div>
  );
};

export default Quote;
