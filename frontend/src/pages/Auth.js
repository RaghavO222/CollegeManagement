import { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import lol from './home.png'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div style={{ backgroundImage: `url${lol}` }} className="auth-page flex justify-center items-center h-screen w-full flex-col bg-cover bg-no-repeat bg-center" >
            <h1 className="text-slate-400 underline underline-offset-4 decoration-2 text-4xl sm:text-5xl md:text-6xl">COLLEGE</h1>
            <div className="toggle-buttons flex items-center bg-opacity-30 bg-black w-full max-w-xs sm:max-w-sm md:max-w-md transition-colors duration-300 border border-purple-700 rounded-lg mt-6">
                <button 
                    onClick={() => setIsLogin(true)} 
                    className={`flex-1 p-2 text-lg md:text-xl cursor-pointer ${isLogin ? 'text-purple-700' : 'text-white'}`}>
                    Login
                </button>
                <button 
                    onClick={() => setIsLogin(false)} 
                    className={`flex-1 p-2 text-lg md:text-xl cursor-pointer ${!isLogin ? 'text-purple-700' : 'text-white'}`}>
                    SignUp
                </button>
            </div>
            <div className="mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md">
                {isLogin ? <Login /> : <Signup />}
            </div>
        </div>
    );
};

export default AuthPage;
