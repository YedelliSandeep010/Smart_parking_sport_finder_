import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user' // default role
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(formData.email, formData.password, formData.role);
            // Redirect based on role
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
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="card">
                <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>

                {error && <div className="btn-danger" style={{ width: '100%', marginBottom: '1rem', cursor: 'default' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Role</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                type="button"
                                className={`btn ${formData.role === 'user' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ flex: 1 }}
                                onClick={() => setFormData({ ...formData, role: 'user' })}
                            >
                                User
                            </button>
                            <button
                                type="button"
                                className={`btn ${formData.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
                                style={{ flex: 1 }}
                                onClick={() => setFormData({ ...formData, role: 'admin' })}
                            >
                                Admin
                            </button>
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                            <button type="button" onClick={() => setFormData({ ...formData, email: 'user@parkease.com', password: 'user123', role: 'user' })} style={{ padding: '0.5rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--text-muted)', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '0.25rem' }}>
                                Demo User
                            </button>
                            <button type="button" onClick={() => setFormData({ ...formData, email: 'admin@parkease.com', password: 'PARK-ADMIN-2025', role: 'admin' })} style={{ padding: '0.5rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--text-muted)', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '0.25rem' }}>
                                Demo Admin
                            </button>
                        </div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email</label>
                        <input
                            type="email"
                            className="input-field"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                            {formData.role === 'admin' ? 'Admin Token' : 'Password'}
                        </label>
                        <input
                            type="password"
                            className="input-field"
                            required
                            placeholder={formData.role === 'admin' ? 'Enter Token (PARK-ADMIN-2025)' : 'Enter your password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Sign In
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Register</Link>
                </p>
            </div>
        </div>
    );
}
