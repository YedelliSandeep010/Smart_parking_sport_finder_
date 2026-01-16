import { Link } from 'react-router-dom';
import { MapPin, Clock, CreditCard, ArrowRight } from 'lucide-react';

export default function Home() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            {/* Hero Section */}
            <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '8rem', position: 'relative' }}>
                {/* Background Glow Effect */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                    zIndex: -1, opacity: 0.5, pointerEvents: 'none'
                }}></div>

                <div style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1.5rem', borderRadius: '2rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>
                    🚀 Smart Parking System v2.0
                </div>

                <h1 className="text-gradient" style={{ fontSize: '5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
                    Park Smarter,<br /> Not Harder.
                </h1>

                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                    Experience the future of urban mobility with real-time slot tracking, seamless payments, and intelligent navigation.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '1rem' }}>
                        Find a Spot <ArrowRight size={20} />
                    </Link>
                    <Link to="/login" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '1rem' }}>
                        Admin Login
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                <div className="card animate-slide-up" style={{ textAlign: 'center', padding: '2.5rem', animationDelay: '0.1s' }}>
                    <div style={{
                        width: '80px', height: '80px', margin: '0 auto 1.5rem',
                        background: 'rgba(6, 182, 212, 0.1)', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--secondary)'
                    }}>
                        <MapPin size={40} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Real-time Location</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>View available spots across the city in real-time. Navigate directly to your booked slot.</p>
                </div>

                <div className="card animate-slide-up" style={{ textAlign: 'center', padding: '2.5rem', animationDelay: '0.2s' }}>
                    <div style={{
                        width: '80px', height: '80px', margin: '0 auto 1.5rem',
                        background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--primary)'
                    }}>
                        <Clock size={40} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Smart Limits</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Track your parking duration automatically. Extend securely from your phone if needed.</p>
                </div>

                <div className="card animate-slide-up" style={{ textAlign: 'center', padding: '2.5rem', animationDelay: '0.3s' }}>
                    <div style={{
                        width: '80px', height: '80px', margin: '0 auto 1.5rem',
                        background: 'rgba(217, 70, 239, 0.1)', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--accent)'
                    }}>
                        <CreditCard size={40} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Easy Payments</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Detailed cost summaries and secure payment simulation. No surprises.</p>
                </div>
            </div>
        </div>
    );
}
