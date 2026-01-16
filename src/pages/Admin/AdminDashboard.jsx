import SlotManager from '../../components/Admin/SlotManager';
import BookingOverview from '../../components/Admin/BookingOverview';
import { useAuth } from '../../context/AuthContext';
import SlotPerformanceChart from '../../components/Admin/Analytics/SlotPerformanceChart';
import UserActivityChart from '../../components/Admin/Analytics/UserActivityChart';
import Reports from '../../components/Admin/Reports';
import { LayoutDashboard, ShieldCheck, BarChart3, FileText, Settings2 } from 'lucide-react';

// ... imports ...
import { useState } from 'react';

export default function AdminDashboard() {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('overview');

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem 4rem' }}>
            <header className="animate-fade-in" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', background: 'var(--accent)', borderRadius: '1rem', boxShadow: '0 4px 20px var(--accent-glow)' }}>
                        <LayoutDashboard color="white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-gradient" style={{ marginBottom: '0', fontSize: '2rem' }}>Control Center</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Overview of system performance</p>
                    </div>
                </div>

                <div className="card" style={{ padding: '0.75rem 1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{user?.email}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>SUPER ADMIN</div>
                    </div>
                    <ShieldCheck size={32} color="var(--secondary)" />
                </div>
            </header>

            {/* Navigation Menu (Sticky) */}
            <div className="nav-pills-container" style={{
                position: 'sticky',
                top: '5.5rem',
                zIndex: 40,
                marginBottom: '4rem'
            }}>
                {[
                    { label: 'Overview', id: 'overview', icon: <LayoutDashboard size={18} /> },
                    { label: 'Analytics', id: 'analytics', icon: <BarChart3 size={18} /> },
                    { label: 'Reports', id: 'reports', icon: <FileText size={18} /> },
                    { label: 'Slot Management', id: 'slot-management', icon: <Settings2 size={18} /> }
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveSection(item.id);
                            const element = document.getElementById(item.id);
                            if (element) {
                                // Offset for sticky header
                                const y = element.getBoundingClientRect().top + window.pageYOffset - 180;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        }}
                        className={`nav-pill ${activeSection === item.id ? 'active' : ''}`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {/* 1. Overview */}
                <div id="overview" style={{ scrollMarginTop: '10rem' }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Overview</h2>
                    <BookingOverview />
                </div>

                {/* 2. Visualizations Grid */}
                <div id="analytics" style={{ scrollMarginTop: '10rem' }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Analytics</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
                        <div className="card" style={{ overflow: 'hidden' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Slot Utilization</h3>
                            <SlotPerformanceChart />
                        </div>
                        <div className="card" style={{ overflow: 'hidden' }}>
                            <h3 style={{ marginBottom: '1rem' }}>User Traffic</h3>
                            <UserActivityChart />
                        </div>
                    </div>
                </div>

                {/* 3. Reports & Export */}
                <div id="reports" style={{ scrollMarginTop: '10rem' }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Reports</h2>
                    <Reports />
                </div>

                {/* 4. Slot Management */}
                <div id="slot-management" style={{ scrollMarginTop: '10rem' }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Slot Management</h2>
                    <SlotManager />
                </div>
            </div>
        </div>
    );
}
