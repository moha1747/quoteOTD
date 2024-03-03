import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {  IconButton } from "@mui/material";
import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Navbar(){

    const [isMenuOpen, setMenuOpen] = useState(false); // Changes state depending on viewport size
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen); 
    }
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/signout')
    }
    
    
    return (
  
<header className="fixed w-full backdrop-filter backdrop-blur-md z-30 md:bg-opacity-30 border-b border-red-200 transition duration-300 ease-in-out">
<div className="max-w-6xl mx-auto px-5 sm:px-6">
<div className="flex items-center justify-between h-16 md:h-20">
    <div className="shrink-0 mr-4">
        <a href="/"  className="block cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
        </a>
    </div>

    <nav className="hidden fixed inset-0 md:flex md:grow ">
        <ul className="flex grow justify-end flex-wrap items-center max-h-[80vh] overflow-contain">
            <li>
                <a href="/client" className="text-lg text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer font-[Poppins]">
                    Home
                </a>
            </li>
            <li>
                <a href="/client/saved" className="text-lg border py-2 flex items-center rounded-md px-4 font-[poppins] text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                    Saved
                </a>
            </li>
        </ul>
    </nav>
    <div className="flex md:hidden">
        <span className="text-3xl cursor-pointer mx-2 md:hidden block">
            <IconButton onClick={toggleMenu}>
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
        </span>
        <div className={`${isMenuOpen ? 'block' : 'hidden '}`}>
            <nav className="absolute top-full  right-0 h-screen pb-16 z20  w-1/2 overflow-scroll bg-white opacity-100">
                <ul className="px-5 py-20 flex flex-col justify-center flex-wrap">
                    <li>
                        <a href="/client" className="flex justify-center text-lg w-full text-gray-600 hover:text-gray-900 font-[poppins] py-2">
                            Home
                        </a>
                    </li>
                    <li> 
                    <a href="/client/saved" className="flex justify-center text-lg w-full text-gray-600 font-[poppins] hover:text-gray-900 py-2">
                            Saved
                        </a>
                    </li>
                    <li> 
                        <a href="/" onClick={handleLogout} className="text-lg border py-2 flex items-center justify-center rounded-md px-4 font-[poppins] text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                            <span>Sign Out</span>
                                <svg className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style={{cursor: "pointer"}}><path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fill-rule="nonzero" style={{cursor: "pointer", }}></path></svg>  
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>
</div>
</header>

    )

}
