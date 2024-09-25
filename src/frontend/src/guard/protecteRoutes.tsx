import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, login } from '../auth/auth';


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            setIsAuth(authStatus as boolean);
            setAuthChecked(true);
        };
        checkAuth();
    }, []);

    if (!authChecked) {
        return <button
            className="bg-blue-500 flex items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={login}
        >
            Login
        </button>
    }

    return isAuth ? <>{children}</> : <button
        className="bg-blue-500 flex items-center justify-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={login}
    >
        Login
    </button>;
};

export default ProtectedRoute;
