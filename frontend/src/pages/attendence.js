import Navbar from '../components/navbar'
import Nav from '../components/navbar2'
import AttDetails from '../components/AttDetails';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'

const Attendence = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [att, setAtt] = useState([]);
    const [fetchClicked, setFetchClicked] = useState(false);
    const { user } = useAuthContext();

    const handleClick = async () => {
        setFetchClicked(true);
        const response = await fetch(`/api/attendence/${selectedDate}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            setAtt(json);
        } else {
            setAtt([]);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Navbar />
            <div className="flex flex-grow">
                <Nav />
                <div className="bg-[#0e1628] flex flex-col w-full text-[#94a3b8] p-4 md:p-8 lg:p-12 rounded-lg">
                    <h1 className="underline decoration-2 underline-offset-[5px] text-2xl md:text-4xl lg:text-5xl mt-10 mx-4">
                        Attendence
                    </h1>
                    <div className="mt-10 mx-4">
                        <label className="text-lg md:text-xl" htmlFor="date">Select Date:</label>
                        <input
                            type="date"
                            id="date"
                            className="ml-4 p-2 bg-[#0e1628] text-white border border-gray-500 rounded focus:outline-none focus:border-purple-500 transition-colors duration-300"
                            name="date"
                            value={selectedDate}
                            onChange={(event) => setSelectedDate(event.target.value)}
                        />
                        <button
                            className="ml-4 p-2 bg-purple-700 text-white rounded border border-white hover:bg-[#0e1628] hover:border-purple-500 transition-all duration-300"
                            onClick={handleClick}
                        >
                            Fetch
                        </button>
                    </div>
                    
                    {fetchClicked && selectedDate && (
                        <table className="mt-10 mx-4 w-11/12 md:w-2/3 lg:w-1/2 border border-gray-500 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="border-b border-gray-500 text-center bg-[#0e1628] text-white">
                                    <th className="py-2">Subject</th>
                                    <th className="py-2">Present</th>
                                </tr>
                            </thead>
                            <tbody>
                                {att.length > 0 ? (
                                    att.map((date) => (
                                        <AttDetails key={date._id} date={date} />
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center py-4" colSpan="2">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendence;