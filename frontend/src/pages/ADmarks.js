import Navbar from '../components/navbar';
import Nav from '../components/navbar2';
import SD from '../components/SDetails';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const ADmarks = () => {
    const [sub, setSub] = useState('');
    const [us, setUs] = useState([]);
    const [marksData, setMarksData] = useState({});
    const [fetchClicked, setFetchClicked] = useState(false); 
    const { user } = useAuthContext();

    const handleSubjectChange = (event) => {
        setSub(event.target.value);
    };

    const handleFetch = async () => {
        if (sub) {
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
            alert('Please select a subject first.');
        }
    };

    const handleMarksChange = (id, marks) => {
        console.log('Marks change received:', id, marks, sub);
        setMarksData(prevMarksData => ({
            ...prevMarksData,
            [id]: {
                Subject: sub,
                Test: marks.Test || 0,
                Seminar: marks.Seminar || 0,
                Attendence: marks.Attendance || 0,
                Assignment: marks.Assignment || 0
            }
        }));
    };

    const handleSave = async () => {
        for (const [id, marks] of Object.entries(marksData)) {
            console.log("Sending marks data:", { sub, ...marks, user_id: id });
            const response = await fetch('/api/marks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({                    
                    ...marks,
                    user_id: id
                })
            });

            const json = await response.json();
            if (response.ok) {
                console.log(`Marks saved successfully for user ${id}:`, json);
            } else {
                console.error(`Failed to save marks for user ${id}:`, json);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Navbar />
            <div className="flex flex-grow">
                <Nav />
                <div className="bg-[#0e1628] flex flex-col w-full text-[#94a3b8] p-4 md:p-8 lg:p-12 rounded-lg">
                    <h1 className="underline decoration-2 underline-offset-[5px] text-3xl md:text-4xl lg:text-5xl mt-10 mx-4">
                        Marks
                    </h1>
                    <div className="mt-6 ml-6">
                        <select
                            className="bg-[#0e1628] text-white border border-gray-300 rounded-md p-2 mr-4 text-base"
                            id="subject"
                            value={sub}
                            onChange={handleSubjectChange}
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
                    {fetchClicked && sub && (
                        <table className="mt-8 ml-6 w-[90%] border border-gray-500 rounded-lg">
                            <thead>
                                <tr className="text-left bg-[#0e1628] text-white">
                                    <th className="py-3 px-4 border-b border-gray-600">Student</th>
                                    <th className="py-3 px-4 border-b border-gray-600">Test</th>
                                    <th className="py-3 px-4 border-b border-gray-600">Seminar</th>
                                    <th className="py-3 px-4 border-b border-gray-600">Attendance</th>
                                    <th className="py-3 px-4 border-b border-gray-600">Assignment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {us && us.map((user) => (
                                    <SD
                                        key={user._id}
                                        us={user}
                                        onMarksChange={handleMarksChange}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                    {fetchClicked && (
                        <button 
                            className="bg-purple-700 text-white border border-white rounded-md py-2 px-4 mt-8 ml-6 w-[10%] hover:bg-[#0e1628] transition-all duration-300"
                            onClick={handleSave}
                        >
                            Save Marks
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ADmarks;
