import { useState } from 'react';
import { useParking } from '../../context/ParkingContext';
import { Plus, Trash2, MapPin, Wrench, AlertTriangle } from 'lucide-react';

export default function SlotManager() {
    const { slots, addSlot, removeSlot, toggleMaintenance } = useParking();
    const [newSlot, setNewSlot] = useState({ region: '', venue: '', location: '', type: 'Car' });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newSlot.region || !newSlot.venue || !newSlot.location) return;

        // Add default city if needed or just bundle it. For now keeping it simple.
        addSlot(newSlot);
        setNewSlot({ region: '', venue: '', location: '', type: 'Car' });
    };

    return (
        <div className="card">
            <h3 className="text-gradient">Slot Management</h3>

            {/* Add Slot Form */}
            <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', marginBottom: '2rem', alignItems: 'flex-end' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Region</label>
                    <input
                        className="input-field"
                        placeholder="e.g. Telangana"
                        value={newSlot.region}
                        onChange={(e) => setNewSlot({ ...newSlot, region: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Venue</label>
                    <input
                        className="input-field"
                        placeholder="e.g. AMB Cinemas"
                        value={newSlot.venue}
                        onChange={(e) => setNewSlot({ ...newSlot, venue: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Slot Name</label>
                    <input
                        className="input-field"
                        placeholder="e.g. L1-05"
                        value={newSlot.location}
                        onChange={(e) => setNewSlot({ ...newSlot, location: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Type</label>
                    <select
                        className="input-field"
                        value={newSlot.type}
                        onChange={(e) => setNewSlot({ ...newSlot, type: e.target.value })}
                    >
                        <option value="Car">Car</option>
                        <option value="Bike">Bike</option>
                        <option value="Truck">Truck</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginBottom: '1px' }}>
                    <Plus size={18} />
                </button>
            </form>

            {/* Slot List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {slots.map(slot => (
                    <div key={slot.id} style={{
                        padding: '1rem',
                        background: slot.isMaintenance
                            ? 'rgba(245, 158, 11, 0.1)' // Warning/Orange
                            : (slot.isOccupied ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'),
                        border: `1px solid ${slot.isMaintenance
                            ? 'rgba(245, 158, 11, 0.4)'
                            : (slot.isOccupied ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)')}`,
                        borderRadius: '0.5rem',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => toggleMaintenance(slot.id)}
                                style={{
                                    color: slot.isMaintenance ? 'var(--status-warning)' : 'var(--text-muted)',
                                    background: 'none', border: 'none', cursor: 'pointer'
                                }}
                                title="Toggle Maintenance"
                            >
                                <Wrench size={16} />
                            </button>
                            <button
                                onClick={() => removeSlot(slot.id)}
                                style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                                title="Remove Slot"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                            {slot.region} • {slot.venue}
                        </div>
                        <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', fontSize: '1.1rem' }}>{slot.location}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{slot.type} • {slot.id}</div>
                        <div style={{
                            marginTop: '0.5rem',
                            fontSize: '0.8rem',
                            color: slot.isMaintenance
                                ? 'var(--status-warning)'
                                : (slot.isOccupied ? 'var(--status-error)' : 'var(--status-success)'),
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            {slot.isMaintenance ? (
                                <>
                                    <AlertTriangle size={14} />
                                    Under Maintenance
                                </>
                            ) : (
                                slot.isOccupied ? 'Occupied' : 'Available'
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
