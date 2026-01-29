import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_BASE_URL = "http://localhost:8080/api/auth";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize from localStorage (only for session persistence)
    useEffect(() => {
        const storedUser = localStorage.getItem('park_ease_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data");
                localStorage.removeItem('park_ease_user');
            }
        }
        setLoading(false);
    }, []);

    // Register function
    const register = async (userData) => {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }
    };

    // Login function
    const login = async (email, password, role) => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });

        if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            localStorage.setItem('park_ease_user', JSON.stringify(userData));
            return true;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid credentials or role');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('park_ease_user');
    };

    const value = {
        user,
        register,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
