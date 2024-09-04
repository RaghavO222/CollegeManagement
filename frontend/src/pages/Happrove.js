import Navbar from '../components/navbar'
import Nav from '../components/navbar2'
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Appr from '../components/Appr';

const Approvals = () => {
    const [uop, setUop] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/temp/');
                const json = await response.json();
    
                if (response.ok) {
                    setUop(json);
                    console.log('Fetched data:', json);
                } else {
                    console.error('Failed to fetch user data:', json);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user && user.type === 'HOD') {
            fetchUser();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Navbar />
            <div className="flex flex-grow">
                <Nav />
                <div className="bg-[#0e1628] flex flex-col w-full text-[#94a3b8] p-4 md:p-8 lg:p-12 rounded-lg">
                    <h1 className="underline decoration-2 underline-offset-[5px] text-3xl md:text-4xl lg:text-5xl mt-10 mx-4">
                        Approvals
                    </h1>
                    <div className="overflow-x-auto mt-8">
                        <table className="w-full text-left text-slate-400">
                            <thead>
                                <tr>
                                    <th className="p-4 border-b border-slate-600">Name</th>
                                    <th className="p-4 border-b border-slate-600">Email</th>
                                    <th className="p-4 border-b border-slate-600">Role</th>
                                    <th className="p-4 border-b border-slate-600">Accept</th>
                                    <th className="p-4 border-b border-slate-600">Reject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uop.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-8 text-slate-400">
                                            No requests
                                        </td>
                                    </tr>
                                ) : (
                                    uop.map((u) => (
                                        <Appr key={u._id} u={u} />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Approvals;
