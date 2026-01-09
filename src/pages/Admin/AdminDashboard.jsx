import SlotManager from '../../components/Admin/SlotManager';
import BookingOverview from '../../components/Admin/BookingOverview';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/ThemeToggle';
import SlotPerformanceChart from '../../components/Admin/Analytics/SlotPerformanceChart';
import UserActivityChart from '../../components/Admin/Analytics/UserActivityChart';
import Reports from '../../components/Admin/Reports';

export default function AdminDashboard() {
    const { user } = useAuth();

    return (
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div>
                        <h1 className="text-gradient" style={{ marginBottom: '0.5rem' }}>Admin Portal</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Manage your parking ecosystem</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    {/* Credentials View */}
                    <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                        <div>Logged in as: <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{user?.email}</span></div>
                        <div>Role: <span style={{ color: 'var(--secondary)' }}>Administrator</span></div>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* 1. Overview */}
                <BookingOverview />

                {/* 2. Visualizations Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    <SlotPerformanceChart />
                    <UserActivityChart />
                </div>


                {/* 3. Reports & Export */}
                <Reports />

                {/* 4. Slot Management */}
                <SlotManager />
            </div>
        </div>
    );
}
