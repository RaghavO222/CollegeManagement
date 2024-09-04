import Navbar from '../components/navbar';
import Nav from '../components/navbar2';
import MarkDetails from '../components/markDetails';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Marks = () => {
    const [marks, setMarks] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchMarks = async () => {
            const response = await fetch('/api/marks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                setMarks(json);
            }
        };

        if (user) {
            fetchMarks();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Navbar />
            <div className="flex flex-grow">
                <Nav />
                <div className="bg-[#0e1628] flex flex-col w-full text-[#94a3b8] p-4 md:p-8 lg:p-12 rounded-lg">
                    <h1 className="underline decoration-2 underline-offset-[5px] text-3xl md:text-4xl lg:text-5xl mt-10 mx-4">
                        Marks
                    </h1>
                    <div>
                        <table className="mt-10 mx-4 w-full border border-gray-500 rounded-lg">
                            <thead>
                                <tr className="text-center bg-[#0e1628] text-white">
                                    <th className="py-3 px-4">Subject</th>
                                    <th className="py-3 px-4">Test</th>
                                    <th className="py-3 px-4">Seminar</th>
                                    <th className="py-3 px-4">Attendence</th>
                                    <th className="py-3 px-4">Assignment</th>
                                    <th className="py-3 px-4">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {marks && marks.map((mark) => (
                                    <MarkDetails key={mark._id} mark={mark} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marks;