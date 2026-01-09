import { useState, useMemo } from 'react';
import { useParking } from '../../context/ParkingContext';
import { Download, Filter, Calendar } from 'lucide-react';

export default function Reports() {
    const { bookings, slots } = useParking();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userType, setUserType] = useState('all');
    const [slotFilter, setSlotFilter] = useState('');

    // Filter Logic
    const filteredBookings = useMemo(() => {
        return bookings.filter(b => {
            const bookingDate = new Date(b.startTime);
            const start = startDate ? new Date(startDate) : new Date(0);
            const end = endDate ? new Date(endDate) : new Date(8640000000000000);
            // End date should include the whole day
            if (endDate) end.setHours(23, 59, 59, 999);

            const matchDate = bookingDate >= start && bookingDate <= end;
            const matchUser = userType === 'all' || (b.userRole === userType) || (userType === 'user' && !b.userRole); // Handle legacy
            const matchSlot = slotFilter === '' || b.slotId.toLowerCase().includes(slotFilter.toLowerCase());

            return matchDate && matchUser && matchSlot;
        });
    }, [bookings, startDate, endDate, userType, slotFilter]);

    // Metrics Logic
    const metrics = useMemo(() => {
        const total = filteredBookings.length;

        // Peak Hour
        const hourCounts = {};
        let peakHour = '-';
        let maxCount = 0;

        filteredBookings.forEach(b => {
            const hour = new Date(b.startTime).getHours();
            hourCounts[hour] = (hourCounts[hour] || 0) + 1;
            if (hourCounts[hour] > maxCount) {
                maxCount = hourCounts[hour];
                peakHour = `${hour}:00 - ${hour + 1}:00`;
            }
        });

        // Avg Duration
        let totalDuration = 0;
        let completedCount = 0;
        filteredBookings.forEach(b => {
            if (b.endTime) {
                totalDuration += (b.endTime - b.startTime);
                completedCount++;
            }
        });
        const avgDurationMin = completedCount > 0 ? Math.round((totalDuration / completedCount) / 60000) : 0;
        const avgDurationHrs = (avgDurationMin / 60).toFixed(1);

        return {
            total,
            peakHour,
            avgDuration: `${avgDurationHrs} hrs`
        };
    }, [filteredBookings]);

    // Export Logic
    const downloadCSV = () => {
        const headers = ['Booking ID', 'Slot ID', 'User Name', 'Role', 'Vehicle', 'Start Time', 'End Time', 'Status', 'Cost'];
        const rows = filteredBookings.map(b => [
            b.id,
            b.slotId,
            b.userName,
            b.userRole || 'user',
            b.vehicleNo,
            new Date(b.startTime).toLocaleString(),
            b.endTime ? new Date(b.endTime).toLocaleString() : 'Ongoing',
            b.status,
            b.cost || 0
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `parking_report_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    };

    return (
        <div className="card">
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Monthly Usage Reports
            </h3>

            {/* Filters */}
            <div style={{
                display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem',
                padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-main)' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-main)' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>User Type</label>
                    <select
                        value={userType}
                        onChange={e => setUserType(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-main)', minWidth: '150px' }}
                    >
                        <option value="all">All Users</option>
                        <option value="user">Regular Users</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Slot ID</label>
                    <input
                        type="text"
                        placeholder="Filter by Slot ID..."
                        value={slotFilter}
                        onChange={e => setSlotFilter(e.target.value)}
                        style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--border)', background: 'var(--bg-input)', color: 'var(--text-main)' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'end', marginLeft: 'auto' }}>
                    <button
                        onClick={downloadCSV}
                        className="btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', height: 'fit-content' }}
                    >
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Bookings</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.total}</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Peak Hours</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>{metrics.peakHour}</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Avg Duration</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{metrics.avgDuration}</div>
                </div>
            </div>
        </div>
    );
}
