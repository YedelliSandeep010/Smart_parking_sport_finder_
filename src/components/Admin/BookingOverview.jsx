import { useParking } from '../../context/ParkingContext';

export default function BookingOverview() {
    const { bookings, slots } = useParking();

    const activeBookings = bookings.filter(b => b.status === 'active');
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.cost || 0), 0);
    const occupancyRate = slots.length > 0 ? Math.round((slots.filter(s => s.isOccupied).length / slots.length) * 100) : 0;

    return (
        <div className="card">
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem' }}>Overview & Stats</h3>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Bookings</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{bookings.length}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Now</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{activeBookings.length}</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Occupancy</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{occupancyRate}%</div>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Revenue (Sim)</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--status-success)' }}>₹{totalRevenue}</div>
                </div>
            </div>

            <h4 style={{ marginBottom: '1rem' }}>Recent Activity</h4>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem' }}>ID</th>
                            <th style={{ padding: '0.75rem' }}>User</th>
                            <th style={{ padding: '0.75rem' }}>Slot</th>
                            <th style={{ padding: '0.75rem' }}>In Time</th>
                            <th style={{ padding: '0.75rem' }}>Status</th>
                            <th style={{ padding: '0.75rem' }}>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No bookings yet</td></tr>
                        ) : (
                            bookings.slice(0, 5).map(b => (
                                <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>{b.id}</td>
                                    <td style={{ padding: '0.75rem' }}>{b.userName}<br /><span style={{ fontSize: '0.8em', color: 'var(--text-muted)' }}>{b.vehicleNo}</span></td>
                                    <td style={{ padding: '0.75rem' }}>{b.slotId}</td>
                                    <td style={{ padding: '0.75rem' }}>{new Date(b.startTime).toLocaleTimeString()}</td>
                                    <td style={{ padding: '0.75rem' }}>
                                        <span style={{
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.75rem',
                                            background: b.status === 'active' ? 'var(--primary)' : 'rgba(255,255,255,0.1)'
                                        }}>
                                            {b.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '0.75rem' }}>
                                        {b.cost ? `₹${b.cost}` : '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
