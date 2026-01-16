import { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const SECRET_KEY = "PARK_EASE_Re@l_S3cr3t_K3y";

const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (ciphertext) => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted ? JSON.parse(decrypted) : null;
    } catch (e) {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize from localStorage
    useEffect(() => {
        const storedUserHTML = localStorage.getItem('park_ease_user');

        // Try decrypting first, fallback to parsing if plain JSON (migration support)
        let parsedUser = null;
        if (storedUserHTML) {
            parsedUser = decryptData(storedUserHTML);
            if (!parsedUser) {
                // Fallback for old plain text data
                try {
                    parsedUser = JSON.parse(storedUserHTML);
                } catch (e) {
                    console.error("Failed to parse user data");
                }
            }
        }

        if (parsedUser) {
            setUser(parsedUser);
        }
        setLoading(false);
    }, []);

    // Register function
    const register = (userData) => {
        // In a real app, this would be an API call.
        const usersEncrypted = localStorage.getItem('park_ease_users_secure');
        let users = [];

        if (usersEncrypted) {
            users = decryptData(usersEncrypted) || [];
        } else {
            // Migration: check old key
            const oldUsers = localStorage.getItem('park_ease_users');
            if (oldUsers) {
                users = JSON.parse(oldUsers);
            }
        }

        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            throw new Error('Email already registered');
        }

        const newUser = { ...userData, id: Date.now().toString() };
        users.push(newUser);

        // Store Encrypted
        localStorage.setItem('park_ease_users_secure', encryptData(users));
        // Remove old insecure key if exists to fully migrate
        localStorage.removeItem('park_ease_users');

        // Auto login after register
        login(userData.email, userData.password, userData.role);
    };

    // Login function
    const login = (email, password, role) => {
        // Admin Token Logic
        if (role === 'admin') {
            const ADMIN_TOKEN = "PARK-ADMIN-2025";
            if (password === ADMIN_TOKEN) {
                const adminUser = {
                    email: email,
                    role: 'admin',
                    fullName: 'Administrator',
                    id: 'ADMIN-001'
                };
                setUser(adminUser);
                localStorage.setItem('park_ease_user', encryptData(adminUser));
                return true;
            } else {
                throw new Error('Invalid Admin Token');
            }
        }

        // Normal User Login
        let users = [];
        const usersEncrypted = localStorage.getItem('park_ease_users_secure');

        if (usersEncrypted) {
            users = decryptData(usersEncrypted) || [];
        } else {
            // Fallback to old for reading
            const oldUsers = localStorage.getItem('park_ease_users');
            if (oldUsers) {
                users = JSON.parse(oldUsers);
            }
        }

        // Seed default user if not present (for Demo purposes)
        const demoUser = { id: 'DEMO-001', fullName: 'Demo User', email: 'user@parkease.com', password: 'user123', role: 'user', vehicleType: 'Car', vehicleNo: 'AP39HQ9999' };

        if (!users.find(u => u.email === demoUser.email)) {
            users.push(demoUser);
            localStorage.setItem('park_ease_users_secure', encryptData(users));
        }

        const foundUser = users.find(u => u.email === email && u.password === password && u.role === 'user');

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('park_ease_user', encryptData(foundUser));
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
