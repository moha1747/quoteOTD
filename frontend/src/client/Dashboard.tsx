import Navbar from './navbar';
import Quote from './Quote';

export default function Dashboard() {
    return (
        <>
            <Navbar  />
            <div className='mt-[500px]'>
                <Quote />
            </div>
        </>
    );
}
