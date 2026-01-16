import { useState, useMemo } from 'react';
import { useParking } from '../../context/ParkingContext';
import { useAuth } from '../../context/AuthContext';
import { Search, MapPin, Clock, Car, Bike, Truck, ArrowLeft, ChevronRight, Navigation, LayoutGrid, Calendar } from 'lucide-react';
import TimerModal from '../../components/User/TimerModal';
import VenueMap from '../../components/User/VenueMap';

export default function UserDashboard() {
    const { slots, bookings } = useParking();
    const { user } = useAuth();
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [activeBooking, setActiveBooking] = useState(null);

    // Filter to show only active slots to users
    const availableSlots = useMemo(() => slots.filter(s => s.isActive !== false), [slots]);

    // Find all active bookings for user
    const activeBookings = bookings.filter(b => b.userId === (user.id || user.email) && b.status === 'active');

    const regions = useMemo(() => {
        return [...new Set(availableSlots.map(s => s.region || 'On Street'))].sort();
    }, [availableSlots]);

    const venues = useMemo(() => {
        if (!selectedRegion) return [];
        const uniqueVenues = [...new Set(availableSlots
            .filter(s => (s.region || 'On Street') === selectedRegion)
            .map(s => s.venue)
        )].sort();

        return uniqueVenues.map(venueName => {
            const venueSlots = availableSlots.filter(s => s.venue === venueName);
            const available = venueSlots.filter(s => !s.isOccupied).length;
            const coordinates = venueSlots[0]?.coordinates;
            return {
                name: venueName,
                available,
                total: venueSlots.length,
                coordinates
            };
        });
    }, [availableSlots, selectedRegion]);

    const filteredSlots = useMemo(() => {
        if (!selectedVenue) return [];
        return availableSlots.filter(s => s.venue === selectedVenue);
    }, [availableSlots, selectedVenue]);

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedVenue(null);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 4rem' }}>

            {/* Header */}
            <div className="animate-fade-in" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--primary)', borderRadius: '1rem', boxShadow: '0 4px 20px var(--primary-glow)' }}>
                    <Navigation color="white" size={24} />
                </div>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0' }}>Find Your Spot</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Real-time availability across the city</p>
                </div>
            </div>

            {/* Active Bookings Banner */}
            {activeBookings.length > 0 && (
                <div className="animate-slide-up" style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock className="text-gradient" /> Active Sessions
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {activeBookings.map(booking => (
                            <div key={booking.id} className="card" style={{
                                background: 'linear-gradient(145deg, var(--primary-glow), var(--bg-surface))',
                                border: '1px solid var(--primary-glow)',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }}></div>
                                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{booking.slotId}</span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Started: {new Date(booking.startTime).toLocaleTimeString()}</div>
                                </div>
                                <button onClick={() => setActiveBooking(booking)} className="btn btn-primary">
                                    View Timer
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 1: Region */}
            <div className="animate-slide-up" style={{ marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', flexWrap: 'wrap' }}>
                    <MapPin color="var(--primary)" />
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select Region</label>
                        <select
                            className="input-field"
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            style={{ fontSize: '1.1rem', cursor: 'pointer' }}
                        >
                            <option value="">Select a location...</option>
                            {regions.map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Step 2: Venues */}
            {selectedRegion && !selectedVenue && (
                <div className="animate-slide-up">
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Available Venues in {selectedRegion}</h3>

                    {/* Map Overview */}
                    <div style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid var(--card-border)', boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5)', marginBottom: '2rem' }}>
                        <VenueMap venues={venues} onSelect={setSelectedVenue} selectedVenue={selectedVenue} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {venues.map((venue, index) => (
                            <div
                                key={venue.name}
                                className="card animate-slide-up"
                                style={{
                                    animationDelay: `${index * 0.05}s`,
                                    cursor: 'pointer',
                                    borderLeft: `4px solid ${venue.available > 0 ? 'var(--status-success)' : 'var(--status-error)'}`
                                }}
                                onClick={() => setSelectedVenue(venue.name)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                    <div style={{ padding: '0.75rem', background: 'var(--input-bg)', borderRadius: '50%' }}>
                                        <LayoutGrid size={20} color="var(--secondary)" />
                                    </div>
                                    <span style={{
                                        padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold',
                                        background: venue.available > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                        color: venue.available > 0 ? 'var(--status-success)' : 'var(--status-error)'
                                    }}>
                                        {venue.available} Free
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{venue.name}</h3>
                                <p style={{ color: 'var(--text-muted)' }}>{venue.total} Total Spots</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Step 3: Slots */}
            {selectedVenue && (
                <div className="animate-slide-up">
                    <button
                        onClick={() => setSelectedVenue(null)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem' }}
                    >
                        <ArrowLeft size={20} /> Back to Venues
                    </button>

                    <h2 className="text-gradient" style={{ marginBottom: '0.5rem' }}>{selectedVenue}</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{filteredSlots.length} parking spots found</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {filteredSlots.map((slot, index) => (
                            <div key={slot.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                <SlotCard slot={slot} setActiveBooking={setActiveBooking} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Timer Modal */}
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
            case 'Bike': return <Bike size={40} strokeWidth={1.5} />;
            case 'Truck': return <Truck size={40} strokeWidth={1.5} />;
            default: return <Car size={40} strokeWidth={1.5} />;
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

    const isAvailable = !slot.isOccupied && !slot.isMaintenance;

    return (
        <div className="card" style={{
            position: 'relative',
            background: isAvailable
                ? 'var(--card-bg)'
                : 'var(--bg-surface)',
            borderColor: isAvailable
                ? 'var(--card-border)'
                : 'rgba(239, 68, 68, 0.2)', // Using static rgba for now as dim variant isn't defined
            opacity: isAvailable ? 1 : 0.8
        }}>
            {/* Status Badge */}
            <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 'bold',
                background: slot.isMaintenance
                    ? 'rgba(245, 158, 11, 0.2)'
                    : (slot.isOccupied ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'),
                color: slot.isMaintenance
                    ? '#fbbf24'
                    : (slot.isOccupied ? 'var(--status-error)' : 'var(--status-success)'),
                boxShadow: isAvailable ? '0 0 10px rgba(16, 185, 129, 0.2)' : 'none'
            }}>
                {slot.isMaintenance ? 'Maintenance' : (slot.isOccupied ? 'Occupied' : 'Open')}
            </div>

            <div style={{
                color: isAvailable ? 'var(--secondary)' : 'var(--text-muted)',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: 'var(--input-bg)',
                borderRadius: '1rem',
                display: 'inline-block'
            }}>
                {getIcon(slot.type)}
            </div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.25rem', color: 'var(--text-main)' }}>{slot.id}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {slot.type} Parking
            </p>

            {error && <div style={{ color: '#fca5a5', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{error}</div>}

            <button
                disabled={!isAvailable}
                onClick={handleBook}
                className={isAvailable ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ width: '100%', cursor: isAvailable ? 'pointer' : 'not-allowed', opacity: isAvailable ? 1 : 0.5 }}
            >
                {slot.isMaintenance ? 'Under Maintenance' : (slot.isOccupied ? 'Unavailable' : 'Book Now')}
            </button>
        </div>
    );
}
