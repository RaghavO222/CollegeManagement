import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const { user } = useAuthContext();

    return (
        <div className="bg-[#020617] min-h-screen">
            <Navbar />
            <div className="bg-[#0e1528] h-screen flex flex-col items-center pt-0">
                <h2 className="text-gray-400 text-4xl md:text-5xl mt-32 mb-12 text-center">
                    Home
                </h2>
                <div className="flex flex-wrap justify-center items-center space-x-0 md:space-x-6">
                    <Link 
                        to="/attendence" 
                        className="text-center bg-[#281159] text-gray-400 py-5 px-10 my-4 mx-2 rounded-lg text-xl w-[270px] sm:w-[320px] md:w-[370px] hover:bg-[#363677] hover:text-white transition duration-300 ease-in-out"
                    >
                        Attendance
                    </Link>
                    <Link 
                        to="/marks" 
                        className="text-center bg-[#281159] text-gray-400 py-5 px-10 my-4 mx-2 rounded-lg text-xl w-[270px] sm:w-[320px] md:w-[370px] hover:bg-[#363677] hover:text-white transition duration-300 ease-in-out"
                    >
                        Marks
                    </Link>
                    <Link 
                        to="/profile" 
                        className="text-center bg-[#281159] text-gray-400 py-5 px-10 my-4 mx-2 rounded-lg text-xl w-[270px] sm:w-[320px] md:w-[370px] hover:bg-[#363677] hover:text-white transition duration-300 ease-in-out"
                    >
                        Profile
                    </Link>
                    {user && user.type === 'HOD' && (
                        <Link 
                            to="/approval" 
                            className="text-center bg-[#281159] text-gray-400 py-5 px-10 my-4 mx-2 rounded-lg text-xl w-[270px] sm:w-[320px] md:w-[370px] hover:bg-[#363677] hover:text-white transition duration-300 ease-in-out"
                        >
                            Approvals
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
