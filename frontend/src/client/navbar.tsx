import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';

export default function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await axios.get('http://localhost:8080/signout'); // Replace with your server URL
            navigate('/signout');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    
    return (
        <nav className="border-2 p-5 shadow md:flex md:items-center md:justify-between mb-[50px]">
        <div className="flex justify-between items-center ">
            <span className="text-xl font-[Poppins] cursor-pointer">
                <img className="h-10 inline" src="https://thumbs.dreamstime.com/b/quote-icon-quote-sign-white-background-simple-vector-illustration-black-quote-icon-quote-sign-logo-144929690.jpg"/>

                Quote of the Day
            </span>
            <span   className="text-3xl cursor-pointer mx-2 md:hidden block">
                <IconButton onClick={toggleMenu}>
                    {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>

            </span>
        </div>
        <div>
        <ul className={`md:flex md:items-center z-[-1] md:z-1 md:mb-[500px]absolute bg-white w-full left-0 md:w-auto md:py-3 py-4 md:pl-0 pl-7 md:opacity-100 top-[80px] transition-all ease-in duration-500 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <li className="mx-4 px-5  py-2 md:my-0">
            <a href="/app" className="text-xl md:cursor-pointer hover:text-red-600 font-[Poppins] duration-500">Home</a>
            </li>
            <li className="mx-4 px-5   py-2 md:my-0">
            <a href="/app/saved" className="text-xl md:cursor-pointer hover:text-red-600 font-[Poppins] duration-500">Saved</a>
            </li>
 
            <button onClick={handleLogout} className="bg-red-600 cursor-pointer text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-red-700 rounded">Sign Up</button>
        </ul>
        </div>
    </nav>
    )

}
