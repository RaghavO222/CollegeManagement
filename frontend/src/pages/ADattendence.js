import Navbar from '../components/navbar'
import Nav from '../components/navbar2'
import AD from '../components/ADetails'

import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'

const ADattendence = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [sub,setSub] = useState('')
    const [us, setUs] = useState([]);
    const [fetchClicked, setFetchClicked] = useState(false);
    const [attData,setAttData] = useState({})
    const { user } = useAuthContext();

    const handleFetch = async () => {
        if (sub && selectedDate) {
            try {
                const response = await fetch('/api/user/',{
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }});
                const json = await response.json();
                if (response.ok) {
                    setUs(json);
                    setFetchClicked(true);
                } else {
                    console.error('Failed to fetch user data:', json);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } else {
            alert('Please select all the fields.');
        }
    };

    const handleChange = (id,Present) => {
        console.log('Attendance change received:', id, Present,sub,selectedDate);
        setAttData(prevAttData => ({
            ...prevAttData,
            [id]: {
                Subject: sub,
                present: Present,
                date: selectedDate
            }
        }))        
    }

    const handleSave = async() => {
        for(const [id,att] of Object.entries(attData)){
            console.log("Sending att data:", { ...att, user_id: id });
            const response = await fetch('/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({                    
                    ...att,
                    user_id: id
                })
            });

            const json = await response.json()
            if (response.ok) {
                console.log(`Att saved successfully for user ${id}:`, json);
            } else {
                console.error(`Failed to save Att for user ${id}:`, json);
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Navbar />
            <div className="flex flex-grow">
                <Nav />
                <div className="bg-[#0e1628] flex flex-col w-full text-[#94a3b8] p-6 md:p-8 lg:p-12 rounded-lg">
                    <h1 className="underline decoration-2 underline-offset-[5px] text-3xl md:text-4xl lg:text-5xl mt-10 mx-4">
                        Attendance
                    </h1>
                    <div className="mt-6 mx-6 flex flex-wrap items-center">
                        <label className="block text-lg mr-4">Select Date:</label>
                        <input
                            className="bg-[#0e1628] text-white border border-gray-300 rounded-md p-2 mr-4"
                            type="date"
                            id="date"
                            name="date"
                            value={selectedDate}
                            onChange={(event) => setSelectedDate(event.target.value)}
                        />

                        <label className="block text-lg mr-4" htmlFor="subject">Select Subject:</label>
                        <select
                            className="bg-[#0e1628] text-white border border-gray-300 rounded-md p-2 mr-4"
                            id="subject"
                            value={sub}
                            onChange={(event) => setSub(event.target.value)}
                        >
                            <option value="">Select a subject</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Maths">Maths</option>
                        </select>
                        <button 
                            className="bg-purple-700 text-white border border-white rounded-md py-2 px-4 hover:bg-[#0e1628] transition-all duration-300"
                            onClick={handleFetch}
                        >
                            Fetch
                        </button>
                    </div>
                    {fetchClicked && sub && selectedDate && (
                        <table className="mt-8 mx-6 w-[50%] border border-gray-500 rounded-lg">
                            <thead>
                                <tr className="text-left bg-[#0e1628] text-white">
                                    <th className="py-3 px-4 border-b border-gray-600 text-center">Student</th>
                                    <th className="py-3 px-4 border-b border-gray-600 text-center">Present</th>
                                </tr>
                            </thead>
                            <tbody>
                                {us && us.map((user) => (
                                    <AD 
                                        key={user._id}
                                        us={user}
                                        onChange={handleChange}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                    {fetchClicked && (
                        <button 
                            className="w-full md:w-[10vw] bg-purple-700 text-white border border-white rounded-md py-2 px-4 mt-8 ml-6 hover:bg-[#0e1628] transition-all duration-300"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ADattendence