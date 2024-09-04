const MarkDetails = ({ mark }) => {
    const total = (mark.Test || 0) + (mark.Seminar || 0) + (mark.Attendence || 0) + (mark.Assignment || 0);

    return (
        <tr className="bg-[#4c1d95] text-white text-center">
            <td className="py-4 border-b border-gray-500">{mark.Subject}</td>
            <td className="py-4 border-b border-gray-500">{mark.Test}</td>
            <td className="py-4 border-b border-gray-500">{mark.Seminar}</td>
            <td className="py-4 border-b border-gray-500">{mark.Attendence}</td>
            <td className="py-4 border-b border-gray-500">{mark.Assignment}</td>
            <td className="py-4 border-b border-gray-500">{total}</td>
        </tr>
    );
};

export default MarkDetails;