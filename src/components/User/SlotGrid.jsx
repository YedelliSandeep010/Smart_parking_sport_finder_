import { Car, Bike, AlertCircle } from 'lucide-react';

export default function SlotGrid({ slots, onSlotSelect }) {
    if (!slots || slots.length === 0) {
        return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No slots available for this venue.</div>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem', padding: '1rem' }}>
            {slots.map(slot => {
                let statusColor = 'var(--status-success)'; // Green
                let cursor = 'pointer';

                if (slot.isMaintenance) {
                    statusColor = 'var(--text-muted)'; // Grey
                    cursor = 'not-allowed';
                } else if (slot.isOccupied) {
                    statusColor = 'var(--status-error)'; // Red
                }

                return (
                    <div
                        key={slot.id}
                        onClick={() => !slot.isMaintenance && !slot.isOccupied && onSlotSelect(slot)}
                        style={{
                            border: `2px solid ${statusColor}`,
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            textAlign: 'center',
                            cursor: cursor,
                            backgroundColor: slot.isOccupied ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                            transition: 'transform 0.2s',
                            opacity: slot.isActive ? 1 : 0.5
                        }}
                        className={!slot.isMaintenance && !slot.isOccupied ? 'hover-scale' : ''}
                    >
                        <div style={{ color: statusColor, marginBottom: '0.5rem' }}>
                            {slot.type === 'Bike' ? <Bike size={24} /> : <Car size={24} />}
                        </div>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                            {slot.id.split('-').pop()}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            {slot.isMaintenance ? 'Maintenance' : (slot.isOccupied ? 'Booked' : 'Available')}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
