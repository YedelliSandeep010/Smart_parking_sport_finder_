// SlotManager.jsx changes
import { useState } from 'react';
import { useParking } from '../../context/ParkingContext';
import { Plus, Trash2, MapPin, Wrench, AlertTriangle, Power, Edit2, X, Check } from 'lucide-react';

export default function SlotManager() {
    const { slots, addSlot, removeSlot, toggleMaintenance, toggleActive, updateSlot } = useParking();
    const [newSlot, setNewSlot] = useState({ region: '', venue: '', location: '', type: 'Car' });
    const [editingSlot, setEditingSlot] = useState(null); // id of slot being edited
    const [editForm, setEditForm] = useState({}); // data for the slot being edited

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newSlot.region || !newSlot.venue || !newSlot.location) return;
        addSlot(newSlot);
        setNewSlot({ region: '', venue: '', location: '', type: 'Car' });
    };

    const startEdit = (slot) => {
        setEditingSlot(slot.id);
        setEditForm({ ...slot });
    };

    const cancelEdit = () => {
        setEditingSlot(null);
        setEditForm({});
    };

    const saveEdit = (id) => {
        updateSlot(id, editForm);
        setEditingSlot(null);
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

            {/* Slot List Grouped by Region */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {Object.entries(
                    [...slots].reduce((acc, slot) => {
                        const region = slot.region || 'Unassigned';
                        if (!acc[region]) acc[region] = [];
                        acc[region].push(slot);
                        return acc;
                    }, {})
                ).sort(([a], [b]) => a.localeCompare(b)).map(([region, regionSlots]) => (
                    <div key={region} className="animate-fade-in">
                        <h4 style={{
                            fontSize: '1.25rem',
                            marginBottom: '1rem',
                            color: 'var(--primary)',
                            borderBottom: '1px solid var(--card-border)',
                            paddingBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <MapPin size={20} /> {region}
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: 'auto' }}>
                                {regionSlots.length} Slots
                            </span>
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                            {regionSlots.map((slot, index) => (
                                <div key={slot.id} style={{
                                    padding: '1rem',
                                    background: !slot.isActive
                                        ? 'var(--bg-surface)'
                                        : (slot.isMaintenance
                                            ? 'rgba(245, 158, 11, 0.1)'
                                            : (slot.isOccupied ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)')),
                                    border: `1px solid ${!slot.isActive
                                        ? 'var(--card-border)'
                                        : (slot.isMaintenance
                                            ? 'rgba(245, 158, 11, 0.4)'
                                            : (slot.isOccupied ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'))}`,
                                    borderRadius: '0.5rem',
                                    position: 'relative',
                                    opacity: (!slot.isActive && editingSlot !== slot.id) ? 0.6 : 1,
                                    filter: (!slot.isActive && editingSlot !== slot.id) ? 'grayscale(1)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}>
                                    {/* Serial Number Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-0.75rem',
                                        left: '-0.75rem',
                                        width: '2rem',
                                        height: '2rem',
                                        background: 'var(--card-bg)',
                                        border: '1px solid var(--card-border)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        fontWeight: 'bold',
                                        color: 'var(--text-muted)',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        zIndex: 10
                                    }}>
                                        #{String(index + 1).padStart(2, '0')}
                                    </div>
                                    {editingSlot === slot.id ? (
                                        // Edit Mode
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <input className="input-field" style={{ padding: '0.3rem', fontSize: '0.8rem' }} value={editForm.region} onChange={e => setEditForm({ ...editForm, region: e.target.value })} placeholder="Region" />
                                            <input className="input-field" style={{ padding: '0.3rem', fontSize: '0.8rem' }} value={editForm.venue} onChange={e => setEditForm({ ...editForm, venue: e.target.value })} placeholder="Venue" />
                                            <input className="input-field" style={{ padding: '0.3rem', fontSize: '0.8rem' }} value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} placeholder="Slot Name" />
                                            <select
                                                className="input-field"
                                                style={{ padding: '0.3rem', fontSize: '0.8rem' }}
                                                value={editForm.type}
                                                onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                                            >
                                                <option value="Car">Car</option>
                                                <option value="Bike">Bike</option>
                                                <option value="Truck">Truck</option>
                                            </select>
                                            <select
                                                className="input-field"
                                                style={{ padding: '0.3rem', fontSize: '0.8rem' }}
                                                value={editForm.isOccupied ? 'occupied' : 'available'}
                                                onChange={e => setEditForm({ ...editForm, isOccupied: e.target.value === 'occupied' })}
                                            >
                                                <option value="available">Available</option>
                                                <option value="occupied">Occupied</option>
                                            </select>
                                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                                <button onClick={() => saveEdit(slot.id)} className="btn btn-primary" style={{ padding: '0.4rem', flex: 1 }}><Check size={16} /></button>
                                                <button onClick={cancelEdit} className="btn btn-secondary" style={{ padding: '0.4rem', flex: 1 }}><X size={16} /></button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <>
                                            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    onClick={() => startEdit(slot)}
                                                    style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                                                    title="Edit Slot"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => toggleActive(slot.id)}
                                                    style={{
                                                        color: slot.isActive ? 'var(--status-success)' : 'var(--text-muted)',
                                                        background: 'none', border: 'none', cursor: 'pointer'
                                                    }}
                                                    title={slot.isActive ? "Disable Slot" : "Enable Slot"}
                                                >
                                                    <Power size={16} />
                                                </button>
                                                <button
                                                    onClick={() => toggleMaintenance(slot.id)}
                                                    disabled={!slot.isActive}
                                                    style={{
                                                        color: slot.isMaintenance ? 'var(--status-warning)' : 'var(--text-muted)',
                                                        background: 'none', border: 'none', cursor: slot.isActive ? 'pointer' : 'not-allowed',
                                                        opacity: slot.isActive ? 1 : 0.5
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
                                                {slot.venue}
                                            </div>
                                            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem', fontSize: '1.1rem' }}>{slot.location}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{slot.type}</div>
                                            <div style={{
                                                marginTop: '0.5rem',
                                                fontSize: '0.8rem',
                                                color: !slot.isActive
                                                    ? 'var(--text-muted)'
                                                    : (slot.isMaintenance
                                                        ? 'var(--status-warning)'
                                                        : (slot.isOccupied ? 'var(--status-error)' : 'var(--status-success)')),
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                {!slot.isActive ? (
                                                    'Disabled'
                                                ) : (
                                                    slot.isMaintenance ? (
                                                        <>
                                                            <AlertTriangle size={14} />
                                                            Under Maintenance
                                                        </>
                                                    ) : (
                                                        slot.isOccupied ? 'Occupied' : 'Available'
                                                    )
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
