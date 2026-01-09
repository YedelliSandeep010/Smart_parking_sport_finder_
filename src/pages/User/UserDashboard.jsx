import { useState, useMemo } from 'react';
import { useParking } from '../../context/ParkingContext';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, Clock, Car, Bike, Truck, ArrowLeft, ChevronRight } from 'lucide-react';
import TimerModal from '../../components/User/TimerModal';
import VenueMap from '../../components/User/VenueMap';

export default function UserDashboard() {
    const { slots, bookings } = useParking();
    const { user } = useAuth();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [activeBooking, setActiveBooking] = useState(null);

    // Find all active bookings for user
    const activeBookings = bookings.filter(b => b.userId === (user.id || user.email) && b.status === 'active');

    // Extract unique regions
    const regions = useMemo(() => {
        return [...new Set(slots.map(s => s.region || 'On Street'))].sort();
    }, [slots]);

    // Extract venues for selected region with metadata for Map
    const venues = useMemo(() => {
        if (!selectedRegion) return [];
        const uniqueVenues = [...new Set(slots
            .filter(s => (s.region || 'On Street') === selectedRegion)
            .map(s => s.venue)
        )].sort();

        return uniqueVenues.map(venueName => {
            const venueSlots = slots.filter(s => s.venue === venueName);
            const available = venueSlots.filter(s => !s.isOccupied).length;
            // Get coords from first slot of this venue (assuming they share it or it's consistent)
            const coordinates = venueSlots[0]?.coordinates;
            return {
                name: venueName,
                available,
                total: venueSlots.length,
                coordinates
            };
        });
    }, [slots, selectedRegion]);

    // Filter slots for selected venue
    const filteredSlots = useMemo(() => {
        if (!selectedVenue) return [];
        return slots.filter(s => s.venue === selectedVenue);
    }, [slots, selectedVenue]);

    // Reset venue when region changes
    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedVenue(null);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>

            {/* Active Bookings Section (Always visible if active) */}
            {activeBookings.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                    <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Your Active Sessions ({activeBookings.length})</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {activeBookings.map(booking => (
                            <div key={booking.id} className="card" style={{
                                background: 'rgba(79, 70, 229, 0.1)',
                                border: '1px solid var(--primary)',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <Clock size={16} color="var(--primary)" />
                                        <span style={{ fontWeight: 'bold' }}>{booking.slotId}</span>
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Since: {new Date(booking.startTime).toLocaleTimeString()}</div>
                                </div>
                                <button onClick={() => setActiveBooking(booking)} className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                    Checkout
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 1: REGION SELECTION */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '1rem' }}>Find a Parking Spot</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
                    <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select Region / State</label>
                    <select
                        className="input-field"
                        value={selectedRegion}
                        onChange={handleRegionChange}
                        style={{ padding: '0.75rem', fontSize: '1rem' }}
                    >
                        <option value="">-- Choose Location --</option>
                        {regions.map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* STEP 2: VENUE SELECTION (MAP + LIST) */}
            {selectedRegion && !selectedVenue && (
                <div className="animate-slide-up">
                    <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Select Venue in {selectedRegion}</h3>

                    {/* MAP VIEW */}
                    <VenueMap venues={venues} onSelect={setSelectedVenue} selectedVenue={selectedVenue} />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {venues.map((venue, index) => (
                            <div
                                key={venue.name}
                                className="card animate-slide-up"
                                style={{
                                    animationDelay: `${index * 0.05}s`,
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s',
                                    borderLeft: `4px solid ${venue.available > 0 ? 'var(--status-success)' : 'var(--status-error)'}`
                                }}
                                onClick={() => setSelectedVenue(venue.name)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '0.5rem', color: 'var(--primary)' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div style={{ background: venue.available > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', padding: '0.25rem 0.5rem', borderRadius: '1rem', fontSize: '0.75rem', color: venue.available > 0 ? 'var(--status-success)' : 'var(--status-error)' }}>
                                        {venue.available} Available
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{venue.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{venue.total} Slots Total</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 3: SLOT SELECTION */}
            {selectedVenue && (
                <div className="animate-slide-up">
                    <button
                        onClick={() => setSelectedVenue(null)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem' }}
                    >
                        <ArrowLeft size={20} /> Back to Venues
                    </button>

                    <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>{selectedVenue}</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Select a parking slot to book</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {filteredSlots.map((slot, index) => (
                            <div key={slot.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                <SlotCard slot={slot} setActiveBooking={setActiveBooking} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Booking/Timer Modal */}
            {activeBooking && (
                <TimerModal
                    booking={activeBooking}
                    onClose={() => setActiveBooking(null)}
                    isNewBooking={!activeBooking.startTime}
                />
            )}
        </div>
    );
}

function SlotCard({ slot, setActiveBooking }) {
    const { bookSlot } = useParking();
    const { user } = useAuth();
    const [error, setError] = useState('');

    const getIcon = (type) => {
        switch (type) {
            case 'Bike': return <Bike size={48} />;
            case 'Truck': return <Truck size={48} />;
            default: return <Car size={48} />;
        }
    };

    const handleBook = () => {
        try {
            const booking = bookSlot(slot.id, user, user.vehicleNo || 'Unknown');
            setActiveBooking(booking);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="card" style={{
            position: 'relative',
            opacity: slot.isOccupied ? 0.7 : 1,
            transform: slot.isOccupied ? 'scale(0.98)' : 'scale(1)',
            transition: 'all 0.3s ease',
            border: slot.isOccupied ? '1px solid transparent' : '1px solid rgba(79, 70, 229, 0.3)'
        }}>
            <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.8rem',
                background: slot.isMaintenance
                    ? 'var(--status-warning)'
                    : (slot.isOccupied ? 'var(--status-error)' : 'var(--status-success)'),
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
                {slot.isMaintenance ? 'Maintenance' : (slot.isOccupied ? 'Occupied' : 'Available')}
            </div>

            <div style={{
                color: slot.isOccupied ? 'var(--text-muted)' : 'var(--secondary)',
                marginBottom: '1rem',
                height: '60px',
                display: 'flex',
                alignItems: 'center'
            }}>
                {getIcon(slot.type)}
            </div>

            <h3 style={{ fontSize: '1.2rem' }}>{slot.id}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {slot.type} Only
            </p>

            {error && <div style={{ color: 'var(--status-error)', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}

            <button
                disabled={slot.isOccupied || slot.isMaintenance}
                onClick={handleBook}
                className={`btn ${slot.isOccupied || slot.isMaintenance ? 'btn-secondary' : 'btn-primary'}`}
                style={{ width: '100%', cursor: slot.isOccupied || slot.isMaintenance ? 'not-allowed' : 'pointer', marginTop: '1rem' }}
            >
                {slot.isMaintenance ? 'Under Maintenance' : (slot.isOccupied ? 'Unavailable' : 'Book Now')}
            </button>
        </div>
    );
}
