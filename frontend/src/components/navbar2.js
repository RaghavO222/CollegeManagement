import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Nav = () => {
    const { user } = useAuthContext();

    return (
        <header>
            <div className="bg-[#020617] w-[15%] min-w-[200px] h-[90vh] flex flex-col p-3">
                <NavLink
                    to="/attendence"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#6d28d9] text-white rounded-lg py-3 px-5 my-5'
                            : 'hover:bg-[#331b6d] text-white rounded-lg py-3 px-5 my-5 transition duration-300 ease-in-out'
                    }
                >
                    <h1 className="text-sm">Attendance</h1>
                </NavLink>
                <NavLink
                    to="/marks"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#6d28d9] text-white rounded-lg py-3 px-5 my-5'
                            : 'hover:bg-[#331b6d] text-white rounded-lg py-3 px-5 my-5 transition duration-300 ease-in-out'
                    }
                >
                    <h1 className="text-sm">Marks</h1>
                </NavLink>
                {user && user.type === 'HOD' && (
                    <NavLink
                        to="/approval"
                        className={({ isActive }) =>
                            isActive
                                ? 'bg-[#6d28d9] text-white rounded-lg py-3 px-5 my-5'
                                : 'hover:bg-[#331b6d] text-white rounded-lg py-3 px-5 my-5 transition duration-300 ease-in-out'
                        }
                    >
                        <h1 className="text-sm">Approvals</h1>
                    </NavLink>
                )}
                {/* Spacer to push the profile link to the bottom */}
                <div className="flex-grow"></div>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive
                            ? 'bg-[#6d28d9] text-white rounded-lg py-3 px-5 my-5'
                            : 'hover:bg-[#331b6d] text-white rounded-lg py-3 px-5 my-5 transition duration-300 ease-in-out'
                    }
                >
                    <h1 className="text-sm">Profile</h1>
                </NavLink>
            </div>
        </header>
    );
}

export default Nav;
