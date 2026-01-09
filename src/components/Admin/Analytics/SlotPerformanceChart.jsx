import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useParking } from '../../../context/ParkingContext';

export default function SlotPerformanceChart() {
    const { bookings, slots } = useParking();

    // 1. Process data: Count booking frequency per slot
    const slotCounts = bookings.reduce((acc, booking) => {
        const slotId = booking.slotId;
        acc[slotId] = (acc[slotId] || 0) + 1;
        return acc;
    }, {});

    // 2. Format for Recharts
    const data = Object.entries(slotCounts).map(([slotId, count]) => {
        const slot = slots.find(s => s.id === slotId);
        return {
            name: slot ? slot.location : slotId, // Display name
            bookings: count,
            venue: slot ? slot.venue : 'Unknown'
        };
    }).sort((a, b) => b.bookings - a.bookings) // Sort by most booked
        .slice(0, 10); // Top 10

    if (data.length === 0) {
        return <div className="p-4 text-center text-gray-500">No booking data available for visualization.</div>;
    }

    return (
        <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
            <h3 className="text-gradient">Most Booked Slots</h3>
            <div style={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis type="number" stroke="var(--text-muted)" />
                        <YAxis dataKey="name" type="category" width={120} stroke="var(--text-muted)" style={{ fontSize: '0.8rem' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--primary)', color: 'var(--text-main)' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Legend />
                        <Bar dataKey="bookings" fill="var(--primary)" radius={[0, 4, 4, 0]} name="Total Bookings" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
