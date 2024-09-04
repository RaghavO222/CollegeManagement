import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header className="bg-[#020617] h-16 flex justify-between items-center px-4 md:px-6">
            <div className="flex items-center">
                <Link to="/" className="text-white text-2xl md:text-3xl font-bold hover:underline underline-offset-4 decoration-purple-700 transition duration-300">
                    COLLEGE
                </Link>
            </div>
            <nav>
                {user && (
                    <div>
                        <button 
                            onClick={handleClick} 
                            className="bg-[#020617] text-white py-2 px-4 mx-2 rounded-lg text-lg transition duration-300 hover:bg-red-600"
                        >
                            Log Out
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
