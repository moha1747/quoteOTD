import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';


export default function Auth(){
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


        const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const url = `http://localhost:8080/auth/login`

            try {
                const response = await axios.post(url, {
                    email,
                    password
                });
                const {userId} = response.data
                const {sessionToken} = response.data

                localStorage.setItem('userId', userId);
                localStorage.setItem('sessionToken', sessionToken)
                
                navigate('/app')
              
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
                Welcome                         
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-400"> Back.</span>
              </h1>
            </div>
            <div className='max-w-sm mx-auto'>
              {/* Login */}
              <form  onSubmit={handleSignin} action="submit">
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className='w-full px-3 '>
                    <label htmlFor="email" className="block text-gray-800 text-xm font-medium mb-1 font-[poppins]">
                      Email</label>
                      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full p-4 ps-4 text-sm text-gray-900 border rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your email address" required type="email"></input>
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
                  <button  type='submit' className="py-3 rounded-md text-xl font-[poppins] text-white bg-blue-600 hover:bg-blue-700 w-full">Sign in</button>
                  </div>
                </div>

              </form>
            </div>
          </section>
          </>

        )

    // return (

    //     <>
    //     {/* register */}
    //     <section className="bg-blueGray-5 items-center  mt-[200px]">
    //         <div className="w-full lg:w-6/12 px-4 mx-auto pt-6">
    //             <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
    //                 <div className="  bg-white rounded-t mb-0 px-6 py-6">
    //                     <div className="flex flex-row justify-between">
    //                         <button 
    //                             onClick={toggleMethod} 
    //                             className={`w-[50%] text-3xl font-bold px-4 py-2 rounded transition-colors duration-150 ${isLoginMethod ? 'bg-white text-blueGray-500' : 'bg-red-500 text-white'}`}>
    //                             Sign up
    //                         </button>
    //                         <button 
    //                             onClick={toggleMethod} 
    //                             className={`w-[50%] text-3xl font-bold px-4 py-2 rounded transition-colors duration-150 ${!isLoginMethod ? 'bg-white text-blueGray-500' : 'bg-red-500 text-white'}`}>
    //                             Log in
    //                         </button>
    //                     </div>
    //                 </div>
    //           <hr className="mt-6 border-b-1 border-blueGray-300"/>
    //         {/* Form */}
    //         <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
    //           <div className="text-blueGray-400 text-center mb-3 font-bold">
    //           </div>
    //           <form onSubmit={handleSubmit}>
    //             <div className="relative w-full mb-3">
    //               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"> Username</label>
    //               <input type="name" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="Username"/>
    //             </div>
        
    //             <div className="relative w-full mb-3">
    //               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
    //               <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Email"/>
    //             </div>
        
    //             <div className="relative w-full mb-3">
    //               <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
    //               <input type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Password"/>
    //             </div>

    //             <div>
    //               <label className="inline-flex items-center cursor-pointer">
    //                 <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"/>
    //                 <span className="ml-2 text-sm font-semibold text-blueGray-600">
    //                   I agree with the  {}
    //                   <a href="javascript:void(0)" className="text-pink-500">
    //                     Privacy Policy
    //                   </a>
    //                 </span>
    //               </label>
    //             </div>
        
    //             <div className="text-center mt-6">
    //               <button className="bg-red-500 text-white  active:bg-blueGray-600 text-lg font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="submit">
    //               {isLoginMethod ? 'Log In' : 'Sign Up'}
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //     <footer className="relative  pt-8 pb-6 mt-8">
    //       <div className="container mx-auto px-4">
    //         <div className="flex flex-wrap items-center md:justify-between justify-center">
    //           <div className="w-full md:w-6/12 px-4 mx-auto text-center">
    //             <div className="text-sm text-blueGray-500 font-semibold py-1">
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </footer>
    //     </section>
    //     </>
    // )

}