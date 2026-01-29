import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Navigation, Shield, User, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password, formData.role);
            if (formData.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            position: 'relative',
            minHeight: 'calc(100vh - 80px)', // Adjust for navbar 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Background Map - Simulating "Real World" Google Maps Dark Mode */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1,
                backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop")', // Dark Abstract Map/City Lights
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.4) contrast(1.2)'
            }}></div>

            {/* Animated Grid Overlay for "Tech" feel */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: -1,
                background: 'var(--bg-glass)', // Uses variable for overlay
                backdropFilter: 'blur(2px)'
            }}></div>

            <div className="card animate-slide-up" style={{
                width: '100%',
                maxWidth: '450px',
                position: 'relative',
                zIndex: 10,
                // Background and border handled by .card class and CSS variables
                margin: '2rem'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        background: 'rgba(99, 102, 241, 0.2)',
                        borderRadius: '50%',
                        marginBottom: '1rem',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
                    }}>
                        <Navigation size={32} color="#818cf8" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Access your smart parking dashboard</p>
                </div>

                {error && (
                    <div className="animate-fade-in" style={{
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#fca5a5',
                        padding: '0.75rem',
                        borderRadius: '0.75rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        border: '1px solid rgba(239, 68, 68, 0.3)'
                    }}>
                        <Shield size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Role Selector */}
                    <div style={{
                        display: 'flex',
                        background: 'var(--input-bg)',
                        padding: '0.25rem',
                        borderRadius: '0.75rem'
                    }}>
                        <button
                            type="button"
                            className={formData.role === 'user' ? 'btn btn-primary' : 'btn'}
                            style={{ flex: 1, borderRadius: '0.5rem', color: formData.role === 'user' ? 'white' : 'var(--text-muted)' }}
                            onClick={() => setFormData({ ...formData, role: 'user' })}
                        >
                            <User size={16} style={{ marginRight: '0.5rem' }} /> User
                        </button>
                        <button
                            type="button"
                            className={formData.role === 'admin' ? 'btn btn-primary' : 'btn'}
                            style={{ flex: 1, borderRadius: '0.5rem', color: formData.role === 'admin' ? 'white' : 'var(--text-muted)' }}
                            onClick={() => setFormData({ ...formData, role: 'admin' })}
                        >
                            <Shield size={16} style={{ marginRight: '0.5rem' }} /> Admin
                        </button>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="email"
                            className="input-field"
                            required
                            placeholder="Email Address"
                            style={{ paddingLeft: '3rem' }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type={formData.role === 'admin' ? "text" : (showPassword ? "text" : "password")}
                            className="input-field"
                            required
                            placeholder={formData.role === 'admin' ? 'PARK-ADMIN-2025' : 'Password'}
                            style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {formData.role !== 'admin' && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex'
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '1rem' }}>
                        {formData.role === 'admin' ? 'Access Control Room' : 'Start Parking'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    New to ParkEase? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Create Account</Link>
                </p>
            </div>
        </div>
    );
}
