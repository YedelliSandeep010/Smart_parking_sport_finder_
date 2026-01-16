import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Calendar, Clock, Car } from 'lucide-react';

export default function BookingModal({ slot, onClose, onConfirm }) {
    const { user } = useAuth();
    const [vehicleNo, setVehicleNo] = useState(user?.vehicleNo || '');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        // Default start time to next 15 min slot
        const date = new Date();
        date.setMinutes(date.getMinutes() + 15);
        date.setSeconds(0, 0);
        setStartTime(date.toISOString().slice(0, 16)); // Format: YYYY-MM-DDTHH:mm
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const start = new Date(startTime).getTime();
        const end = start + (duration * 60 * 60 * 1000);

        if (start < Date.now()) {
            setError('Start time cannot be in the past');
            return;
        }

        try {
            onConfirm({
                slotId: slot.id,
                vehicleNo,
                startTime: start,
                endTime: end,
                duration
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const cost = duration * 50; // Simple rate

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="card" style={{ width: '90%', maxWidth: '450px', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar className="text-primary" /> Book Slot
                </h2>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                    <div style={{ fontWeight: 'bold' }}>{slot.venue}</div>
                    <div style={{ color: 'var(--text-muted)' }}>{slot.location} • {slot.id}</div>
                </div>

                {error && <div className="btn-danger" style={{ marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Vehicle Number</label>
                        <div style={{ position: 'relative' }}>
                            <Car size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                required
                                className="input-field"
                                style={{ paddingLeft: '3rem' }}
                                value={vehicleNo}
                                onChange={(e) => setVehicleNo(e.target.value)}
                                placeholder="e.g. TN-01-AB-1234"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Start Time</label>
                            <input
                                type="datetime-local"
                                required
                                className="input-field"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Duration (Hours)</label>
                            <input
                                type="number"
                                min="1"
                                max="24"
                                required
                                className="input-field"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div style={{ margin: '1rem 0', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Estimation</span>
                            <span>{duration} hrs x ₹50</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total to Pay</span>
                            <span style={{ color: 'var(--status-success)' }}>₹{cost}</span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                            *Payment collected at venue or via wallet.
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
}
