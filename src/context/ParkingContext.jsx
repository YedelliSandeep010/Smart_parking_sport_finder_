import { createContext, useContext, useState, useEffect } from 'react';

const ParkingContext = createContext();

export const useParking = () => useContext(ParkingContext);

export const ParkingProvider = ({ children }) => {
    const [slots, setSlots] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Initialize dummy data or load from storage
    useEffect(() => {
        const storedSlots = localStorage.getItem('park_ease_slots_v4'); // Changed key to force re-seed
        const storedBookings = localStorage.getItem('park_ease_bookings');

        if (storedSlots) {
            const parsed = JSON.parse(storedSlots);
            // Default isActive to true if undefined
            setSlots(parsed.map(s => ({ ...s, isActive: s.isActive !== false })));
        } else {
            // Seed some initial slots if empty
            const initialSlots = [
                // TELANGANA - HYDERABAD
                {
                    id: 'TS-HYD-AMB-001', region: 'Telangana', city: 'Hyderabad', venue: 'AMB Cinemas',
                    location: 'AMB Cinemas - L1', isOccupied: false, type: 'Car',
                    coordinates: { x: 25, y: 35 }
                },
                {
                    id: 'TS-HYD-AMB-002', region: 'Telangana', city: 'Hyderabad', venue: 'AMB Cinemas',
                    location: 'AMB Cinemas - L1', isOccupied: true, type: 'Car',
                    coordinates: { x: 25, y: 35 }
                },
                {
                    id: 'TS-HYD-INO-001', region: 'Telangana', city: 'Hyderabad', venue: 'Inorbit Mall',
                    location: 'Inorbit Mall - P1', isOccupied: false, type: 'Bike',
                    coordinates: { x: 65, y: 55 }
                },
                {
                    id: 'TS-HYD-INO-002', region: 'Telangana', city: 'Hyderabad', venue: 'Inorbit Mall',
                    location: 'Inorbit Mall - P2', isOccupied: false, type: 'Car',
                    coordinates: { x: 65, y: 55 }
                },
                {
                    id: 'TS-HYD-NEX-001', region: 'Telangana', city: 'Hyderabad', venue: 'Nexus Mall',
                    location: 'Nexus Mall - B1', isOccupied: false, type: 'Car',
                    coordinates: { x: 45, y: 40 }
                },
                {
                    id: 'TS-HYD-DSL-001', region: 'Telangana', city: 'Hyderabad', venue: 'DSL Virtue Mall',
                    location: 'DSL Mall - P3', isOccupied: true, type: 'Car',
                    coordinates: { x: 70, y: 20 }
                },

                // TELANGANA - WARANGAL
                {
                    id: 'TS-WGL-ASN-001', region: 'Telangana', city: 'Warangal', venue: 'Asian Cinemas',
                    location: 'Asian Cinemas - Parking', isOccupied: false, type: 'Car',
                    coordinates: { x: 30, y: 30 }
                },
                {
                    id: 'TS-WGL-NIT-001', region: 'Telangana', city: 'Warangal', venue: 'NIT Warangal',
                    location: 'Guest House Parking', isOccupied: false, type: 'Car',
                    coordinates: { x: 55, y: 55 }
                },

                // ANDHRA PRADESH - VIZAG
                {
                    id: 'AP-VIZ-CMR-001', region: 'Andhra Pradesh', city: 'Vizag', venue: 'CMR Central',
                    location: 'CMR Central - Cellar', isOccupied: false, type: 'Car',
                    coordinates: { x: 40, y: 45 }
                },
                {
                    id: 'AP-VIZ-RKB-001', region: 'Andhra Pradesh', city: 'Vizag', venue: 'RK Beach',
                    location: 'Beach Road Parking', isOccupied: true, type: 'Car',
                    coordinates: { x: 80, y: 60 }
                },
                {
                    id: 'AP-VIZ-VMR-001', region: 'Andhra Pradesh', city: 'Vizag', venue: 'VMRDA Park',
                    location: 'VMRDA Main Gate', isOccupied: false, type: 'Bike',
                    coordinates: { x: 35, y: 70 }
                },

                // ANDHRA PRADESH - VIJAYAWADA
                {
                    id: 'AP-VIJ-PVP-001', region: 'Andhra Pradesh', city: 'Vijayawada', venue: 'PVP Square',
                    location: 'PVP Square - L2', isOccupied: false, type: 'Bike',
                    coordinates: { x: 60, y: 25 }
                },
                {
                    id: 'AP-VIJ-TRN-001', region: 'Andhra Pradesh', city: 'Vijayawada', venue: 'Trendset Mall',
                    location: 'Trendset - C1', isOccupied: false, type: 'Car',
                    coordinates: { x: 50, y: 40 }
                },
                {
                    id: 'AP-VIJ-BNZ-001', region: 'Andhra Pradesh', city: 'Vijayawada', venue: 'Benz Circle',
                    location: 'Public Parking', isOccupied: true, type: 'Car',
                    coordinates: { x: 20, y: 80 }
                },

                // ANDHRA PRADESH - TIRUPATI
                {
                    id: 'AP-TPT-AIR-001', region: 'Andhra Pradesh', city: 'Tirupati', venue: 'AIR Bypass',
                    location: 'Bypass Road Parking', isOccupied: false, type: 'Car',
                    coordinates: { x: 40, y: 40 }
                },
                {
                    id: 'AP-TPT-SRI-001', region: 'Andhra Pradesh', city: 'Tirupati', venue: 'Srinivasam',
                    location: 'Complex Parking', isOccupied: false, type: 'Car',
                    coordinates: { x: 60, y: 60 }
                },

                // CHENNAI
                {
                    id: 'TN-CHE-EA-001', region: 'Chennai', city: 'Chennai', venue: 'Express Avenue',
                    location: 'Express Avenue - B1', isOccupied: true, type: 'Car',
                    coordinates: { x: 30, y: 60 }
                },
                {
                    id: 'TN-CHE-PMC-001', region: 'Chennai', city: 'Chennai', venue: 'Phoenix Marketcity',
                    location: 'Phoenix Marketcity - B2', isOccupied: false, type: 'Car',
                    coordinates: { x: 75, y: 30 }
                },

                // OTHERS (Keeping some legacy style if needed, but upgrading structure)
                {
                    id: 'MUM-001', region: 'Maharashtra', city: 'Mumbai', venue: 'Phoenix Palladium',
                    location: 'Phoenix Palladium', isOccupied: false, type: 'Car',
                    coordinates: { x: 50, y: 50 },
                    isActive: true
                },
            ];
            // Ensure all initial slots have isActive
            const slotsWithActive = initialSlots.map(s => ({ ...s, isActive: true }));
            setSlots(slotsWithActive);
            localStorage.setItem('park_ease_slots_v4', JSON.stringify(slotsWithActive));
        }

        if (storedBookings) {
            setBookings(JSON.parse(storedBookings));
        }
    }, []);

    // Update storage when state changes
    useEffect(() => {
        if (slots.length > 0) localStorage.setItem('park_ease_slots_v4', JSON.stringify(slots));
    }, [slots]);

    useEffect(() => {
        if (bookings.length > 0) localStorage.setItem('park_ease_bookings', JSON.stringify(bookings));
    }, [bookings]);

    // Admin Actions
    const addSlot = (slotData) => {
        const newSlot = { ...slotData, id: `S${Date.now()}`, isOccupied: false, isMaintenance: false, isActive: true };
        setSlots([...slots, newSlot]);
    };

    const removeSlot = (id) => {
        setSlots(prev => prev.filter(slot => slot.id !== id));
    };

    const updateSlot = (id, updatedData) => {
        setSlots(prev => prev.map(slot =>
            slot.id === id ? { ...slot, ...updatedData } : slot
        ));
    };

    const toggleMaintenance = (id) => {
        setSlots(prev => prev.map(slot => {
            if (slot.id === id) {
                // If entering maintenance, force it to be unoccupied (or could keep occupied but frozen)
                // For now, let's just toggle the flag. If it's occupied, it remains occupied effectively but status changes.
                return { ...slot, isMaintenance: !slot.isMaintenance };
            }
            return slot;
        }));
    };

    const toggleActive = (slotId) => {
        setSlots(slots.map(s => s.id === slotId ? { ...s, isActive: !s.isActive } : s));
    };

    // Check Availability
    const checkAvailability = (slotId, startTime, endTime) => {
        const slotBookings = bookings.filter(b => b.slotId === slotId && b.status === 'active');

        for (const booking of slotBookings) {
            // Check overlap
            // Existing: |S-------E|
            // New:          |s-------e|  -> Overlap
            // New: |s-------e|           -> Overlap

            // Overlap condition: Not (NewEnd <= ExistingStart OR NewStart >= ExistingEnd)
            // Simplified: NewStart < ExistingEnd && NewEnd > ExistingStart

            const existingStart = booking.startTime;
            const existingEnd = booking.endTime || (existingStart + (2 * 60 * 60 * 1000)); // Default 2 hrs if undefined

            if (startTime < existingEnd && endTime > existingStart) {
                return false; // Conflict found
            }
        }
        return true;
    };

    // User/Booking Actions
    const bookSlot = (slotId, user, vehicleNo, startTime, endTime) => {
        const slot = slots.find(s => s.id === slotId);
        if (!slot) throw new Error('Slot not found');
        if (!slot.isActive) throw new Error('Slot is currently disabled');
        if (slot.isMaintenance) throw new Error('Slot is under maintenance');

        // Use provided start/end or default to "Now"
        const start = startTime || Date.now();
        const end = endTime || null;

        // Validate availability
        if (end && !checkAvailability(slotId, start, end)) {
            throw new Error('Slot is already booked for this time period.');
        }

        // Basic check for "Now" if no range provided (Legacy compatibility)
        if (!end && slot.isOccupied) {
            throw new Error('Slot not available');
        }

        const newBooking = {
            id: `B${Date.now()}`,
            slotId,
            userId: user.id || user.email,
            userRole: user.role || 'user',
            userName: user.fullName,
            vehicleNo,
            startTime: start,
            endTime: end,
            status: 'active',
            cost: 0
        };

        setBookings([newBooking, ...bookings]);

        // If booking starts now (or in past) and hasn't ended, mark occupied
        const now = Date.now();
        if (start <= now && (!end || end > now)) {
            setSlots(slots.map(s => s.id === slotId ? { ...s, isOccupied: true } : s));
        }

        return newBooking;
    };

    const releaseSlot = (bookingId) => {
        const booking = bookings.find(b => b.id === bookingId);
        if (!booking) return;

        const endTime = Date.now();
        const durationMs = endTime - booking.startTime;
        const durationHours = Math.ceil(durationMs / (1000 * 60 * 60)); // Ceil to nearest hour
        const ratePerHour = 50; // Simple fixed rate
        const totalCost = durationHours * ratePerHour;

        // Update booking
        const updatedBooking = { ...booking, endTime, status: 'completed', cost: totalCost };
        setBookings(bookings.map(b => b.id === bookingId ? updatedBooking : b));

        // Free the slot
        setSlots(slots.map(s => s.id === booking.slotId ? { ...s, isOccupied: false } : s));

        return updatedBooking;
    };

    const value = {
        slots,
        bookings,
        addSlot,
        removeSlot,
        updateSlot,
        toggleMaintenance,
        toggleActive,
        bookSlot,
        releaseSlot
    };

    return (
        <ParkingContext.Provider value={value}>
            {children}
        </ParkingContext.Provider>
    );
};
