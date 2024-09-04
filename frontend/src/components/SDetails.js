import React, { useState, useEffect } from 'react';

const SD = ({ us, onMarksChange }) => {
    const [test, setTest] = useState('');
    const [seminar, setSeminar] = useState('');
    const [attendance, setAttendance] = useState('');
    const [assignment, setAssignment] = useState('');

    useEffect(() => {
        if (us.marks) {
            setTest(us.marks.Test || '');
            setSeminar(us.marks.Seminar || '');
            setAttendance(us.marks.Attendance || '');
            setAssignment(us.marks.Assignment || '');
        }
    }, [us]);

    const handleInputChange = (e, setter) => {
        console.log('Handling input change:', e.target.name, e.target.value);
        setter(e.target.value);
        onMarksChange(us._id, {
            Test: test,
            Seminar: seminar,
            Attendance: attendance,
            Assignment: assignment,
            [e.target.name]: e.target.value
        });
    };

    if (us.type !== 'Student') {
        return null; 
    }

    return (
        <tr>
            <td className="py-4 text-white border-b border-gray-500">{us.username}</td>
            <td className="py-4 border-b border-gray-500">
                <input
                    type="number"
                    name="Test"
                    value={test}
                    max="50"
                    onChange={(e) => handleInputChange(e, setTest)}
                    placeholder="Test Marks"
                    className="bg-[#0e1628] text-white border border-gray-600 rounded-md p-2"
                />
            </td>
            <td className="py-4 border-b border-gray-500">
                <input
                    type="number"
                    name="Seminar"
                    value={seminar}
                    max="10"
                    onChange={(e) => handleInputChange(e, setSeminar)}
                    placeholder="Seminar Marks"
                    className="bg-[#0e1628] text-white border border-gray-600 rounded-md p-2"
                />
            </td>
            <td className="py-4 border-b border-gray-500">
                <input
                    type="number"
                    name="Attendance"
                    value={attendance}
                    max="20"
                    onChange={(e) => handleInputChange(e, setAttendance)}
                    placeholder="Attendance Marks"
                    className="bg-[#0e1628] text-white border border-gray-600 rounded-md p-2"
                />
            </td>
            <td className="py-4 border-b border-gray-500">
                <input
                    type="number"
                    name="Assignment"
                    value={assignment}
                    max="20"
                    onChange={(e) => handleInputChange(e, setAssignment)}
                    placeholder="Assignment Marks"
                    className="bg-[#0e1628] text-white border border-gray-600 rounded-md p-2"
                />
            </td>
        </tr>
    );
};

export default SD;
