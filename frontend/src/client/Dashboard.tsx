import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import {  IconButton } from "@mui/material";



export default function Dashboard() {

    interface Quote {
        content: string;
        author: string;
      }

    const [search, setSearch] = useState<string>("");
    const [quote, setQuote] = useState<Quote>({ content: '', author: '' });
    const [isSearched, setIsSearched] = useState(false);
    const [isClicked, setisClicked] = useState(false);


    
    const [searchedQuotes, setSearchedQuotes] = useState<Quote[]>([]);


    useEffect(() => {
        // Disables background scroll for search pop up
        document.body.style.overflow = isSearched ? 'hidden' : 'unset'; 
      }, [isSearched]);
      
      const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>)  => {
        setisClicked(true)
        e.preventDefault();
        await axios
        .get("https://api.quotable.io/random")
        .then((response) => {
          console.log(response.data);
          setQuote(response.data);
        })
        .catch((err) => {
          console.error("Error fetching the quote: ", err);
        });
    };


    const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsSearched(true);
        e.preventDefault();
        axios.get(`https://api.quotable.io/search/quotes?query=${search.replace(/ /g, "+")}`, 
            {
                headers: {
                    autocomplete: true,
                    matchThreshold: 2,
                    limit: 20,
                }
            }).then((response) => {
                const { results } = response.data;
                setSearchedQuotes(results)
                console.log(results, "Results")
            }).catch((error) => {
                console.error("Error: ", error)
            })

        }       
        const handleSave = async () => {
            const userId = localStorage.getItem('userId');
            const sessionToken = localStorage.getItem('sessionToken');

            const quoteData = {
              userId, 
              quote: {
                content: quote.content, 
                author: quote.author, 
              }
            };
          
            axios.post(`https://quoteotd-1.onrender.com/api/quotes`, quoteData, {
              headers: {
                Authorization: `Bearer ${sessionToken}`, 
              },
            })
            .then((response) => {
              console.log("Quote saved successfully: ", response.data);
              setisClicked(!isClicked); 
            })
            .catch((err) => {
              console.error("Error saving the quote: ", err);
            });
          };


         
          


    return (
        <> 
            <Navbar />

                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="text-center pb-12 md:pb-16">
                        <h1 className="text-5xl md:pb-16 font-[poppins] leading-tight traacking-relaxed mb-4">
                            Pick up where you left off

                        </h1>

                    </div>
                    <form className="max-w-md mx-auto">   
                                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" value={search} onChange={(e)=> setSearch(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Author or Keyword (e.g.) life" required />
                                    <button type="submit" onClick={handleSearch} className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 font-[poppins]">Search</button>
                                    {isSearched && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 flex justify-center items-center">
                                            <div className="bg-red-300  text-gray-800 p-5 rounded-lg max-h-[80vh] overflow-y-auto">
                                            <span className="text-3xl   cursor-pointer mx-2 md:hidden block">
                                                <IconButton onClick={()=> setIsSearched(false)}>
                                                    { <CloseIcon style={{color: "white"}} />}
                                                </IconButton>
                                            </span>                                            
                                            {searchedQuotes.map((quote, index) => (
                                                <div key={index} className="p-2">
                                                    <p className="text-gray-900 text-lg font-[poppins]">{quote.content}</p>
                                                    <p className="text-sm text-gray-500 font-[poppins]">~ {quote.author}</p>
                                                    <button className="mt-4 px-2 py-1 my-4 border border-red-200 text-transparent text-white bg-gradient-to-r  transition duration-200 hover:scale-75" onClick={handleSave}>
                                                    Save Quote
                                                    </button>
                                                </div>
                                                ))}

                                            </div>
                                        </div>
                                        )}
                                </div>
                            </form>
                            <div className="text-center pb-12 md:pb-16">
                                <div className="relative max-w-3xl mx-auto px-4 pt-12">
                                    <h3 className="text-xl font-[poppins] text-gray-900 dark:text-gray-900">
                                        Generate a random quote here
                                    </h3>
                                    <button className="px-2 py-1 my-4 border border-red-200 text-transparent text-white bg-gradient-to-r from-red-500 to-purple-400 rounded-lg font-[poppins] shadow hover:bg-purple-600 transition duration-200 hover:scale-75" onClick={handleGenerate}>
                                        Click Me!
                                    </button>
                                    
                                        {isClicked && (
                                            <div className="px-6 mx-auto font-[poppins] text-lg tracking-relaxed leading-normal text-gray-500 dark:text-gray-600"> 
                                                {quote.content} <br /> ~ {quote.author} <br />
                                                <button className="mt-4 px-2 py-1 my-4 border border-red-200 text-transparent text-white bg-gradient-to-r from-red-500 to-purple-400 rounded-lg font-[poppins] shadow hover:bg-purple-600 transition duration-200 hover:scale-75" onClick={handleSave}>
                                                    Save Quote
                                    </button>
                                            </div>
                                            
                                        )}
                                </div>
                        </div>
                </div>



        </>

    );
}
