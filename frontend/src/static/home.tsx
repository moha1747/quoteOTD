import { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {  IconButton } from "@mui/material";
import axios from "axios";
import Navbar from "./navbar";
interface Quote {
    content: string;
    author: string;
  }

export default function Home(){

    const [search, setSearch] = useState<string>("");
    const [quote, setQuote] = useState<string[]>([])
    const [author, setAuthor] = useState<string[]>([])
    const [isSearched, setIsSearched] = useState(false);

    
    const [searchedQuotes, setSearchedQuotes] = useState<Quote[]>([]);

    useEffect(() => {
        // Disables background scroll for search pop up
        document.body.style.overflow = isSearched ? 'hidden' : 'unset'; 
      }, [isSearched]);


    const [isClicked, setisClicked] = useState(false)

        const handleGenerate = async (e: React.MouseEvent<HTMLButtonElement>)  => {
            setisClicked(true)
            e.preventDefault();
            await axios
            .get("https://api.quotable.io/random")
            .then((response) => {
              console.log(response.data.content);
              setQuote(response.data.content);
              setAuthor(response.data.author);
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
                    console.log(results)
                }).catch((error) => {
                    console.error("Error: ", error)
                })

            }            

    return (
        <body className="bg-red-200">
                    <Navbar />

            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                <div className="text-center pb-12 md:pb-16">
                    <h1 className="text-5xl md:text-7xl font-extrabold font-[poppins] leading-tight mb-4 ">Welcome to Quote of the 
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-400"> Day</span>
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-xl text-gray-600 mb-8 font-[poppins] leading-relaxed">
                            We help you keep track of all the quotes you like. Just search for by author name or how you remembered a quote. Our auto-complete feature has got you covered!
                        </p>
                        <div>
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
                                            <span className="text-3xl   cursor-pointer mx-2 block">
                                                <IconButton onClick={()=> setIsSearched(false)}>
                                                    { <CloseIcon style={{color: "white"}} />}
                                                </IconButton>
                                            </span>                                            
                                                {searchedQuotes.map((quote, index) => (
                                                    <div key={index} className="p-2">
                                                    <p className="text-gray-900 text-lg font-[poppins]">{quote.content}</p>
                                                    <p className="text-sm text-gray-500 font-[poppins]">~ {quote.author}</p>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                        )}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="relative max-w-3xl mx-auto px-4 pt-12">
                        <h3 className="text-3xl  font-bold font-[poppins] text-gray-900 dark:text-gray-900">
                            If you dont remember you can also <br />generate a random quote here
                        </h3>
                        <button className="px-2 py-1 my-4 border border-red-200 text-transparent text-white bg-gradient-to-r from-red-500 to-purple-400 rounded-lg font-[poppins] shadow hover:bg-purple-600 transition duration-200 hover:scale-75" onClick={handleGenerate}>
                            Click Me!
                        </button>
                            {isClicked && (
                                <div className="px-6 mx-auto font-[poppins] text-lg tracking-relaxed leading-normal text-gray-500 dark:text-gray-600"> 
                                    {quote} <br /> ~ {author}
                                </div>
                            )}
                    </div>
                </div>
            </div>
            <section className="relative">
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="pt-12 md:pt-20">
                        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                            <h2 className="text-4xl font-[poppins] font-extrabold mb-4">Why this was built</h2>
                            <div className="relative  w-full overflow-x-auto shadow-lg sm:rounded-lg">
                                <table className="w-full text-lg text-left rtl:text-right text-gray-800">
                                    <thead className=" text-gray-800 uppercase font-[poppins]">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 font-bold font-[poppins] ">Problems</th>
                                            <th scope="col" className="px-6 py-3 font-[poppins] ">Our solution</th>

                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        <tr className="">
                                            
                                            <td scope="col" className="px-3 border-b border-red-300 shadow font-[poppins]">
                                                Can't remember who said what quote?
                                            </td>
                                            <td scope="col" className="px-6 py-3 font-[poppins] bg-red-300 border-b border-red-200">
                                                We feature large database of quotes from a wide range of authors, celebrities, and historical figures
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td scope="col" className="px-3 border-b border-red-300 shadow font-[poppins]">
                                                No recollection of solid quotes?
                                            </td>
                                            <td scope="col" className="px-6 py-3 font-[poppins]  bg-red-300 border-b border-red-200 ">
                                                Whether you're looking for inspiration, humor, wisdom, or motivation, we provide easy access to high-quality, impactful quotes
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td scope="col" className="px-3  font-[poppins]">
                                                Wishing you could keep all those inspirational gems in one place?
                                            </td>
                                            <td scope="col" className="px-6 py-3 font-[poppins] bg-red-300 border-b border-red-200">
                                                Say hello to your personal quote keeper! Our app doesn't just find quotes; it lets you save them, creating your own patchwork of inspiration
                                            </td>
                                        </tr>
                                    </tbody>
                                    <th></th>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </body>
    )
}