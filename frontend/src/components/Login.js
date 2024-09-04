import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
        console.log(username, password);
    };

    return (
        <form className="login bg-black bg-opacity-60 p-5 rounded-lg flex flex-col items-center" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="text-white border border-white rounded-md bg-transparent w-full h-10 px-2 mb-4 focus:border-purple-700"
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="text-white border border-white rounded-md bg-transparent w-full h-10 px-2 mb-4 focus:border-purple-700"
            />
            <button
                className="bg-purple-700 text-white rounded-md p-2 w-full text-lg"
                disabled={loading}
            >
                Login
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
    );
};

export default Login;


