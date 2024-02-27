import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Auth(){
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginMethod, setIsLoginMethod] = useState(false);

    const toggleMethod = () => setIsLoginMethod(!isLoginMethod);

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const url = `http://localhost:8080/auth/${isLoginMethod ? 'login' : 'register'}`;

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
                
                navigate('/app')
              
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }





    return (

        <>
        {/* register */}
        <section className="bg-blueGray-5 items-center  mt-[200px]">
            <div className="w-full lg:w-6/12 px-4 mx-auto pt-6">
                <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="  bg-white rounded-t mb-0 px-6 py-6">
                        <div className="flex flex-row justify-between">
                            <button 
                                onClick={toggleMethod} 
                                className={`w-[50%] text-3xl font-bold px-4 py-2 rounded transition-colors duration-150 ${isLoginMethod ? 'bg-white text-blueGray-500' : 'bg-red-500 text-white'}`}>
                                Sign up
                            </button>
                            <button 
                                onClick={toggleMethod} 
                                className={`w-[50%] text-3xl font-bold px-4 py-2 rounded transition-colors duration-150 ${!isLoginMethod ? 'bg-white text-blueGray-500' : 'bg-red-500 text-white'}`}>
                                Log in
                            </button>
                        </div>
                    </div>
              <hr className="mt-6 border-b-1 border-blueGray-300"/>
            {/* Form */}
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
              </div>
              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password"> Username</label>
                  <input type="name" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="Username"/>
                </div>
        
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Email</label>
                  <input type="email" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Email"/>
                </div>
        
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">Password</label>
                  <input type="password" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Password"/>
                </div>
        
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"/>
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                      I agree with the  {}
                      <a href="javascript:void(0)" className="text-pink-500">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
        
                <div className="text-center mt-6">
                  <button className="bg-red-500 text-white  active:bg-blueGray-600 text-lg font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" type="submit">
                  {isLoginMethod ? 'Log In' : 'Sign Up'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer className="relative  pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                </div>
              </div>
            </div>
          </div>
        </footer>
        </section>
        </>
    )

}