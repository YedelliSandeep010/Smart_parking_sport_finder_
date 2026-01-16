import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Layers, Map, Mountain, Satellite } from 'lucide-react';

// Fix for default marker icon in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Wrapper to update map view when selection changes
function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 14, { duration: 1.5 }); // Smooth fly animation
        }
    }, [center, map]);
    return null;
}

// Custom Marker Icons
const createCustomIcon = (color) => new L.DivIcon({
    className: 'custom-pin',
    html: `<div style="
    background-color: ${color};
    width: 24px;
    height: 24px;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
  ">
    <div style="background: white; width: 8px; height: 8px; border-radius: 50%;"></div>
  </div>`,
    iconSize: [30, 42],
    iconAnchor: [15, 30],
    popupAnchor: [0, -35]
});

export default function VenueMap({ venues, onSelect, selectedVenue }) {
    // Default Center (Vijayawada/Amaravati region approx)
    const defaultCenter = [16.5062, 80.6480];

    // Find center if venue selected
    const selectedVenueObj = venues.find(v => v.name === selectedVenue);

    // Convert % coordinates to Lat/Lng simplified for demo 
    const minLat = 16.48, maxLat = 16.55;
    const minLng = 80.60, maxLng = 80.70;

    const getLatLng = (v) => {
        if (v.coordinates && v.coordinates.lat) return [v.coordinates.lat, v.coordinates.lng];

        const lat = minLat + ((v.coordinates?.y || 50) / 100) * (maxLat - minLat);
        const lng = minLng + ((v.coordinates?.x || 50) / 100) * (maxLng - minLng);
        return [lat, lng];
    };

    const mapCenter = selectedVenueObj ? getLatLng(selectedVenueObj) : defaultCenter;

    // Map Types Definition
    const mapTypes = {
        default: {
            name: 'Default',
            icon: <Map size={16} />,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; OpenStreetMap contributors'
        },
        satellite: {
            name: 'Satellite',
            icon: <Satellite size={16} />,
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        },
        terrain: {
            name: 'Terrain',
            icon: <Mountain size={16} />,
            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
        }
    };

    const [currentType, setCurrentType] = useState('default');

    return (
        <div className="card" style={{ padding: 0, overflow: 'hidden', height: '500px', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
            <MapContainer
                center={defaultCenter}
                zoom={13}
                style={{ height: '100%', width: '100%', background: '#1e293b' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    key={currentType} // Force re-render on type change
                    attribution={mapTypes[currentType].attribution}
                    url={mapTypes[currentType].url}
                />

                <MapUpdater center={mapCenter} />

                {/* Markers */}
                {venues.map((venue) => {
                    const position = getLatLng(venue);
                    const isSelected = selectedVenue === venue.name;
                    const color = venue.available > 0 ? '#10b981' : '#ef4444';

                    return (
                        <Marker
                            key={venue.name}
                            position={position}
                            icon={createCustomIcon(isSelected ? '#6366f1' : color)}
                            eventHandlers={{
                                click: () => onSelect(venue.name),
                            }}
                        >
                            <Popup className="glass-popup">
                                <div style={{ textAlign: 'center', color: '#1e293b', minWidth: '150px' }}>
                                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 'bold' }}>{venue.name}</h3>
                                    <div style={{ color: venue.available > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                                        {venue.available} Spots Available
                                    </div>
                                    <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                                        Click map pin to select
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}


                {/* Map Type Controls (Google Maps Style) */}
                <div style={{
                    position: 'absolute',
                    top: '1rem', right: '1rem', zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {Object.entries(mapTypes).map(([key, type]) => (
                            <button
                                key={key}
                                onClick={() => setCurrentType(key)}
                                title={type.name}
                                style={{
                                    border: 'none',
                                    background: currentType === key ? '#e2e8f0' : 'white',
                                    padding: '0.6rem 0.8rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.85rem',
                                    fontWeight: currentType === key ? 'bold' : 'normal',
                                    color: currentType === key ? '#0f172a' : '#64748b',
                                    borderBottom: key !== 'terrain' ? '1px solid #f1f5f9' : 'none',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => { if (currentType !== key) e.currentTarget.style.background = '#f8fafc' }}
                                onMouseOut={(e) => { if (currentType !== key) e.currentTarget.style.background = 'white' }}
                            >
                                {type.icon}
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Legend / Overlay */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem', left: '1rem', zIndex: 999,
                    background: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <div style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%' }}></div> Available
                    <div style={{ width: 8, height: 8, background: '#ef4444', borderRadius: '50%', marginLeft: '0.5rem' }}></div> Full
                </div>

            </MapContainer>
        </div>
    );
}
