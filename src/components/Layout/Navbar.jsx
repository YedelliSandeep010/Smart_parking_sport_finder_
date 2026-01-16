import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, Car, LayoutDashboard, LogOut, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{
            position: 'sticky',
            top: '1rem',
            zIndex: 50,
            padding: '0 1rem',
            marginBottom: '2rem'
        }}>
            <div className="card" style={{
                borderRadius: '1.5rem',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // Styles moved to .card class in CSS for theming support
            }}>

                {/* Brand */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        <Car color="white" size={24} />
                    </div>
                    <span className="text-gradient">ParkEase</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }} aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    {!user ? (
                        <>
                            <Link to="/login" style={{ color: 'var(--text-muted)' }}>Sign In</Link>
                            <Link to="/register" className="btn btn-primary">Get Started</Link>
                        </>
                    ) : (
                        <>
                            <span style={{ color: 'var(--text-muted)' }}>Welcome, {user.fullName}</span>
                            {user.role === 'admin' && (
                                <Link to="/admin/dashboard" className="btn btn-secondary">
                                    <LayoutDashboard size={18} /> Admin Panel
                                </Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
                                <LogOut size={18} />
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Toggle - Improved implementation would go here */}
                <div style={{ display: 'none' }}>
                </div>
            </div>
        </nav>
    );
}
