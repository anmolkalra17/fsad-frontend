import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('token') ?? "";
        if (authToken) {
            setIsUserAuthenticated(true);
        }
    }, []);

    const loginHandler = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setIsUserAuthenticated(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsUserAuthenticated(false);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ isUserAuthenticated, loginHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};