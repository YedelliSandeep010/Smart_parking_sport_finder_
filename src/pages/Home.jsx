import { Link } from 'react-router-dom';
import { MapPin, Clock, CreditCard } from 'lucide-react';

export default function Home() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                    Park Smarter, Not Harder
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem' }}>
                    Find the perfect parking spot in seconds. Real-time availability, secure bookings, and seamless payments.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        Find a Spot
                    </Link>
                    <Link to="/login" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        Login
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}><MapPin size={48} /></div>
                    <h3>Real-time Location</h3>
                    <p style={{ color: 'var(--text-muted)' }}>View available spots across the city in real-time. Navigate directly to your booked slot.</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}><Clock size={48} /></div>
                    <h3>Smart Limits</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Track your parking duration automatically. Extend securely from your phone if needed.</p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}><CreditCard size={48} /></div>
                    <h3>Easy Payments</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Detailed cost summaries and secure payment simulation. No surprises.</p>
                </div>
            </div>
        </div>
    );
}
