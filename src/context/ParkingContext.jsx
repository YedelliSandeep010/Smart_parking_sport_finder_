import { createContext, useContext, useState, useEffect } from 'react';

const ParkingContext = createContext();

export const useParking = () => useContext(ParkingContext);

const API_BASE_URL = "http://localhost:8080/api";

export const ParkingProvider = ({ children }) => {
    const [slots, setSlots] = useState([]);
    const [bookings, setBookings] = useState([]);

    // Initialize from Backend
    useEffect(() => {
        fetchSlots();
        fetchBookings();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/slots`);
            if (response.ok) {
                const data = await response.json();
                setSlots(data);
            }
        } catch (e) {
            console.error("Failed to fetch slots", e);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/bookings`);
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (e) {
            console.error("Failed to fetch bookings", e);
        }
    };

    // Admin Actions
    const addSlot = async (slotData) => {
        const response = await fetch(`${API_BASE_URL}/slots`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slotData)
        });
        if (response.ok) fetchSlots();
    };

    const removeSlot = async (id) => {
        const response = await fetch(`${API_BASE_URL}/slots/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) fetchSlots();
    };

    const updateSlot = async (id, updatedData) => {
        const response = await fetch(`${API_BASE_URL}/slots/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        if (response.ok) fetchSlots();
    };

    const toggleMaintenance = async (id) => {
        const response = await fetch(`${API_BASE_URL}/slots/${id}/toggle-maintenance`, {
            method: 'POST'
        });
        if (response.ok) fetchSlots();
    };

    const toggleActive = async (id) => {
        const response = await fetch(`${API_BASE_URL}/slots/${id}/toggle-active`, {
            method: 'POST'
        });
        if (response.ok) fetchSlots();
    };

    // User/Booking Actions
    const bookSlot = async (slotId, user, vehicleNo, startTime, endTime) => {
        const start = startTime || Date.now();
        const end = endTime || null;

        const response = await fetch(`${API_BASE_URL}/bookings/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                slotId,
                userId: user.id || user.email,
                userRole: user.role || 'user',
                userName: user.fullName,
                vehicleNo,
                startTime: start,
                endTime: end
            })
        });

        if (response.ok) {
            const newBooking = await response.json();
            setBookings([newBooking, ...bookings]);
            fetchSlots(); // Update slot occupancy status
            return newBooking;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Booking failed');
        }
    };

    const releaseSlot = async (bookingId) => {
        const response = await fetch(`${API_BASE_URL}/bookings/release/${bookingId}`, {
            method: 'POST'
        });

        if (response.ok) {
            const updatedBooking = await response.json();
            setBookings(bookings.map(b => b.id === bookingId ? updatedBooking : b));
            fetchSlots(); // Update slot occupancy status
            return updatedBooking;
        }
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
