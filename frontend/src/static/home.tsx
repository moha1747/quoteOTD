import Navbar from "./navbar";
import Quote from "./Quote";



export default function Home(){
    return (
        <>

        <Navbar />
        <div className="mt-[200px]" >
        <Quote/>
        </div>

        </>
    )
}