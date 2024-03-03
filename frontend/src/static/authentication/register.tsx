import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navbar';


export default function Auth(){
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("")


        const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const url = `http://localhost:8080/auth/register`

            try {
                const response = await axios.post(url, {
                    username,
                    email,
                    password
                });
                const {userId} = response.data
                const {sessionToken} = response.data

                localStorage.setItem('userId', userId);
                localStorage.setItem('sessionToken', sessionToken)
                
                navigate('/client')
              
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }



        return (
          <>            
          <Navbar />
          <section className='pt-32 pb-12 md:pt-40 mb:pb-20 bg-white'>
            <div className='pb-12 md:pb-16 text-center'>
              <h1 className='text-5xl md:text-6xl font-extrabold font-[poppins] leading-tight mb-4'>
                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-400"> Welcome. </span>
                We exist to make remembering easier.                       
              </h1>
            </div>
            <div className='max-w-sm mx-auto'>
              <form  onSubmit={handleSignin} action="submit">
              <div className="flex flex-wrap -mx-3 mb-4">
                  <div className='w-full px-3 '>
                    <label htmlFor="Email" className="block text-gray-800 text-xm font-medium mb-1 font-[poppins]">
                      Email</label>
                      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full p-4 ps-4 text-sm text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email" autoComplete='off' required type="email"></input>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className='w-full px-3 '>
                    <label htmlFor="username" className="block text-gray-800 text-xm font-medium mb-1 font-[poppins]">
                      Username</label>
                      <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full p-4 ps-4 text-sm text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username" required type="username"></input>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                <div className='w-full px-3 '>
                    <label htmlFor="password"  className="block text-gray-800 text-xm font-medium mb-1 font-[poppins]">
                      Password</label>
                      <input id="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="block w-full p-4 ps-4 text-sm text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password" required type="password"></input>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className='w-full px-3'>
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input className='rounded-sm' type="checkbox"></input>
                          <span className="text-gray-600 ml-2 font-[poppins]">Keep me signed in</span>
                          </label>
                          </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className='w-full px-3'>
                  <button  type='submit' className="py-3 rounded-md text-xl font-[poppins] text-white bg-blue-600 hover:bg-blue-700 w-full">Sign Up</button>
                  </div>
                </div>

              </form>
            </div>
          </section>
          </>

        )
}