import React, { useState } from 'react';

const ADetails = ({us , onChange}) => {
    const [isTrue, setIsTrue] = useState();

    const handleButtonClick = () => {
        const newValue = isTrue === 'true' ? 'false' : 'true';
        setIsTrue(newValue);

        onChange(us._id, newValue);
    };

    if (us.type !== 'Student') {
        return null; 
    }

    return(
        <tr>
            <td className="py-4 text-white border-b border-gray-500 text-center">{us.username}</td>
            <td className="py-4 border-b border-gray-500 text-center">
                <button
                    className={`w-10 h-10 rounded-full ${isTrue === 'false' ? 'bg-red-600' : 'bg-green-500'} text-white text-xl`}
                    onClick={handleButtonClick}
                >
                    {isTrue === 'true' ? '✓' : '✗'}
                </button>
            </td>
        </tr>
    )
}

export default ADetails;