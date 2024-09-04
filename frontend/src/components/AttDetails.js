const AttDetails = ({ date }) => {
    return (
        <tr className="bg-purple-700 text-white text-center ">
            <td className="py-4" >{date.Subject}</td>
            <td className="py-4">{date.present ? "Yes" : "No"}</td>
        </tr>
    )
}

export default AttDetails;