import { useSignup } from '../hooks/useSignup';

const Appr = ({ u }) => {
    const { signup, loading, error } = useSignup();

    if (!u) {
        return null;
    }

    const handleAccept = async (e) => {
        e.preventDefault();
        await signup(u.username, u.email, u.password, u.type);
        try {
            const response = await fetch(`/api/temp/${u._id}`, {
                method: 'DELETE',
            });

            const json = await response.json();

            if (response.ok) {
                console.log(json.message);
                window.location.reload();
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`/api/temp/${u._id}`, {
                method: 'DELETE',
            });

            const json = await response.json();

            if (response.ok) {
                console.log(json.message);
                window.location.reload();
            }
        } catch (error) {
            console.error('error:', error);
        }
    };

    return (
        <tr className="border-b border-slate-600">
            <td className="p-4 text-white">{u.username}</td>
            <td className="p-4 text-slate-400">{u.email}</td>
            <td className="p-4 text-white">{u.type}</td>
            <td className="p-4">
                <button
                    onClick={handleAccept}
                    className="px-4 py-2 bg-purple-800 text-white border border-white rounded hover:bg-[#0e1628] hover:border-white transition-all"
                >
                    Accept
                </button>
            </td>
            <td className="p-4">
                <button
                    onClick={handleReject}
                    className="px-4 py-2 bg-purple-800 text-white border border-white rounded hover:bg-[#0e1628] hover:border-white transition-all"
                >
                    Reject
                </button>
            </td>
        </tr>
    );
};

export default Appr;
