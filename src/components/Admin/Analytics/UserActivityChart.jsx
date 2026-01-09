import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParking } from '../../../context/ParkingContext';

export default function UserActivityChart() {
    const { bookings } = useParking();

    // 1. Process data: Count booking frequency per user
    const userCounts = bookings.reduce((acc, booking) => {
        const user = booking.userName || 'Guest';
        acc[user] = (acc[user] || 0) + 1;
        return acc;
    }, {});

    // 2. Format for Recharts
    const data = Object.entries(userCounts).map(([name, count]) => ({
        name: name,
        bookings: count
    })).sort((a, b) => b.bookings - a.bookings)
        .slice(0, 10); // Top 10

    if (data.length === 0) {
        return <div className="p-4 text-center text-gray-500">No user activity data available.</div>;
    }

    return (
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="text-gradient">Most Active Users</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="var(--text-muted)" style={{ fontSize: '0.8rem' }} />
                        <YAxis stroke="var(--text-muted)" />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--secondary)', color: 'var(--text-main)' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Legend />
                        <Bar dataKey="bookings" fill="var(--secondary)" radius={[4, 4, 0, 0]} name="Bookings Made" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
