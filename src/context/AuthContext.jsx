import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('park_ease_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Register function
    const register = (userData) => {
        // In a real app, this would be an API call.
        // Here we simulate it by storing to a "users" array in localStorage for login verification
        const users = JSON.parse(localStorage.getItem('park_ease_users') || '[]');

        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already registered');
        }

        const newUser = { ...userData, id: Date.now().toString() };
        users.push(newUser);
        localStorage.setItem('park_ease_users', JSON.stringify(users));

        // Auto login after register
        login(userData.email, userData.password, userData.role);
    };

    // Login function
    const login = (email, password, role) => {
        // Admin Token Logic
        if (role === 'admin') {
            const ADMIN_TOKEN = "PARK-ADMIN-2025";
            if (password === ADMIN_TOKEN) { // Password field serves as Token input
                const adminUser = {
                    email: email,
                    role: 'admin',
                    fullName: 'Administrator',
                    id: 'ADMIN-001'
                };
                setUser(adminUser);
                localStorage.setItem('park_ease_user', JSON.stringify(adminUser));
                return true;
            } else {
                throw new Error('Invalid Admin Token');
            }
        }

        // Normal User Login
        let users = JSON.parse(localStorage.getItem('park_ease_users') || '[]');

        // Seed default user if not present (for Demo purposes)
        const demoUser = { id: 'DEMO-001', fullName: 'Demo User', email: 'user@parkease.com', password: 'user123', role: 'user' };
        if (!users.find(u => u.email === demoUser.email)) {
            users.push(demoUser);
            localStorage.setItem('park_ease_users', JSON.stringify(users));
        }

        const foundUser = users.find(u => u.email === email && u.password === password && u.role === 'user');

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('park_ease_user', JSON.stringify(foundUser));
            return true;
        } else {
            throw new Error('Invalid credentials or role');
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
