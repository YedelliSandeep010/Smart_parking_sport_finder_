import { useState, useEffect } from 'react';
import { useParking } from '../../context/ParkingContext';
import { Clock, CheckCircle, CreditCard, X } from 'lucide-react';

export default function TimerModal({ booking, onClose }) {
    const { releaseSlot } = useParking();
    const [elapsed, setElapsed] = useState(0);
    const [stage, setStage] = useState(booking.status === 'completed' ? 'receipt' : 'timer'); // timer | payment | receipt
    const [finalCost, setFinalCost] = useState(0);

    // Timer Effect
    useEffect(() => {
        if (stage !== 'timer') return;

        // Calculate initial elapsed time
        const startTime = booking.startTime;
        const updateTimer = () => {
            setElapsed(Date.now() - startTime);
        };

        updateTimer(); // Immediate update
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [booking, stage]);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStop = () => {
        // Calculate estimated cost
        const durationHours = Math.ceil(elapsed / (1000 * 60 * 60)); // Ceil to nearest hour often used, but prompt says "Start timer... stop timer on checkout".
        // Prompt says "Calculate parking fees based on duration"
        // Let's use the logic from Context here or just call releaseSlot which does it.
        // Ideally we show cost BEFORE releasing (Payment Simulation).
        // So we calculate locally first.

        const ratePerHour = 50;
        const estCost = Math.ceil(elapsed / (1000 * 60 * 60)) * ratePerHour;
        // Ensure at least 1 hour charge
        const minimalCost = Math.max(ratePerHour, estCost);

        setFinalCost(minimalCost);
        setStage('payment');
    };

    const handlePay = () => {
        // Simulate payment processing
        setTimeout(() => {
            releaseSlot(booking.id);
            setStage('receipt');
        }, 1500);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100
        }}>
            <div className="card" style={{ width: '90%', maxWidth: '400px', textAlign: 'center', position: 'relative' }}>

                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', zIndex: 10 }}>
                    <X size={24} />
                </button>

                {stage === 'timer' && (
                    <>
                        <div style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>
                            <Clock size={64} className="animate-pulse" />
                        </div>
                        <h2 style={{ marginBottom: '0.5rem' }}>Parking in Progress</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Slot: {booking.slotId}</p>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace', margin: '2rem 0' }}>
                            {formatTime(elapsed)}
                        </div>
                        <button onClick={handleStop} className="btn btn-danger" style={{ width: '100%' }}>
                            Check Out
                        </button>
                    </>
                )}

                {stage === 'payment' && (
                    <>
                        <div style={{ marginBottom: '1.5rem', color: 'var(--status-warning)' }}>
                            <CreditCard size={64} />
                        </div>
                        <h2 style={{ marginBottom: '0.5rem' }}>Payment Due</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Total time: {formatTime(elapsed)}</p>

                        <div style={{ margin: '2rem 0', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>Rate</span>
                                <span>₹50/hr</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                <span>Total</span>
                                <span style={{ color: 'var(--status-success)' }}>₹{finalCost}</span>
                            </div>
                        </div>

                        <button onClick={handlePay} className="btn btn-success" style={{ width: '100%' }}>
                            Pay & Release Slot
                        </button>
                    </>
                )}

                {stage === 'receipt' && (
                    <>
                        <div style={{ marginBottom: '1.5rem', color: 'var(--status-success)' }}>
                            <CheckCircle size={64} />
                        </div>
                        <h2 style={{ marginBottom: '0.5rem' }}>Payment Successful!</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Thank you for using ParkEase.</p>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Have a safe drive!</p>
                        <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%', marginTop: '2rem' }}>
                            Close
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}
