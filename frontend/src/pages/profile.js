import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Nav from '../components/navbar2';
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {
    const [uop, setUop] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`/api/user/${user.username}`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }});
            const json = await response.json();

            if (response.ok) {
                setUop(json);
            } else {
                throw new Error('Failed to fetch user data');
            }
        };

        if (user) {
            fetchUser();
        }
    }, [user]);

    if (!uop) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Navbar />
            <div className="flex flex-grow">
                <Nav />
                <div className="bg-[#0e1628] flex flex-col w-full text-[#94a3b8] p-4 md:p-8 lg:p-12 rounded-lg">
                        <h1 className="underline decoration-2 underline-offset-[5px] text-[40px] md:text-[60px] mb-4">
                            {uop.username}
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            {uop.type}
                        </p>
                        <table className="w-full md:w-[50%] border-collapse border border-gray-500">
                            <tbody>
                                <tr className="border-b border-gray-500">
                                    <td className="p-4 text-center text-white">Name</td>
                                    <td className="p-4 text-left text-[#94a3b8]">{uop.username}</td>
                                </tr>
                                <tr className="border-b border-gray-500">
                                    <td className="p-4 text-center text-white">Email</td>
                                    <td className="p-4 text-left text-[#94a3b8]">{uop.email}</td>
                                </tr>
                                <tr className="border-b border-gray-500">
                                    <td className="p-4 text-center text-white">Role</td>
                                    <td className="p-4 text-left text-[#94a3b8]">{uop.type}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
};

export default Profile;

