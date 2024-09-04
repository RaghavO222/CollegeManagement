import { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { username, email, password, type };
        console.log(data);

        try {
            const response = await fetch('/api/temp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();

            if (response.ok) {
                console.log(json);
                setEmail('');
                setUsername('');
                setPassword('');
                setType('');
                setError('');
            } else {
                setError(json.error || 'An error occurred');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="auth-form bg-black bg-opacity-60 p-5 rounded-lg flex flex-col items-center" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="text-white border border-white rounded-md bg-transparent w-full h-10 px-2 mb-4 focus:border-purple-700"
            />
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="text-white border border-white rounded-md bg-transparent w-full h-10 px-2 mb-4 focus:border-purple-700"
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="text-white border border-white rounded-md bg-transparent w-full h-10 px-2 mb-4 focus:border-purple-700"
            />
            <div className="radio-group flex items-center mb-4">
                <label className="flex items-center text-white mr-4">
                    <input
                        type="radio"
                        name="type"
                        value="Student"
                        checked={type === 'Student'}
                        onChange={(e) => setType(e.target.value)}
                        className="mr-1 accent-purple-700"
                    />
                    Student
                </label>
                <label className="flex items-center text-white">
                    <input
                        type="radio"
                        name="type"
                        value="Staff"
                        checked={type === 'Staff'}
                        onChange={(e) => setType(e.target.value)}
                        className="mr-1 accent-purple-700"
                    />
                    Staff
                </label>
            </div>
            <button
                type="submit"
                className="bg-purple-700 text-white rounded-md p-2 w-full text-lg"
            >
                Sign Up
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
    );
};

export default Signup;
