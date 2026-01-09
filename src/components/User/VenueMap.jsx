import { MapPin } from 'lucide-react';

export default function VenueMap({ venues, onSelect, selectedVenue }) {
    // Generate a simple deterministic pseudo-random position for demo if coords are missing
    // or use the ones from context

    return (
        <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative', height: '400px', background: '#f3f4f6', marginBottom: '2rem' }}>
            {/* Map Background visual */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px', pointerEvents: 'none' }}></div>

            {/* Roads (Simulated CSS) */}
            <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: '20px', background: '#d1d5db', transform: 'rotate(5deg)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', width: '20px', background: '#d1d5db', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: '30%', width: '15px', background: '#d1d5db', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', top: '70%', left: 0, right: 0, height: '15px', background: '#d1d5db', transform: 'rotate(-5deg)', pointerEvents: 'none' }}></div>

            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, background: 'white', padding: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h4 style={{ margin: 0, fontSize: '0.9rem' }}>Live Map</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Select a venue pin</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.7rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--status-success)' }}></div> Available</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--status-error)' }}></div> Full</div>
                </div>
            </div>

            {venues.map((venue) => {
                // Use coordinates if available, else random fallback based on name
                const coords = venue.coordinates || { x: 50, y: 50 };
                const isSelected = selectedVenue === venue.name;

                return (
                    <div
                        key={venue.name}
                        onClick={() => onSelect(venue.name)}
                        style={{
                            position: 'absolute',
                            left: `${coords.x}%`,
                            top: `${coords.y}%`,
                            transform: 'translate(-50%, -100%)',
                            cursor: 'pointer',
                            zIndex: isSelected ? 20 : 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                        title={`${venue.name} - ${venue.available} Available`}
                    >
                        <div style={{
                            // Valid logic for background color
                            background: isSelected
                                ? 'var(--primary)'
                                : (venue.slots?.some(s => s.isMaintenance) && venue.available === 0 ? 'var(--status-warning)'
                                    : (venue.available > 0 ? 'var(--status-success)' : 'var(--status-error)')),
                            // Actually VenueMap aggregates by Venue. Let's just keep simple logic for now or advanced.
                            // The user asked for "slots" visualization. Venue map shows dots per venue.
                            // Let's stick to the current logic for VenueMap but maybe add a maintenance indicator if ALL are maintenance?
                            // Reverting to simple color logic for now to avoid complexity in this file without data refactor.
                            // Better: Let's assume standard behavior. 
                            // IF we want to show maintenance on MAP, we need to know if the venue has maintenance slots.
                            // But venues prop is aggregated. Let's leave VenueMap simple for now unless requested specific map changes. 

                            color: 'white',
                            padding: '0.5rem',
                            borderRadius: '50% 50% 50% 0',
                            transform: 'rotate(-45deg)',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                            border: isSelected ? '2px solid white' : 'none'
                        }}>
                            <div style={{ transform: 'rotate(45deg)' }}>
                                <MapPin size={20} fill="white" />
                            </div>
                        </div>

                        <div style={{
                            marginTop: '0.5rem',
                            background: 'white',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            whiteSpace: 'nowrap',
                            opacity: isSelected ? 1 : 0.8,
                            transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                        }}>
                            {venue.name}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
